"use client";

import React, { useState } from "react";
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

const quotations = [
    {
        id: 1,
        createdAt: "2021-05-10",
        customer: "Malek Majzoub",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 1,
    },
    {
        id: 2,
        createdAt: "2023-04-16",
        customer: "Abed Nahouli",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 1,
    },
    {
        id: 3,
        createdAt: "2023-03-16",
        customer: "John Smith",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 2,
    },
    {
        id: 4,
        createdAt: "2023-05-16",
        customer: "Jane Doe",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 5,
        createdAt: "2023-04-18",
        customer: "Robert Downey Jr",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 6,
        createdAt: "2023-04-18",
        customer: "Chris Hemsworth",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 7,
        createdAt: "2023-04-18",
        customer: "Johnny Depp",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 8,
        createdAt: "2023-04-18",
        customer: "Johnny Depp",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 9,
        createdAt: "2023-04-18",
        customer: "John Smith",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 10,
        createdAt: "2023-04-18",
        customer: "Abed Nahouli",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 11,
        createdAt: "2023-04-18",
        customer: "Malek Majzoub",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 12,
        createdAt: "2023-04-18",
        customer: "Malek Majzoub",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
    {
        id: 13,
        createdAt: "2023-04-18",
        customer: "Malek Majzoub",
        salesperson: "Jad Al Deek",
        task: null,
        total: 1500,
        status: 0,
    },
];

const Page = () => {
    const [search, setSearch] = useState("");
    const [buttonState, setButtonState] = useState("all");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const handleCreateQuotation = () => {
        //
    };
    const handleExtraInfoChange = (e) => {
        setButtonState(() => e.target.value);
    };

    const filteredQuotations = quotations.filter(
        (quotation) =>
            quotation.customer &&
            quotation.customer.toLowerCase().includes(search.toLowerCase())
    );
    const createdAtSort = (rowA, rowB) => {
        const a = rowA.createdAt;
        const b = rowB.createdAt;

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
            name: "",
            width: "30px",
            selector: (row) => <FourArrows />,
            allowOverflow: true,
        },
        {
            name: "Number",
            maxWidth: "100px",
            selector: (row) => formatId(row.id),
            sortable: true,
        },
        {
            name: "Creation Date",
            maxWidth: "140px",
            selector: (row) => formatDate(row.createdAt, "/"),
            sortable: true,
            sortFunction: createdAtSort,
        },
        {
            name: "Customer",
            selector: (row) => row.customer,
            sortable: true,
        },
        {
            name: "Salesperson",
            selector: (row) => row.salesperson,
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
                        }}
                    >
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
            selector: (row) => (
                <Status
                    status={row.status}
                    statusText={statusText}
                    centerStatus
                />
            ),
        },
        {
            name: "More Options",
            center: true,
            selector: (row) => (
                <Ellipsis onClick={() => handleClickMoreOptions(row.id)} />
            ),
        },
        {
            name: "",
            width: "60px",
            center: true,
            selector: (row) => (
                <Trashcan
                    fillColor={"var(--primary-clr)"}
                    onClick={() => handleDeleteQuotation(row.id)}
                />
            ),
        },
    ];

    const statusText = {
        0: "Pending",
        1: "Quotation Sent",
        2: "Cancelled",
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
                    <Button
                        title="Create New Quotation"
                        fillBackground={true}
                        rounded={true}
                        onClick={handleCreateQuotation}
                    />
                </div>
            </div>
            <div className={styles.searchDiv}>
                <Search
                    value={search}
                    placeholder="Search..."
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
                <Button
                    title="All Quotations"
                    rounded={true}
                    fillBackground={buttonState === "all"}
                    onClick={handleExtraInfoChange}
                    value="all"
                    type="button"
                />
                <Button
                    title="Combos"
                    rounded={true}
                    fillBackground={buttonState === "combos"}
                    onClick={handleExtraInfoChange}
                    type="button"
                    value="combos"
                />
                <Button
                    title="Single Item"
                    rounded={true}
                    fillBackground={buttonState === "single"}
                    onClick={handleExtraInfoChange}
                    value="single"
                    type="button"
                />
            </div>

            <div className={styles.tableDiv}>
                <DataTable
                    columns={columns}
                    data={filteredQuotations}
                    pagination
                    customStyles={customStyles}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                />
            </div>
        </div>
    );
};

export default Page;
