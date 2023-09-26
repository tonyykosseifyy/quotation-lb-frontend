"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import Button from "@/components/UI/Button/Button";
import { checkboxInfo, transactionalQuantity, warehouses, packageTypeFields } from "@/data/createProduct";
import DataTable from "react-data-table-component";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import { ucfirst } from "@/helpers/formatString";
import { MAX_ITEM_GROUPS, numbering } from "@/data/constants";
import Trashcan from "@/components/UI/Icons/Trashcan";
import moment from "moment";
import debounce from "lodash.debounce";
import AddButton from "@/components/UI/AddButton/AddButton";
import { Dropdown } from "@nextui-org/react";
import { altCodesDropdownItems } from "@/data/itemAltCodes";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import Input from "@/components/UI/InputContainer/Input";

const InputField = ({ watchedValues, register, label, inputName, inputNameQuantity, referenceField }) => {
  return (
    <div
      className='d-flex flex-column flex-md-row align-items-md-center pe-md-5'
      style={{ gap: "10px" }}>
      <div
        className={`${styles.labelText}`}
        style={{ width: "126px" }}>
        {label}
      </div>
      <div
        className='d-flex flex-row align-items-center'
        style={{ gap: "10px" }}>
        <input
          name={inputName}
          {...register(inputName, {
            required: true,
          })}
          className='border border-1 rounded p-2 text-center'
          style={{ fontWeight: "700", fontSize: "13px", width: "45px" }}
        />
        {inputNameQuantity && (
          <>
            <InputContainer
              inputPlaceholder=''
              isRequired={true}
              inputType='text'
              inputName={inputNameQuantity}
              register={register}
              width='154'
            />
            {referenceField && (
              <div
                className='ps-3'
                style={{ fontWeight: "700", fontSize: "13px" }}>
                {`${watchedValues[referenceField] ?? ""} PER ${watchedValues[inputName] ?? ""}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "var(--primary-clr)",
      color: "white",
      fontSize: "13px",
      fontWeight: 600,
      borderRadius: 5,
    },
  },
  rows: {
    style: {
      height: "min-content",
      borderBottom: "none !important",
    },
  },
  cells: {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--secondary-text-clr)",
      paddingTop: "0px !important",
      height: "30px !important",
    },
  },
};

const modalStyle = {
  overlay: {
    backgroundColor: "var(--modal-overlay-background-clr)",
    zIndex: 200,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "88%",
    padding: "30px 40px 24px 40px",
    borderRadius: "8px",
    overflow: "auto",
    height: "650px",
  },
};

const storeItem = async (payload) => {
  const response = await axiosClient.post(`/items`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const CreateItems = ({ closeModal }) => {
  const [buttonState, setButtonState] = useState("general");
  const [state, setState] = useState({
    subRef: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    canBeSold: false,
    canBePurchased: false,
    warranty: false,
    discontinued: false,
  });
  const [showModal, setShowModal] = useState(true);
  const [packageType, setPackageType] = useState(null);
  const [packageTypeName, setPackageTypeName] = useState("");

  const handleExtraInfo = (e) => {
    setButtonState(() => e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const {
    fields: itemGroupFields,
    append: appendItemGroup,
    remove: removeItemGroup,
  } = useFieldArray({
    name: "itemGroups",
    control: control,
  });

  const {
    fields: itemCodeFields,
    append: appendAltCode,
    remove: removeAltCode,
    insert: insertAltCode,
    update: updateAltCode,
  } = useFieldArray({
    name: "itemCodes",
    control: control,
  });

  const handleCreateAltCode = (key, icon) => {
    appendAltCode({ type: key, print: false, code: "", icon: icon, creationDate: moment().format("D/M/YYYY") });
  };

  const handleClickMoreOptions = (id) => {
    console.log(id);
  };

  const handleDeleteCode = (index) => {
    removeAltCode(index);
  };

  const handleCodePrintChange = (index) => {
    const currentValues = getValues();
    const currentPrintValue = currentValues.itemCodes[index].print;

    const updatedObject = {
      ...currentValues.itemCodes[index],
      print: !currentPrintValue,
    };

    updateAltCode(index, updatedObject);
  };

  const itemCodesTableColumns = [
    {
      name: "Print on Invoice",
      grow: 2,
      selector: (row, index) => {
        return (
          <CheckBox
            onChange={() => handleCodePrintChange(index)}
            isChecked={row.print}
          />
        );
      },
      allowOverflow: true,
      center: true,
    },
    {
      name: "Item Code",
      grow: 6,
      selector: (row, index) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {row.icon}
          {row.type !== "main" ? (
            <Input
              inputType={"text"}
              register={register}
              registerArrayName={"itemCodes"}
              registerArrayKey={"code"}
              registerArrayIndex={index}
            />
          ) : (
            row.code
          )}
        </div>
      ),
    },
    {
      name: "Creation Date",
      grow: 2,
      selector: (row) => row.creationDate,
      center: true,
      hide: "md",
      allowOverflow: true,
    },
    {
      name: "",
      grow: 0.1,
      center: true,
      selector: (row) => row.type !== "main" && <Ellipsis onClick={() => handleClickMoreOptions(row)} />,
    },
    {
      name: "",
      grow: 0.1,
      center: true,
      selector: (row, index) =>
        row.type !== "main" && (
          <Trashcan
            fillColor={"var(--primary-clr)"}
            onClick={() => handleDeleteCode(index)}
          />
        ),
    },
  ];

  const transactionTableColumns = [
    {
      name: "Transaction",
      maxWidth: "180px",
      selector: (row) => row.transaction,
      allowOverflow: true,
    },
    {
      name: "Quantity",
      maxWidth: "100px",
      selector: (row) => row.quantity,
      center: true,
    },
  ];

  const warehousesTableColumns = [
    {
      name: "Code",
      maxWidth: "75px",
      selector: (row) => row.code,
      allowOverflow: true,
    },
    {
      name: "Name",
      maxWidth: "150px",
      selector: (row) => row.name,
    },
    {
      name: "Shelving",
      maxWidth: "150px",
      selector: (row) => row.shelving,
    },
    {
      name: "Quantity",
      maxWidth: "100px",
      selector: (row) => row.quantity,
      center: true,
    },
  ];

  const transactionalQuantityConditionalRowStyles = [
    {
      when: (row) => (row.id % 2 !== 0) & (row.transaction !== "Ordered not invoiced"),
      style: {
        backgroundColor: "var(--table-row-background-clr)",
      },
    },
    {
      when: (row) => row.transaction === "Ordered not invoiced",
      style: {
        backgroundColor: "var(--table-row-babyblue-background-clr)",
      },
    },
  ];

  const warehousesConditionalRowStyles = [
    {
      when: (row) => row.code === "Code 1",
      style: {
        backgroundColor: "var(--table-row-background-clr)",
      },
    },
    {
      when: (row) => row.code === "Code 3",
      style: {
        backgroundColor: "#A4D8FB",
      },
    },
  ];

  const debouncedHandleMainCodeChange = debounce((e) => {
    const mainCodeObj = { type: "main", print: false, code: e.target.value, creationDate: moment().format("D/M/YYYY") };
    if (itemCodeFields.length === 0) {
      appendAltCode(mainCodeObj);
    } else {
      updateAltCode(0, mainCodeObj);
    }
  }, 500);

  const handleMainCodeChange = (event) => {
    debouncedHandleMainCodeChange(event);
  };

  const onSubmit = (data, e) => {
    const convertToNumber = (fields) => {
      fields.forEach((field) => {
        if (data[field]) {
          data[field] = Number(data[field]);
        }
      });
    };

    convertToNumber(["unitCost", "decimalCost", "unitPrice", "decimalPrice", "decimalQuantity"]);

    if (data.itemGroups != null) {
      data.itemGroups = data.itemGroups.map((item) => item.itemGroupId.id);
    }

    const createNewProductInfo = {
      ...data,
      subRef: state.subRef,
      canBeSold: checkboxValues.canBeSold,
      canBePurchased: checkboxValues.canBePurchased,
      warranty: checkboxValues.warranty,
      discontinued: checkboxValues.discontinued,
    };

    createNewProductInfo["itemCodes"] = createNewProductInfo["itemCodes"].map((obj) => {
      const { icon, ...newObj } = obj;
      return newObj;
    });

    Object.keys(createNewProductInfo).forEach(function (key) {
      if (createNewProductInfo[key] && typeof createNewProductInfo[key] === "object" && Array.isArray(createNewProductInfo[key]) === false) {
        createNewProductInfo[key] = createNewProductInfo[key].id;
      }
    });

    mutation.mutate(createNewProductInfo);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChange = (selected) => {
    setPackageType(selected);
    setPackageTypeName(selected.name);
  };

  const buttonTabs = [
    {
      title: "General",
      fillBackground: buttonState === "general",
      value: "general",
    },
    {
      title: "Alt Codes",
      fillBackground: buttonState === "altCodes",
      value: "altCodes",
    },
    {
      title: "Grouping",
      fillBackground: buttonState === "grouping",
      value: "grouping",
    },
    {
      title: "Procurement",
      fillBackground: buttonState === "procurement",
      value: "procurement",
    },
    {
      title: "Pricing",
      fillBackground: buttonState === "pricing",
      value: "pricing",
    },
    {
      title: "Quantities",
      fillBackground: buttonState === "quantities",
      value: "quantities",
    },
    {
      title: "Shelving",
      fillBackground: buttonState === "shelving",
      value: "shelving",
    },
    {
      title: "Shipping",
      fillBackground: buttonState === "shipping",
      value: "shipping",
    },
  ];

  const watchedValues = {
    packageUnitName: watch("packageUnitName"),
    packageSetName: watch("packageSetName"),
    packageSupersetName: watch("packageSupersetName"),
    packagePaletteName: watch("packagePaletteName"),
    packageContainerName: watch("packageContainerName"),
  };

  const packageFields = packageTypeFields[packageTypeName] || [];

  const createItemResponse = useQuery({
    queryKey: ["createItem"],
    queryFn: () => axiosClient.get(`/items/create`),
  });

  const createItemData = createItemResponse.data?.data.data;

  const mutation = useMutation(storeItem, {
    onSuccess: (data) => {
      removeAltCode();
      removeItemGroup();
      setButtonState("general");
      setCheckboxValues({
        canBeSold: false,
        canBePurchased: false,
        warranty: false,
        discontinued: false,
        blocked: false,
      });
      setPackageType(null);
      setPackageTypeName("");
      reset();
    },
  });

  const handleRequestClose = () => {
    setShowModal(false);
    closeModal("createItems");
  };

  return (
    <ModalComponent
      title="Product's Name"
      titlePaddingBottom='20px'
      isOpen={showModal}
      onRequestClose={handleRequestClose}
      style={modalStyle}>
      <div className={`d-flex-wrap`}>
        {buttonTabs.map(({ title, fillBackground, value }) => {
          return (
            <Button
              key={title}
              title={title}
              fillBackground={fillBackground}
              onClick={handleExtraInfo}
              value={value}
              type='button'
              paddingLeft='35px'
              paddingRight='35px'
              tab
            />
          );
        })}
      </div>
      <div>
        <form
          id='createNewProduct'
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form}`}>
          <div>
            {buttonState === "general" && (
              <>
                <div className='d-flex'>
                  <div className={`row ${styles.circle} pe-5 ps-2`}>
                    <div className={styles.bigCircle}>
                      <div className={styles.smallCircle}>
                        <img
                          src='/assets/svg/plus-blue.svg'
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`row ${styles.circle}`}>
                    <div className={styles.bigCircle}>
                      <div className={styles.smallCircle}>
                        <img
                          src='/assets/svg/plus-blue.svg'
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`pt-4`}>
                  <div
                    className={`d-flex flex-column flex-md-row`}
                    style={{ gap: "15px" }}>
                    <div className={`${styles.inputRow}`}>
                      <InputContainer
                        label='Type'
                        isRequired={true}
                        inputPlaceholder=''
                        inputType='select'
                        inputName='itemTypeId'
                        selectOptions={createItemData?.itemTypes}
                        register={register}
                        control={control}
                      />
                      <InputContainer
                        label='Code'
                        isRequired={true}
                        inputPlaceholder=''
                        inputType='text'
                        inputName='mainCode'
                        register={register}
                        onChange={handleMainCodeChange}
                      />
                      <InputContainer
                        label='Short Description'
                        inputPlaceholder=''
                        inputType='text'
                        inputName='shortDescription'
                        register={register}
                      />
                      <InputContainer
                        label='Taxation'
                        inputPlaceholder=''
                        inputType='select'
                        inputName='taxationGroupId'
                        selectOptions={createItemData?.taxationGroups}
                        register={register}
                        control={control}
                        optionName={"code"}
                      />
                    </div>
                    <div className={`d-flex flex-column pt-md-5 ps-md-3 ${styles.descriptionAndLanguageInputColumn}`}>
                      <InputContainer
                        label='Main Description'
                        isRequired={true}
                        inputPlaceholder=''
                        inputType='text'
                        inputName='mainDescription'
                        width={70}
                        widthUnit='%'
                        register={register}
                      />
                      <InputContainer
                        label='Second Language'
                        inputPlaceholder=''
                        inputType='text'
                        inputName='secondLanguageDescription'
                        width={70}
                        widthUnit='%'
                        register={register}
                      />
                    </div>
                  </div>
                  <div className='d-flex flex-column pt-4'>
                    <div className={`${styles.subRefTitle}`}>SubRef</div>
                    <div className={`${styles.subRefRadioButtons} pt-2`}>
                      {createItemData?.subrefs.map((subref) => {
                        return (
                          <div
                            key={subref.id}
                            className=''>
                            <RadioButton
                              inputName='subRef'
                              labelText={ucfirst(subref.name)}
                              value={subref.id}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={`${styles.checkBoxDiv} pt-4`}>
                    {checkboxInfo.map(({ inputName, labelText }) => {
                      return (
                        <div
                          key={inputName}
                          className=''>
                          <CheckBox
                            inputName={inputName}
                            labelText={labelText}
                            inputId={inputName}
                            isChecked={checkboxValues.value}
                            onChange={handleCheckboxChange}
                            labelFontWeight={600}
                          />
                        </div>
                      );
                    })}
                    {checkboxValues.discontinued === true && (
                      <InputContainer
                        label=''
                        isRequired={true}
                        inputPlaceholder='DATE'
                        inputType='text'
                        inputName='lastAllowedPurchaseDate'
                        register={register}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
            {buttonState === "altCodes" && (
              <>
                <div className={`d-flex fle pt-5`}>
                  <DataTable
                    columns={itemCodesTableColumns}
                    data={itemCodeFields}
                    customStyles={customStyles}
                    // conditionalRowStyles={transactionalQuantityConditionalRowStyles}
                  />
                </div>
                {itemCodeFields.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      paddingTop: "43px",
                      gap: 30,
                    }}>
                    <Dropdown placement='bottom-left'>
                      <Dropdown.Trigger>
                        <div>
                          <AddButton label={"Create Code"} />
                        </div>
                      </Dropdown.Trigger>
                      <Dropdown.Menu
                        aria-label='Static Actions'
                        items={altCodesDropdownItems}
                        className={styles.dropDownMenu}>
                        {(item, dropdownIndex) => (
                          <Dropdown.Item
                            key={dropdownIndex}
                            className={styles.altCodesDropdownItem}>
                            <div
                              className={styles.altCodesDropdownItemName}
                              onClick={() => handleCreateAltCode(item.key, item.icon)}>
                              {item.icon} {item.name}
                            </div>
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </>
            )}
            {buttonState === "grouping" && (
              <>
                <div
                  className={`row pt-5`}
                  style={{ gap: "15px" }}>
                  {itemGroupFields.map((field, index) => {
                    return (
                      <>
                        <div
                          className={`${styles.inputRow3} col-sm-6`}
                          key={field.id}>
                          <InputContainer
                            label={`Grouping ${numbering[index + 1]}`}
                            isRequired={true}
                            inputPlaceholder=''
                            inputType='select'
                            inputName={"group"}
                            registerArrayName={"itemGroups"}
                            registerArrayKey={"itemGroupId"}
                            registerArrayIndex={index}
                            selectOptions={createItemData?.itemGroups}
                            register={register}
                            control={control}
                          />
                        </div>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flex: 0.1,
                          }}>
                          <Trashcan
                            onClick={() => {
                              removeItemGroup(index);
                            }}
                            fillColor={"var(--primary-clr)"}
                          />
                        </span>
                      </>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "43px",
                    gap: 30,
                  }}>
                  <AddButton
                    label={"Add Group"}
                    onClick={() => {
                      if (itemGroupFields.length === MAX_ITEM_GROUPS) {
                        return;
                      }
                      appendItemGroup({ label: "group" });
                    }}
                  />
                </div>
              </>
            )}
            {buttonState === "procurement" && (
              <>
                <div
                  className={`d-flex flex-column flex-md-row pt-5 pb-md-5`}
                  style={{ gap: "20px", width: "100%" }}>
                  <div
                    className='d-flex flex-column flex-md-row align-items-md-center pe-md-5'
                    style={{ gap: "10px" }}>
                    <div className={`${styles.labelText} pe-5`}>Unit Cost</div>
                    <div
                      className='d-flex flex-row'
                      style={{ gap: "10px" }}>
                      <InputContainer
                        inputType='number'
                        inputName='unitCost'
                        register={register}
                        textAlign='end'
                        decimalDigits={2}
                      />
                      <InputContainer
                        inputPlaceholder='USD'
                        inputType='select'
                        inputName='currencyId'
                        selectOptions={createItemData?.currencies}
                        register={register}
                        control={control}
                        width={80}
                        textAlign='end'
                      />
                    </div>
                  </div>
                  <div style={{ width: "15%" }}>
                    <InputContainer
                      label='Decimal Cost'
                      inputPlaceholder='2'
                      inputType='number'
                      inputName='decimalCost'
                      register={register}
                      width={60}
                      textAlign='end'
                    />
                  </div>
                </div>
              </>
            )}
            {buttonState === "pricing" && (
              <>
                <div
                  className={`d-flex flex-column flex-md-row pt-5`}
                  style={{ gap: "20px" }}>
                  <div
                    className={`d-flex flex-column`}
                    style={{ gap: "20px", width: "35%" }}>
                    <div style={{ width: "100%" }}>
                      <InputContainer
                        label='Unit Price'
                        inputPlaceholder=''
                        inputType='number'
                        inputName='unitPrice'
                        register={register}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <InputContainer
                        label='Disc. line limit %'
                        inputPlaceholder=''
                        inputType='text'
                        inputName='lineDiscountLimit'
                        register={register}
                      />
                    </div>
                  </div>
                  <div style={{ width: "35%" }}>
                    <InputContainer
                      label='Decimal Price'
                      inputPlaceholder=''
                      inputType='number'
                      inputName='decimalPrice'
                      register={register}
                    />
                  </div>
                </div>
              </>
            )}
            {buttonState === "quantities" && (
              <>
                <div className='pt-4 d-flex flex-column flex-md-row'>
                  <div className='d-flex flex-column ps-md-3'>
                    <div className={`pb-2 ${styles.subRefTitle}`}>Transactional Quantity</div>
                    <div>
                      <DataTable
                        columns={transactionTableColumns}
                        data={transactionalQuantity}
                        customStyles={customStyles}
                        conditionalRowStyles={transactionalQuantityConditionalRowStyles}
                      />
                    </div>
                  </div>

                  <div className={`d-flex flex-column ${styles.warehousesDiv}`}>
                    <div className={`pb-2 ${styles.subRefTitle}`}>Warehouses</div>
                    <div>
                      <DataTable
                        columns={warehousesTableColumns}
                        data={warehouses}
                        customStyles={customStyles}
                        conditionalRowStyles={warehousesConditionalRowStyles}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {buttonState === "shipping" && (
              <div
                className='pt-5 d-flex flex-column'
                style={{ gap: "15px" }}>
                <div style={{ width: "345px" }}>
                  <InputContainer
                    label='Package type'
                    isRequired={true}
                    inputPlaceholder=''
                    inputType='checkBoxSelect'
                    inputName='packageType'
                    register={register}
                    control={control}
                    onChange={handleChange}
                    value={packageType}
                    selectOptions={createItemData?.packages}
                  />
                </div>
                {packageFields.map((field, index) => (
                  <InputField
                    key={index}
                    watchedValues={watchedValues}
                    register={register}
                    label={field.label}
                    placeholder={field.placeholder}
                    inputName={field.inputName}
                    inputNameQuantity={field.inputNameQuantity}
                    referenceField={field.referenceField}
                  />
                ))}
                <div
                  className='pt-3'
                  style={{ width: "180px" }}>
                  <InputContainer
                    label='Decimal Quantity'
                    inputPlaceholder=''
                    inputType='number'
                    inputName='decimalQuantity'
                    register={register}
                    width='50'
                    height='35'
                  />
                </div>
              </div>
            )}
          </div>
          <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
            <div
              className={`${styles.discard}`}
              onClick={() => {
                reset(), setState(""), setPackageType(null), setPackageTypeName("");
              }}>
              Discard
            </div>
            <div className=''>
              <Button
                title='Save'
                rounded={false}
                fillBackground={true}
                paddingTop={10}
                paddingBottom={10}
                paddingRight={64}
                paddingLeft={64}
              />
            </div>
          </div>
        </form>
      </div>
    </ModalComponent>
  );
};

export default CreateItems;
