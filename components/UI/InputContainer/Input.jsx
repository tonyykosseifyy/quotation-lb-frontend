"use client";

import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import Select from "react-select";
import { Controller } from "react-hook-form";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";
import AsyncSelect from "react-select/async";
import { useDropzone } from "react-dropzone";
import { ImageUpload } from "@/components/UI/InputContainer/ImageUpload";

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
  inputValue,
  isRequired = false,
  inputType,
  selectOptions,
  inputId,
  height = 37,
  heightUnit = "px",
  width = 208,
  widthUnit = "px",
  fontSize,
  textAlign,
  canResize,
  register,
  registerArrayName,
  registerArrayKey,
  registerArrayIndex,
  control,
  dropdownArrowColor,
  optionName = "name",
  optionId = "id",
  loadOptions,
  isSearchable = false,
  isDisabled = false,
  initialValue,
  defaultValue,
  setValue = (name, value) => {},
  referenceInput,
  referenceKey,
  inputKey = null,
}) => {
  const [extraValidations, setExtraValidations] = useState({});

  useEffect(() => {
    const targetedInputName = registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName;

    if (referenceKey && referenceInput) {
      if (referenceKey === "item") {
        if (registerArrayKey === "discount") {
          setExtraValidations({
            min: 0,
            max: referenceInput["lineDiscountLimit"],
          });
        }
        if (registerArrayKey === "quantity") {
          setExtraValidations({
            min: 1,
            max: referenceInput["quantity"],
          });
        }
      }
    }

    if (defaultValue != null) {
      setValue(targetedInputName, defaultValue);
    } else if (initialValue != null) {
      setValue(targetedInputName, inputKey ? initialValue[inputKey] : initialValue);
    }
  }, [initialValue]);

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
          className={`${styles.inputText} ${inputBorder} ${isDisabled ? styles.inputDisabled : ""}`}
          name={inputName}
          type='text'
          id={inputId}
          placeholder={inputPlaceholder}
          {...register(registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName, {
            required: isRequired,
            ...extraValidations,
          })}
          style={{
            fontWeight: placeholderWeight ? placeholderWeight : "600",
            fontSize: "12px",
            textAlign: textAlign ? textAlign : "start",
            borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
          }}
          readOnly={isDisabled}
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
              isSearchable={isSearchable}
              components={{
                IndicatorSeparator: () => null,
              }}
              defaultValue={initialValue}
              required={isRequired}
              isDisabled={isDisabled}
            />
          )}
        />
      )}
      {inputType === "async-select" && (
        <Controller
          name={registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <AsyncSelect
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
              loadOptions={loadOptions}
              getOptionLabel={(option) => option[optionName]}
              getOptionValue={(option) => option[optionId]}
              components={{
                IndicatorSeparator: () => null,
              }}
              required={isRequired}
              defaultValue={initialValue}
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
      {inputType === "image" && <ImageUpload register={register} registerArrayName={registerArrayName} registerArrayKey={registerArrayKey} registerArrayIndex={registerArrayIndex} isRequired={isRequired} inputName={inputName} setValue={setValue} />}
    </div>
  );
};

export default Input;
