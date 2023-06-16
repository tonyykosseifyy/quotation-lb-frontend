import React from "react";
import Input from "./Input";
import styles from "./InputContainer.module.css";

const InputContainer = ({
    label,
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
    alignLabelInput = true,
    spaceBetween = true,
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
            className={`${styles.container} 
                ${!alignLabelInput ? styles.alignItemsStart : ""}
                ${!spaceBetween ? styles.justifyStart : ""}
            }`}
        >
            <label className={styles.labelText}>
                {label} {isRequired && "*"}
            </label>
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
                register={register}
                control={control}
                borderColor={borderColor}
                placeholderColor={placeholderColor}
                placeholderFontStyle={placeholderFontStyle}
                placeholderFontWeight={placeholderFontWeight}
                placeholderFontSize={placeholderFontSize}
                dropdownArrowColor={dropdownArrowColor}
            />
        </div>
    );
};

export default InputContainer;
