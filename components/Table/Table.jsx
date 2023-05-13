"use client";

import React, { memo, useEffect, useState } from "react";
import styles from "./Table.module.css";
import Button from "@/components/UI/Button/Button";
import { Status } from "@/components/Table/Status";
import { formatId } from "@/helpers/formatId";
import { formatDate } from "@/helpers/formatDate";
import { formatRevenue } from "@/helpers/formatRevenue";

const Table = ({
    title,
    headings,
    data,
    canSearch = false,
    searchParam = null,
    showDetails = false,
    showUnit = false,
    centerStatus = false,
    showCreatedAt = false,
}) => {
    const [search, setSearch] = useState("");
    let list = filterArray(data);

    function filterArray(arr) {
        return arr.filter((obj) => {
            const searchParamKeyword = searchParam;
            if (search === "") return obj;
            return obj[searchParamKeyword]
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {canSearch && (
                    <div className={styles.searchInputDiv}>
                        <input
                            value={search}
                            type="search"
                            onChange={handleSearch}
                            className={styles.searchInput}
                            placeholder="Search"
                        />
                    </div>
                )}
            </div>
            <div className={`table-responsive ${styles.tableDiv}`}>
                <table className={styles.table}>
                    <thead>
                        <tr
                            className={styles.headingsRow}
                            data-no-details={showDetails}
                        >
                            {headings.map((header, i) => {
                                return (
                                    <th className={styles.tableHeader} key={i}>
                                        {header}
                                    </th>
                                );
                            })}
                            {showDetails && (
                                <th className={styles.hidden}>hi</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((dataRow, i) => {
                            return (
                                <tr
                                    key={dataRow.id ? dataRow.id : i}
                                    className={styles.bodyRow}
                                >
                                    {Object.keys(dataRow).map((keyName, i) => (
                                        <td className={styles.dataText} key={i}>
                                            {keyName === "id" ? (
                                                formatId(dataRow[keyName])
                                            ) : keyName === "dueDate" ? (
                                                formatDate(dataRow[keyName])
                                            ) : keyName === "status" ? (
                                                <Status
                                                    status={dataRow[keyName]}
                                                    centerStatus={centerStatus}
                                                />
                                            ) : keyName === "revenue" ? (
                                                (showUnit ? "$" : "") +
                                                formatRevenue(dataRow[keyName])
                                            ) : keyName === "createdAt" &&
                                              !showCreatedAt ? (
                                                ""
                                            ) : (
                                                dataRow[keyName]
                                            )}
                                        </td>
                                    ))}
                                    {showDetails && (
                                        <td>
                                            <Button
                                                title="Details"
                                                fillBackground={false}
                                                rounded={true}
                                                fontSize={12}
                                                fontWeight={600}
                                            />
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
