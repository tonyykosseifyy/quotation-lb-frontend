"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import { countries } from "@/data/countries";

import { clients } from "@/data/createClient";
import { useForm } from "react-hook-form";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";
import { dummyDropdownOptions } from "@/data/dummyItems";

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
            phoneCode: codes["phoneCode"],
            mobileCode: codes["mobileCode"],
            phoneContactCode: codes["phoneContactCode"],
            mobileContactCode: codes["mobileContactCode"],
        };
        console.log(payload);
    };

    const [state, setState] = useState({
        clientType: "individual",
        extraInfo: "contact",
        addressType: "contact",
    });

    const codes = {
        phoneCode: "+961",
        mobileCode: "+961",
        phoneContactCode: "+961",
        mobileContactCode: "+961",
    };

    const changeCodeValue = (codeName, value) => {
        codes[codeName] = value;
    };

    const handleClientTypeChange = (e) => {
        setState((prevState) => ({
            clientType: e.target.value,
            extraInfo: prevState.extraInfo,
            addressType: prevState.addressType,
        }));
    };
    const handleExtraInfoChange = (e) => {
        setState((prevState) => ({
            clientType: prevState.clientType,
            extraInfo: e.target.value,
            addressType: prevState.addressType,
        }));
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
                        <img src="/assets/svg/plus-blue.svg" alt="" />
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
                            selectOptions={dummyDropdownOptions}
                            register={register}
                            control={control}
                        />
                        <InputContainer
                            label="Country"
                            isRequired={true}
                            inputPlaceholder=""
                            inputType="select"
                            inputName="country"
                            selectOptions={dummyDropdownOptions}
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
                                inputPlaceholder="Sales Director, Sales..."
                                inputType="select"
                                inputName="jobPosition"
                                selectOptions={dummyDropdownOptions}
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
                            changeCodeValue={changeCodeValue}
                            inputName="phone"
                            selectOptions={dummyDropdownOptions}
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
                            selectOptions={dummyDropdownOptions}
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
                                selectOptions={dummyDropdownOptions}
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
                            selectOptions={dummyDropdownOptions}
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
                                                state.addressType === "contact"
                                            }
                                            onChange={handleAddressTypeChange}
                                        />
                                    </div>
                                    <div className="">
                                        <RadioButton
                                            inputName="addressType"
                                            isChecked={
                                                state.addressType === "invoice"
                                            }
                                            labelText="Invoice Address"
                                            inputId="invoiceAddress"
                                            value="invoice"
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
                                                state.addressType === "delivery"
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
                                                state.addressType === "private"
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
                                                state.addressType === "followUp"
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
                                                state.addressType === "other"
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
                                            selectOptions={dummyDropdownOptions}
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
                                            label="Phone1"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="phone"
                                            codeName="phoneContactCode"
                                            changeCodeValue={changeCodeValue}
                                            inputName="phoneContact"
                                            register={register}
                                            selectOptions={dummyDropdownOptions}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Mobile"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="phone"
                                            codeName="mobileContactCode"
                                            changeCodeValue={changeCodeValue}
                                            inputName="mobileContact"
                                            selectOptions={dummyDropdownOptions}
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
                                            selectOptions={dummyDropdownOptions}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Payment Terms"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="select"
                                            inputName="paymentTerms"
                                            selectOptions={dummyDropdownOptions}
                                            register={register}
                                            control={control}
                                        />
                                        <InputContainer
                                            label="Pricelist"
                                            isRequired={true}
                                            inputPlaceholder=""
                                            inputType="select"
                                            inputName="country"
                                            selectOptions={dummyDropdownOptions}
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
