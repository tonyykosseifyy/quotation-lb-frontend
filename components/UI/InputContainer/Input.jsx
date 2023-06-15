"use client";

import React from "react";
import styles from "./Input.module.css";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { countries } from "@/data/countries";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";

const Input = ({
    inputPlaceholder = "",
    inputBorder,
    inputBorderColor,
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
    fontWeight,
    fontSize,
    textAlign,
    canResize,
    register,
    control,
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
                    className={`${styles.inputText} ${inputBorder}`}
                    name={inputName}
                    type="text"
                    id={inputId}
                    placeholder={inputPlaceholder}
                    {...register(inputName, { required: isRequired })}
                    style={{
                        fontWeight: fontWeight ? fontWeight : "600",
                        fontSize: "12px",
                        textAlign: textAlign ? textAlign : "start",
                        borderColor: inputBorderColor? "var(--input-border-2)" : "var(--input-border)"
                    }}
                />
            )}
            {inputType === "textarea" && (
                <textarea
                    required={isRequired}
                    className={styles.inputText}
                    name={inputName}
                    id={inputId}
                    style={{ resize: canResize ? "" : "none", fontSize: "12px", fontWeight: "600"}}
                    placeholder={inputPlaceholder}
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
                                    borderColor: inputBorderColor ? "rgba(109, 144, 208, 1)" : "rgba(68, 114, 196, 0.2)",
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
                                    color: inputBorder ? "#868686" : "#C8C8C8",
                                    fontStyle: inputBorder ? "normal" : "italic",
                                    fontWeight: fontWeight ? fontWeight : "",
                                    fontSize: fontSize ? fontSize : "14px"
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
