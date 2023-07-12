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
    value,
    onChange,
    borderColor,
    placeholderFontStyle,
    placeholderFontWeight,
    placeholderFontSize,
    dropdownArrowColor,
}) => {
    return (
        <div
            className={`${styles.container} 
                ${!alignLabelInput ? styles.alignItemsStart : ""}
                ${!spaceBetween ? styles.justifyStart : ""}
            `}
        >
            {label && <label className={styles.labelText}>
                {label} {isRequired && "*"}
            </label> }
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
                value={value}
                onChange={onChange}
                borderColor={borderColor}
                placeholderFontStyle={placeholderFontStyle}
                placeholderFontWeight={placeholderFontWeight}
                placeholderFontSize={placeholderFontSize}
                dropdownArrowColor={dropdownArrowColor}
            />
        </div>
    );
};

export default InputContainer;
