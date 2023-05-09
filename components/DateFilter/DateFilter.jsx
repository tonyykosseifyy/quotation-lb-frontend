import React from "react";
import styles from "./DateFilter.module.css";

const DateFilter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.generalFilters}>
                <div>Last 24 Hours</div>
                <div>Last Week</div>
                <div>Last Month</div>
                <div>Last Year</div>
            </div>
            <div></div>
        </div>
    );
};

export default DateFilter;
