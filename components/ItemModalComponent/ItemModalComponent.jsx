import { getButtonTabs } from "@/data/itemModal/itemModalData";
import styles from "./ItemModalComponent.module.css";
import React, { useEffect, useState } from "react";
import ModalComponent from "../Modal/Modal";
import InputContainer from "../UI/InputContainer/InputContainer";
import CheckBox from "../UI/CheckBox/Checkbox";
import { checkboxInfo } from "@/data/admin";
import Trashcan from "../UI/Icons/Trashcan";
import DataTable from "react-data-table-component";
import InputField from "../UI/ModalInput/Input";
import Button from "../UI/Button/Button";
import { customStyles, modalStyle, transactionalQuantityConditionalRowStyles, warehousesConditionalRowStyles } from "@/data/itemModal/itemModalStyles";
import { ucfirst } from "@/helpers/formatString";
import { useFieldArray, useForm } from "react-hook-form";
import { packageTypeFields, transactionalQuantity, warehouses } from "@/data/createProduct";
import debounce from "lodash.debounce";
import RadioButton from "../UI/RadioButton/RadioButton";
import AddButton from "../UI/AddButton/AddButton";
import moment from "moment";
import { Dropdown } from "@nextui-org/react";
import { altCodesDropdownItems } from "@/data/itemAltCodes";
import Input from "../UI/InputContainer/Input";
import Ellipsis from "../UI/Icons/Ellipsis";
import { MAX_ITEM_GROUPS, numbering } from "@/data/constants";
import AlternativeCode from "../UI/Icons/AlternativeCode";
import Barcode from "../UI/Icons/Barcode";
import SupplierCode from "../UI/Icons/SupplierCode";
import { ItemAction } from "@/constants/ItemActions";

const ItemModalComponent = ({ action, modalName, data, onSubmit, closeModal, state, setState, checkboxValues, setCheckboxValues, isResettingForm, setIsResettingForm, packageType, setPackageType }) => {
  const [showModal, setShowModal] = useState(true);
  const [buttonState, setButtonState] = useState("general");

  const [packageTypeName, setPackageTypeName] = useState("");

  const { register, handleSubmit, watch, control, reset, setValue, getValues } = useForm({
    defaultValues:
      action === ItemAction.CREATE
        ? {}
        : {
            itemTypeId: data.itemType,
            mainCode: data.mainCode,
            shortDescription: data.shortDescription,
            taxationGroupId: data.taxationGroup,
            mainDescription: data.mainDescription,
            secondLanguageDescription: data.secondLanguageDescription,
            subRef: data.subrefId,
            itemCodes: [
              ...data?.alternativeCodes?.map((code) => {
                return {
                  ...code,
                  icon: <AlternativeCode fillColor={"var(--primary-clr)"} />,
                };
              }),
              ...data?.barcodes?.map((code) => {
                return {
                  ...code,
                  icon: <Barcode fillColor={"var(--primary-clr)"} />,
                };
              }),
              ...data?.supplierCodes?.map((code) => {
                return {
                  ...code,
                  icon: <SupplierCode fillColor={"var(--primary-clr)"} />,
                };
              }),
            ],
            unitCost: data.unitCost,
            currencyId: data.currency,
            decimalCost: data.decimalCost,
            unitPrice: data.unitPrice,
            lineDiscountLimit: data.lineDiscountLimit,
            decimalPrice: data.decimalPrice,
            packageId: data.package,
          },
  });

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
    prepend: prependAltCode,
    remove: removeAltCode,
    update: updateAltCode,
  } = useFieldArray({
    name: "itemCodes",
    control: control,
  });

  const watchedValues = {
    packageUnitName: watch("packageUnitName"),
    packageSetName: watch("packageSetName"),
    packageSupersetName: watch("packageSupersetName"),
    packagePaletteName: watch("packagePaletteName"),
    packageContainerName: watch("packageContainerName"),
  };

  const packageFields = packageTypeFields[packageTypeName] || [];

  const handleExtraInfo = (value) => {
    setButtonState(value);
  };

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleShippingIdChange = (selected) => {
    setPackageType(selected);
    setPackageTypeName(selected.name);
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

  const handleRequestClose = () => {
    setShowModal(false);
    setIsResettingForm(true);
  };

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

  useEffect(() => {
    if (isResettingForm) {
      removeAltCode();
      removeItemGroup();
      setButtonState("general");
      setPackageType(null);
      setPackageTypeName("");
      reset();
      closeModal(modalName);
      setIsResettingForm(false);
    }
  }, [isResettingForm]);

  useEffect(() => {
    if (data.mainCode) {
      const mainCodeObj = { type: "main", print: data.printMainCode, code: data.mainCode, creationDate: moment(data.createdAt).format("D/M/YYYY") };
      if (itemCodeFields[0]?.type !== "main") {
        prependAltCode(mainCodeObj);
      } else {
        updateAltCode(0, mainCodeObj);
      }
    }
    if (!packageType && data.packageId) {
      setPackageType(data.packageId);
      const packageName = data?.packages?.find((obj) => obj.id === data.packageId)?.name;
      setPackageTypeName(packageName);
      setValue("packageId", data.package);
      setValue("packageUnitName", data.packageUnitName);
      setValue("packageUnitQuantity", data.packageUnitQuantity);
      setValue("packageSetName", data.packageSetName);
      setValue("packageSetQuantity", data.packageSetQuantity);
      setValue("packageSupersetQuantity", data.packageSupersetQuantity);
      setValue("packageSupersetName", data.packageSupersetName);
      setValue("packagePaletteName", data.packagePaletteName);
      setValue("packagePaletteQuantity", data.packagePaletteQuantity);
      setValue("packageContainerName", data.packageContainerName);
      setValue("packageContainerQuantity", data.packageContainerQuantity);
    }
  }, [data, setValue]);

  return (
    <ModalComponent
      title="Product's Name"
      titlePaddingBottom='20px'
      isOpen={showModal}
      onRequestClose={handleRequestClose}
      style={modalStyle}>
      <div className={`d-flex-wrap`}>
        {getButtonTabs(buttonState).map(({ title, fillBackground, value }) => {
          return (
            <Button
              key={title}
              title={title}
              fillBackground={fillBackground}
              onClick={() => handleExtraInfo(value)}
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
                        selectOptions={data?.itemTypes}
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
                        selectOptions={data?.taxationGroups}
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
                      {data?.subrefs?.map((subref) => {
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
                            selectOptions={data?.itemGroups}
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
                        selectOptions={data?.currencies}
                        register={register}
                        control={control}
                        width={100}
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
                        isRequired={true}
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
                    inputType='select'
                    inputName='packageId'
                    register={register}
                    control={control}
                    onChange={handleShippingIdChange}
                    // value={packageType}
                    selectOptions={data?.packages}
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
                handleRequestClose();
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

export default ItemModalComponent;
