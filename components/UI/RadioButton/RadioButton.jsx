import React from "react";
import styles from "./RadioButton.module.css";

const RadioButton = ({
    labelText,
    value,
    inputName,
    isChecked = false,
    inputId,
}) => {
    return (
        <div className={styles.container}>
            <input
                name={inputName}
                type="radio"
                className={styles.input}
                id={inputId}
            />
            <label htmlFor={inputId} className={styles.label}>
                {labelText}
            </label>
        </div>
    );
};

export default RadioButton;
