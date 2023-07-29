"use client";

import React from "react";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import Button from "../UI/Button/Button";

const SubReferencesGeneralTab = ({ control, register, checkboxInfo, checkboxValues, handleCheckboxChange, data }) => {

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

  return (
    <>
        <div className={ `mt-3 ${styles.subReferenceTypeContainer} `}>
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
        { checkboxValues.shortDescription === true && (
            <div className="d-flex flex-column flex-md-row mt-4" style={{ gap:"20px" }}>
                <div style={{ maxWidth: "40% !important" }}>
                    <DataTable 
                        columns={shortDescriptionTableColumns}
                        data={data}
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
                        width="150px"
                        type="button"
                        value="modify"
                        titleColor="var(--primary-clr)"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-evenly"
                    />
                    <div className="mt-2">
                        <Button 
                            icon={ <Trashcan fillColor={"var(--primary-clr)"} /> }
                            title="Delete R value"
                            rounded={false} 
                            fillBackground={false} 
                            paddingTop={8} 
                            paddingBottom={8} 
                            paddingRight={3} 
                            paddingLeft={0}
                            width="150px" 
                            type="button"
                            value="delete"
                            titleColor="var(--primary-clr)"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-evenly"
                        />
                    </div>
                </div>
            </div>
        )}
    </>  
  );
};

export default SubReferencesGeneralTab;