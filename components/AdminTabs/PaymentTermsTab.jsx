"use client";

import React from "react";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import EditIcon from '@mui/icons-material/Edit';
import Plus from "@/components/UI/Icons/Plus";

const PaymentTermsTab = ({ data, footerText, generalHandleDeleteRow, register, control }) => {

  const generalTableColumns = [
    {
      name: "Term",
      width: "100px",
      selector: (row) => row.term,
      allowOverflow: true,
    },
    {
      name: "",
      maxWidth: "auto",
    },
    {
        name: "",
        width: "50px",
        cell: (row) => (
          <div style={{ cursor: "pointer" }}>
            <EditIcon
              color={"var(--primary-clr)"}
              onClick={() => generalHandleDeleteRow(row.id)}
              fontSize="small"
            />
          </div>
        ),
        center: true,
    },
    {
      name: "",
      width: "50px",
      cell: (row) => (
        <div style={{ cursor: "pointer" }}>
          <Trashcan
            fillColor={"var(--primary-clr)"}
            onClick={() => generalHandleDeleteRow(row.id)}
          />
        </div>
      ),
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
            columns={generalTableColumns}
            data={data}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
        />
        <button
            className={`${styles.footerRow} pt-3`}
        >
            <Plus fillColor='var(--primary-clr-light)' />
            <div 
                style={{ fontSize: "12px", paddingLeft: "8px" }}
            >
                {footerText}
            </div>
        </button>
    </>  
  );
};

export default PaymentTermsTab;