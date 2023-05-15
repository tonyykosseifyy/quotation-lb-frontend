"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { countries } from "@/data/countries";

import { clients } from "@/data/createClient";
import { useForm } from "react-hook-form";

const options = [
    { id: "chocolate", name: "Chocolate" },
    { id: "strawberry", name: "Strawberry" },
    { id: "vanilla", name: "Vanilla" },
];

const CreateClient = () => {
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
            clientType: state.clientType,
            addressType: state.addressType,
        };
        console.log(payload);
    };

    const [state, setState] = useState({
        clientType: "individual",
        extraInfo: "contact",
        addressType: "contact",
    });

    const handleClientTypeChange = (e) => {
        setState((prevState) => ({
            clientType: e.target.value,
            extraInfo: prevState.extraInfo,
            addressType: prevState.addressType,
        }));
    };
    const handleExtraInfoChange = (e) => {
        setState((prevState) => {
            return {
                clientType: prevState.clientType,
                extraInfo: e.target.value,
                addressType: prevState.addressType,
            };
        });
    };

    const handleAddressTypeChange = (e) => {
        setState((prevState) => ({
            clientType: prevState.clientType,
            extraInfo: prevState.extraInfo,
            addressType: e.target.value,
        }));
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
            <form id="createClient" onSubmit={handleSubmit(onSubmit)}>
                <div className={`row ${styles.clientType}`}>
                    <div
                        className="col-lg-1 col-sm-12"
                        style={{ marginRight: 40, paddingLeft: 0 }}
                    >
                        <RadioButton
                            inputName="clientType"
                            isChecked={state.clientType === "individual"}
                            labelText="Individual"
                            inputId="individual"
                            value="individual"
                            onChange={handleClientTypeChange}
                        />
                    </div>
                    <div
                        className="col-lg-1 col-sm-12"
                        style={{ paddingLeft: 0 }}
                    >
                        <RadioButton
                            inputName="clientType"
                            isChecked={state.clientType === "company"}
                            labelText="Company"
                            inputId="company"
                            value="company"
                            onChange={handleClientTypeChange}
                        />
                    </div>
                </div>
                <div className={`${styles.infoDiv}`}>
                    <div className={`${styles.inputRow}`}>
                        {state.clientType === "individual" && (
                            <InputContainer
                                label="Client Name"
                                isRequired={true}
                                inputPlaceholder="Search..."
                                inputType="select"
                                inputName="clientName"
                                selectOptions={clients}
                                register={register}
                                control={control}
                            />
                        )}
                        <InputContainer
                            label="Company Name"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="select"
                            inputName="companyName"
                            selectOptions={options}
                            register={register}
                            control={control}
                        />
                        <InputContainer
                            label="Country"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="select"
                            inputName="country"
                            selectOptions={options}
                            register={register}
                            control={control}
                        />
                        <InputContainer
                            label="City"
                            isRequired={true}
                            inputPlaceholder="Search..."
                            inputType="text"
                            inputName="city"
                            register={register}
                        />
                        <InputContainer
                            label="State"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="text"
                            inputName="state"
                            register={register}
                        />
                        <InputContainer
                            label="Zip"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="text"
                            inputName="zip"
                            register={register}
                        />
                        <InputContainer
                            label="Street"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="text"
                            inputName="street"
                            register={register}
                        />
                    </div>
                    <div className={`${styles.inputRow} ${styles.inputRow2}`}>
                        {state.clientType === "individual" && (
                            <InputContainer
                                label="Job Position"
                                isRequired={true}
                                inputPlaceholder="Sales DIrector, Sales..."
                                inputType="select"
                                inputName="jobPosition"
                                selectOptions={options}
                                inputId="jobPosition"
                                register={register}
                                control={control}
                            />
                        )}
                        <InputContainer
                            label="Phone"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="phone"
                            codeName="phoneCode"
                            inputName="phone"
                            selectOptions={options}
                            register={register}
                            control={control}
                        />
                        <InputContainer
                            label="Mobile"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="phone"
                            codeName="mobileCode"
                            inputName="mobile"
                            selectOptions={options}
                            register={register}
                            control={control}
                        />
                        <InputContainer
                            label="Email"
                            isRequired={true}
                            inputPlaceholder="example@gmail.com"
                            inputType="text"
                            inputName="email"
                            register={register}
                        />
                        {state.clientType === "individual" && (
                            <InputContainer
                                label="Title"
                                isRequired={true}
                                inputPlaceholder="Doctor, Miss, Mister"
                                inputType="select"
                                inputName="title"
                                selectOptions={options}
                                register={register}
                                control={control}
                            />
                        )}
                        <InputContainer
                            label="Tags"
                            isRequired={true}
                            inputPlaceholder="Vip, Consulting"
                            inputType="select"
                            inputName="tags"
                            selectOptions={options}
                            register={register}
                            control={control}
                        />
                        <InputContainer
                            label="Tax ID"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="text"
                            inputName="taxId"
                            register={register}
                        />
                    </div>
                </div>
                <div className={`${styles.extraInfo}`}>
                    <div className={`${styles.extraInfoButtons}`}>
                        <Button
                            title="Contacts & Addresses"
                            rounded={true}
                            fillBackground={state.extraInfo === "contact"}
                            onClick={handleExtraInfoChange}
                            value="contact"
                            type="button"
                        />
                        <Button
                            title="Sales"
                            rounded={true}
                            fillBackground={state.extraInfo === "sales"}
                            onClick={handleExtraInfoChange}
                            type="button"
                            value="sales"
                        />
                        <Button
                            title="Internal Note"
                            rounded={true}
                            fillBackground={state.extraInfo === "internalNote"}
                            onClick={handleExtraInfoChange}
                            value="internalNote"
                            type="button"
                        />
                    </div>
                    <div className={`${styles.extraInfoDetails}`}>
                        {state.extraInfo === "contact" && (
                            <div className={`${styles.contactDiv}`}>
                                <div className={`${styles.contactDivButtons}`}>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            labelText="Contact"
                                            inputId="contact"
                                            value="contact"
                                            isChecked={
                                                state.extraInfo === "contact"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            labelText="Invoice Address"
                                            inputId="invoiceAddress"
                                            value="invoice"
                                            isChecked={
                                                state.extraInfo === "invoice"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            labelText="Delivery Address"
                                            inputId="deliveryAddress"
                                            value="delivery"
                                            isChecked={
                                                state.extraInfo === "delivery"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            labelText="Private Address"
                                            inputId="privateAddress"
                                            value="private"
                                            isChecked={
                                                state.extraInfo === "private"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            labelText="Follow-up Address"
                                            inputId="followUpAddress"
                                            value="followUp"
                                            isChecked={
                                                state.extraInfo === "followUp"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            labelText="Other"
                                            inputId="other"
                                            value="other"
                                            isChecked={
                                                state.extraInfo === "other"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.infoDiv}`}>
                                    <div className={`${styles.inputRow}`}>
                                        <InputContainer
                                            label="Contact Name"
                                            isRequired={true}
                                            inputPlaceholder="Search..."
                                            inputType="select"
                                            inputName="contactName"
                                            selectOptions={clients}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Country"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="select"
                                            inputName="countryContact"
                                            selectOptions={options}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="City"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="text"
                                            inputName="cityContact"
                                            register={register}
                                        />
                                        <InputContainer
                                            label="State"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="text"
                                            inputName="stateContact"
                                            register={register}
                                        />
                                        <InputContainer
                                            label="Zip"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="text"
                                            inputName="zipContact"
                                            register={register}
                                        />
                                    </div>
                                    <div
                                        className={`${styles.inputRow} ${styles.inputRow2}`}
                                    >
                                        <InputContainer
                                            label="Street"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="text"
                                            inputName="streetContact"
                                            register={register}
                                        />
                                        <InputContainer
                                            label="Phone"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="phone"
                                            codeName="phoneContactCode"
                                            inputName="phoneContact"
                                            register={register}
                                            selectOptions={options}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Mobile"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="phone"
                                            codeName="mobileContactCode"
                                            inputName="mobileContact"
                                            selectOptions={options}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Email"
                                            isRequired={true}
                                            inputPlaceholder="example@gmail.com"
                                            inputType="text"
                                            inputName="emailContact"
                                            register={register}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {state.extraInfo === "sales" && (
                            <div className={`${styles.contactDiv}`}>
                                <div className={`${styles.infoDiv}`}>
                                    <div className={`${styles.inputRow}`}>
                                        <InputContainer
                                            label="Salesperson"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="select"
                                            inputName="salesperson"
                                            selectOptions={options}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Payment Terms"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="select"
                                            inputName="paymentTerms"
                                            selectOptions={options}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Pricelist"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="select"
                                            inputName="country"
                                            selectOptions={options}
                                            register={register}
                                            control={control}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {state.extraInfo === "internalNote" && (
                            <div className={`${styles.contactDiv}`}>
                                <div className={`${styles.infoDiv}`}>
                                    <div className={`${styles.inputTextArea}`}>
                                        <InputContainer
                                            label="Internal Note"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="textarea"
                                            inputName="internalNote"
                                            alignLabelInput={false}
                                            height={130}
                                            width={80}
                                            widthUnit="%"
                                            spaceBetween={false}
                                            register={register}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={`${styles.actionButtons}`}>
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
                                paddingRight={64}
                                paddingLeft={64}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateClient;
