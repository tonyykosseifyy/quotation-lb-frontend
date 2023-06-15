"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";

import { clients } from "@/data/createClient";
import { paymentTerms, tableHeadings6 } from "@/data/tableData";
import Table from "@/components/Table/Table";
import OrderLinesRows from "@/components/Table/OrderLines";
import FourArrows from "@/components/UI/Icons/FourArrows";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Ellipsis from "@/components/UI/Icons/Ellipsis";

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
    {
        arrows: <FourArrows />,
        title: <OrderLinesRows type="title" />,
        moreOptions: <Ellipsis />,
        trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    {   
        arrows: <FourArrows />,
        item: <OrderLinesRows type="item" inputBorderColor/>,
        description: <OrderLinesRows type="description" inputBorderColor/>,
        quantity: <OrderLinesRows type="quantity" inputBorderColor/>,
        discount: <OrderLinesRows type="discount" inputBorderColor/>,
        unitPrice: <OrderLinesRows type="unitPrice" inputBorderColor/>,
        total: <OrderLinesRows type="total" inputBorderColor/>,
        moreOptions: <Ellipsis />,
        trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    }, 
    {   
       arrows: <FourArrows />,
       combo: <OrderLinesRows type="combo"/>,
       description: <OrderLinesRows type="description"/>,
       quantity: <OrderLinesRows type="quantity"/>,
       discount: <OrderLinesRows type="discount"/>,
       unitPrice: <OrderLinesRows type="unitPrice"/>,
       total: <OrderLinesRows type="total"/>,
       moreOptions: <Ellipsis />,
       trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    {
       arrows: <FourArrows />,
       note: <OrderLinesRows type="note"/>,
       moreOptions: <Ellipsis />,
       trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    {
       arrows: <FourArrows />,
       image: <OrderLinesRows type="image"/>,
       moreOptions: <Ellipsis />,
       trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    { 
        type: 6
    },
    {
        arrows: <FourArrows />,
        title: <OrderLinesRows type="title" />,
        moreOptions: <Ellipsis />,
        trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    {   
        arrows: <FourArrows />,
        item: <OrderLinesRows type="item" inputBorderColor/>,
        description: <OrderLinesRows type="description" inputBorderColor/>,
        quantity: <OrderLinesRows type="quantity" inputBorderColor/>,
        discount: <OrderLinesRows type="discount" inputBorderColor/>,
        unitPrice: <OrderLinesRows type="unitPrice" inputBorderColor/>,
        total: <OrderLinesRows type="total" inputBorderColor/>,
        moreOptions: <Ellipsis />,
        trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    }, 
    {   
       arrows: <FourArrows />,
       combo: <OrderLinesRows type="combo"/>,
       description: <OrderLinesRows type="description"/>,
       quantity: <OrderLinesRows type="quantity"/>,
       discount: <OrderLinesRows type="discount"/>,
       unitPrice: <OrderLinesRows type="unitPrice"/>,
       total: <OrderLinesRows type="total"/>,
       moreOptions: <Ellipsis />,
       trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    {
       arrows: <FourArrows />,
       note: <OrderLinesRows type="note"/>,
       moreOptions: <Ellipsis />,
       trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
    {
       arrows: <FourArrows />,
       image: <OrderLinesRows type="image"/>,
       moreOptions: <Ellipsis />,
       trash: <Trashcan fillColor={"var(--primary-clr)"}/>,
    },
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
            <div className={"mt-4"}>
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
                          columnSpan={6}
                          data={newObject}
                          bodyBorderTop={`0px !important`}
                          tableBorderRadius={`8px`}
                          tablePaddingTop={`0px`}
                          tablePaddingLeft={`0px`}
                          tablePaddingRight={`0px`}
                          tableFooter={tableFooterElements}
                          footerMarginTop="51px"
                          footerPaddingLeft="49px"
                        />
                   </div>

                     <div className={`${styles.termsAndConditionsContainer}`}>
                          <div style={{fontSize: "14px", fontWeight: "700"}}>
                               Terms & Conditions
                          </div>
                          <div className={`${styles.termsAndConditionsInputContainer}`}>
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
                          <div className={`${styles.newTermsAndConditionsLink}`}>
                              <i>Or Create new Terms & Conditions</i>
                          </div>
                     </div>

                     <div className={`${styles.totalAmountContainer}`}>
                        <div className={`${styles.totalBeforeVatColumn}`}>
                           <div> Total Before VAT </div>
                           <div style={{ paddingTop: "2px"}}> Global Disc </div>
                           <div style={{ paddingTop: "2px"}}> Special Disc </div>
                           <div style={{ paddingTop: "2px"}}> VAT 11% </div>
                           <div style={{fontSize: "16px", color: "var(--primary-clr)", fontWeight: "800", paddingTop: "3px"}}> Total Amount </div>
                        </div>
                        <div style={{alignItems:"flex-end"}} className={`${styles.totalBeforeVatColumn}`} >
                           <div> 0 </div>
                           <div style={{ paddingTop: "2px"}}> 0 </div>
                           <div style={{ paddingTop: "2px"}}> 0 </div>
                           <div style={{ paddingTop: "2px"}}> 0 </div>
                           <div style={{fontSize: "16px", color: "var(--primary-clr)", fontWeight: "800", paddingTop: "3px"}}> 0.00 </div>
                        </div>
                     </div>

                     
                <div className={`${styles.createInvoiceButtonDiv}`}>
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
