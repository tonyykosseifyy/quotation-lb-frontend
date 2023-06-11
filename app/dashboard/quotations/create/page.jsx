"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";

import { clients } from "@/data/createClient";
import { paymentTerms, tableHeadings6 } from "@/data/tableData";
import Table from "@/components/Table/Table";

const options = [
    { id: "chocolate", name: "Chocolate" },
    { id: "strawberry", name: "Strawberry" },
    { id: "vanilla", name: "Vanilla" },
];

const itemOptions = [
    { id: "item_1", name: "item 1" },
    { id: "item_2", name: "item 2" },
    { id: "item_3", name: "item 3" },
];

const tableFooterElements = [
    { id: "title", name: "Title" },
    { id: "item", name: "Item" }, 
    { id: "combo", name: "Combo" },
    { id: "image", name: "Image" },
    { id: "note", name: "Note" }
  ];

const newObject =[
    { type: 1 },
    { type: 2 },
    { type: 3 },
    { type: 4 },
    { type: 5 },
    { type: 6 },

    { type: 1 },
    { type: 2 },
    { type: 3 },
    { type: 4 },
    { type: 5 },
];

const CreateQuotation = () => {
    const [buttonState, setButtonState] = useState("order");

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

    const eachTableHeaderWidth = {
        item: "335px !important",
        description: "1235px !important",
        quantity: "100px !important",
        discount: "180px !important",
        unitPrice: "200px !important",
        total: "415px !important",
        moreOptions: "375px !important",
      };

    return (
        <div className={`container m-0`}>
            <div>
                <div className={styles.title}>Create New Quotation</div>
            </div>
            <div className={`${styles.quotationInfo}`}>
                <div className={`${styles.inputRow}`}>
                    <InputContainer
                        label="Customer Name"
                        isRequired={true}
                        inputPlaceholder="Search..."
                        inputType="select"
                        inputName="customerName"
                        selectOptions={clients}
                        control={control}
                        register={register}
                    />
                    <InputContainer
                        label="Pricelist"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="select"
                        inputName="priceList"
                        selectOptions={options}
                        control={control}
                        register={register}
                    />
                </div>
                <div className={`${styles.inputRow} ${styles.inputRow2}`}>
                    <InputContainer
                        label="Validity"
                        isRequired={true}
                        inputType="text"
                        inputName="validity"
                        inputId="validity"
                        control={control}
                        register={register}
                    />
                    <InputContainer
                        label="Payment Terms"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="select"
                        inputName="paymentTerms"
                        selectOptions={paymentTerms}
                        control={control}
                        register={register}
                    />
                </div>
            </div>
            <div className={`${styles.extraInfo}`}>
                <div className={`${styles.extraInfoButtons}`}>
                    <Button
                        title="Order lines"
                        rounded={true}
                        fillBackground={buttonState === "order"}
                        onClick={handleExtraInfo}
                        value="order"
                        type="button"
                    />
                    <Button
                        title="Other Information"
                        rounded={true}
                        fillBackground={buttonState === "information"}
                        onClick={handleExtraInfo}
                        value="information"
                        type="button"
                    />
                </div>
            </div>
            <div style={{ marginTop: "27px"}}>
            {buttonState === "order" && ( 
                <>
                   <div className={`${styles.tableDiv}`}>
                      <Table
                          headings={tableHeadings6}
                          headingBackgroundColor={`var(--primary-clr)`}
                          headingBorderRadius="5px"
                          headingBorderBottom="5px"
                          headingBorderTop={`5px`}
                          headingsColor={`#FFFFFF`}
                          headingsFontSize={`13px`}
                          headingsFontWeight={`600`}
                          headingsWidth={eachTableHeaderWidth}
                          columnSpan={7}
                          data={newObject}
                          bodyBorderTop={`0px !important`}
                          tableBorderRadius={`8px`}
                          tablePaddingTop={`0px`}
                          tablePaddingLeft={`0px`}
                          tablePaddingRight={`0px`}
                          bodyPadding={"15px 15px 0px 15px"}
                          tableFooter={tableFooterElements}
                          footerMarginTop="7px"
                          footerPaddingLeft="49px"
                        />
                   </div>

                     <div style={{marginTop: "20px",fontSize: "14px", border: "2px", borderRadius: "8px", padding: "31px 14px 28px 45px", backgroundColor: "white"}}>
                          <div style={{fontSize: "14px", fontWeight: "700"}}>
                               Terms & Conditions
                          </div>
                          <div style={{paddingTop: "20px", display: "flex", justifyContent: "flex-start", overflow: "hidden"}}>
                              <InputContainer
                                inputPlaceholder="Terms & Conditions"
                                inputType="textarea"
                                inputName="Terms & Conditions"
                                width="1230"
                                height="73"
                                control={control}
                                register={register}
                               />
                          </div>
                          <div style={{paddingTop: "8px", color: "var(--primary-clr)", fontWeight: "400", textDecoration: "underline"}}>
                              <i>Or Create new Terms & Conditions</i>
                          </div>
                     </div>

                     <div style={{backgroundColor: "rgba(68, 114, 196, 0.05)", display: "flex", justifyContent: "flex-end", gap: "213px", padding: "20px 97px 30px 30px"}}>
                        <div style={{display: "flex", flexDirection: "column", fontSize: "12px", color: "var(--table-data-text-clr)", fontWeight: "600"}}>
                           <div> Total Before VAT </div>
                           <div style={{ paddingTop: "2px"}}> Global Disc </div>
                           <div style={{ paddingTop: "2px"}}> Special Disc </div>
                           <div style={{ paddingTop: "2px"}}> VAT 11% </div>
                           <div style={{fontSize: "16px", color: "var(--primary-clr)", fontWeight: "800", paddingTop: "3px"}}> Total Amount </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems:"flex-end" ,fontSize: "12px", color: "var(--table-data-text-clr)", fontWeight: "600"}}>
                           <div> 0 </div>
                           <div style={{ paddingTop: "2px"}}> 0 </div>
                           <div style={{ paddingTop: "2px"}}> 0 </div>
                           <div style={{ paddingTop: "2px"}}> 0 </div>
                           <div style={{fontSize: "16px", color: "var(--primary-clr)", fontWeight: "800", paddingTop: "3px"}}> 0.00 </div>
                        </div>
                     </div>

                     
                <div style={{display: "flex", justifyContent: "flex-end", paddingTop: "45px",}}>
                    <Button
                        title="Create Invoice"
                        rounded={false}
                        fillBackground={true}
                        onClick={handleExtraInfo}
                        fontSize={14}
                        fontWeight={700}
                        value="invoice"
                        type="button"
                    />
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
                            <InputContainer
                                label="Sales Person"
                                isRequired={true}
                                inputPlaceholder="Search"
                                inputType="select"
                                inputName="salesPerson"
                                selectOptions={options}
                                control={control}
                                register={register}
                            />
                        </div>
                        <div className={`${styles.tableInputRow}`}>
                            <InputContainer
                                label="Sales Team"
                                isRequired={true}
                                inputPlaceholder=""
                                inputType="select"
                                inputName="salesTeam"
                                selectOptions={options}
                                control={control}
                                register={register}
                            />
                        </div>
                        <div className={`${styles.tableInputRow}`}>
                            <InputContainer
                                label="Tags"
                                isRequired={true}
                                inputPlaceholder=""
                                inputType="select"
                                inputName="tags"
                                selectOptions={options}
                                control={control}
                                register={register}
                            />
                        </div>
                    </div>
                    <div className={`${styles.tableColumns}`}>
                        <div className={`${styles.invoiceTableTitleContainer}`}>
                            <div className={`${styles.tableTitles}`}>
                                Invoicing and Payments
                            </div>
                        </div>
                        <div className={`${styles.tableInputRow}`}>
                            <InputContainer
                                label="Fiscal Position"
                                isRequired={true}
                                inputPlaceholder=""
                                inputType="select"
                                inputName="fiscalPosition"
                                selectOptions={options}
                                control={control}
                                register={register}
                            />
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
