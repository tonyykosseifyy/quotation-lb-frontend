"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import Search from "@/components/UI/Search/Search";
import { tableHeadings1 } from "@/data/tableData";
import Table from "@/components/Table/Table";
import Clock from "@/components/UI/Icons/Clock";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import Trashcan from "@/components/UI/Icons/Trashcan";

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

    const tableHeadings = [
        {
            id: { title: "Number" },
        },
        {
            createdAt: { title: "Creation Date" },
        },
        {
            customer: { title: "Customer" },
        },
        {
            salesperson: { title: "Salesperson" },
        },
        {
            task: {
                title: "Task",
                nullIcon: <Clock />,
                nullText: "No Records",
            },
        },
        {
            total: { title: "Total" },
        },
        {
            status: { title: "Status" },
        },
    ];

    const additionalHeadings = [
        {
            title: "More Options",
            value: <Ellipsis />,
        },
        {
            title: "",
            value: <Trashcan fillColor={"var(--primary-clr)"} />,
        },
    ];

    const tableData = [
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
            customer: "Malek Majzoub",
            salesperson: "Jad Al Deek",
            task: null,
            total: 1500,
            status: 1,
        },
    ];

    const statusText = {
        0: "Pending",
        1: "Quotation Sent",
        2: "Cancelled",
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
                    fontStyle={"italic"}
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
                <Table
                    tablePaddingBottom={0}
                    tablePaddingLeft={0}
                    tablePaddingRight={0}
                    tablePaddingTop={0}
                    tableBorderRadius={8}
                    headingBackgroundColor={"var(--primary-clr)"}
                    headingsColor={"white"}
                    headingBorderRadius={5}
                    headings={tableHeadings}
                    additionalHeadings={additionalHeadings}
                    data={tableData}
                    dataFontWeight={700}
                    dataColor={"var(--table-data-text-clr)"}
                    showCreatedAt={true}
                    centerStatus={true}
                    statusText={statusText}
                />
            </div>
        </div>
    );
};

export default Page;
