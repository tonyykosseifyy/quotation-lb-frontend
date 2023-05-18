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
    fontStyle,
    backgroundColor,
    rounded,
    handleSearch,
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
            }}
        >
            <input
                value={value}
                type="search"
                onChange={handleSearch}
                className={styles.searchInput}
                placeholder={placeholder}
                style={{ fontStyle: fontStyle }}
            />
        </div>
    );
};

export default Search;
