"use client";

import React from "react";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";
import Plus from "@/components/UI/Icons/Plus";

const PriceListItemsTab = ({ data, footerText }) => {

  const itemsTableColumns = [
    {
        name: "Code",
        maxWidth: "100px",
        selector: (row) => row.code,
        allowOverflow: true,
    },
    {
        name: "Name",
        maxWidth: "500px",
        selector: (row) => row.name,
    },
    {
        name: "Currency",
        maxWidth: "120px",
        selector: (row) => row.currency,
        center: true,
    },
    {
        name: "Saleprice",
        maxWidth: "120px",
        selector: (row) => row.salePrice,
        format: (row) => row.salePrice.toFixed(2),
        center: true,
    },
    {
        name: "Discount",
        maxWidth: "120px",
        selector: (row) => row.discount,
        format: (row) => row.discount.toFixed(2),
        center: true,
    },
    {
        name: "Discount %",
        maxWidth: "120px",
        selector: (row) => row.discountPercent,
        center: true,
    },
    {
        name: "Price Discounted",
        maxWidth: "150px",
        selector: (row) => row.priceDiscounted,
        format: (row) => row.priceDiscounted.toFixed(2),
        center: true,
    },
  ];
  
  const customStyles = {
    headRow: {
        style: {
            backgroundColor: "var(--primary-clr)",
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: 5,
            borderTopLeftRadius: 0,
            minHeight: "40px !important",
            paddingLeft: "20px",
        },
    },
    rows: {
        style: {
            minHeight: "5px !important",
            borderBottom: "none !important",
            paddingLeft: "20px",
        },
    },
    cells: {
        style: {
            fontSize: 12,
            fontWeight: 700,
            color: "var(--secondary-text-clr)",
            paddingTop: "0px !important",
            height: "45px !important",
        },
    },
  };

  const conditionalRowStyles = [
    {
        when: (row) => row.id === 1, 
        style: {
            backgroundColor: "var(--table-row-background-clr)",
        },
    },
  ];

  return (
    <>
        <DataTable 
            columns={itemsTableColumns}
            data={data}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
        />
        <div
            // onClick={() => { }}
            className={`${styles.footerRow} pt-3`}
        >
            <Plus fillColor='var(--primary-clr-light)' />
            <div 
                style={{ fontSize: "12px", paddingLeft: "8px" }}
            >
                {footerText}
            </div>
        </div>
    </>  
  );
};

export default PriceListItemsTab;