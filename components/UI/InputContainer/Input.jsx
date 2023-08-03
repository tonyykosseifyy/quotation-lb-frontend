"use client";

import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";
import AsyncSelect from "react-select/async";
import { useDropzone } from "react-dropzone";
import { ImageUpload } from "@/components/UI/InputContainer/ImageUpload";
import { ucfirst } from "@/helpers/formatString";

const Option = (props) => {
  const { innerProps, label, isSelected } = props;

  return (
    <div>
      <components.Option {...props}>
        <input type='checkbox' checked={isSelected} onChange={() => null} />{" "}
        <label className='ps-2' style={{ color: "black" }}>
          {label}
        </label>
      </components.Option>
    </div>
  );
};

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
  fontSize,
  textAlign,
  canResize,
  register,
  registerArrayName,
  registerArrayKey,
  registerArrayIndex,
  control,
  value,
  onChange = null,
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
  decimalDigits,
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
          {...(register
            ? register(registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName, {
                required: isRequired,
                ...extraValidations,
                onChange: onChange,
              })
            : {})}
          style={{
            fontWeight: placeholderWeight ? placeholderWeight : "600",
            fontSize: "12px",
            textAlign: textAlign ? textAlign : "start",
            borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
          }}
          readOnly={isDisabled}
          onChange={onChange}
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
      {inputType === "number" && (
        <input
          min={0}
          required={isRequired}
          className={`${styles.inputText} ${inputBorder}`}
          name={inputName}
          type='number'
          step='0.1'
          id={inputId}
          placeholder={inputPlaceholder}
          {...register(inputName, { required: isRequired }, { valueAsNumber: true })}
          style={{
            fontWeight: placeholderWeight ? placeholderWeight : "600",
            fontSize: "12px",
            textAlign: textAlign ? textAlign : "start",
            borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
          }}
        />
      )}
      {inputType === "select" && (
        <Controller
          name={registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName}
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
                  padding: "2px 4px",
                }),
                dropdownIndicator: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: "8px 0",
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
              getOptionLabel={(option) => ucfirst(option[optionName])}
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
              value={value}
              defaultValue={initialValue}
            />
          )}
        />
      )}
      {inputType === "checkBoxSelect" && (
        <div className='d-inline-block' data-toggle='popover' data-trigger='focus' data-content='' style={{ width: "209px" }}>
          <Controller
            name={inputName}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Select
                {...field}
                options={selectOptions}
                // isMulti
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                components={{ Option }}
                onChange={onChange}
                value={value}
                allowSelectAll={false}
                getOptionLabel={(option) => ucfirst(option.name)}
                getOptionValue={(option) => option.id}
                placeholder={inputPlaceholder}
                required={isRequired}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: 5,
                    borderColor: "var(--input-border)",
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
                    padding: "2px 4px",
                  }),
                  indicatorContainer: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: "8px 0",
                  }),
                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    dropdownIndicator: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "var(--primary-text-clr)",
                    }),
                  }),
                }}
              />
            )}
          />
        </div>
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
