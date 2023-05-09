"use client";

import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Button from "@/components/UI/Button/Button";
import { Status } from "@/components/Table/Status";
import { formatId } from "@/helpers/formatId";
import { formatDate } from "@/helpers/formatDate";

const Table = (props) => {
    const [state, setState] = useState({
        query: "",
        list: props.data,
    });
    const handleSearch = (e) => {
        setState((prevState) => {
            let results = [];
            if (e.target.value === "") results = props.data;
            else {
                results = prevState.list.filter((data) => {
                    const searchParam = props.searchParam;
                    if (e.target.value === "") return props.data;
                    return data[searchParam]
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                });
            }
            return {
                query: e.target.value,
                list: results,
            };
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>{props.title}</div>
                {props.canSearch && (
                    <div className={styles.searchInputDiv}>
                        <input
                            value={state.query}
                            type="search"
                            onChange={handleSearch}
                            className={styles.searchInput}
                            placeholder="Search"
                        />
                    </div>
                )}
            </div>
            <div className={styles.tableDiv}>
                <table className={styles.table}>
                    <thead>
                        <tr
                            className={styles.headingsRow}
                            data-no-details={props.showDetails}
                        >
                            {props.headings.map((header, i) => {
                                return (
                                    <th className={styles.tableHeader} key={i}>
                                        {header}
                                    </th>
                                );
                            })}
                            <th className={styles.hidden}>hi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.list.map((dataRow) => {
                            return (
                                <tr key={dataRow.id} className={styles.bodyRow}>
                                    {Object.keys(dataRow).map((keyName, i) => (
                                        <td className={styles.dataText} key={i}>
                                            {keyName === "id" ? (
                                                formatId(dataRow[keyName])
                                            ) : keyName === "dueDate" ? (
                                                formatDate(dataRow[keyName])
                                            ) : keyName === "status" ? (
                                                <Status
                                                    status={dataRow[keyName]}
                                                    centerStatus={
                                                        props.centerStatus
                                                    }
                                                />
                                            ) : keyName === "revenue" &&
                                              props.showUnit ? (
                                                `$` + dataRow[keyName]
                                            ) : (
                                                dataRow[keyName]
                                            )}
                                        </td>
                                    ))}
                                    {props.showDetails && (
                                        <td>
                                            <Button
                                                title="Details"
                                                fillBackground={false}
                                                rounded={true}
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
