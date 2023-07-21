"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import { groupsGeneral } from "@/data/admin";

const Groups = () => {
  
    const groupsGeneralDuplicate = [...groupsGeneral];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows]= useState(groupsGeneralDuplicate);

    const handleExtraInfoChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

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

    const groupsGeneralTableColumns = [
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

    return (
        <ModalComponent 
            title="Groups" 
            titlePaddingBottom="20px"
            isOpen={showModal} 
            onRequestClose={() => setShowModal(false)} 
            style={modalStyle}
        >
            <form id="groups" 
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
                                width="180px"
                                tab
                            />
                            <Button
                                title="Items"
                                rounded={true}
                                fillBackground={buttonState === "items"}
                                onClick={handleExtraInfoChange}
                                type="button"
                                value="rates"
                                width="180px"
                                tab
                            />
                        </div>
                        {buttonState === "general" && (
                            <>
                                <DataTable 
                                    columns={groupsGeneralTableColumns}
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
                                            New Type
                                        </div>
                                </div>
                            </>  
                        )}
                        {/* { buttonState === "items" && (
                            <>
                                
                            </>  
                        )} */}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                          <div
                              className={`${styles.discard}`}
                              onClick={() => { reset(), setGeneralTableRows(groupsGeneral) }}
                            >
                              Discard
                          </div>
                          <div className="">
                              <Button title="Save" rounded={false} fillBackground={true} paddingTop={10} paddingBottom={10} paddingRight={64} paddingLeft={64} />
                          </div>
                    </div>
                </>  
            </form>
        </ModalComponent>
  );
};

export default Groups;