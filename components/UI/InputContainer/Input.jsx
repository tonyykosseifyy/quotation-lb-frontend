"use client";

import React from "react";
import styles from "./Input.module.css";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { countries } from "@/data/countries";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";

const Input = ({
    inputPlaceholder = "",
    codeName,
    changeCodeValue,
    inputName,
    isRequired = false,
    inputType,
    selectOptions,
    inputId,
    height = 37,
    heightUnit = "px",
    width = 208,
    widthUnit = "px",
    canResize,
    register,
    control,
    borderColor,
    placeholderColor,
    placeholderFontStyle,
    placeholderFontWeight,
    placeholderFontSize,
    dropdownArrowColor,
}) => {
    return (
        <div
            className={`${styles.input}`}
            style={{
                height: `${height}${heightUnit}`,
                width: `${width}${widthUnit}`,
            }}
        >
            {inputType === "text" && (
                <input
                    required={isRequired}
                    className={styles.inputText}
                    name={inputName}
                    type="text"
                    id={inputId}
                    {...register(inputName, { required: isRequired })}
                />
            )}
            {inputType === "textarea" && (
                <textarea
                    required={isRequired}
                    className={styles.inputText}
                    name={inputName}
                    id={inputId}
                    style={{ resize: canResize ? "" : "none" }}
                    {...register(inputName, { required: isRequired })}
                />
            )}
            {inputType === "select" && (
                <Controller
                    name={inputName}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <Select
                            {...field}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: 5,
                                    borderColor: borderColor? borderColor : "rgba(68, 114, 196, 0.2)",
                                    "&:hover": {
                                        borderColor: "none",
                                    },
                                    "&:focus": {
                                        borderColor: "rgba(68, 114, 196, 0.2)",
                                    },
                                    "&:active": {
                                        borderColor: "rgba(68, 114, 196, 0.2)",
                                    },
                                    backgroundColor: "transparent",
                                }),
                                valueContainer: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: 14,
                                    fontWeight: 400,
                                }),
                                placeholder: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: placeholderColor ? placeholderColor : "#C8C8C8",
                                    fontStyle: placeholderFontStyle? placeholderFontStyle : "italic",
                                    fontWeight: placeholderFontWeight,
                                    fontSize: placeholderFontSize ? placeholderFontSize : "12px"
                                }),
                                dropdownIndicator: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: dropdownArrowColor? dropdownArrowColor : "var(--primary-text-clr)",
                                }),
                            }}
                            placeholder={inputPlaceholder}
                            options={selectOptions}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            required={isRequired}
                        />
                    )}
                />
            )}
            {inputType === "phone" && (
                <div className={styles.phoneContainer}>
                    <div className={styles.countrySelect}>
                        <PhoneCodeSelect
                            codeName={codeName}
                            changeCodeValue={changeCodeValue}
                        />
                    </div>

                    <input
                        required={isRequired}
                        className={styles.inputText}
                        name={inputName}
                        type="text"
                        id={inputId}
                        {...register(inputName, { required: isRequired })}
                    />
                </div>
            )}
        </div>
    );
};

export default Input;
