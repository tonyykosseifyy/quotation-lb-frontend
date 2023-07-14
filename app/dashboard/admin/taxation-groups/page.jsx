"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import { taxationRates, taxationGeneral } from "@/data/admin";

const TaxationGroups = () => {
  
    const taxationGeneralDuplicate = [...taxationGeneral];
    const taxationRatesDuplicate = [...taxationRates];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows]= useState(taxationGeneralDuplicate);
    const [ratesTableRows, setRatesTableRows]= useState(taxationRatesDuplicate);

    const handleExtraInfoChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

    const ratesHandleDeleteRow = (id) => {
        const ratesUpdatedRows = ratesTableRows.filter(row => row.id !== id);
        setRatesTableRows(ratesUpdatedRows);
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

    const taxationGeneralTableColumns = [
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

    const taxationRatesTableColumns = [
        {
            name: "Start Date",
            maxWidth: "100px",
            selector: (row) => row.startDate,
            allowOverflow: true,
        },
        {
            name: "VAT %",
            maxWidth: "auto",
            selector: (row) => row.vat,
            format: (row) => row.vat.toFixed(4),
        },
        {
            name: "",
            maxWidth: "30px",
            cell: (row) => (
                <div style={{ cursor: "pointer" }}>
                    <Trashcan
                        fillColor={"var(--primary-clr)"}
                        onClick={() => ratesHandleDeleteRow(row.id)}
                    />
                </div>
            ),
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
            when: (row) => row.code, 
            style: {
                backgroundColor: "var(--table-row-background-clr)",
            },
        },
    ];

    const ratesConditionalRowStyles = [
        {
            when: (row) => row.id === 1, 
            style: {
                backgroundColor: "var(--table-row-background-clr)",
            },
        },
        {
            when: (row) => row.id === 2, 
            style: {
                backgroundColor: "white",
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

    return (
        <ModalComponent 
            title="Taxation Groups" 
            titlePaddingBottom="20px"
            isOpen={showModal} 
            // onRequestClose={() => setShowModal(false)} 
            style={modalStyle}
        >
            <form id="taxationGroups" 
                // onSubmit={handleSubmit(onSubmit)} 
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
                                // paddingLeft="45px"
                                // paddingRight="45px"
                                width="180px"
                                tab
                            />
                            <Button
                                title="Rates"
                                rounded={true}
                                fillBackground={buttonState === "rates"}
                                onClick={handleExtraInfoChange}
                                type="button"
                                value="rates"
                                // paddingLeft="50px"
                                // paddingRight="50px"
                                width="180px"
                                tab
                            />
                        </div>
                        {buttonState === "general" && (
                            <>
                                <DataTable 
                                    columns={taxationGeneralTableColumns}
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
                                            New
                                        </div>
                                </div>
                            </>  
                        )}
                        { buttonState === "rates" && (
                            <>
                                <DataTable 
                                    columns={taxationRatesTableColumns}
                                    data={ratesTableRows}
                                    customStyles={customStyles}
                                    conditionalRowStyles={ratesConditionalRowStyles}
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
                                            New Rate
                                        </div>
                                </div>
                            </>  
                        )}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                          <div
                              className={`${styles.discard}`}
                              onClick={() => {reset(), setGeneralTableRows(taxationGeneral), setRatesTableRows(taxationRates)}}
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

export default TaxationGroups;