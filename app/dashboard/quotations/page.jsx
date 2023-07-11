"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import Search from "@/components/UI/Search/Search";
import DataTable from "react-data-table-component";
import Clock from "@/components/UI/Icons/Clock";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import Trashcan from "@/components/UI/Icons/Trashcan";
import { formatId } from "@/helpers/formatId";
import { formatDate } from "@/helpers/formatDate";
import { Status } from "@/components/Table/Status";
import FourArrows from "@/components/UI/Icons/FourArrows";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

const Page = () => {
  const [search, setSearch] = useState("");
  const [buttonState, setButtonState] = useState("all");
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const getQuotationsResponse = useQuery({
    queryKey: ["quotations", page, perPage],
    queryFn: () =>
      axiosClient.get(`quotations`, {
        params: {
          page: page,
          perPage: perPage,
        },
      }),
    keepPreviousData: true,
  });

  const quotationsData = getQuotationsResponse.data?.data;

  useEffect(() => {
    setFilteredQuotations(quotationsData?.data);
    setTotalRows(quotationsData?.meta.total);
  }, [quotationsData?.data]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleCreateQuotation = () => {
    //
  };
  const handleExtraInfoChange = (e) => {
    setButtonState(() => e.target.value);
  };

  // const filteredQuotations = quotations.filter((quotation) => quotation.customer && quotation.customer.toLowerCase().includes(search.toLowerCase()));
  const createdAtSort = (rowA, rowB) => {
    const a = rowA.createdAtDate;
    const b = rowB.createdAtDate;

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const handleClickMoreOptions = (id) => {
    console.log(id);
  };

  const handleDeleteQuotation = (id) => {
    console.log(id);
  };

  const columns = [
    {
      name: "Number",
      maxWidth: "100px",
      selector: (row) => row.quotationNumber,
      sortable: true,
    },
    {
      name: "Creation Date",
      maxWidth: "140px",
      selector: (row) => row.createdAtDate,
      sortable: true,
      sortFunction: createdAtSort,
    },
    {
      name: "Customer",
      selector: (row) => row.client.name,
      sortable: true,
    },
    {
      name: "Salesperson",
      selector: (row) => row.salesperson.name,
      sortable: true,
    },
    {
      name: "Task",
      selector: (row) => {
        if (row.task) return row.task;
        return (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}>
            <Clock />
            No Records
          </div>
        );
      },
    },
    {
      name: "Total",
      width: "100px",
      selector: (row) => row.total,
    },
    {
      name: "Status",
      center: true,
      selector: (row) => <Status status={statusIndicator} statusText={row.status} centerStatus />,
    },
    {
      name: "More Options",
      center: true,
      selector: (row) => <Ellipsis onClick={() => handleClickMoreOptions(row.id)} />,
    },
    {
      name: "",
      width: "60px",
      center: true,
      selector: (row) => <Trashcan fillColor={"var(--primary-clr)"} onClick={() => handleDeleteQuotation(row.id)} />,
    },
  ];

  const statusIndicator = {
    pending: 0,
    sent: 1,
    cancelled: 2,
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const paginationRowsPerPageOptions = [10, 20, 50];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "var(--primary-clr)",
        color: "white",
        fontSize: "13px",
        fontWeight: 600,
        borderRadius: 5,
      },
    },
    cells: {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--table-data-text-clr)",
      },
    },
    pagination: {
      style: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>Quotations</div>
        <div>
          <Button title='Create New Quotation' fillBackground={true} rounded={true} onClick={handleCreateQuotation} />
        </div>
      </div>
      <div className={styles.searchDiv}>
        <Search
          value={search}
          placeholder='Search...'
          borderWidth={1}
          borderColor={"var(--primary-clr)"}
          borderStyle={"solid"}
          paddingLeft={25}
          paddingTop={5}
          paddingBottom={5}
          paddingRight={25}
          fillBackground={true}
          backgroundColor={"white"}
          rounded={true}
          handleSearch={handleSearch}
        />
      </div>
      <div className={`${styles.buttonsDiv}`}>
        <Button title='All Quotations' rounded={true} fillBackground={buttonState === "all"} onClick={handleExtraInfoChange} value='all' type='button' tab />
      </div>
      <DataTable
        columns={columns}
        data={filteredQuotations}
        pagination
        customStyles={customStyles}
        paginationComponentOptions={paginationComponentOptions}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        defaultSortFieldId={1}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default Page;
