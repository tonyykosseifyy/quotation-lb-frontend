"use client";

import React from "react";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";
import CheckBox from "../UI/CheckBox/Checkbox";
import RadioButton from "../UI/RadioButton/RadioButton";
import InputContainer from "../UI/InputContainer/InputContainer";

const PriceListPropertiesTab = ({ 
    control, 
    register, 
    data, 
    checkboxValues,
    handleCheckboxChange, 
    percentageOptions, 
    percentageOption, 
    percentageOptionName, 
    handleChange, 
    state, 
    handleTransactionInfoChange 
}) => {

  const departmentTableColumns = [
    {
        name: "Department Code",
        // maxWidth: "150px",
        selector: (row) => row.departmentCode,
        allowOverflow: true,
    },
    {
        name: "Department Name",
        // maxWidth: "160px",
        selector: (row) => row.departmentName,
    },
    {
        name: "Method",
        // maxWidth: "180px",
        selector: (row) => row.method,
    },
    {
        name: "Percentage",
        // maxWidth: "120px",
        selector: (row) => row.percentage,
        // format: (row) => row.salePrice.toFixed(2),
        center: true,
    },
  ];

  const customStyles = {
    headRow: {
        style: {
            backgroundColor: "var(--primary-clr)",
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: 5,
            borderTopLeftRadius: 0,
            minHeight: "40px !important",
            paddingLeft: "20px",
        },
    },
    rows: {
        style: {
            minHeight: "5px !important",
            borderBottom: "none !important",
            paddingLeft: "20px",
        },
    },
    cells: {
        style: {
            fontSize: 12,
            fontWeight: 700,
            color: "var(--secondary-text-clr)",
            paddingTop: "0px !important",
            height: "45px !important",
        },
    },
  };

  const conditionalRowStyles = [
    {
        when: (row) => row.id === 1, 
        style: {
            backgroundColor: "var(--table-row-background-clr)",
        },
    },
  ];

  return (
    <>
        <div className="mt-5">
            <CheckBox 
                inputName="vatInclusivePrices"
                labelText="VAT Inclusive Prices"
                inputId="vatInclusivePrices"
                value="vatInclusivePrices"
                isChecked={checkboxValues.value}
                onChange={handleCheckboxChange}
            />
        </div>
        <div className="mt-4 d-flex flex-column flex-md-row" style={{ gap: "10px" }}>
            <CheckBox 
                inputName="prices_are_derived_from_another_price_list"
                labelText="Prices are derived from another price list"
                inputId="prices_are_derived_from_another_price_list"
                value="prices_are_derived_from_another_price_list"
                isChecked={checkboxValues.value}
                onChange={handleCheckboxChange}
            />
            { checkboxValues.prices_are_derived_from_another_price_list === true  && (
                <InputContainer
                    inputPlaceholder="STANDARD"
                    inputType="text"
                    inputName="anotherPriceList"
                    register={register}
                    control={control}
                />
            )}
        </div>
        <div className="d-flex flex-row align-items-center mt-4" style={{ gap: "10px" }}>
            <div className="border border-1 rounded p-2 text-center" style={{ fontWeight: "600", fontSize: "13px", width: "68px", color: "var(--table-data-text-clr)" }}>
                MINUS
            </div>
            <InputContainer
                inputPlaceholder=""
                inputType="select"
                inputName="percentageSelect"
                selectOptions={percentageOptions}
                register={register}
                control={control}
                width="300"
                value={percentageOption}
                onChange={handleChange}
            />
            <InputContainer 
                inputPlaceholder='25.00 %' 
                inputType='number' 
                inputName='percentage' 
                register={register} 
                control={control} 
                textAlign="end" 
                width="80" 
            />
        </div>
        <div className="mt-4">
            <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--table-data-text-clr)" }}>
                At Transaction Time, display
            </div>
            <div className="d-flex flex-column flex-md-row mt-3" style={{ gap: "10px" }}>
                <div className=''>
                    <RadioButton inputName='transactionInfoDisplay' labelText='Net Prices' inputId='netPrices' value='netPrices' isChecked={state.atTransactionTimeDisplay === "netPrices"} onChange={handleTransactionInfoChange} labelColor="var(--table-data-text-clr)" labelWeight="400"/>
                </div>
                <div className='ms-md-3'>
                    <RadioButton inputName='transactionInfoDisplay' isChecked={state.atTransactionTimeDisplay === "pricesWithVisibleDiscount"} labelText='Prices with visible discount' inputId='pricesWithVisibleDiscount' value='pricesWithVisibleDiscount' onChange={handleTransactionInfoChange} labelColor="var(--table-data-text-clr)" labelWeight="400"/>
                </div>
            </div>
        </div>
        { percentageOptionName === "percentage as per item department" && (
            <div className={`mt-5 col-12 col-md-10 col-lg-7`} >
                <DataTable
                    columns={departmentTableColumns}
                    data={data}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}
                />
            </div>
        )}
    </>  
  );
};

export default PriceListPropertiesTab;