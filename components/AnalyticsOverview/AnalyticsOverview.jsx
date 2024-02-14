"use client";

import React, { useEffect, useState } from "react";
import MetricContainer from "../Metric/MetricContainer";
import styles from "./AnalyticsOverview.module.css";
import Table from "../Table/Table";
import { tableHeadings1, tableHeadings2, tableHeadings3, tableHeadings4, tableHeadings5, initialData1, initialData2, initialData3, initialData4, initialData5 } from "@/data/tableData";
import DateFilter from "@/components/DateFilter/DateFilter";
import { filterByDate } from "@/helpers/filterByDate";
import { getTopObjects } from "@/helpers/getTopObjects";

const AnalyticsOverview = () => {
  const [state, setState] = useState({
    topQuotations: getTopObjects(initialData1, "revenue", 3),
    topSalesOrders: getTopObjects(initialData2, "revenue", 3),
    topCountries: initialData3,
    topProducts: initialData4,
    topCustomers: initialData5,
  });
  const handleDateChange = (e) => {
    setState(() => {
      let topQuotationsResults = getTopObjects(filterByDate(initialData1, e), "revenue", 3);
      let topSalesOrdersResults = getTopObjects(filterByDate(initialData2, e), "revenue", 3);
      return {
        topQuotations: topQuotationsResults,
        topSalesOrders: topSalesOrdersResults,
        topCountries: initialData3,
        topProducts: initialData4,
        topCustomers: initialData5,
      };
    });
  };

  return (
    <div className={styles.main}>
      <div className='container m-0'>
        <div className={`row ${styles.heading}`}>Dashboard</div>
        <div className='row'>
          <div className={`col-lg-9 col-md-12 p-0 ${styles.container}`}>
            <div className='row' style={{ marginTop: 10 }}>
              <DateFilter onHandleDateChange={handleDateChange} />
            </div>
            <div style={{ marginTop: 5 }}>
              <MetricContainer />
            </div>
            <div className='row' style={{ marginTop: 36 }}>
              <div className='col-12'>
                <Table
                  title='Top Quotations'
                  headingsBorderTop={`1px solid var(--table-row-border-clr)`}
                  bodyBorderTop={`1px solid var(--table-row-border-clr)`}
                  headings={tableHeadings1}
                  data={state.topQuotations}
                  canSearch={true}
                  searchParam='customer'
                  showDetails={true}
                  centerStatus={true}
                />
              </div>
            </div>
          </div>
          <div className={`col-lg-3 col-md-12 ${styles.chartContainer}`}>Chart 1</div>
        </div>
      </div>
      <div className='container m-0'>
        <div className='row'>
          <div className='col-lg-6 col-md-12'>Chart 2</div>
          <div className='col-lg-6 col-md-12'>
            <Table
              title='Top Sales Order'
              headingsBorderTop={`1px solid var(--table-row-border-clr)`}
              bodyBorderTop={`1px solid var(--table-row-border-clr)`}
              headings={tableHeadings2}
              data={state.topSalesOrders}
              canSearch={false}
              showDetails={false}
              showUnit={true}
              centerStatus={true}
            />
          </div>
        </div>
      </div>
      <div className='container m-0'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <Table
              title='Top Countries'
              headingsBorderTop={`1px solid var(--table-row-border-clr)`}
              bodyBorderTop={`1px solid var(--table-row-border-clr)`}
              headings={tableHeadings3}
              data={state.topCountries}
              canSearch={false}
              showDetails={false}
              showUnit={true}
              centerStatus={true}
            />
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <Table
              title='Top Products'
              headingsBorderTop={`1px solid var(--table-row-border-clr)`}
              bodyBorderTop={`1px solid var(--table-row-border-clr)`}
              headings={tableHeadings4}
              data={state.topProducts}
              canSearch={false}
              showDetails={false}
              showUnit={true}
              centerStatus={true}
            />
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <Table
              title='Top Customers'
              headingsBorderTop={`1px solid var(--table-row-border-clr)`}
              bodyBorderTop={`1px solid var(--table-row-border-clr)`}
              headings={tableHeadings5}
              data={state.topCustomers}
              canSearch={false}
              showDetails={false}
              showUnit={true}
              centerStatus={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
