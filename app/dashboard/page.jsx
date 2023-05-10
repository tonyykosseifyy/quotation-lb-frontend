import AnalyticsOverview from "@/components/AnalyticsOverview/AnalyticsOverview";
import React from "react";
import styles from "./page.module.css";

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <AnalyticsOverview />
        </div>
    );
};

export default Dashboard;
