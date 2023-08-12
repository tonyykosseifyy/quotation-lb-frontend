"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";
import { Dropdown } from "@nextui-org/react";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import { transactionsTableData } from "@/data/clientsAccount";

const TransactionsTab = () => {

    const [checkboxValues, setCheckboxValues] = useState({
        phoneNumber: false,
        balanceUSD: false,
        balanceLBP: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleShowHideCol = (columnName) => {
        setColumns((columns) => columns.map((column) => {
            if (column.name === columnName) {
                const updatedColumn = { ...column, isVisible: !column.isVisible };
                return updatedColumn;
            }
            return column;
        }));
    };

    const [columns, setColumns] = useState([
      {
          name: 'Date',
          selector: (row) => row.date,
          allowOverflow: true,
          width: '100px',
          isVisible: true,
      },
      {
          name: 'Serial #',
          width: '100px',
          selector: (row) => row.serialNumber,
          isVisible: true,
      },
      {
          name: 'Manual Ref',
          width: "130px",
          selector: (row) => row.manualRef,
          isVisible: true,
      },
      {
          name: 'Doctype',
          width: '110px',
          selector: (row) => row.docType,
          isVisible: true,
      },
      {
          name: 'Transaction Label',
          maxWidth: "auto",
          selector: (row) => row.transactionLabel,
          isVisible: true,
      },
      {
          name: "Currency",
          width: "100px",
          isVisible: true,
          selector: (row) => row.currency,          
      },
      {
          name: "Debit",
          width: "90px",
          isVisible: true,
          selector: (row) => row.debit,          
      },
      {
          name: "Credit",
          width: "90px",
          isVisible: true,
          selector: (row) => row.credit,          
      },
      {
          name: "Value",
          width: "90px",
          isVisible: true,
          selector: (row) => row.value,          
      },
      {
          name: 
              <>
                  <Dropdown placement="bottom-right">
                      <Dropdown.Trigger >
                          <div>
                              <img src="/assets/svg/tableIcon.svg" alt="dropdown menu with checkbox" />
                          </div>
                      </Dropdown.Trigger>
                      <Dropdown.Menu 
                          aria-label="Static Actions"
                          // closeOnSelect={false}
                          // selectionMode="multiple"
                          className={styles.dropDownMenu}
                      >
                          <Dropdown.Item key="manual_ref" className={styles.dropDownItem}> 
                            <CheckBox  
                                inputName="manualRef"
                                labelText="Manual Ref"
                                inputId="manualRef"
                                value="manualRef"
                                isChecked={checkboxValues.value}
                                onChange={(event) => { handleCheckboxChange(event); handleShowHideCol('Manual Ref')}} /> 
                          </Dropdown.Item>
                          <Dropdown.Item key="debit" className={styles.dropDownItem}>
                              <CheckBox
                                  inputName="debit"
                                  labelText="Debit"
                                  inputId="debit"
                                  value="debit"
                                  isChecked={checkboxValues.value}
                                  onChange={(event) => { handleCheckboxChange(event); handleShowHideCol('Debit'); }}
                              />
                          </Dropdown.Item>
                          <Dropdown.Item key="credit" className={styles.dropDownItem}>
                              <CheckBox
                                  inputName="credit"
                                  labelText="Credit"
                                  inputId="credit"
                                  value="credit"
                                  isChecked={checkboxValues.value}
                                  onChange={(event) => { handleCheckboxChange(event); handleShowHideCol('Credit'); }}
                              />
                          </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
              </>,
          isVisible: true,
          width: "60px",
          right: true,
      },
    ]);

    const visibleColumns = columns.filter((col) => col.isVisible === true);
  
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
                backgroundColor: "var(--table-row-babyblue-background-clr)",
            },
        },
    ];


    return (
      <>
          <DataTable
              columns={visibleColumns}
              data={transactionsTableData}
              customStyles={customStyles}
              conditionalRowStyles={conditionalRowStyles}
          />
      </>     
    );
};

export default TransactionsTab;