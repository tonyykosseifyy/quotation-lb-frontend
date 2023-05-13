"use client";

import React, { useId } from "react";
import styles from "./Input.module.css";
import Select from "react-select";

const Input = ({
    inputPlaceholder = "",
    inputName,
    isRequired = false,
    inputType,
    selectOptions,
    inputId,
}) => {
    return (
        <div className={styles.input}>
            {inputType === "text" && (
                <input
                    required={isRequired}
                    className={styles.inputText}
                    name={inputName}
                    type="text"
                    id={inputId}
                />
            )}
            {inputType === "select" && (
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: 208,
                            height: 37,
                            borderRadius: 5,
                            borderColor: "rgba(68, 114, 196, 0.2)",
                            "&:hover": {
                                borderColor: "none",
                            },
                            "&:focus": {
                                borderColor: "rgba(68, 114, 196, 0.2)",
                            },
                            "&:active": {
                                borderColor: "rgba(68, 114, 196, 0.2)",
                            },
                        }),
                        valueContainer: (baseStyles, state) => ({
                            ...baseStyles,
                            fontSize: 14,
                            fontWeight: 400,
                            fontStyle: "italic",
                        }),
                        placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: "#C8C8C8",
                        }),
                    }}
                    placeholder={inputPlaceholder}
                    options={selectOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    id={inputId}
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    name={inputName}
                    required={isRequired}
                />
            )}
        </div>
    );
};

export default Input;
