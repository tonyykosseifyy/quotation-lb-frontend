"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";

import { clients, titles } from "@/data/createClient";
import { useForm } from "react-hook-form";
import { dummyDropdownOptions, dummyItems } from "@/data/dummyItems";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

const storeClient = async (payload) => {
  const response = await axiosClient.post(`/clients`, payload);
  return response.data;
};

const CreateClient = () => {
  const createClientResponse = useQuery({
    queryKey: ["creatClient"],
    queryFn: () => axiosClient.get(`/clients/create`),
  });

  const createClientData = createClientResponse.data?.data.data;

  console.log(createClientData);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (storeData) => {
    Object.keys(storeData).forEach(function (key, index) {
      if (storeData[key] && typeof storeData[key] === "object") {
        storeData[key] = storeData[key].id;
      }
    });
    const payload = {
      ...storeData,
      clientType: state.clientType,
      addressType: state.addressType,
      phoneCode: codes["phoneCode"],
      mobileCode: codes["mobileCode"],
      phoneContactCode: codes["phoneContactCode"],
      mobileContactCode: codes["mobileContactCode"],
    };

    mutation.mutate(payload);
  };

  const mutation = useMutation(storeClient, {
    onSuccess: (data) => {
      reset();
    },
  });

  const [state, setState] = useState({
    clientType: "individual",
    extraInfo: "contact",
    addressType: "contact",
    data: [],
    isLoading: false,
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

  if (createClientResponse.isLoading) {
    return <>Loading...</>;
  }

  if (mutation.isLoading) {
    return <>Storing Client</>;
  }

  return (
    <div>
      <div className={`container m-0`}>
        <div className='row'>
          <div className={styles.title}>Create New Client</div>
        </div>
        <div className={`row ${styles.circle}`}>
          <div className={styles.bigCircle}>
            <div className={styles.smallCircle}>
              <img src='/assets/svg/plus-blue.svg' alt='' />
            </div>
          </div>
        </div>
        <form id='createClient' onSubmit={handleSubmit(onSubmit)}>
          <div className={`row ${styles.clientType}`}>
            <div className='col-lg-1 col-sm-12' style={{ marginRight: 40, paddingLeft: 0 }}>
              <RadioButton inputName='clientType' isChecked={state.clientType === "individual"} labelText='Individual' inputId='individual' value='individual' onChange={handleClientTypeChange} />
            </div>
            <div className='col-lg-1 col-sm-12' style={{ paddingLeft: 0 }}>
              <RadioButton inputName='clientType' isChecked={state.clientType === "company"} labelText='Company' inputId='company' value='company' onChange={handleClientTypeChange} />
            </div>
          </div>
          <div>
            <div className='d-flex flex-column' style={{ maxWidth: "850px" }}>
              <div className={`${styles.serialNumber} pb-5`}>{createClientData.clientNumber}</div>
              <div className={`pb-5`}>
                <InputContainer label='Client Name' isRequired={true} inputPlaceholder='' inputType='text' inputName='name' register={register} control={control} width={77} widthUnit={"%"} />
              </div>
            </div>
            <div className={"d-flex flex-column flex-lg-row"} style={{ gap: "40px" }}>
              <div className='d-flex flex-column' style={{ gap: "18px", width: "80%" }}>
                <InputContainer label='Reference' inputPlaceholder='' inputType='text' inputName='reference' register={register} control={control} />
                {state.clientType === "individual" && (
                  <>
                    <InputContainer label='Title' inputPlaceholder='Doctor, Miss, Mister' inputType='select' inputName='title' selectOptions={titles} register={register} control={control} />
                    <InputContainer label='Job Position' inputPlaceholder='Sales Director, Sales..' inputType='text' inputName='jobPosition' register={register} />
                  </>
                )}
                <InputContainer label='Tax ID' inputPlaceholder='' inputType='text' inputName='taxId' register={register} />
              </div>
              <div className='d-flex flex-column' style={{ gap: "18px", width: "80%" }}>
                <InputContainer label='Phone' inputPlaceholder='' inputType='phone' codeName='phoneCode' changeCodeValue={changeCodeValue} inputName='phone' selectOptions={dummyDropdownOptions} register={register} control={control} />
                <InputContainer label='Mobile' inputPlaceholder='' inputType='phone' codeName='mobileCode' changeCodeValue={changeCodeValue} inputName='mobile' selectOptions={dummyDropdownOptions} register={register} control={control} />
                <InputContainer label='Email' inputPlaceholder='example@gmail.com' inputType='text' inputName='email' register={register} />
                <InputContainer label='Website' inputPlaceholder='www.example.com' inputType='text' inputName='website' register={register} control={control} />
              </div>
              <div className='d-flex flex-column' style={{ gap: "18px", width: "80%" }}>
                <InputContainer label='Floor, Bldg' inputPlaceholder='' inputType='text' inputName='floorBldg' register={register} control={control} />
                <InputContainer label='Street' inputPlaceholder='' inputType='text' inputName='street' register={register} control={control} />
                <InputContainer label='City' inputPlaceholder='' inputType='text' inputName='city' register={register} control={control} />
                <InputContainer label='Country' inputPlaceholder='' inputType='select' inputName='country' selectOptions={dummyItems} register={register} control={control} />
              </div>
            </div>
          </div>
          <div className={`${styles.extraInfo}`}>
            <div className={`d-flex`}>
              <Button title='Contacts & Addresses' rounded={true} fillBackground={state.extraInfo === "contact"} onClick={handleExtraInfoChange} value='contact' type='button' tab />
              <Button title='Sales' rounded={true} fillBackground={state.extraInfo === "sales"} onClick={handleExtraInfoChange} type='button' value='sales' tab />
              <Button title='Internal Note' rounded={true} fillBackground={state.extraInfo === "internalNote"} onClick={handleExtraInfoChange} value='internalNote' type='button' tab />
            </div>
            <div className={`${styles.extraInfoDetails}`}>
              {state.extraInfo === "contact" && (
                <div className={`${styles.contactDiv}`}>
                  <div className={`${styles.contactDivButtons}`}>
                    <div className=''>
                      <RadioButton inputName='addressType' labelText='Contact' inputId='contact' value='contact' isChecked={state.addressType === "contact"} onChange={handleAddressTypeChange} />
                    </div>
                    <div className=''>
                      <RadioButton inputName='addressType' isChecked={state.addressType === "invoice"} labelText='Invoice Address' inputId='invoiceAddress' value='invoice' onChange={handleAddressTypeChange} />
                    </div>
                    <div className=''>
                      <RadioButton inputName='addressType' labelText='Delivery Address' inputId='deliveryAddress' value='delivery' isChecked={state.addressType === "delivery"} onChange={handleAddressTypeChange} />
                    </div>
                    <div className=''>
                      <RadioButton inputName='addressType' labelText='Private Address' inputId='privateAddress' value='private' isChecked={state.addressType === "private"} onChange={handleAddressTypeChange} />
                    </div>
                    <div className=''>
                      <RadioButton inputName='addressType' labelText='Follow-up Address' inputId='followUpAddress' value='followUp' isChecked={state.addressType === "followUp"} onChange={handleAddressTypeChange} />
                    </div>
                    <div className=''>
                      <RadioButton inputName='addressType' labelText='Other' inputId='other' value='other' isChecked={state.addressType === "other"} onChange={handleAddressTypeChange} />
                    </div>
                  </div>
                  <div className={`${styles.infoDiv}`}>
                    <div className={`${styles.inputRow}`}>
                      <InputContainer label='Contact Name' inputPlaceholder='Search...' inputType='select' inputName='contactName' selectOptions={clients} register={register} control={control} />
                      <InputContainer label='Country' inputPlaceholder='' inputType='select' inputName='countryContact' selectOptions={dummyDropdownOptions} register={register} control={control} />
                      <InputContainer label='City' inputPlaceholder='' inputType='text' inputName='cityContact' register={register} />
                      <InputContainer label='State' inputPlaceholder='' inputType='text' inputName='stateContact' register={register} />
                      <InputContainer label='Zip' inputPlaceholder='' inputType='text' inputName='zipContact' register={register} />
                    </div>
                    <div className={`${styles.inputRow} ${styles.inputRow2}`}>
                      <InputContainer label='Street' inputPlaceholder='' inputType='text' inputName='streetContact' register={register} />
                      <InputContainer
                        label='Phone'
                        inputPlaceholder=''
                        inputType='phone'
                        codeName='phoneContactCode'
                        changeCodeValue={changeCodeValue}
                        inputName='phoneContact'
                        register={register}
                        selectOptions={dummyDropdownOptions}
                        control={control}
                      />
                      <InputContainer
                        label='Mobile'
                        inputPlaceholder=''
                        inputType='phone'
                        codeName='mobileContactCode'
                        changeCodeValue={changeCodeValue}
                        inputName='mobileContact'
                        selectOptions={dummyDropdownOptions}
                        register={register}
                        control={control}
                      />
                      <InputContainer label='Email' inputPlaceholder='example@gmail.com' inputType='text' inputName='emailContact' register={register} />
                    </div>
                  </div>
                </div>
              )}
              {state.extraInfo === "sales" && (
                <div className={`${styles.contactDiv}`}>
                  <div className={`${styles.infoDiv}`}>
                    <div className={`${styles.inputRow}`}>
                      <InputContainer label='Salesperson' inputPlaceholder='' inputType='select' inputName='salesperson' selectOptions={createClientData.salespeople} register={register} control={control} />
                      <InputContainer label='Payment Terms' inputPlaceholder='' inputType='select' inputName='paymentTerm' selectOptions={createClientData.paymentTerms} register={register} control={control} optionName={"title"} />
                      <InputContainer label='Pricelist' inputPlaceholder='' inputType='select' inputName='pricelist' selectOptions={createClientData.pricelists} register={register} control={control} optionName={"title"} />
                    </div>
                  </div>
                </div>
              )}
              {state.extraInfo === "internalNote" && (
                <div className={`${styles.contactDiv}`}>
                  <div className={`${styles.infoDiv}`}>
                    <div className={`${styles.inputTextArea}`}>
                      <InputContainer label='Internal Note' inputPlaceholder='' inputType='textarea' inputName='internalNote' alignLabelInput={false} height={130} width={80} widthUnit='%' spaceBetween={false} register={register} />
                    </div>
                  </div>
                </div>
              )}
              <div className={`${styles.actionButtons}`}>
                <div className={styles.discard} onClick={() => reset()}>
                  Discard
                </div>
                <Button title='Save' rounded={false} fillBackground={true} paddingTop={10} paddingBottom={10} paddingRight={64} paddingLeft={64} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;
