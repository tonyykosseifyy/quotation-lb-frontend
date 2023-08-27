"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm, useFieldArray } from "react-hook-form";
import Sortable from "sortablejs";
import OrderLinesRows from "@/components/Table/OrderLines";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import Input from "@/components/UI/InputContainer/Input";
import { calculateCommission, calculateTotalAfterDiscounts } from "@/helpers/calculate";
import ProgressStepsBar from "@/components/ProgressStepsBar/ProgressStepsBar";

const permissions = {
  "edit salesperson cashing method in quotation": false,
  "edit salesperson commission method in quotation": true,
  "edit salesperson commission in quotation": true,
};

const VAT = 0.11;

const storeClient = async (payload) => {
  const response = await axiosClient.post(`/quotations`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const CreateQuotation = () => {
  const [buttonState, setButtonState] = useState("order");
  const [indices, setIndices] = useState({ oldIndex: null, newIndex: null });
  const [quotationTotalBeforeVat, setQuotationTotalBeforeVat] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  const createQuotationResponse = useQuery({
    queryKey: ["createQuotation"],
    queryFn: () => axiosClient.get(`/quotations/create`),
  });

  const createQuotationData = createQuotationResponse.data?.data.data;

  const handleQuotationTotalChange = (operation, value) => {
    if (operation === "add") {
      setQuotationTotalBeforeVat((prev) => {
        const updatedTotal = prev + value;
        return updatedTotal;
      });
    }
    if (operation === "subtract") {
      setQuotationTotalBeforeVat((prev) => {
        const updatedTotal = prev - value;
        return updatedTotal;
      });
    }
  };

  const handleTabChange = (e) => {
    setButtonState(() => e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const { fields, append, remove, move } = useFieldArray({
    name: "orderLines",
    control: control,
  });

  const fieldsWatch = watch("orderLines");

  const salespersonWatch = watch("salespersonId");
  const globalDiscountPercentageWatch = watch("globalDiscountPercentage");
  const globalDiscountWatch = watch("globalDiscount");
  const specialDiscountPercentageWatch = watch("specialDiscountPercentage");
  const specialDiscountWatch = watch("specialDiscount");
  const vatWatch = watch("vat");
  const commissionRateWatch = watch("commissionRate");

  const buttons = [
    {
      title: 'Preview',
      value: 'preview',
    },
    {
      title: 'Send By Email',
      value: 'send by email',
      onClick: () => setActiveStep(2),
    },
    {
      title: 'Confirm',
      value: 'confirm',
      onClick: () => setActiveStep(3),
    },
    {
      title: 'Cancel',
      value: 'cancel',
      onClick: () => setActiveStep(1),
    },
  ];

  useEffect(() => {
    var el = document.getElementById("itemRows");
    if (el) {
      Sortable.create(el, {
        ghostClass: `${styles.sortableGhostBlue}`,
        onUpdate: function (evt) {
          setIndices({ oldIndex: evt.oldIndex, newIndex: evt.newIndex });
        },
      });
    }
  }, [fields]);

  const onSubmit = (storeData) => {
    storeData.orderLines.forEach((orderLine) => {
      const type = createQuotationData.lineTypes.find((type) => type.id === orderLine.type);
      if (type.name === "item" || type.name === "combo") orderLine[type.name] = orderLine[type.name].id;
    });
    Object.keys(storeData).forEach(function (key) {
      if (storeData[key] && typeof storeData[key] === "object" && Array.isArray(storeData[key]) === false) {
        storeData[key] = storeData[key].id;
      }
    });
    const vatValue = getValues("vat");
    storeData["total"] = Number(vatValue / VAT + vatValue).toFixed(2);
    console.log(storeData);
    mutation.mutate(storeData);
  };

  const mutation = useMutation(storeClient, {
    onSuccess: (data) => {
      remove();
      reset();
      setQuotationTotalBeforeVat(0);
    },
  });

  if (createQuotationResponse.isLoading) {
    return <>Loading...</>;
  }

  if (mutation.isLoading) {
    return <>Storing Quotation</>;
  }

  return (
    <div className={`container m-0`}>
      <form id='createQuotation' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.title} style={{ color: "var(--primary-clr)" }}>Create New Quotation</div>
        </div>
        <div className="d-flex flex-column flex-lg-row mt-2 justify-content-md-between gap-3">
          <div className="d-flex gap-2">
            { buttons.map (({ title, value, onClick }) => 
              <Button key={title} title={title} value={value} onClick={onClick} 
                backgroundColor='var(--tab-button-background-clr)' border='none' rounded={true} padding='10px'
                type='button' fontSize='13px' fontWeight={600} titleColor='var(--primary-text-clr)' 
              />
            )}
          </div>
          <ProgressStepsBar activeStep={activeStep}/>
        </div>
        <div className={`${styles.quotationInfo} border border-2 rounded p-4`}>
          <div className={`${styles.inputRow}`}>
            <div className="d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "27px" }}>
              <div className={`${styles.quotationNumber}`}> #Q0000001 </div>
              <div className={`d-flex align-items-center ${styles.refPaddingLeft}`}>
                <div className={`${styles.labelText} pe-2`}> Ref: </div>
                <InputContainer inputPlaceholder='MANUAL REFERENCE' inputType='text' inputName='manualReference' inputId='manualReference' control={control} register={register} />
              </div>
            </div>
            <InputContainer label='Customer Name' spaceBetween={false} isRequired={true} inputPlaceholder='Search...' inputType='select' inputName='clientId' selectOptions={createQuotationData.clients} control={control} register={register} width='65' widthUnit="%"/>
            <div className={`d-flex flex-column flex-md-row align-items-md-start ${styles.contactDetailsGap}`}>
              <div className={`${styles.labelText}`}> Contact Details</div>
              <div className="d-flex flex-column" style={{ gap: "5px" }}>
                <div> Street, Building, Floor </div>
                <div> Phone Number </div>
                <div> VAT# </div>
              </div>
            </div>
          </div>
          <div className={`${styles.inputRow2}`}>
            <InputContainer label='Validity' inputType='text' inputName='validity' inputId='validity' control={control} register={register} />
            <InputContainer label='Payment Terms' inputPlaceholder='' inputType='select' inputName='paymentTerms' selectOptions={createQuotationData.paymentTerms} optionName='title' control={control} register={register} />
            <InputContainer label='Pricelist' inputPlaceholder='' inputType='select' inputName='priceList' selectOptions={createQuotationData.pricelists} optionName='title' control={control} register={register} />
            <InputContainer label='Currency' inputPlaceholder='USD' inputType='select' inputName='currency' control={control} register={register} />
          </div>
        </div>
        <div className={`d-flex mt-3`}>
            <Button title='Order lines' fillBackground={buttonState === "order"} onClick={handleTabChange} value='order' type='button' width='180px' tab />
            <Button title='Other Information' fillBackground={buttonState === "information"} onClick={handleTabChange} value='information' width='180px' type='button' tab />
        </div>
        <div>
          <div className={`${buttonState !== "order" && styles.hidden}`}>
            <OrderLinesRows
              control={control}
              register={register}
              fields={fields}
              append={append}
              remove={remove}
              move={move}
              indices={indices}
              items={createQuotationData.items}
              combos={createQuotationData.combos}
              isFooterShown
              footerList={createQuotationData.lineTypes}
              footerPaddingTop={"43px"}
              footerPaddingLeft={"48px"}
              tableWidth={"1296px"}
              fieldsWatch={fieldsWatch}
              setValue={setValue}
              handleQuotationTotalChange={handleQuotationTotalChange}
              getValues={getValues}
            />
            <div className={`${styles.termsAndConditionsContainer} overflow-auto`}>
              <div className={`overflow-auto`}>
                <div style={{ fontSize: "14px", fontWeight: "700" }}>Terms & Conditions</div>
                <div className={`${styles.termsAndConditionsInputContainer}`}>
                  <InputContainer inputPlaceholder='Terms & Conditions' inputType='textarea' inputName='termsAndConditions' width='1230' height='73' control={control} register={register} />
                </div>
                <div className={`${styles.newTermsAndConditionsLink}`}>
                  <i>Or Create new Terms & Conditions</i>
                </div>
              </div>
            </div>

            <div className={`${styles.totalAmountContainer}`}>
              <div className={`${styles.totalBeforeVatColumn}`}>
                <div className={styles.totalInputs}>
                  <div> Total Before VAT</div>
                  <Input inputPlaceholder='' inputType='text' inputName='totalBeforeVat' textAlign='end' width={130} control={control} register={register} setValue={setValue} initialValue={quotationTotalBeforeVat} isDisabled={true} />
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> Global Disc (%)</div>
                  <div className="d-flex flex-row gap-2">
                    <Input inputPlaceholder='0.00%' inputType='text' inputName='globalDiscountPercentage' width={130} control={control} register={register} setValue={setValue} textAlign='end'/>
                    <Input inputPlaceholder='USD 0.00' inputType='text' inputName='globalDiscount' textAlign='end' width={130} control={control} register={register} isDisabled={true} setValue={setValue} 
                      initialValue={calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch]) } 
                    />
                  </div>
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> Special Disc (%)</div>
                  <div className="d-flex flex-row gap-2">
                    <Input inputPlaceholder='0.00%' inputType='text' inputName='specialDiscountPercentage' width={130} control={control} register={register} setValue={setValue} textAlign='end' />
                    <Input inputPlaceholder='USD 0.00' inputType='text' inputName='specialDiscount' textAlign='end' width={130} control={control} register={register} isDisabled={true} setValue={setValue} 
                      initialValue={calculateTotalAfterDiscounts(quotationTotalBeforeVat, [specialDiscountPercentageWatch])}  
                    />
                  </div>
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> VAT 11%</div>
                  <div className="d-flex flex-row gap-2">
                    <Input
                      inputPlaceholder='LBP 123.567'
                      inputType='text'
                      inputName='vatLebanese'
                      textAlign='end'
                      width={130}
                      control={control}
                      register={register}
                      isDisabled={true}
                      setValue={setValue}
                      initialValue={calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]) * VAT * 89000}
                    />
                    <Input
                      inputPlaceholder=''
                      inputType='text'
                      inputName='vat'
                      textAlign='end'
                      width={130}
                      control={control}
                      register={register}
                      isDisabled={true}
                      setValue={setValue}
                      initialValue={calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]) * VAT}
                    />
                  </div>
                </div>
                <div className={styles.totalInputs}>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "var(--primary-clr)",
                      fontWeight: "800",
                      paddingTop: "3px",
                    }}>
                    Total Amount
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "var(--primary-clr)",
                      fontWeight: "800",
                      paddingTop: "3px",
                    }}>
                    {"USD "}
                    {Number(vatWatch / VAT + vatWatch).toFixed(2)}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.createInvoiceButtonDiv}`}>
              <Button title='Create Invoice' rounded={false} fillBackground={true} fontSize={14} fontWeight={700} value='invoice' />
            </div>
          </div>
          <div className={`${styles.extraInfoDetails} ${buttonState !== "information" && styles.hidden}`}>
            <div className={`${styles.table}`}>
              <div className={`${styles.tableColumns}`}>
                <div className={`${styles.salesTableTitleContainer}`}>
                  <div className={`${styles.tableTitles}`}>Sales</div>
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer label='Sales Person' inputPlaceholder='Search' inputType='select' inputName='salespersonId' selectOptions={createQuotationData.salespeople} control={control} register={register} />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Commission Method'
                    inputPlaceholder=''
                    inputType='select'
                    inputName='commissionMethodId'
                    selectOptions={createQuotationData.commissionMethods}
                    optionName={"title"}
                    control={control}
                    register={register}
                    initialValue={salespersonWatch?.commissionMethod}
                    setValue={setValue}
                    isDisabled={!permissions["edit salesperson commission method in quotation"]}
                  />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Cashing Method'
                    inputPlaceholder=''
                    inputType='select'
                    inputName='cashingMethodId'
                    selectOptions={createQuotationData.cashingMethods}
                    optionName={"title"}
                    control={control}
                    register={register}
                    initialValue={salespersonWatch?.cashingMethod}
                    setValue={setValue}
                    isDisabled={!permissions["edit salesperson cashing method in quotation"]}
                  />
                </div>
              </div>
              <div className={`${styles.tableColumns}`}>
                <div className={`${styles.invoiceTableTitleContainer}`}>
                  <div className={`${styles.tableTitles}`}>Invoicing and Payments</div>
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Commission'
                    inputPlaceholder=''
                    inputType='text'
                    inputName='commissionRate'
                    control={control}
                    register={register}
                    initialValue={salespersonWatch?.commission}
                    setValue={setValue}
                    isDisabled={!permissions["edit salesperson commission in quotation"]}
                  />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Total Commission'
                    inputPlaceholder=''
                    inputType='text'
                    inputName='commissionTotal'
                    control={control}
                    register={register}
                    setValue={setValue}
                    initialValue={calculateCommission(quotationTotalBeforeVat, commissionRateWatch)}
                    isDisabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuotation;
