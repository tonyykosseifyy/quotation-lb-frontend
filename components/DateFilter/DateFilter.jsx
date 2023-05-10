import React from "react";
import styles from "./DateFilter.module.css";

const DateFilter = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.generalFilters}>
                <a
                    onClick={() => props.onHandleDateChange("day")}
                    className={styles.dateFilter}
                >
                    Last 24 Hours
                </a>
                <a
                    onClick={() => props.onHandleDateChange("week")}
                    className={styles.dateFilter}
                >
                    Last Week
                </a>
                <a
                    onClick={() => props.onHandleDateChange("month")}
                    className={styles.dateFilter}
                >
                    Last Month
                </a>
                <a
                    onClick={() => props.onHandleDateChange("year")}
                    className={styles.dateFilter}
                >
                    Last Year
                </a>
            </div>
            <div></div>
        </div>
    );
};

export default DateFilter;
