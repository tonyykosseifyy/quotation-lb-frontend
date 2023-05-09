import React from "react";
import styles from "./MetricContainer.module.css";
import MetricCard from "./MetricCard";

const MetricContainer = () => {
    const metrics = [
        {
            title: "Quotations",
            value: 80,
        },
        {
            title: "Orders",
            value: 70,
            unit: "%",
        },
        {
            title: "Revenue",
            value: 80,
            unit: "USD",
        },
        {
            title: "Average Order",
            value: 80,
            unit: "USD",
        },
    ];

    return (
        <div className={styles.container}>
            <MetricCard
                title={metrics[0].title}
                value={metrics[0].value}
                unit={metrics[0].unit}
                fixDecimals={false}
            />
            <MetricCard
                title={metrics[1].title}
                value={metrics[1].value}
                unit={metrics[1].unit}
                fixDecimals={false}
            />
            <MetricCard
                title={metrics[2].title}
                value={metrics[2].value}
                unit={metrics[2].unit}
                fixDecimals={true}
            />
            <MetricCard
                title={metrics[3].title}
                value={metrics[3].value}
                unit={metrics[3].unit}
                fixDecimals={true}
            />
        </div>
    );
};

export default MetricContainer;
