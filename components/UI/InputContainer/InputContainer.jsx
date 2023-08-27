import React from "react";
import Input from "./Input";
import styles from "./InputContainer.module.css";

const InputContainer = ({
  label,
  inputBorder,
  placeholderColor,
  placeholderStyle,
  placeholderWeight,
  inputBorderColor,
  isRequired,
  inputPlaceholder = "",
  inputType,
  codeName,
  changeCodeValue,
  inputName,
  inputValue,
  selectOptions,
  inputId,
  height,
  heightUnit,
  width,
  widthUnit,
  fontSize,
  textAlign,
  alignLabelInput = true,
  spaceBetween = true,
  register,
  registerArrayName,
  registerArrayKey,
  registerArrayIndex,
  control,
  dropdownArrowColor,
  optionName,
  optionId,
  value,
  onChange,
  loadOptions,
  isSearchable,
  initialValue,
  defaultValue,
  isDisabled,
  setValue,
  referenceInput,
  referenceKey,
  inputKey,
  decimalDigits,
  inputfontWeight,
}) => {
  return (
    <div
      className={`${styles.container} 
                ${!alignLabelInput ? styles.alignItemsStart : ""}
                ${!spaceBetween ? styles.justifyStart : ""}
            `}>
      {label && (
        <label className={styles.labelText}>
          {label} {isRequired && "*"}
        </label>
      )}
      <Input
        isRequired={isRequired}
        inputPlaceholder={inputPlaceholder}
        inputType={inputType}
        codeName={codeName}
        changeCodeValue={changeCodeValue}
        inputName={inputName}
        inputValue={inputValue}
        selectOptions={selectOptions}
        inputId={inputId}
        height={height}
        heightUnit={heightUnit}
        width={width}
        widthUnit={widthUnit}
        fontSize={fontSize}
        textAlign={textAlign}
        inputBorder={inputBorder}
        placeholderColor={placeholderColor}
        placeholderStyle={placeholderStyle}
        placeholderWeight={placeholderWeight}
        inputBorderColor={inputBorderColor}
        register={register}
        registerArrayName={registerArrayName}
        registerArrayKey={registerArrayKey}
        registerArrayIndex={registerArrayIndex}
        control={control}
        dropdownArrowColor={dropdownArrowColor}
        optionName={optionName}
        optionId={optionId}
        value={value}
        onChange={onChange}
        loadOptions={loadOptions}
        isSearchable={isSearchable}
        initialValue={initialValue}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        setValue={setValue}
        referenceInput={referenceInput}
        referenceKey={referenceKey}
        inputKey={inputKey}
        decimalDigits={decimalDigits}
        inputfontWeight={inputfontWeight}
      />
    </div>
  );
};

export default InputContainer;
