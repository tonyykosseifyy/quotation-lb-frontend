"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { moreOptions } from "@/data/clientsAccount";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import DataTable from "react-data-table-component";
import { Dropdown } from "@nextui-org/react";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import { generalTableData } from "@/data/clientsAccount";
import { useClients } from "@/hooks/clients/useClients";
import { renderEmptyTableCellPlaceholder } from "@/helpers/table.Helper";
import Loader from "../Loader/Loader";

const GeneralTab = ({ debouncedSearch, selectedClient, setSelectedClient }) => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [checkboxValues, setCheckboxValues] = useState({
    phoneNumber: false,
    balanceUSD: false,
    balanceLBP: false,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [filteredClients, setFilteredClients] = useState([]);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const paginationRowsPerPageOptions = [10, 20, 50];

  const getClientsResponse = useClients(page, perPage, debouncedSearch);

  const clientsData = getClientsResponse.data?.data;

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleShowHideCol = (columnName) => {
    setColumns((columns) =>
      columns.map((column) => {
        if (column.name === columnName) {
          const updatedColumn = { ...column, isVisible: !column.isVisible };
          return updatedColumn;
        }
        return column;
      }),
    );
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };

  const handleRowClick = (id) => {
    setSelectedClient(id);
  };

  const [columns, setColumns] = useState([
    {
      name: "Code",
      selector: (row) => row.clientNumber ?? renderEmptyTableCellPlaceholder(),
      allowOverflow: true,
      maxWidth: "100px",
      isVisible: true,
    },
    {
      name: "Name",
      maxWidth: "auto",
      center: true,
      selector: (row) => row.name ?? renderEmptyTableCellPlaceholder(),
      isVisible: true,
    },
    {
      name: "Phone Number",
      maxWidth: "130px",
      center: true,
      selector: (row) => {
        return row.phoneNumber ? `${row.phoneCode ?? ""} ${row.phoneNumber ?? ""}` : renderEmptyTableCellPlaceholder();
      },
      right: true,
      isVisible: true,
    },
    {
      name: "Balance USD",
      maxWidth: "150px",
      center: true,
      selector: (row) => row.balanceUSD ?? renderEmptyTableCellPlaceholder(),
      right: true,
      isVisible: true,
    },
    {
      name: "Balance LBP",
      maxWidth: "150px",
      center: true,
      selector: (row) => row.balanceLBP ?? renderEmptyTableCellPlaceholder(),
      right: true,
      isVisible: true,
    },
    {
      name: "More Options",
      maxWidth: "120px",
      center: true,
      isVisible: true,
      selector: (row) => (
        <div className={styles.dropdownContainer}>
          {/* <Dropdown placement='bottom-right'>
            <Dropdown.Trigger> */}
          <div>
            <Ellipsis />
          </div>
          {/* </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label='Static Actions'
              items={moreOptions}
              onAction={(actionKey) => {}}
              className={styles.dropDownMenu}>
              {(item) => (
                <Dropdown.Item
                  key={item.key}
                  className={styles.dropDownItem}>
                  {item.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      ),
    },
    // {
    //   name: (
    //     <>
    //       <Dropdown placement='bottom-right'>
    //         <Dropdown.Trigger>
    //           <div>
    //             <img
    //               src='/assets/svg/tableIcon.svg'
    //               alt='dropdown menu with checkbox'
    //             />
    //           </div>
    //         </Dropdown.Trigger>
    //         <Dropdown.Menu
    //           aria-label='Static Actions'
    //           // closeOnSelect={false}
    //           // selectionMode="multiple"
    //           className={styles.dropDownMenu}>
    //           <Dropdown.Item
    //             key='phone_number'
    //             className={styles.dropDownItem}>
    //             <CheckBox
    //               inputName='phoneNumber'
    //               labelText='Phone Number'
    //               inputId='phoneNumber'
    //               value='phoneNumber'
    //               isChecked={checkboxValues.value}
    //               onChange={(event) => {
    //                 handleCheckboxChange(event);
    //                 handleShowHideCol("Phone Number");
    //               }}
    //             />
    //           </Dropdown.Item>
    //           <Dropdown.Item
    //             key='balance_USD'
    //             className={styles.dropDownItem}>
    //             <CheckBox
    //               inputName='balanceUSD'
    //               labelText='Balance USD'
    //               inputId='balanceUSD'
    //               value='balanceUSD'
    //               isChecked={checkboxValues.value}
    //               onChange={(event) => {
    //                 handleCheckboxChange(event);
    //                 handleShowHideCol("Balance USD");
    //               }}
    //             />
    //           </Dropdown.Item>
    //           <Dropdown.Item
    //             key='balance_LBP'
    //             className={styles.dropDownItem}>
    //             <CheckBox
    //               inputName='balanceLBP'
    //               labelText='Balance LBP'
    //               inputId='balanceLBP'
    //               value='balanceLBP'
    //               isChecked={checkboxValues.value}
    //               onChange={(event) => {
    //                 handleCheckboxChange(event);
    //                 handleShowHideCol("Balance LBP");
    //               }}
    //             />
    //           </Dropdown.Item>
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </>
    //   ),
    //   isVisible: true,
    //   width: "60px",
    //   right: true,
    // },
  ]);

  const [updateData, setUpdateData] = useState(generalTableData);
  let nextId = updateData.length + 1;

  const handleAction = (actionKey, rowId) => {
    if (actionKey === "delete") {
      setUpdateData((updateData) => updateData.filter((row) => row.id !== rowId));
    } else if (actionKey === "duplicate") {
      // Find the row with the specified ID
      let originalRow = updateData.find((row) => row.id === rowId);

      if (originalRow) {
        const newId = nextId++;

        // Clone the original row and assign a new unique ID to the cloned row
        let duplicateRow = { ...originalRow, id: newId };

        // Add the cloned row to the data array
        setUpdateData((prevData) => [...prevData, duplicateRow]);
      }
    }
  };

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
        "&:hover": {
          cursor: "pointer",
        },
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
      when: (row) => row.id === selectedClient,
      style: {
        backgroundColor: "var(--table-row-lightgreen-background-clr)",
      },
    },
  ];

  useEffect(() => {
    setFilteredClients(clientsData?.data);
    setSelectedClient(clientsData?.data[0]?.id);
    setTotalRows(clientsData?.meta.total);
  }, [clientsData?.data]);

  return (
    <>
      <DataTable
        columns={visibleColumns}
        data={filteredClients}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        defaultSortFieldId={1}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onRowClicked={(row) => {
          handleRowClick(row.id);
        }}
      />
    </>
  );
};

export default GeneralTab;
