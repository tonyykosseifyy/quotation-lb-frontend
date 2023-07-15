import React from "react";
import styles from "./CheckBox.module.css";

const CheckBox = ({
    labelText,
    value,
    inputName,
    isChecked = undefined,
    inputId,
    onChange,
}) => {
    return (
        <div className={styles.container}>
            <input
                name={inputName}
                value={value}
                type="checkbox"
                className={styles.input}
                id={inputId}
                onChange={onChange}
                checked={isChecked}
            />
            <label htmlFor={inputId} className={styles.label} style={{ pointerEvents: "none" }}>
                {labelText}
            </label>
        </div>
    );
};

export default CheckBox;
