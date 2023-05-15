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
            style={{
                fontSize: props.fontSize,
                fontWeight: props.fontWeight,
                paddingTop: props.paddingTop,
                paddingBottom: props.paddingBottom,
                paddingLeft: props.paddingLeft,
                paddingRight: props.paddingRight,
            }}
            onClick={props.onClick}
            value={props.value}
            type={props.type ? props.type : "submit"}
        >
            {props.title}
        </button>
    );
};

export default Button;
