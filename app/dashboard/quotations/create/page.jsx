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

  const handleExtraInfo = (e) => {
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
  const globalDiscountWatch = watch("globalDiscount");
  const specialDiscountWatch = watch("specialDiscount");
  const vatWatch = watch("vat");
  const commissionRateWatch = watch("commissionRate");

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
          <div className={styles.title}>Create New Quotation</div>
        </div>
        <div className={`${styles.quotationInfo}`}>
          <div className={`${styles.inputRow}`}>
            <InputContainer label='Customer Name' isRequired={true} inputPlaceholder='Search...' inputType='select' inputName='clientId' selectOptions={createQuotationData.clients} control={control} register={register} />
            <InputContainer label='Pricelist' inputPlaceholder='' inputType='select' inputName='priceList' selectOptions={createQuotationData.pricelists} optionName='title' control={control} register={register} />
          </div>
          <div className={`${styles.inputRow} ${styles.inputRow2}`}>
            <InputContainer label='Validity' inputType='text' inputName='validity' inputId='validity' control={control} register={register} />
            <InputContainer label='Payment Terms' inputPlaceholder='' inputType='select' inputName='paymentTerms' selectOptions={createQuotationData.paymentTerms} optionName='title' control={control} register={register} />
          </div>
        </div>
        <div className={`${styles.extraInfo}`}>
          <div className={`d-flex`}>
            <Button title='Order lines' fillBackground={buttonState === "order"} onClick={handleExtraInfo} value='order' type='button' tab />
            <Button title='Other Information' fillBackground={buttonState === "information"} onClick={handleExtraInfo} value='information' type='button' tab />
          </div>
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
                  <Input inputPlaceholder='' inputType='text' inputName='totalBeforeVat' control={control} register={register} setValue={setValue} initialValue={quotationTotalBeforeVat} isDisabled={true} />
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> Global Disc (%)</div>
                  <Input inputPlaceholder='' inputType='text' inputName='globalDiscount' control={control} register={register} setValue={setValue} initialValue={0} />
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> Special Disc (%)</div>
                  <Input inputPlaceholder='' inputType='text' inputName='specialDiscount' control={control} register={register} setValue={setValue} initialValue={0} />
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> VAT 11%</div>
                  <Input
                    inputPlaceholder=''
                    inputType='text'
                    inputName='vat'
                    control={control}
                    register={register}
                    isDisabled={true}
                    setValue={setValue}
                    initialValue={calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountWatch, specialDiscountWatch]) * VAT}
                  />
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
                    {" "}
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
