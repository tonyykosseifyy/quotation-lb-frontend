"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import { warehousesGeneral } from "@/data/admin";
import WarehousesGeneralTab from "@/components/AdminTabs/WarehousesGeneralTab";

const StockWarehousesModal = ({ setIsModalOpen }) => {

    const warehousesGeneralDuplicate = [...warehousesGeneral];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows] = useState(warehousesGeneralDuplicate);

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
        const stockWarehousesInfo = {...data};
        console.log(stockWarehousesInfo);
    }

    return (
        <ModalComponent
            title="Stock Warehouses"
            titlePaddingBottom="20px"
            isOpen={showModal}
            onRequestClose={() => {setShowModal(false), setIsModalOpen(false)}}
            style={modalStyle}
        >
            <form id="stockWarehouses"
                onSubmit={handleSubmit(onSubmit)}
                className={`${styles.form}`}
            >
                <>
                    <div className="mt-3">
                        <Button title="General" rounded={true} fillBackground={buttonState === "general"} onClick={handleExtraInfoChange} value="general" type="button" width="180px" tab />
                        {buttonState === "general" && (
                            <>
                                <WarehousesGeneralTab 
                                    data={generalTableRows} 
                                    footerText="New Stock Warehouses" 
                                    generalHandleDeleteRow={generalHandleDeleteRow}
                                    control={control}
                                    register={register}
                                />
                            </>
                        )}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                        <div
                            className={`${styles.discard}`}
                            onClick={() => { reset(), setGeneralTableRows(warehousesGeneral) }}
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

export default StockWarehousesModal;