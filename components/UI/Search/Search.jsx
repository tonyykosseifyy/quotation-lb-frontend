import React from "react";
import styles from "./Search.module.css";

const Search = ({
    value,
    placeholder,
    borderColor,
    borderWidth,
    borderStyle,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor,
    rounded,
    handleSearch,
    height,
}) => {
    return (
        <div
            className={`
            ${styles.searchInputDiv}
            ${rounded ? styles.roundedBorder : ""}
         `}
            style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: borderWidth,
                borderStyle: borderStyle,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
                height: height
            }}
        >
            <input
                value={value}
                type="search"
                onChange={handleSearch}
                className={styles.searchInput}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Search;
