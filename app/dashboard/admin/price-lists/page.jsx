"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import { priceListsGeneral, priceListsItems, priceListsDepartment, percentageOptions } from "@/data/admin";
import GeneralTab from "@/components/AdminTabs/GeneralTab";
import PriceListPropertiesTab from "@/components/AdminTabs/PriceListPropertiesTab";
import PriceListItemsTab from "@/components/AdminTabs/PriceListItemsTab";

const PriceLists = () => {
  
    const priceListsGeneralDuplicate = [...priceListsGeneral];

    const [showModal, setShowModal] = useState(true);
    const [buttonState, setButtonState] = useState("general");
    const [generalTableRows, setGeneralTableRows] = useState(priceListsGeneralDuplicate);

    const handleTabChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const generalHandleDeleteRow = (id) => {
        const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
        setGeneralTableRows(generalUpdatedRows);
    };

    const [checkboxValues, setCheckboxValues] = useState({
        vatInclusivePrices: false,
        prices_are_derived_from_another_price_list: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const [percentageOption, setPercentageOption] = useState(null);
    const [percentageOptionName, setPercentageOptionName] = useState("")

    const handleChange = (selected) => {
        setPercentageOption(selected);
        setPercentageOptionName(selected.name);
        console.log(percentageOptionName);
    };

    const [state, setState] = useState({ atTransactionTimeDisplay: ""});

    const handleTransactionInfoChange = (e) => {
        setState(() => ({atTransactionTimeDisplay: e.target.value}));
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

      const priceListInfo = {
          ...data,
          percentageSelect: percentageOptionName,
          checkBox: checkboxValues,
          atTransactionTimeDisplay: state.atTransactionTimeDisplay,
      };
      console.log(priceListInfo);
    }

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

    const buttonTabs = [
        {
            title: "General",
            fillBackground: buttonState === "general",
            value: "general",
        },
        {
            title: "Properties",
            fillBackground: buttonState === "properties",
            value: "properties",
        },
        {
            title: "Items",
            fillBackground: buttonState === "items",
            value: "items",
        },
        {
            title: "Clients",
            fillBackground: buttonState === "clients",
            value: "clients",
        },
    ];

    return (
        <ModalComponent 
            title="PRICE LIST" 
            titlePaddingBottom="20px"
            isOpen={showModal} 
            onRequestClose={() => setShowModal(false)} 
            style={modalStyle}
        >
            <div className={`mt-3`}>
                {buttonTabs.map(({ title, fillBackground, value }) => {
                    return (
                        <Button
                            key={title}
                            title={title} 
                            fillBackground={fillBackground} 
                            onClick={handleTabChange} 
                            value={value} 
                            type='button' 
                            width="140px"
                            tab 
                        />
                      )
                })}
            </div>
            <form id="priceLists" 
                onSubmit={handleSubmit(onSubmit)} 
                className={`${styles.form}`}>
                <>
                    <div>
                        { buttonState === "general" && (
                            <GeneralTab 
                                data={generalTableRows} 
                                footerText="New Price List" 
                                generalHandleDeleteRow={generalHandleDeleteRow}
                            />
                        )}
                        { buttonState === "properties" && (
                            <>
                                <PriceListPropertiesTab 
                                    control={control} 
                                    register={register} 
                                    data={priceListsDepartment} 
                                    checkboxValues={checkboxValues} 
                                    handleCheckboxChange={handleCheckboxChange} 
                                    percentageOptions={percentageOptions}
                                    percentageOption={percentageOption}
                                    percentageOptionName={percentageOptionName}
                                    handleChange={handleChange} 
                                    state={state}
                                    handleTransactionInfoChange={handleTransactionInfoChange}
                                />
                            </>
                        )}
                        { buttonState === "items" && (
                            <>
                                <PriceListItemsTab 
                                    data={priceListsItems}
                                    footerText="New Item"
                                />
                            </>  
                        )}
                    </div>
                    <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
                          <div
                              className={`${styles.discard}`}
                              onClick={() => { reset(), setGeneralTableRows(priceListsGeneral), setState(() => ({atTransactionTimeDisplay: ""})), setPercentageOptionName(""), setPercentageOption(null) }}
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

export default PriceLists;