"use client";

import React from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";

import { clients } from "@/data/createClient";
import { paymentTerms } from "@/data/tableData";

const options = [
    { id: "chocolate", name: "Chocolate" },
    { id: "strawberry", name: "Strawberry" },
    { id: "vanilla", name: "Vanilla" },
];

const CreateQuotation = () => {
    const handleExtraInfo = (e) => {
        console.log(e);
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
                    />
                    <InputContainer
                        label="Pricelist"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="select"
                        inputName="priceList"
                        selectOptions={options}
                    />
                </div>
                <div className={`${styles.inputRow} ${styles.inputRow2}`}>
                    <InputContainer
                        label="Expiration"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="text"
                        inputName="expiration"
                        inputId="expiration"
                    />
                    <InputContainer
                        label="Payment Terms"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="select"
                        inputName="paymentTerms"
                        selectOptions={paymentTerms}
                    />
                </div>
            </div>
            <div className={`${styles.extraInfo}`}>
                <div className={`${styles.extraInfoButtons}`}>
                    <Button
                        title="Order lines"
                        rounded={true}
                        onClick={handleExtraInfo}
                    />
                    <Button
                        title="Other Information"
                        rounded={true}
                        fillBackground={true}
                        onClick={handleExtraInfo}
                    />
                </div>
            </div>
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
                               />
                            </div>
                        </div>
                        <div  className={`${styles.tableColumns}`}>
                          <div className={`${styles.invoiceTableTitleContainer}`}>
                             <div className={`${styles.tableTitles}`}>Invoicing and Payments</div>
                          </div>
                          <div className={`${styles.tableInputRow}`}>
                              <InputContainer
                               label="Fiscal Position"
                               isRequired={true}
                               inputPlaceholder=""
                               inputType="select"
                               inputName="fiscalPosition"
                               selectOptions={options}
                               />
                          </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuotation;
