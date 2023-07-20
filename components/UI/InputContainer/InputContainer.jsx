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
  selectOptions,
  inputId,
  height,
  heightUnit,
  width,
  widthUnit,
  fontWeight,
  fontSize,
  textAlign,
  alignLabelInput = true,
  spaceBetween = true,
  register,
  control,
  borderColor,
  placeholderFontStyle,
  placeholderFontWeight,
  placeholderFontSize,
  dropdownArrowColor,
  optionName,
  optionId,
  value,
  onChange,
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
        selectOptions={selectOptions}
        inputId={inputId}
        height={height}
        heightUnit={heightUnit}
        width={width}
        widthUnit={widthUnit}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign={textAlign}
        inputBorder={inputBorder}
        placeholderColor={placeholderColor}
        placeholderStyle={placeholderStyle}
        placeholderWeight={placeholderWeight}
        inputBorderColor={inputBorderColor}
        register={register}
        control={control}
        borderColor={borderColor}
        placeholderFontStyle={placeholderFontStyle}
        placeholderFontWeight={placeholderFontWeight}
        placeholderFontSize={placeholderFontSize}
        dropdownArrowColor={dropdownArrowColor}
        optionName={optionName}
        optionId={optionId}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputContainer;
