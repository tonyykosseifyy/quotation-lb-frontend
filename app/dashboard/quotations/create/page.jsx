"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";
import { clients } from "@/data/createClient";
import { paymentTerms } from "@/data/tableData";
import Sortable from "sortablejs";
import { dummyDropdownOptions, itemsList } from "@/data/dummyItems";
import OrderLinesRows from "@/components/Table/OrderLines";

const CreateQuotation = () => {
  const [buttonState, setButtonState] = useState("order");
  const [itemList, setItemList] = useState(itemsList);

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
  } = useForm();

  useEffect(() => {
    var el = document.getElementById("itemRows");
    if (el)
      Sortable.create(el, {
        ghostClass: `${styles.sortableGhostBlue}`,
      });
  }, []);

  return (
    <div className={`container m-0`}>
      <div>
        <div className={styles.title}>Create New Quotation</div>
      </div>
      <div className={`${styles.quotationInfo}`}>
        <div className={`${styles.inputRow}`}>
          <InputContainer label='Customer Name' isRequired={true} inputPlaceholder='Search...' inputType='select' inputName='customerName' selectOptions={clients} control={control} register={register} />
          <InputContainer label='Pricelist' isRequired={true} inputPlaceholder='' inputType='select' inputName='priceList' selectOptions={dummyDropdownOptions} control={control} register={register} />
        </div>
        <div className={`${styles.inputRow} ${styles.inputRow2}`}>
          <InputContainer label='Validity' isRequired={true} inputType='text' inputName='validity' inputId='validity' control={control} register={register} />
          <InputContainer label='Payment Terms' isRequired={true} inputPlaceholder='' inputType='select' inputName='paymentTerms' selectOptions={paymentTerms} control={control} register={register} />
        </div>
      </div>
      <div className={`${styles.extraInfo}`}>
        <div className={`${styles.extraInfoButtons}`}>
          <Button title='Order lines' rounded={true} fillBackground={buttonState === "order"} onClick={handleExtraInfo} value='order' type='button' />
          <Button title='Other Information' rounded={true} fillBackground={buttonState === "information"} onClick={handleExtraInfo} value='information' type='button' />
        </div>
      </div>
      <div className={"mt-4"}>
        {buttonState === "order" && (
          <>
            <OrderLinesRows control={control} register={register} itemListState={[itemList, setItemList]} isFooterShown />
            <div className={`${styles.termsAndConditionsContainer}`}>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>Terms & Conditions</div>
              <div className={`${styles.termsAndConditionsInputContainer}`}>
                <InputContainer inputPlaceholder='Terms & Conditions' inputType='textarea' inputName='Terms & Conditions' width='1230' height='73' control={control} register={register} />
              </div>
              <div className={`${styles.newTermsAndConditionsLink}`}>
                <i>Or Create new Terms & Conditions</i>
              </div>
            </div>

            <div className={`${styles.totalAmountContainer}`}>
              <div className={`${styles.totalBeforeVatColumn}`}>
                <div> Total Before VAT </div>
                <div style={{ paddingTop: "2px" }}> Global Disc </div>
                <div style={{ paddingTop: "2px" }}> Special Disc </div>
                <div style={{ paddingTop: "2px" }}> VAT 11% </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "var(--primary-clr)",
                    fontWeight: "800",
                    paddingTop: "3px",
                  }}>
                  Total Amount
                </div>
              </div>
              <div style={{ alignItems: "flex-end" }} className={`${styles.totalBeforeVatColumn}`}>
                <div> 0 </div>
                <div style={{ paddingTop: "2px" }}> 0 </div>
                <div style={{ paddingTop: "2px" }}> 0 </div>
                <div style={{ paddingTop: "2px" }}> 0 </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "var(--primary-clr)",
                    fontWeight: "800",
                    paddingTop: "3px",
                  }}>
                  {" "}
                  0.00{" "}
                </div>
              </div>
            </div>

            <div className={`${styles.createInvoiceButtonDiv}`}>
              <Button title='Create Invoice' rounded={false} fillBackground={true} onClick={handleExtraInfo} fontSize={14} fontWeight={700} value='invoice' type='button' />
            </div>
          </>
        )}
        {buttonState === "information" && (
          <div className={`${styles.extraInfoDetails}`}>
            <div className={`${styles.table}`}>
              <div className={`${styles.tableColumns}`}>
                <div className={`${styles.salesTableTitleContainer}`}>
                  <div className={`${styles.tableTitles}`}>Sales</div>
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer label='Sales Person' isRequired={true} inputPlaceholder='Search' inputType='select' inputName='salesPerson' selectOptions={dummyDropdownOptions} control={control} register={register} />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer label='Sales Team' isRequired={true} inputPlaceholder='' inputType='select' inputName='salesTeam' selectOptions={dummyDropdownOptions} control={control} register={register} />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer label='Tags' isRequired={true} inputPlaceholder='' inputType='select' inputName='tags' selectOptions={dummyDropdownOptions} control={control} register={register} />
                </div>
              </div>
              <div className={`${styles.tableColumns}`}>
                <div className={`${styles.invoiceTableTitleContainer}`}>
                  <div className={`${styles.tableTitles}`}>Invoicing and Payments</div>
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer label='Fiscal Position' isRequired={true} inputPlaceholder='' inputType='select' inputName='fiscalPosition' selectOptions={dummyDropdownOptions} control={control} register={register} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuotation;
