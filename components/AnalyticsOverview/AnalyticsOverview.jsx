"use client";

import React, { useEffect } from "react";
import MetricContainer from "../Metric/MetricContainer";
import styles from "./AnalyticsOverview.module.css";
import Table from "../Table/Table";
import {
    tableHeadings1,
    tableHeadings2,
    tableHeadings3,
    tableHeadings4,
    tableHeadings5,
    initialData1,
    initialData2,
    initialData3,
    initialData4,
    initialData5,
} from "@/data/tableData";
import DateFilter from "@/components/DateFilter/DateFilter";

const AnalyticsOverview = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.heading}>Dashboard</div>
                <div className={styles.container2}>
                    <div className={styles.container}>
                        <DateFilter />
                        <MetricContainer />
                        <Table
                            title="Top Quotations"
                            headings={tableHeadings1}
                            data={initialData1}
                            canSearch={true}
                            searchParam="customer"
                            showDetails={true}
                        />
                    </div>
                    <div className={styles.chartContainer}>Chart 1</div>
                </div>
            </div>
            <div className={styles.container2}>
                <div className={styles.half}>Chart 2</div>
                <Table
                    title="Top Sales Order"
                    headings={tableHeadings2}
                    data={initialData2}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
            </div>
            <div className={styles.container2}>
                <Table
                    title="Top Countries"
                    headings={tableHeadings3}
                    data={initialData3}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
                <Table
                    title="Top Products"
                    headings={tableHeadings4}
                    data={initialData4}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
                <Table
                    title="Top Customers"
                    headings={tableHeadings5}
                    data={initialData5}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
            </div>
        </div>
    );
};

export default AnalyticsOverview;
