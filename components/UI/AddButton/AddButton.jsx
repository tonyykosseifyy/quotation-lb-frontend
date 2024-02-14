import React from "react";
import styles from "./AddButton.module.css";
import Plus from "../Icons/Plus";

const AddButton = ({ label, onClick }) => {
  return (
    <div onClick={onClick} className={`${styles.footerRow}`}>
      <Plus fillColor='var(--primary-clr)' />
      <div
        style={{
          fontSize: "14px",
          paddingLeft: "8px",
          fontWeight: "500",
        }}>
        {label}
      </div>
    </div>
  );
};

export default AddButton;
