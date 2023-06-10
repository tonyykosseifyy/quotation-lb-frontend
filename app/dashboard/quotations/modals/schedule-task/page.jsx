"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";
import ModalComponent from "@/components/Modal/Modal";

const options = [
    { id: "chocolate", name: "Chocolate" },
    { id: "strawberry", name: "Strawberry" },
    { id: "vanilla", name: "Vanilla" },
];

const assignedTo = [
    { id: "1", name: "Jad El Deek" },
    { id: "2", name: "Abed Nahouli" },
    { id: "3", name: "Lara Salloum" },
];

const scheduleTaskModal = () => {
    const [showModal, setShowModal] = useState(true);

    const modalStyle = { 
        overlay: { backgroundColor: 'rgba(65, 65, 65, 0.3)'}, 
        content: { 
            top: '52%', left: '50%', right: 'auto', bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "88%", 
            height: "auto",
            backgroundColor: 'white',
            padding: "40px 44px 34px 45px",
            borderRadius: "8px",
            borderTop: "2px solid var(--primary-clr)",
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

    // const onSubmit = (data) => {
    //     Object.keys(data).forEach(function (key, index) {
    //         if (typeof data[key] === "object") {
    //             data[key] = data[key].id;
    //         }
    //     });

    return (
        <div className={`container m-0`}>
            <div
                className={styles.title}
                onClick={() => setShowModal(true)}
                >
                QuotationsAssigned To
            </div>
            <ModalComponent
                title="Schedule Task"
                titlePaddingBottom="40px" 
                isOpen={showModal} 
                onRequestClose={() => setShowModal(false)} 
                style={modalStyle}
                >
                <form id="scheduleTask">
                    <div className={`${styles.infoDiv}`}>
                        <div className={`${styles.inputRow}`}>
                            <InputContainer
                                label="Task Type"
                                isRequired={true}
                                inputPlaceholder="To Do..."
                                inputType="select"
                                inputName="tasktype"
                                selectOptions={options}
                                register={register}
                                 control={control}
                            />
                            <InputContainer
                               label="Summary"
                               isRequired={true}
                               inputPlaceholder=""
                               inputType="text"
                               inputName="summary"
                               register={register}
                               control={control}
                           />
                     </div>
                     <div className={`${styles.inputRow}`}>
                            <InputContainer
                                label="Due Date"
                                isRequired={true}
                                inputPlaceholder=""
                                inputType="text"
                                inputName="dueDate"
                                inputId="dueDate"
                                register={register}
                                control={control}
                            />
                            <InputContainer
                                label="Assigned To"
                                isRequired={true}
                                inputPlaceholder="Search..."
                                inputType="select"
                                inputName="assignedTo"
                                selectOptions={assignedTo}
                                register={register}
                                control={control}
                            />
                     </div>
                 </div>
                 <div className={`${styles.actionButtons}`}>
                        <div
                            className={styles.discard}
                            onClick={() => reset()}
                            >
                            Discard
                        </div>
                        <Button
                            title="Schedule"
                            rounded={false}
                            fillBackground={true}
                            paddingTop={10}
                            paddingBottom={10}
                            paddingRight={50}
                            paddingLeft={50}
                        />
                 </div>
             </form>
         </ModalComponent>
     </div>    
    );
};

export default scheduleTaskModal;
  