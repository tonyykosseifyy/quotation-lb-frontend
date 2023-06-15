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
        overlay: {
            backgroundColor: "var(--modal-overlay-background-clr)",
        },
        content: {
            top: "53%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "88%",
            height: "auto",
            padding: "40px 44px 34px 45px",
            borderRadius: "8px",
            borderTop: "2px solid var(--primary-clr)",
        },
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
            <div className={styles.title} onClick={() => setShowModal(true)}>
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
                    <div
                        className={`d-flex ${styles.circleAndInputsContainer}`}
                    >
                        <div className={styles.bigCircle}>
                            <div className={styles.smallCircle}>
                                <img src="/assets/svg/plus-blue.svg" alt="" />
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
                        <div className={styles.discard} onClick={() => reset()}>
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
