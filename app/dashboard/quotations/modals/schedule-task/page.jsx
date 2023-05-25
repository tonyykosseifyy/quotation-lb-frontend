"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Modal from 'react-modal';
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";

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
            top: '54%', left: '50%', right: 'auto', bottom: 'auto',
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

    //     const payload = {
    //         ...data,
    //         clientType: state.clientType,
    //         addressType: state.addressType,
    //         phoneCode: codes["phoneCode"],
    //         mobileCode: codes["mobileCode"],
    //         phoneContactCode: codes["phoneContactCode"],
    //         mobileContactCode: codes["mobileContactCode"],
    //     };
    //     console.log(payload);
    // };

    return (
        <div className={`container m-0`}>
            <div
                className={styles.title}
                onClick={() => setShowModal(true)}
                >
                QuotationsAssigned To
            </div>
            <Modal 
                isOpen={showModal} 
                onRequestClose={() => setShowModal(false)} 
                style={modalStyle}
                >
                <div className={`${styles.xIcon}`}>
                      <svg  
                           width="21" 
                           height="21"
                           viewBox="0 0 16 16"
                           fill="#535353" 
                           xmlns="http://www.w3.org/2000/svg"
                           class="bi bi-x-circle-fill" 
                           onClick={() => setShowModal(false)}
                           >
                           <path 
                             d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                           />
                      </svg>
                 </div>
                <form id="scheduleTask">
                    <div className={`${styles.modalFormTitle}`}>
                          Schedule Task
                    </div>
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
         </Modal>
     </div>    
    );
};

export default scheduleTaskModal;
  