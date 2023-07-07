"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import Button from "@/components/UI/Button/Button";
import { typeOptions, taxationOptions, checkboxInfo, grouping, transactionalQuantity, warehouses } from "@/data/createProduct";
import DataTable from "react-data-table-component";

const CreateItems = () => {
    const [buttonState, setButtonState] = useState("general");

    const handleExtraInfo = (e) => {
      setButtonState(() => e.target.value);
    };

    const [showModal, setShowModal] = useState(true);

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
            padding: "30px 40px 24px 40px",
            borderRadius: "8px",
        } 
    };

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
    
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "var(--primary-clr)",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: 5,
                minHeight: "40px !important",
            },
        },
        rows: {
            style: {
                minHeight: "5px !important",
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

    const transactionalQuantityConditionalRowStyles = [
        {
            when: (row) => row.id % 2 !== 0 & row.transaction !== "Ordered not invoiced", 
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

        const convertToNumber = (fields) => {
            fields.forEach( field => {
                if (data[field]){
                    data[field] = Number(data[field]);
                }    
            });
        };
    
        convertToNumber( ["unitCost", "decimalCost", "unitPrice", "decimalPrice", "decimalQuantity"] );

        const createNewProductInfo = {
            ...data,
            subRef: state.subRef,
            checkBox: checkboxValues,
        };
        console.log(createNewProductInfo);
        
    };

    const [state, setState] = useState({
        subRef: "",
    });

    const handleSubRefTypeChange = (e) => {
        setState(() => ({
            subRef: e.target.value,
        }));
    };

    const [checkboxValues, setCheckboxValues] = useState({
        canBeSold: false,
        canBePurchased: false,
        warranty: false,
        discontinued: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const buttonTabs = [
        {
            title: "General",
            fillBackground: buttonState === "general",
            value: "general",
        },
        {
            title: "Alt Code",
            fillBackground: buttonState === "altCode",
            value: "altCode",
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

    const subRefRadioButtons = [
        {
            labelText: "Serial Number",
            inputId: "serialNumber",
            isChecked: state.subRef === "serialNumber"
        },
        {
            labelText: "Expiry Date",
            inputId: "expiryDate",
            isChecked: state.subRef === "expiryDate"
        },
        {
            labelText: "Color",
            inputId: "color",
            isChecked: state.subRef === "color"
        },
        {
            labelText: "Size",
            inputId: "size",
            isChecked: state.subRef === "size"
        },
    ];

    return (
        <ModalComponent 
            title="Product's Name" 
            titlePaddingBottom="20px"
            isOpen={showModal} 
            onRequestClose={() => setShowModal(false)} 
            style={modalStyle}
        >
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
                            paddingLeft="45px" 
                            paddingRight="45px"
                            tab 
                        />
                    )
                })}
            </div>
            <div>
                <form id="createNewProduct" onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
                    <div>
                        {buttonState === "general" && (
                            <>
                                <div className="d-flex">
                                    <div className={`row ${styles.circle} pe-5 ps-2`}>
                                        <div className={styles.bigCircle}>
                                            <div className={styles.smallCircle}>
                                                <img src="/assets/svg/plus-blue.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`row ${styles.circle}`}>
                                        <div className={styles.bigCircle}>
                                            <div className={styles.smallCircle}>
                                                <img src="/assets/svg/plus-blue.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`pt-4`}>
                                    <div className={`d-flex flex-column flex-md-row`} style={{ gap: "15px"}}>
                                        <div className={`${styles.inputRow}`}>
                                            <InputContainer
                                                label="Type"
                                                isRequired={true}
                                                inputPlaceholder=""
                                                inputType="select"
                                                inputName="type"
                                                selectOptions={typeOptions}
                                                register={register}
                                                control={control}
                                            />
                                            <InputContainer
                                                label="Code"
                                                isRequired={true}
                                                inputPlaceholder=""
                                                inputType="text"
                                                inputName="code"
                                                register={register}
                                            />
                                            <InputContainer
                                                label="Short Description"
                                                inputPlaceholder=""
                                                inputType="text"
                                                inputName="shortDescription"
                                                register={register}
                                            />
                                            <InputContainer
                                                label="Taxation"
                                                inputPlaceholder=""
                                                inputType="select"
                                                inputName="taxation"
                                                selectOptions={taxationOptions}
                                                register={register}
                                                control={control}
                                            />
                                        </div>
                                        <div className={`d-flex flex-column pt-md-5 ps-md-3 ${styles.descriptionAndLanguageInputColumn}`}>
                                            <InputContainer
                                                label="Main Description"
                                                isRequired={true}
                                                inputPlaceholder=""
                                                inputType="text"
                                                inputName="mainDescription"
                                                width={70}
                                                widthUnit="%"
                                                register={register}
                                            />
                                            <InputContainer
                                                label="Second Language"
                                                inputPlaceholder=""
                                                inputType="text"
                                                inputName="secondLanguage"
                                                width={70}
                                                widthUnit="%"
                                                register={register}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column pt-4">
                                        <div className={`${styles.subRefTitle}`}>
                                            SubRef
                                        </div>
                                        <div className={`${styles.subRefRadioButtons} pt-2`}>
                                            {subRefRadioButtons.map(({ labelText, inputId, isChecked }) => {
                                                return (
                                                    <div key={inputId} className="">
                                                        <RadioButton
                                                            inputName="subRef"
                                                            labelText={labelText}
                                                            inputId={inputId}
                                                            value={inputId}
                                                            isChecked={isChecked}
                                                            onChange={handleSubRefTypeChange}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className={`${styles.checkBoxDiv} pt-4`}>
                                        {checkboxInfo.map(({ inputName, labelText }) => {
                                            return (
                                                <div key={inputName} className="">
                                                    <CheckBox
                                                        inputName={inputName}
                                                        labelText={labelText}
                                                        inputId={inputName}
                                                        value={inputName}
                                                        isChecked={checkboxValues.value}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </div>
                                            )
                                        })}
                                        {checkboxValues.discontinued === true && (
                                            <InputContainer
                                                label=""
                                                isRequired={true}
                                                inputPlaceholder="DATE"
                                                inputType="text"
                                                inputName="date"
                                                register={register}
                                            />
                                        )}             
                                    </div>  
                                </div>              
                            </>
                        )}
                        {buttonState === "grouping" && (
                            <>
                                <div className={`d-flex flex-column pt-5`} style={{ gap: "15px"}}>
                                    {grouping.map(({ label, isRequired, inputName, selectOptions }) => {
                                        return (
                                            <div className={`${styles.inputRow3}`} key={label}>
                                                <InputContainer
                                                    label={label} 
                                                    isRequired={isRequired}
                                                    inputPlaceholder=""
                                                    inputType="select"
                                                    inputName={inputName}
                                                    selectOptions={selectOptions}
                                                    register={register}
                                                    control={control}
                                                />
                                            </div>  
                                        )
                                    })}
                                </div> 
                            </>
                        )}
                        {buttonState === "procurement" && (
                            <>
                                <div className={`d-flex flex-column flex-md-row pt-5 pb-md-5`} style={{gap: "20px", width: "100%"}}>
                                    <div className="d-flex flex-column flex-md-row align-items-md-center pe-md-5" style={{ gap: "10px"}}>
                                        <div className={`${styles.labelText} pe-5`}>
                                            Unit Cost
                                        </div>
                                        <div className="d-flex flex-row" style={{ gap: "10px"}}>
                                            <InputContainer
                                                inputPlaceholder="100.50"
                                                inputType="number"
                                                inputName="unitCost"
                                                register={register}
                                                textAlign="end"
                                            />
                                            <InputContainer
                                                inputPlaceholder="USD"
                                                inputType="text"
                                                inputName="unitCostCurrency"
                                                register={register}
                                                width={60}
                                                textAlign="end"
                                            />    
                                        </div>
                                    </div>
                                    <div style={{ width: "15%" }}>
                                        <InputContainer
                                            label="Decimal Cost"
                                            inputPlaceholder="2"
                                            inputType="number"
                                            inputName="decimalCost"
                                            register={register}
                                            width={60}
                                            textAlign="end"
                                        />
                                    </div>
                                </div>
                            </>  
                        )}
                        {buttonState === "pricing" && (
                            <>
                                <div className={`d-flex flex-column flex-md-row pt-5`} style={{gap: "20px"}}>
                                    <div className={`d-flex flex-column`}  style={{gap: "20px", width: "35%"}}>
                                        <div style={{ width: "100%"}}>
                                            <InputContainer
                                                label="Unit Price"
                                                inputPlaceholder=""
                                                inputType="number"
                                                inputName="unitPrice"
                                                register={register}
                                            />
                                        </div>
                                        <div style={{ width: "100%"}}>
                                            <InputContainer
                                                label="Disc. line limit %"
                                                inputPlaceholder=""
                                                inputType="text"
                                                inputName="discountLimit"
                                                register={register}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ width: "35%"}}>
                                        <InputContainer
                                            label="Decimal Price"
                                            inputPlaceholder=""
                                            inputType="number"
                                            inputName="decimalPrice"
                                            register={register}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        {buttonState === "quantities" && (
                            <>
                                <div className="pt-4 d-flex flex-column flex-md-row">
                                    <div className="d-flex flex-column ps-md-3">
                                        <div className={`pb-2 ${styles.subRefTitle}`}> 
                                            Transactional Quantity 
                                        </div>
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
                                        <div className={`pb-2 ${styles.subRefTitle}`}> 
                                            Warehouses 
                                        </div>
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
                            <>
                                <div className="pt-5 d-flex flex-column" style={{ gap: "15px"}}>
                                    <div style={{ width : "345px" }}>
                                    <InputContainer
                                        label="Package type"
                                        isRequired={true}
                                        inputPlaceholder=""
                                        inputType="select"
                                        inputName="packageType"
                                        register={register}
                                        control={control}
                                    />
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-md-center pe-md-5" style={{ gap: "10px"}}>
                                        <div className={`${styles.labelText}`} style={{ width: "126px"}}>
                                            Unit Name *
                                        </div>
                                        <div className="d-flex flex-row align-items-center" style={{ gap: "10px"}}>
                                            <div className="border border-1 rounded p-2 text-center" style={{fontWeight: "700", fontSize: "13px", width: "45px"}}> PCS </div>
                                            <InputContainer
                                                inputPlaceholder=""
                                                isRequired={true}
                                                inputType="text"
                                                inputName="unitName"
                                                register={register}
                                                width="154"
                                            />  
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-md-center pe-md-5" style={{ gap: "10px"}}>
                                        <div className={`${styles.labelText}`} style={{ width: "126px"}}>
                                            Set Name *
                                        </div>
                                        <div className="d-flex flex-row align-items-center" style={{ gap: "10px"}}>
                                            <div className="border border-1 rounded p-2" style={{fontWeight: "700", fontSize: "13px", width: "45px"}}> BOX </div>
                                            <InputContainer
                                                inputPlaceholder=""
                                                isRequired={true}
                                                inputType="text"
                                                inputName="unitName"
                                                register={register}
                                                width="154"
                                            />
                                            <div className="ps-3" style={{fontWeight: "700", fontSize: "13px"}}> PCS PER BOX </div>  
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-md-center pe-md-5" style={{ gap: "10px"}}>
                                        <div className={`${styles.labelText}`} style={{ width: "126px"}}>
                                            Superset Name *
                                        </div>
                                        <div className="d-flex flex-row align-items-center" style={{ gap: "10px"}}>
                                            <div className="border border-1 rounded p-2" style={{fontWeight: "700", fontSize: "13px", width: "45px"}}> CTN </div>
                                            <InputContainer
                                                inputPlaceholder=""
                                                isRequired={true}
                                                inputType="text"
                                                inputName="unitName"
                                                register={register}
                                                width="154"
                                            />
                                            <div className="ps-3" style={{fontWeight: "700", fontSize: "13px"}}> BOX PER CTN </div>  
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-md-center pe-md-5" style={{ gap: "10px"}}>
                                        <div className={`${styles.labelText}`} style={{ width: "126px"}}>
                                            Palette Name *
                                        </div>
                                        <div className="d-flex flex-row align-items-center" style={{ gap: "10px"}}>
                                            <div className="border border-1 rounded p-2" style={{fontWeight: "700", fontSize: "13px", width: "45px"}}> PAL </div>
                                            <InputContainer
                                                inputPlaceholder=""
                                                isRequired={true}
                                                inputType="text"
                                                inputName="unitName"
                                                register={register}
                                                width="154"
                                            />
                                            <div className="ps-3" style={{fontWeight: "700", fontSize: "13px"}}> CTN PER PAL </div>  
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-md-center pe-md-5" style={{ gap: "10px"}}>
                                        <div className={`${styles.labelText}`} style={{ width: "126px"}}>
                                            Container Name *
                                        </div>
                                        <div className="d-flex flex-row align-items-center" style={{ gap: "10px"}}>
                                            <div className="border border-1 rounded p-2" style={{fontWeight: "700", fontSize: "13px", width: "45px"}}> CON </div>
                                            <InputContainer
                                                inputPlaceholder=""
                                                isRequired={true}
                                                inputType="text"
                                                inputName="unitName"
                                                register={register}
                                                width="154"
                                            />
                                            <div className="ps-3" style={{fontWeight: "700", fontSize: "13px"}}> PAL PER CON </div>  
                                        </div>
                                    </div>
                                    <div className="pt-3" style={{ width: "180px"}}>
                                        <InputContainer
                                            label="Decimal Quantity"
                                            inputPlaceholder=""
                                            inputType="number"
                                            inputName="decimalQuantity"
                                            register={register}
                                            width="42"
                                            height="35"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                            <div
                                className={`${styles.discard}`}
                                onClick={() => { reset(), setState("") }}
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
                </form>
            </div>
        </ModalComponent>
    );
};

export default CreateItems;