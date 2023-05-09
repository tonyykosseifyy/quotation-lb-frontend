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
        >
            {props.title}
        </button>
    );
};

export default Button;