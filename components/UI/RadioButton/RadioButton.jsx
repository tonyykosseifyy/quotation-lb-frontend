import React from "react";
import styles from "./RadioButton.module.css";

const RadioButton = ({
    labelText,
    value,
    inputName,
    isChecked = undefined,
    inputId,
    onChange,
    labelColor,
    labelWeight,
}) => {
    return (
        <div className={styles.container}>
            <input
                name={inputName}
                value={value}
                type="radio"
                className={styles.input}
                id={inputId}
                onChange={onChange}
                checked={isChecked}
            />
            <label htmlFor={inputId} className={styles.label} style={{ color: labelColor, fontWeight: labelWeight }}>
                {labelText}
            </label>
        </div>
    );
};

export default RadioButton;
