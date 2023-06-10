"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";
import ModalComponent from "@/components/Modal/Modal";

const options = [
    { id: "chocolate", name: "Chocolate" },
    { id: "strawberry", name: "Strawberry" },
    { id: "vanilla", name: "Vanilla" },
];

const assignedToModal = () => {
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

    const onSubmit = (data) => {
        Object.keys(data).forEach(function (key, index) {
            if (typeof data[key] === "object") {
                data[key] = data[key].id;
            }
        });

        const payload = {
            ...data,
            phoneCode: codes["phoneCode"],
            mobileCode: codes["mobileCode"],
            phoneContactCode: codes["phoneContactCode"],
            mobileContactCode: codes["mobileContactCode"],
        };
        console.log(payload);
    };

    const codes = {
        phoneCode: "+961",
        mobileCode: "+961",
        phoneContactCode: "+961",
        mobileContactCode: "+961",
    };

    const changeCodeValue = (codeName, value) => {
        codes[codeName] = value;
    };

    return (
        <div className={`container m-0`}>
            <div
                className={styles.title}
                 onClick={() => setShowModal(true)}
                >
                Assigned To 
            </div>
            <ModalComponent
                title="Create Assigned To"
                titlePaddingBottom="40px" 
                isOpen={showModal} 
                onRequestClose={() => setShowModal(false)} 
                style={modalStyle}
            >
                <form id="assignedTo" onSubmit={handleSubmit(onSubmit)}>
                      <div className={`d-flex ${styles.circleAndInputsContainer}`}>
                           <div className={styles.bigCircle}>
                                <div className={styles.smallCircle}>
                                   <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      >
                                      <path
                                       d="M17.3938 11.2322H11.232V17.394C11.232 17.7209 11.1021 18.0343 10.871 18.2655C10.6399 18.4966 10.3264 18.6264 9.9996 18.6264C9.67276 18.6264 9.3593 18.4966 9.12819 18.2655C8.89708 18.0343 8.76724 17.7209 8.76724 17.394V11.2322H2.60541C2.27857 11.2322 1.96511 11.1024 1.734 10.8713C1.50289 10.6401 1.37305 10.3267 1.37305 9.99985C1.37305 9.673 1.50289 9.35955 1.734 9.12843C1.96511 8.89732 2.27857 8.76748 2.60541 8.76748H8.76724V2.60566C8.76724 2.27881 8.89708 1.96536 9.12819 1.73424C9.3593 1.50313 9.67276 1.37329 9.9996 1.37329C10.3264 1.37329 10.6399 1.50313 10.871 1.73424C11.1021 1.96536 11.232 2.27881 11.232 2.60566V8.76748H17.3938C17.7206 8.76748 18.0341 8.89732 18.2652 9.12843C18.4963 9.35955 18.6262 9.673 18.6262 9.99985C18.6262 10.3267 18.4963 10.6401 18.2652 10.8713C18.0341 11.1024 17.7206 11.2322 17.3938 11.2322Z"
                                       fill="#0071BC"
                                       stroke="#0071BC"
                                       strokeWidth="1.23237"
                                       />
                                 </svg>
                             </div> 
                         </div>
                         <div className={`${styles.inputsContainer}`}>
                               <div className={`${styles.inputRow2}`}>
                                   <InputContainer
                                       label="Name"
                                       isRequired={true}
                                       inputPlaceholder="Search..."
                                       inputType="select"
                                       inputName="name"
                                       selectOptions={options}
                                       register={register}
                                       control={control}
                                    />
                                   <InputContainer
                                       label="Email"
                                       isRequired={true}
                                       inputPlaceholder=""
                                       inputType="text"
                                       inputName="email"
                                       register={register}
                                       control={control}
                                   />
                                    <InputContainer
                                       label="Phone"
                                       isRequired={true}
                                       inputPlaceholder=""
                                       inputType="phone"
                                       codeName="phoneCode"
                                       changeCodeValue={changeCodeValue}
                                       inputName="phone"
                                       selectOptions={PhoneCodeSelect}
                                       register={register}
                                       control={control}
                                    />
                                    <InputContainer
                                       label="Mobile"
                                       isRequired={true}
                                       inputPlaceholder=""
                                       inputType="phone"
                                       codeName="mobileCode"
                                       changeCodeValue={changeCodeValue}
                                       inputName="mobile"
                                       selectOptions={options}
                                       register={register}
                                       control={control}
                                    />
                             </div>
                         </div>
                      </div>
                     <div className={`${styles.actionButtons2}`}>
                            <div
                                className={styles.discard}
                                onClick={() => reset()}
                                >
                                Discard
                            </div>
                            <Button
                                title="Save"
                                rounded={false}
                                fillBackground={true}
                                paddingTop={10}
                                paddingBottom={10}
                                paddingRight={65}
                                paddingLeft={65}
                            />
                     </div>
             </form>
         </ModalComponent>
     </div>
    );
};

export default assignedToModal;
  