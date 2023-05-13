import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            className={`
            ${styles.container}
            ${props.fillBackground ? styles.fillBackground : ""}
            ${props.rounded ? styles.roundedBorder : ""}
            
         `}
            style={{ fontSize: props.fontSize, fontWeight: props.fontWeight }}
            onClick={props.onClick}
        >
            {props.title}
        </button>
    );
};

export default Button;
