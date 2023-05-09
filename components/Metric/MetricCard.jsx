import React from "react";
import styles from "./MetricCard.module.css";

const MetricCard = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.cardHeader}>
                <div className={styles.logoContainer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#95c1d9"
                        viewBox="0 0 24 24"
                        strokeWidth={0}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                    </svg>
                </div>
                <span className={styles.metricTitle}>{props.title}</span>
            </div>

            <div className={styles.value}>
                <div className={styles.cardValue}>
                    {props.fixDecimals ? props.value.toFixed(3) : props.value}
                    {props.unit && props.unit === "%" && (
                        <span>{props.unit}</span>
                    )}
                </div>
                {props.unit && props.unit !== "%" && (
                    <div className={styles.unit}>{props.unit}</div>
                )}
            </div>
        </div>
    );
};
export default MetricCard;
