"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import { priceListsGeneral, priceListsItems, priceListsDepartment, percentageOptions } from "@/data/admin";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import RadioButton from "@/components/UI/RadioButton/RadioButton";

const PriceLists = () => {
  
    const priceListsGeneralDuplicate = [...priceListsGeneral];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows] = useState(priceListsGeneralDuplicate);

    const handleExtraInfoChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

    const [checkboxValues, setCheckboxValues] = useState({
        vatInclusivePrices: false,
        prices_are_derived_from_another_price_list: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const [percentageOption, setPercentageOption] = useState(null);
    const [percentageOptionName, setPercentageOptionName] = useState("")

    const handleChange = (selected) => {
        setPercentageOption(selected);
        setPercentageOptionName(selected.name);
        console.log(percentageOptionName);
    };

    const [state, setState] = useState({ atTransactionTimeDisplay: ""});

    const handleTransactionInfoChange = (e) => {
        setState(() => ({atTransactionTimeDisplay: e.target.value}));
    };

    const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
      reset,
    } = useForm();

    const onSubmit = (data, e) => {
      e.preventDefault();

      const priceListInfo = {
          ...data,
          checkBox: checkboxValues,
          atTransactionTimeDisplay: state.atTransactionTimeDisplay,
      };
      console.log(priceListInfo);
    }

    const modalStyle = { 
        overlay: { 
            backgroundColor: "var(--modal-overlay-background-clr)",
            zIndex: 100,
        }, 
        content: { 
            top: '50%', left: '50%', right: 'auto', bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "88%", 
            minHeight: "600px",
            padding: "40px 44px 34px 45px",
            borderRadius: "8px",
            borderTop: "2px solid var(--primary-clr)",
            backgroundColor: "var(--modal-background-clr)",
        } 
    };

    const generalTableColumns = [
        {
            name: "Code",
            maxWidth: "100px",
            selector: (row) => row.code,
            allowOverflow: true,
        },
        {
            name: "Name",
            maxWidth: "auto",
            selector: (row) => row.name,
        },
        {
            name: "",
            maxWidth: "30px",
            cell: (row) => (
                <div style={{ cursor: "pointer" }}>
                    <Trashcan
                        fillColor={"var(--primary-clr)"}
                        onClick={() => generalHandleDeleteRow(row.id)}
                    />
                </div>
            ),
            center: true,
        },
    ];

    const itemsTableColumns = [
        {
            name: "Code",
            maxWidth: "100px",
            selector: (row) => row.code,
            allowOverflow: true,
        },
        {
            name: "Name",
            maxWidth: "500px",
            selector: (row) => row.name,
        },
        {
            name: "Currency",
            maxWidth: "120px",
            selector: (row) => row.currency,
            center: true,
        },
        {
            name: "Saleprice",
            maxWidth: "120px",
            selector: (row) => row.salePrice,
            format: (row) => row.salePrice.toFixed(2),
            center: true,
        },
        {
            name: "Discount",
            maxWidth: "120px",
            selector: (row) => row.discount,
            format: (row) => row.discount.toFixed(2),
            center: true,
        },
        {
            name: "Discount %",
            maxWidth: "120px",
            selector: (row) => row.discountPercent,
            center: true,
        },
        {
            name: "Price Discounted",
            maxWidth: "150px",
            selector: (row) => row.priceDiscounted,
            format: (row) => row.priceDiscounted.toFixed(2),
            center: true,
        },
    ];

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

    const buttonTabs = [
        {
            title: "General",
            fillBackground: buttonState === "general",
            value: "general",
        },
        {
            title: "Properties",
            fillBackground: buttonState === "properties",
            value: "properties",
        },
        {
            title: "Items",
            fillBackground: buttonState === "items",
            value: "items",
        },
        {
            title: "Clients",
            fillBackground: buttonState === "clients",
            value: "clients",
        },
    ];

    return (
        <ModalComponent 
            title="PRICE LIST" 
            titlePaddingBottom="20px"
            isOpen={showModal} 
            onRequestClose={() => setShowModal(false)} 
            style={modalStyle}
        >
            <div className={`mt-3`}>
                {buttonTabs.map(({ title, fillBackground, value }) => {
                    return (
                        <Button
                            key={title}
                            title={title} 
                            fillBackground={fillBackground} 
                            onClick={handleExtraInfoChange} 
                            value={value} 
                            type='button' 
                            width="140px"
                            tab 
                        />
                      )
                })}
            </div>
            <form id="priceLists" 
                onSubmit={handleSubmit(onSubmit)} 
                className={`${styles.form}`}>
                <>
                    <div>
                        { buttonState === "general" && (
                            <>
                                <DataTable 
                                    columns={generalTableColumns}
                                    data={generalTableRows}
                                    customStyles={customStyles}
                                    conditionalRowStyles={conditionalRowStyles}
                                />
                                <div
                                    // onClick={() => { }}
                                    className={`${styles.footerRow} pt-3`}>
                                        <Plus fillColor='var(--primary-clr-light)' />
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                paddingLeft: "8px",
                                            }}
                                        >
                                            New Price List
                                        </div>
                                </div>
                            </>  
                        )}
                        { buttonState === "properties" && (
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
                                    <InputContainer inputPlaceholder='25.00 %' inputType='number' inputName='percentage' register={register} control={control} textAlign="end" width="80" />
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
                                            data={priceListsDepartment}
                                            customStyles={customStyles}
                                            conditionalRowStyles={conditionalRowStyles}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        { buttonState === "items" && (
                            <>
                                <DataTable 
                                    columns={itemsTableColumns}
                                    data={priceListsItems}
                                    customStyles={customStyles}
                                    conditionalRowStyles={conditionalRowStyles}
                                />
                                <div
                                    // onClick={() => {}}
                                    className={`${styles.footerRow} pt-3`}>
                                        <Plus fillColor='var(--primary-clr-light)' />
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                paddingLeft: "8px",
                                            }}
                                        >
                                            New Item
                                        </div>
                                </div>
                            </>  
                        )}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                          <div
                              className={`${styles.discard}`}
                              onClick={() => { reset(), setGeneralTableRows(priceListsGeneral), setState(() => ({atTransactionTimeDisplay: ""})) }}
                            >
                              Discard
                          </div>
                          <div className="">
                              <Button
                                  title="Save"
                                  rounded={false}
                                  fillBackground={true}
                                  paddingTop={10}
                                  paddingBottom={10}
                                  paddingRight={64}
                                  paddingLeft={64}
                                />
                          </div>
                    </div>
                </>  
            </form>
        </ModalComponent>
  );
};

export default PriceLists;