import React from "react";
import Input from "./Input";
import styles from "./InputContainer.module.css";

const InputContainer = ({
    label,
    isRequired,
    inputPlaceholder = "",
    inputType,
    codeName,
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
                inputName={inputName}
                selectOptions={selectOptions}
                inputId={inputId}
                height={height}
                heightUnit={heightUnit}
                width={width}
                widthUnit={widthUnit}
                register={register}
                control={control}
            />
        </div>
    );
};

export default InputContainer;
