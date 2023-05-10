"use client";

import React, { useEffect, useState } from "react";
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
import { filterByDate } from "@/helpers/filterByDate";
import { getTopObjects } from "@/helpers/getTopObjects";

const AnalyticsOverview = () => {
    console.log("entered AnalyticsOverview");
    const [state, setState] = useState({
        topQuotations: getTopObjects(initialData1, "revenue", 3),
        topSalesOrders: getTopObjects(initialData2, "revenue", 3),
        topCountries: initialData3,
        topProducts: initialData4,
        topCustomers: initialData5,
    });
    const handleDateChange = (e) => {
        setState(() => {
            let topQuotationsResults = getTopObjects(
                filterByDate(initialData1, e),
                "revenue",
                3
            );
            let topSalesOrdersResults = getTopObjects(
                filterByDate(initialData2, e),
                "revenue",
                3
            );
            return {
                topQuotations: topQuotationsResults,
                topSalesOrders: topSalesOrdersResults,
                topCountries: initialData3,
                topProducts: initialData4,
                topCustomers: initialData5,
            };
        });
        console.log(e);
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.heading}>Dashboard</div>
                <div className={styles.container2}>
                    <div className={styles.container}>
                        <DateFilter onHandleDateChange={handleDateChange} />
                        <MetricContainer />
                        <Table
                            title="Top Quotations"
                            headings={tableHeadings1}
                            data={state.topQuotations}
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
                    data={state.topSalesOrders}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
            </div>
            <div className={styles.container2}>
                <Table
                    title="Top Countries"
                    headings={tableHeadings3}
                    data={state.topCountries}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
                <Table
                    title="Top Products"
                    headings={tableHeadings4}
                    data={state.topProducts}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
                <Table
                    title="Top Customers"
                    headings={tableHeadings5}
                    data={state.topCustomers}
                    canSearch={false}
                    showDetails={false}
                    showUnit={true}
                />
            </div>
        </div>
    );
};

export default AnalyticsOverview;
