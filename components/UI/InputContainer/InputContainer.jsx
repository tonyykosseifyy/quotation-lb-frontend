import React from "react";
import Input from "./Input";
import styles from "./InputContainer.module.css";

const InputContainer = ({
    label,
    inputBorder,
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
                inputBorderColor={inputBorderColor}
                register={register}
                control={control}
            />
        </div>
    );
};

export default InputContainer;
