"use client";

import React from "react";
import styles from "./Input.module.css";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { countries } from "@/data/countries";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";

const Input = ({
  inputPlaceholder = "",
  placeholderColor,
  placeholderStyle,
  placeholderWeight,
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
  borderColor,
  placeholderFontStyle,
  placeholderFontWeight,
  placeholderFontSize,
  dropdownArrowColor,
  optionName = "name",
  optionId = "id",
}) => {
  return (
    <div
      className={`${styles.input}`}
      style={{
        height: `${height}${heightUnit}`,
        width: `${width}${widthUnit}`,
      }}>
      {inputType === "text" && (
        <input
          required={isRequired}
          className={`${styles.inputText} ${inputBorder}`}
          name={inputName}
          type='text'
          id={inputId}
          placeholder={inputPlaceholder}
          {...register(inputName, { required: isRequired })}
          style={{
            fontWeight: placeholderWeight ? placeholderWeight : "600",
            fontSize: "12px",
            textAlign: textAlign ? textAlign : "start",
            borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
          }}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          required={isRequired}
          className={styles.inputText}
          name={inputName}
          id={inputId}
          style={{ resize: canResize ? "" : "none", fontSize: "12px", fontWeight: placeholderWeight }}
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
                  borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
                  "&:hover": {
                    borderColor: "none",
                  },
                  "&:focus": {
                    borderColor: "var(--input-border)",
                  },
                  "&:active": {
                    borderColor: "var(--input-border)",
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
                  color: placeholderColor ? "#868686" : "#C8C8C8",
                  fontStyle: placeholderStyle ? "normal" : "italic",
                  fontWeight: placeholderWeight ? placeholderWeight : "",
                  fontSize: fontSize ? fontSize : "14px",
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: dropdownArrowColor ? dropdownArrowColor : "var(--primary-text-clr)",
                  }),
                }),
              }}
              placeholder={inputPlaceholder}
              options={selectOptions}
              getOptionLabel={(option) => option[optionName]}
              getOptionValue={(option) => option[optionId]}
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
            <PhoneCodeSelect codeName={codeName} changeCodeValue={changeCodeValue} />
          </div>

          <input required={isRequired} className={styles.inputText} name={inputName} type='text' id={inputId} {...register(inputName, { required: isRequired })} />
        </div>
      )}
    </div>
  );
};

export default Input;
