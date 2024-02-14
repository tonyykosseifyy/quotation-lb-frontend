import React from "react";
import styles from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

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
  widthUnit = "px",
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
  loading = false,
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
        width: `${width}${widthUnit}`,
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
      {loading ? (
        <FontAwesomeIcon
          icon={faCircleNotch}
          size='xs'
          spin
        />
      ) : (
        <div>
          {icon && icon} {title}
        </div>
      )}
    </button>
  );
};

export default Button;
