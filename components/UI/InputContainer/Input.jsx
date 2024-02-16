"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.css";
import Select, { components } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Controller } from "react-hook-form";
import PhoneCodeSelect from "@/components/UI/InputContainer/PhoneCodeSelect";
import AsyncSelect from "react-select/async";
import { ImageUpload } from "@/components/UI/InputContainer/ImageUpload";
import { ucfirst } from "@/helpers/formatString";
import ReactTextareaAutosize from "react-textarea-autosize";

const Option = (props) => {
  const { label, isSelected } = props;

  return (
    <div>
      <components.Option {...props}>
        <input
          type='checkbox'
          checked={isSelected || props.selectProps.value === props.data.id}
          onChange={() => null}
        />{" "}
        <label
          className='ps-2'
          style={{ color: "black" }}>
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
  inputType = "text",
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
  initialValue = null,
  defaultValue,
  setValue = (name, value) => {},
  referenceInput,
  referenceKey,
  inputKey = null,
  inputfontWeight,
  autoFocus = false,
  onCreateOption = () => {},
  defaultOptions,
  marginTop,
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

    if (initialValue != null) {
      if (inputKey ? initialValue[inputKey] : initialValue) {
        setValue(targetedInputName, inputKey ? initialValue[inputKey] : initialValue);
      } else {
        if (defaultValue != null) {
          setValue(targetedInputName, defaultValue);
        }
      }
    } else if (defaultValue != null) {
      setValue(targetedInputName, defaultValue);
    }
  }, [initialValue]);

  return (
    <div
      className={`${styles.input}`}
      style={{
        height: height === "none" ? "auto" : `${height}${heightUnit}`,
        width: `${width}${widthUnit}`,
        marginTop: marginTop,
      }}>
      {["text", "email", "password"].includes(inputType) && (
        <input
          required={isRequired}
          className={`${styles.inputText} ${inputBorder} ${isDisabled ? styles.inputDisabled : ""}`}
          name={inputName}
          type={inputType}
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
            fontWeight: inputfontWeight ? 700 : 600,
            fontSize: fontSize ? fontSize : "12px",
            textAlign: textAlign ? textAlign : "start",
            borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: placeholderColor ? "#4472c4" : "#C8C8C8",
              fontStyle: placeholderStyle ? "normal" : "italic",
              fontWeight: placeholderWeight ? placeholderWeight : 600,
              fontSize: fontSize ? fontSize : "12px",
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                color: dropdownArrowColor ? dropdownArrowColor : "var(--primary-text-clr)",
              }),
            }),
          }}
          readOnly={isDisabled}
          autoFocus={autoFocus}
        />
      )}
      {inputType === "textarea" && (
        <ReactTextareaAutosize
          required={isRequired}
          className={`${styles.inputText} ${isDisabled ? styles.inputDisabled : ""}`}
          name={inputName}
          id={inputId}
          style={{ resize: canResize ? "" : "none", fontSize: fontSize ? fontSize : "12px", fontWeight: placeholderWeight, width: "100%" }}
          placeholder={inputPlaceholder}
          {...(register
            ? register(registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName, {
                required: isRequired,
              })
            : {})}
          readOnly={isDisabled}
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
            fontSize: fontSize ? fontSize : "12px",
            textAlign: textAlign ? textAlign : "start",
            borderColor: inputBorderColor ? "var(--input-border-2)" : "var(--input-border)",
          }}
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
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: 5,
                  borderColor: inputBorderColor ? "var(--primary-clr)" : "var(--input-border)",
                  "&:hover": {
                    borderColor: "var(--primary-clr)",
                  },
                  "&:focus": {
                    borderColor: "var(--primary-clr)",
                  },
                  "&:active": {
                    borderColor: "var(--primary-clr)",
                  },
                  backgroundColor: "transparent",
                  boxShadow: "",
                }),
                option: (styles, { isSelected }) => {
                  return {
                    ...styles,
                    backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
                    "&:hover": {
                      backgroundColor: !isSelected && "var(--primary-clr-light)",
                      color: "white",
                    },
                    ":active": {
                      ...styles[":active"],
                      backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
                    },
                  };
                },
                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: 14,
                  fontWeight: 400,
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: placeholderColor ? "#868686" : "#C8C8C8",
                  fontStyle: placeholderStyle ? "normal" : "italic",
                  fontWeight: placeholderWeight ? placeholderWeight : "",
                  fontSize: fontSize ? fontSize : "14px",
                  dropdownIndicator: (baseStyles) => ({
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
              onChange={onChange}
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
          defaultValue={initialValue}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: 5,
                  borderColor: inputBorderColor ? "var(--primary-clr)" : "var(--input-border)",
                  "&:hover": {
                    borderColor: "var(--primary-clr)",
                  },
                  "&:focus": {
                    borderColor: "var(--primary-clr)",
                  },
                  "&:active": {
                    borderColor: "var(--primary-clr)",
                  },
                  backgroundColor: "transparent",
                  boxShadow: "",
                }),
                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: 14,
                  fontWeight: 400,
                }),
                option: (styles, { data, isFocused, isSelected }) => {
                  return {
                    ...styles,
                    backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
                    "&:hover": {
                      backgroundColor: !isSelected && "var(--primary-clr-light)",
                      color: "white",
                    },
                    ":active": {
                      ...styles[":active"],
                      backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
                    },
                  };
                },
                placeholder: (baseStyles) => ({
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
            />
          )}
        />
      )}
      {inputType === "asyncCreatableSelect" && (
        <Controller
          name={registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName}
          control={control}
          defaultValue={initialValue}
          render={({ field }) => (
            <AsyncCreatableSelect
              {...field}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: 5,
                  borderColor: "var(--primary-clr)",
                  "&:hover": {
                    borderColor: "var(--primary-clr)",
                  },
                  "&:focus": {
                    borderColor: "var(--primary-clr)",
                  },
                  "&:active": {
                    ...styles[":active"],
                    borderColor: "var(--primary-clr)",
                  },
                  backgroundColor: "transparent",
                  boxShadow: "",
                }),
                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: 14,
                  fontWeight: 400,
                }),
                option: (styles, { isSelected }) => {
                  return {
                    ...styles,
                    backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
                    "&:hover": {
                      backgroundColor: !isSelected && "var(--primary-clr-light)",
                      color: "white",
                    },
                    ":active": {
                      ...styles[":active"],
                      backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
                    },
                  };
                },
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
              getOptionLabel={(option) => (option.__isNew__ ? option["label"] : option[optionName])}
              getOptionValue={(option) => (option.__isNew__ ? option["value"] : option[optionId])}
              components={{
                IndicatorSeparator: () => null,
              }}
              onCreateOption={onCreateOption}
              defaultOptions={defaultOptions}
              required={isRequired}
            />
          )}
        />
      )}
      {inputType === "checkBoxSelect" && (
        <div
          className='d-inline-block'
          data-toggle='popover'
          data-trigger='focus'
          data-content=''
          style={{ width: "209px" }}>
          <Controller
            name={registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectOptions}
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
                    borderColor: "var(--input-border-2)",
                    "&:hover": {
                      borderColor: "none",
                    },
                    "&:focus": {
                      borderColor: "var(--input-border-2)",
                    },
                    "&:active": {
                      borderColor: "var(--input-border-2)",
                    },
                    backgroundColor: "transparent",
                  }),
                  valueContainer: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: fontSize ? fontSize : 14,
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
            <PhoneCodeSelect
              codeName={codeName}
              changeCodeValue={changeCodeValue}
            />
          </div>

          <input
            required={isRequired}
            className={styles.inputText}
            name={inputName}
            type='text'
            id={inputId}
            {...register(inputName, { required: isRequired })}
          />
        </div>
      )}
      {inputType === "image" && (
        <ImageUpload
          register={register}
          registerArrayName={registerArrayName}
          registerArrayKey={registerArrayKey}
          registerArrayIndex={registerArrayIndex}
          isRequired={isRequired}
          inputName={inputName}
          setValue={setValue}
          initialValue={initialValue}
          isDisabled={isDisabled}
        />
      )}
      {inputType === "numberSelect" && (
        <CustomInputWithSelect />
      )}
    </div>
  );
};
const CustomInputWithSelect = (props) => {
  const { inputName, isRequired, inputType, inputId, inputPlaceholder, register, registerArrayName, registerArrayIndex, registerArrayKey, onChange, inputfontWeight, fontSize, placeholderColor, placeholderStyle, placeholderWeight, dropdownArrowColor } = props;
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'Days', label: 'Days' },
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
  ];

  // Assuming onChange, isRequired, and other variables are defined elsewhere

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '0px', border: '1px solid #D6DFEF',borderRadius: '5px' }}>
      <input
        required={isRequired}
        className={`${styles.inputText}`}
        name={inputName}
        type={inputType}
        id={inputId}
        placeholder={inputPlaceholder}
        {...(register
          ? register(registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName, {
              required: isRequired,
              ...extraValidations,
              onChange: onChange, // Make sure this onChange updates the state or performs validations as needed
            })
          : {})}
        style={{
          fontWeight: inputfontWeight ? 700 : 600,
          fontSize: fontSize ? fontSize : "12px",
          border: 'none',
          width: '35%',
          height: '38px',
          outline: 'none',
          boxShadow: 'none',
          '&:focus': {
            border: 'none',
            outline: 'none'
          }
        }}
      />
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            fontSize: "12px",
            flex: 1,
            borderRadius: 5,
            border: 'none',
            backgroundColor: "transparent",
            boxShadow: "none",
          }),
          option: (styles, { isSelected }) => {
            return {
              ...styles,
              backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
              "&:hover": {
                backgroundColor: !isSelected && "var(--primary-clr-light)",
                color: "white",
              },
              ":active": {
                ...styles[":active"],
                backgroundColor: isSelected ? "var(--primary-clr)" : "transparent",
              },
            };
          },
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            fontSize: 14,
            fontWeight: 400,
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: placeholderColor ? "#868686" : "#C8C8C8",
            fontStyle: placeholderStyle ? "normal" : "italic",
            fontWeight: placeholderWeight ? placeholderWeight : "",
            fontSize: fontSize ? fontSize : "14px",
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: dropdownArrowColor ? dropdownArrowColor : "var(--primary-text-clr)",
            }),
          }),
        }}
        placeholder="Select unit"
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};



export default Input;
