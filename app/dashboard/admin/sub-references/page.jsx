"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import { subReferencesGeneral, checkboxInfo, shortDescription } from "@/data/admin";
import GeneralTab from "@/components/AdminTabs/GeneralTab";
import SubReferencesGeneralTab from "@/components/AdminTabs/SubReferencesGeneralTab";


const SubReferencesModal = ({ setIsModalOpen }) => {
  
    const subReferencesGeneralDuplicate = [...subReferencesGeneral];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows]= useState(subReferencesGeneralDuplicate);

    const handleTabChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

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
            onRequestClose={() => {setShowModal(false), setIsModalOpen(false)}} 
            style={modalStyle}
        >
            <form id="subReferences" 
                onSubmit={handleSubmit(onSubmit)} 
                className={`${styles.form}`}
            >
                <>
                    <div className="mt-3">
                        <div>
                            <Button 
                                title="General" 
                                rounded={true} 
                                fillBackground={buttonState === "general"} 
                                onClick={handleTabChange} 
                                value="general" 
                                type="button" 
                                width="180px" 
                                tab 
                            />
                        </div>
                        {buttonState === "general" && (
                            <>
                                <GeneralTab 
                                    data={generalTableRows} 
                                    footerText="New Sub-References" 
                                    generalHandleDeleteRow={generalHandleDeleteRow} 
                                />
                                <SubReferencesGeneralTab 
                                    control={control} 
                                    register={register} 
                                    checkboxInfo={checkboxInfo} 
                                    checkboxValues={checkboxValues}
                                    handleCheckboxChange={handleCheckboxChange}
                                    data={shortDescription}
                                /> 
                            </>         
                        )}
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

export default SubReferencesModal;