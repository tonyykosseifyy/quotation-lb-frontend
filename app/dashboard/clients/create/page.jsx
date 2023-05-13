"use client";

import React from "react";
import styles from "./page.module.css";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";

import { clients } from "@/data/createClient";

const options = [
    { id: "chocolate", name: "Chocolate" },
    { id: "strawberry", name: "Strawberry" },
    { id: "vanilla", name: "Vanilla" },
];

const CreateClient = () => {
    const handleExtraInfo = (e) => {
        console.log(e);
    };

    return (
        <div className={`container m-0`}>
            <div className="row">
                <div className={styles.title}>Create New Client</div>
            </div>
            <div className={`row ${styles.circle}`}>
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
                                fill="#4472C4"
                                stroke="#4472C4"
                                strokeWidth="1.23237"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={`row ${styles.clientType}`}>
                <div className="col-lg-1 col-sm-12" style={{ marginRight: 40 }}>
                    <RadioButton
                        inputName="clientType"
                        labelText="Individual"
                        isChecked={true}
                        inputId="individual"
                        value="individual"
                    />
                </div>
                <div className="col-lg-1 col-sm-12">
                    <RadioButton
                        inputName="clientType"
                        labelText="Company"
                        inputId="company"
                        value="company"
                    />
                </div>
            </div>
            <div className={`${styles.clientInfo}`}>
                <div className={`${styles.inputRow}`}>
                    <InputContainer
                        label="Client Name"
                        isRequired={true}
                        inputPlaceholder="Search..."
                        inputType="select"
                        inputName="clientName"
                        selectOptions={clients}
                    />
                    <InputContainer
                        label="Company Name"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="select"
                        inputName="companyName"
                        selectOptions={options}
                    />
                    <InputContainer
                        label="Country"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="select"
                        inputName="country"
                        selectOptions={options}
                    />
                    <InputContainer
                        label="City"
                        isRequired={true}
                        inputPlaceholder="Search..."
                        inputType="text"
                        inputName="city"
                    />
                    <InputContainer
                        label="State"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="text"
                        inputName="state"
                    />
                    <InputContainer
                        label="Zip"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="text"
                        inputName="zip"
                    />
                    <InputContainer
                        label="Street"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="text"
                        inputName="street"
                    />
                </div>
                <div className={`${styles.inputRow} ${styles.inputRow2}`}>
                    <InputContainer
                        label="Job Position"
                        isRequired={true}
                        inputPlaceholder="Sales DIrector, Sales..."
                        inputType="select"
                        inputName="jobPosition"
                        selectOptions={options}
                        inputId="jobPosition"
                    />
                    <InputContainer
                        label="Phone"
                        isRequired={true}
                        inputPlaceholder="Search..."
                        inputType="select"
                        inputName="phone"
                        selectOptions={options}
                    />
                    <InputContainer
                        label="Mobile"
                        isRequired={true}
                        inputPlaceholder="Search..."
                        inputType="select"
                        inputName="mobile"
                        selectOptions={options}
                    />
                    <InputContainer
                        label="Email"
                        isRequired={true}
                        inputPlaceholder="example@gmail.com"
                        inputType="text"
                        inputName="email"
                    />
                    <InputContainer
                        label="Title"
                        isRequired={true}
                        inputPlaceholder="Doctor, Miss, Mister"
                        inputType="select"
                        inputName="title"
                        selectOptions={options}
                    />
                    <InputContainer
                        label="Tags"
                        isRequired={true}
                        inputPlaceholder="Vip, Consulting"
                        inputType="select"
                        inputName="tags"
                        selectOptions={options}
                    />
                    <InputContainer
                        label="Tax ID"
                        isRequired={true}
                        inputPlaceholder=""
                        inputType="text"
                        inputName="taxId"
                    />
                </div>
            </div>
            <div className={`${styles.extraInfo}`}>
                <div className={`${styles.extraInfoButtons}`}>
                    <Button
                        title="Contacts & Addresses"
                        rounded={true}
                        fillBackground={true}
                        onClick={handleExtraInfo}
                    />
                    <Button
                        title="Sales"
                        rounded={true}
                        onClick={handleExtraInfo}
                    />
                    <Button
                        title="Internal Note"
                        rounded={true}
                        onClick={handleExtraInfo}
                    />
                </div>
                <div className={`${styles.extraInfoDetails}`}>
                    <div className={`row`}>
                        <div className="col-lg-2 col-md-4 col-sm-12">
                            <RadioButton
                                inputName="contact"
                                labelText="Contact"
                                isChecked={true}
                                inputId="contact"
                                value="contact"
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12">
                            <RadioButton
                                inputName="invoiceAddress"
                                labelText="Invoice Address"
                                inputId="invoiceAddress"
                                value="invoiceAddress"
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12">
                            <RadioButton
                                inputName="deliveryAddress"
                                labelText="Delivery Address"
                                inputId="deliveryAddress"
                                value="deliveryAddress"
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12">
                            <RadioButton
                                inputName="privateAddress"
                                labelText="Private Address"
                                inputId="privateAddress"
                                value="privateAddress"
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12">
                            <RadioButton
                                inputName="followUpAddress"
                                labelText="Follow-up Address"
                                inputId="followUpAddress"
                                value="followUpAddress"
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12">
                            <RadioButton
                                inputName="other"
                                labelText="Other"
                                inputId="other"
                                value="other"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateClient;
