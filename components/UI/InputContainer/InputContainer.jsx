import React from "react";
import Input from "./Input";
import styles from "./InputContainer.module.css";

const InputContainer = ({
    label,
    isRequired,
    inputPlaceholder = "",
    inputType,
    inputName,
    selectOptions,
    inputId,
}) => {
    return (
        <div className={styles.container}>
            <label className={styles.labelText}>
                {label} {isRequired && "*"}
            </label>
            <Input
                isRequired={isRequired}
                inputPlaceholder={inputPlaceholder}
                inputType={inputType}
                inputName={inputName}
                selectOptions={selectOptions}
                inputId
            />
        </div>
    );
};

export default InputContainer;
