"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import { formatDate } from "@/helpers/formatDate";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import { renderEmptyTableCellPlaceholder } from "@/helpers/table.Helper";
import Loader from "../Loader/Loader";

const TransactionsTab = ({ debouncedSearch, selectedClient }) => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [checkboxValues, setCheckboxValues] = useState({
    date: false,
    manualReference: false,
    quotationNumber: false,
    transactionLabel: false,
    currency: false,
    total: false,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [filteredQuotations, setFilteredQuotations] = useState([]);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const paginationRowsPerPageOptions = [10, 20, 50];

  const getQuotationsResponse = useQuery({
    queryKey: ["clientQuotations", selectedClient, page, perPage, debouncedSearch],
    queryFn: () =>
      axiosClient.get(`quotations/clients/${selectedClient}`, {
        params: {
          page: page,
          perPage: perPage,
          search: debouncedSearch,
        },
      }),
    keepPreviousData: true,
  });

  const quotationsData = getQuotationsResponse.data?.data;

  const handleCheckboxChange = (name) => {
    setCheckboxValues((prevState) => {
      return {
        ...prevState,
        [name]: !prevState[name],
      };
    });
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
    router.push(Routes.ViewQuotation.replace("${id}", id));
  };

  const [columns, setColumns] = useState([
    {
      name: "Date",
      selector: (row) => (row.createdAt ? formatDate(row.createdAt.split("T")[0], "/") : renderEmptyTableCellPlaceholder()),
      allowOverflow: true,
      width: "100px",
      center: true,
      isVisible: true,
    },
    {
      name: "Serial #",
      maxWidth: "120px",
      center: true,
      selector: (row) => row.quotationNumber ?? renderEmptyTableCellPlaceholder(),
      isVisible: true,
    },
    {
      name: "Manual Reference",
      maxWidth: "150px",
      center: true,
      selector: (row) => row.manualReference ?? renderEmptyTableCellPlaceholder(),
      isVisible: true,
    },
    {
      name: "Doctype",
      width: "110px",
      center: true,
      selector: (row) => "Quotation",
      isVisible: true,
    },
    {
      name: "Transaction Label",
      maxWidth: "auto",
      center: true,
      selector: (row) => (row.quotationNumber ? `${row.quotationNumber} / ${row.client.name}` : renderEmptyTableCellPlaceholder()),
      isVisible: true,
    },
    {
      name: "Currency",
      width: "100px",
      center: true,
      isVisible: true,
      selector: (row) => row.currency?.name ?? renderEmptyTableCellPlaceholder(),
    },
    // {
    //   name: "Debit",
    //   width: "90px",
    //   isVisible: true,
    //   selector: (row) => row.debit,
    // },
    // {
    //   name: "Credit",
    //   width: "90px",
    //   isVisible: true,
    //   selector: (row) => row.credit,
    // },
    {
      name: "Value",
      width: "90px",
      isVisible: true,
      center: true,
      selector: (row) => row.total ?? renderEmptyTableCellPlaceholder(),
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
    //           closeOnSelect={false}
    //           selectionMode='multiple'
    //           className={styles.dropDownMenu}>
    //           <Dropdown.Item
    //             key='manual_ref'
    //             className={styles.dropDownItem}>
    //             <CheckBox
    //               inputName='manualRef'
    //               labelText='Manual Ref'
    //               inputId='manualRef'
    //               value='manualRef'
    //               isChecked={checkboxValues.value}
    //               onChange={() => {
    //                 handleCheckboxChange("manualReference");
    //                 handleShowHideCol("Manual Reference");
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
        backgroundColor: "var(--table-row-lightgreen-background-clr)",
      },
    },
  ];

  useEffect(() => {
    setFilteredQuotations(quotationsData?.data);
    setTotalRows(quotationsData?.meta.total);
  }, [quotationsData?.data]);

  return (
    <>
      <DataTable
        columns={visibleColumns}
        data={filteredQuotations}
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
        progressPending={getQuotationsResponse.isLoading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default TransactionsTab;
