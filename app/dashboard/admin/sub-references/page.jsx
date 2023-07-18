"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import { subReferencesGeneral, checkboxInfo, shortDescription } from "@/data/admin";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import CheckBox from "@/components/UI/CheckBox/Checkbox";

const SubReferences = () => {
  
    const subReferencesGeneralDuplicate = [...subReferencesGeneral];
    // const taxationRatesDuplicate = [...taxationRates];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows]= useState(subReferencesGeneralDuplicate);
    // const [ratesTableRows, setRatesTableRows]= useState(taxationRatesDuplicate);

    const handleExtraInfoChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

    // const ratesHandleDeleteRow = (id) => {
    //     const ratesUpdatedRows = ratesTableRows.filter(row => row.id !== id);
    //     setRatesTableRows(ratesUpdatedRows);
    // };

    const [checkboxValues, setCheckboxValues] = useState({
        code: false,
        shortDescription: false,
        longDescription: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const modalStyle = { 
        overlay: { 
            backgroundColor: "var(--modal-overlay-background-clr)",
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

    const subReferencesGeneralTableColumns = [
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

    const shortDescriptionTableColumns = [
        {
            name: "Code",
            maxWidth: "100px",
            selector: (row) => row.code,
            allowOverflow: true,
        },
        {
            name: "Description",
            maxWidth: "200",
            selector: (row) => row.description,
        },
        {
            name: <div>Short Description</div>,
            width: "40.4%",
            maxWidth: "auto",
            selector: (row) => row.shortDescription,
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

        const subReferencesInfo = {
            ...data,
            checkBox: checkboxValues,
        };
        console.log(subReferencesInfo);
    }

    return (
        <ModalComponent 
            title="Sub-References" 
            titlePaddingBottom="20px"
            isOpen={showModal} 
            onRequestClose={() => setShowModal(false)} 
            style={modalStyle}
        >
            <form id="subReferences" 
                onSubmit={handleSubmit(onSubmit)} 
                className={`${styles.form}`}>
                <>
                    <div className="mt-3">
                        <div className={`d-flex-wrap`}>
                            <Button
                                title="General"
                                rounded={true}
                                fillBackground={buttonState === "general"}
                                onClick={handleExtraInfoChange}
                                value="general"
                                type="button"
                                width="180px"
                                tab
                            />
                        </div>
                        {buttonState === "general" && (
                            <>
                                <DataTable 
                                    columns={subReferencesGeneralTableColumns}
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
                                            New Sub-References
                                        </div>
                                </div>
                            </>  
                        )}
                        <div className="mt-3" style={{ width: "30%"}}>
                          <InputContainer
                              label='Sub-Reference Type'
                              inputPlaceholder=''
                              inputType='text'
                              inputName='subReferenceType'
                              register={register}
                              control={control}
                          />
                        </div>
                        <div className="mt-3 d-flex flex-column flex-md-row" style={{ gap:"10px" }}>
                            <div className={`${styles.labelText}`}>
                                When Printing Subrefs, Print
                            </div>
                            <div className={`${styles.checkBoxDiv} ps-md-3`}>
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
                                        
                            </div>  
                        </div>
                        <div className="d-flex flex-column flex-md-row mt-4" style={{ gap:"20px" }}>
                              <div style={{ maxWidth: "40% !important" }}>
                                <DataTable 
                                    columns={shortDescriptionTableColumns}
                                    data={shortDescription}
                                    customStyles={customStyles}
                                    conditionalRowStyles={conditionalRowStyles}
                                />
                              </div>
                              <div className="d-flex flex-column ps-md-4">
                                  <Button
                                      icon={ <img src="/assets/svg/pen.svg" width="35" height="35" /> } 
                                      title="Modify R value"
                                      rounded={false} 
                                      fillBackground={false} 
                                      paddingTop={0} 
                                      paddingBottom={0} 
                                      paddingRight={8} 
                                      paddingLeft={0} 
                                      width={"150px"}
                                      type="button"
                                      value="modify"
                                      titleColor={"var(--primary-clr)"}
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-evenly"
                                  />
                                  <div className="mt-2">
                                      <Button 
                                          icon={ <Trashcan fillColor={"var(--primary-clr)"} /> }
                                          title={"Delete R value"}
                                          rounded={false} 
                                          fillBackground={false} 
                                          paddingTop={8} 
                                          paddingBottom={8} 
                                          paddingRight={3} 
                                          paddingLeft={0}
                                          width={"150px"} 
                                          type="button"
                                          value="delete"
                                          titleColor={"var(--primary-clr)"}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-evenly"
                                        />
                                  </div>
                                  
                              </div>
                        </div>
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                          <div
                              className={`${styles.discard}`}
                              onClick={() => { reset(), setGeneralTableRows(subReferencesGeneral) }}
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

export default SubReferences;