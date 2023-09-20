import React from "react";
import styles from "./Button.module.css";

const Button = ({
  title,
  fillBackground,
  rounded,
  fontSize,
  fontWeight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  onClick,
  value,
  type,
  tab,
  width,
  height,
  icon,
  titleColor,
  display,
  alignItems,
  justifyContent,
  backgroundColor,
  border,
  padding,
  isDisabled,
}) => {
  return (
    <button
      className={
        tab
          ? `${styles.tabcontainer}
                   ${fillBackground ? styles.tabFillBackground : ""}`
          : `${styles.container}
                   ${fillBackground ? styles.fillBackground : ""}
                   ${rounded ? styles.roundedBorder : ""}`
      }
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        width: width,
        height: height,
        display: display,
        alignItems: alignItems,
        justifyContent: justifyContent,
        color: titleColor,
        backgroundColor: backgroundColor,
        border: border,
        padding: padding,
      }}
      onClick={onClick}
      value={value}
      type={type ? type : "submit"}
      disabled={isDisabled}>
      {icon && icon} {title}
    </button>
  );
};

export default Button;
