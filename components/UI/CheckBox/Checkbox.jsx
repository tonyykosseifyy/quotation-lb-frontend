import React from "react";
import styles from "./CheckBox.module.css";

const CheckBox = ({ labelText, value, inputName, isChecked, inputId, onChange, labelFontWeight, register }) => {
  return (
    <div className={styles.container}>
      <input
        name={inputName}
        value={value}
        type='checkbox'
        className={styles.input}
        id={inputId}
        onChange={onChange}
        // checked={isChecked}
        defaultChecked={isChecked}
        {...(register
          ? register(inputName, {
              onChange: onChange,
            })
          : {})}
      />
      <label
        htmlFor={inputId}
        style={{ pointerEvents: "none", fontSize: "14px", fontWeight: labelFontWeight }}>
        {labelText}
      </label>
    </div>
  );
};

export default CheckBox;
