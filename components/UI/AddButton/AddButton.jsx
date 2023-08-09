import React from "react";
import styles from "./AddButton.module.css";
import Plus from "../Icons/Plus";

const AddButton = ({ label, onClick }) => {
  return (
    <div onClick={onClick} className={`${styles.footerRow}`}>
      <Plus fillColor='var(--primary-clr-light)' />
      <div
        style={{
          fontSize: "12px",
          paddingLeft: "8px",
        }}>
        {label}
      </div>
    </div>
  );
};

export default AddButton;
