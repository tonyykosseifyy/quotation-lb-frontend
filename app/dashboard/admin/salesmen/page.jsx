"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import { salesmenGeneral, commissionGrantedOptions, commissionsPaymentOptions } from "@/data/admin";
import SalesmenGeneralTab from "@/components/AdminTabs/SalesmenGeneralTab";
import SalesmenPropertiesTab from "@/components/AdminTabs/SalesmenPropertiesTab";

const SalesmenModal = ({ setIsModalOpen }) => {

    const salesmenGeneralDuplicate = [...salesmenGeneral];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows] = useState(salesmenGeneralDuplicate);

    const handleExtraInfoChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

    const [commissionGrantedOption, setCommissionGrantedOption] = useState(null);
    const [commissionGrantedOptionName, setCommissionGrantedOptionName] = useState("");
    const [commissionsPaymentOption, setCommissionsPayementOption] = useState(null);
    const [commissionsPaymentOptionName, setCommissionsPayementOptionName] = useState("");

    const handleCommissionSelectChange = (selected) => {
        setCommissionGrantedOption(selected);
        setCommissionGrantedOptionName(selected.name);
    };

    const handleCommissionsPaymentChange = (selected) => {
        setCommissionsPayementOption(selected);
        setCommissionsPayementOptionName(selected.name);
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
        const salesmenInfo = {
          ...data,
          commissionGrantedSelect: commissionGrantedOptionName,
          commissionsPayment: commissionsPaymentOptionName,
        };
        console.log(salesmenInfo);
    }

    return (
        <ModalComponent
            title="Salesmen Records"
            titlePaddingBottom="20px"
            isOpen={showModal}
            onRequestClose={() => {setShowModal(false), setIsModalOpen(false)}}
            style={modalStyle}
        >
            <form id="salesmen"
                onSubmit={handleSubmit(onSubmit)}
                className={`${styles.form}`}
            >
                <>
                    <div className="mt-3">
                        <Button title="General" rounded={true} fillBackground={buttonState === "general"} onClick={handleExtraInfoChange} value="general" type="button" width="180px" tab />
                        <Button title="Properties" rounded={true} fillBackground={buttonState === "properties"} onClick={handleExtraInfoChange} value="properties" type="button" width="180px" tab />
                        {buttonState === "general" && (
                            <>
                                <SalesmenGeneralTab 
                                    data={generalTableRows} 
                                    footerText="New Salesmen" 
                                    generalHandleDeleteRow={generalHandleDeleteRow}
                                />
                            </>
                        )}
                        { buttonState === "properties" && (
                            <>
                                <SalesmenPropertiesTab 
                                    control={control} 
                                    register={register} 
                                    commissionGrantedOptions={commissionGrantedOptions}
                                    commissionGrantedOption={commissionGrantedOption}
                                    handleCommissionSelectChange={handleCommissionSelectChange}  
                                    commissionsPaymentOptions={commissionsPaymentOptions}
                                    commissionsPaymentOption={commissionsPaymentOption}
                                    handleCommissionsPaymentChange={handleCommissionsPaymentChange} 
                                />
                            </>
                        )}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                        <div
                            className={`${styles.discard}`}
                            onClick={() => { reset(), setGeneralTableRows(salesmenGeneral), setCommissionGrantedOption(null), setCommissionGrantedOptionName(""), setCommissionsPayementOption(null), setCommissionsPayementOptionName("") }}
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

export default SalesmenModal;