"use client";

import React, { useState } from "react";
import styles from "./Table.module.css";
import Button from "@/components/UI/Button/Button";
import { Status } from "@/components/Table/Status";
import { formatId } from "@/helpers/formatId";
import { formatDate } from "@/helpers/formatDate";
import { formatRevenue } from "@/helpers/formatRevenue";
import Search from "@/components/UI/Search/Search";
import { head } from "axios";
import OrderLinesRows from "./OrderLines";
import Plus from "../UI/Icons/Plus";
// import { Row1 } from "./OrderLines";

const Table = ({
    title,
    tablePaddingTop,
    tablePaddingBottom,
    tablePaddingLeft,
    tablePaddingRight,
    tableBorderRadius,
    headingBackgroundColor,
    headingsColor,
    headingsFontSize,
    headingsFontWeight,
    headingBorderTop,
    headingBorderBottom,
    headingBorderRadius,
    headingsWidth,
    headingsLeftPadding,
    headings,
    additionalHeadings,
    data,
    dataFontWeight,
    dataColor,
    bodyBorderTop,
    canSearch = false,
    searchParam = null,
    showDetails = false,
    showUnit = false,
    centerStatus = false,
    statusText,
    showCreatedAt = false,
    tableFooter,
}) => {
    const [search, setSearch] = useState("");

    const filterArray = (arr) => {
        return arr.filter((obj) => {
            const searchParamKeyword = searchParam;
            if (search === "") return obj;
            return obj[searchParamKeyword]
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    };

    let list = filterArray(data);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div
            className={styles.container}
            style={{
                paddingTop: tablePaddingTop,
                paddingBottom: tablePaddingBottom,
                paddingLeft: tablePaddingLeft,
                paddingRight: tablePaddingRight,
                borderRadius: tableBorderRadius,
            }}
        >
            {title && (
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    {canSearch && (
                        <Search
                            value={search}
                            placeholder="Search"
                            handleSearch={handleSearch}
                        />
                    )}
                </div>
            )}
            <div
                className={`table-responsive ${styles.tableDiv}`}
                style={{ borderRadius: tableBorderRadius }}
            >
                <table className={`${styles.table}`}>
                    <thead>
                        <tr
                            className={styles.headingsRow}
                            data-no-details={showDetails}
                            style={{
                                borderRadius: headingBorderRadius,
                                borderTop: headingBorderTop,
                                borderBottom: headingBorderBottom,
                                backgroundColor: headingBackgroundColor,
                            }}
                        >
                            {headings.map((header, i) => {
                                const heading =
                                    header[Object.keys(header)[0]].title;
                                    const headerStyle={
                                        color: headingsColor,
                                        fontSize: headingsFontSize,
                                        fontWeight: headingsFontWeight,
                                        textAlign:
                                            heading === "Status" &&
                                            centerStatus
                                                ? "center"
                                                : "",  
                                        width: headingsWidth && headingsWidth[Object.keys(header)[0]],
                                        paddingLeft: headingsLeftPadding && headingsLeftPadding[Object.keys(header)[0]],
                                    }

                                return (
                                    <th
                                        className={styles.tableHeader}
                                        // style={{
                                        //     color: headingsColor,
                                        //     fontSize: headingsFontSize,
                                        //     fontWeight: headingsFontWeight,
                                        //     textAlign:
                                        //         heading === "Status" &&
                                        //         centerStatus
                                        //             ? "center"
                                        //             : "",  
                                        //     // paddingLeft: heading === "item" ? "10px" : "48px",
                                        // }}
                                        style={headerStyle}
                                        key={i}
                                    >
                                        {heading}
                                    </th>
                                );
                            })}
                            {showDetails && (
                                <th className={styles.hidden}>hi</th>
                            )}
                            {additionalHeadings &&
                                additionalHeadings.map((headerObj, i) => {
                                    return (
                                        <th
                                            className={styles.tableHeader}
                                            style={{
                                                color: headingsColor,
                                                textAlign: "center",
                                            }}
                                            key={i}
                                        >
                                            {headerObj.title}
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((dataRow, i) => {
                            return (
                                <>
                                <tr
                                    key={dataRow.id ? dataRow.id : i}
                                    style={{ borderTop: bodyBorderTop }}
                                >
                                    {Object.keys(dataRow).map((keyName, i) =>
                                        headings.some(
                                            (heading) => keyName in heading
                                        ) ? (
                                            dataRow[keyName] !== null ? (
                                                <td
                                                    className={styles.dataText}
                                                    key={i}
                                                    style={{
                                                        fontWeight:
                                                            dataFontWeight,
                                                        color: dataColor,
                                                    }}
                                                >
                                                    {keyName === "id" ? (
                                                        formatId(
                                                            dataRow[keyName]
                                                        )
                                                    )  : keyName ===
                                                      "dueDate" ? (
                                                        formatDate(
                                                            dataRow[keyName],
                                                            "."
                                                        )
                                                    ) : keyName === "status" ? (
                                                        <Status
                                                            status={
                                                                dataRow[keyName]
                                                            }
                                                            centerStatus={
                                                                centerStatus
                                                            }
                                                            statusText={
                                                                statusText
                                                            }
                                                        />
                                                    ) : keyName ===
                                                      "revenue" ? (
                                                        (showUnit ? "$" : "") +
                                                        formatRevenue(
                                                            dataRow[keyName]
                                                        )
                                                    ) : keyName ===
                                                      "createdAt" ? (
                                                        showCreatedAt ? (
                                                            formatDate(
                                                                dataRow[
                                                                    keyName
                                                                ],
                                                                "/"
                                                            )
                                                        ) : (
                                                            ""
                                                        )
                                                    ): (
                                                        dataRow[keyName] 
                                                    )}
                                                </td>
                                            ) : (
                                                <td
                                                    className={`${styles.dataText} ${styles.alignItems}`}
                                                    key={i}
                                                    style={{
                                                        fontWeight:
                                                            dataFontWeight,
                                                        color: dataColor,
                                                    }}
                                                >
                                                    {headings.find(
                                                        (heading) =>
                                                            keyName in heading
                                                    )?.[keyName].nullIcon &&
                                                        headings.find(
                                                            (heading) =>
                                                                keyName in
                                                                heading
                                                        )?.[keyName].nullIcon}
                                                    {headings.find(
                                                        (heading) =>
                                                            keyName in heading
                                                    )?.[keyName].nullText &&
                                                        headings.find(
                                                            (heading) =>
                                                                keyName in
                                                                heading
                                                        )?.[keyName].nullText}
                                                </td>
                                            )
                                        ) : ( null
                                        )
                                    )}
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
                                    {additionalHeadings &&
                                        additionalHeadings.map(
                                            (headerObj, i) => {
                                                return (
                                                    <td
                                                        className={
                                                            styles.dataText
                                                        }
                                                        key={i}
                                                        style={{
                                                            fontWeight:
                                                                dataFontWeight,
                                                            color: dataColor,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {headerObj.value}
                                                    </td>
                                                );
                                            }
                                        )}
                                </tr> 
                                {Object.keys(dataRow).map((keyName, i) => { 
                                             if ( !headings.some((heading) => keyName in heading) || headings.some((heading) => keyName in heading)
                                                    && dataRow[keyName] !== null) 
                                                    return ( 
                                                        <tr 
                                                            key={dataRow.id ? dataRow.id : i}
                                                            style={{ borderTop: bodyBorderTop, width: "100%", display:"flex", flexDirection: "column" }}
                                                        > 
                                                            <td 
                                                                colSpan={7} 
                                                                key={i}
                                                                style={{ width: "100%", padding: "0px 15px !important", }}
                                                            >
                                                            <OrderLinesRows type={keyName}/> 
                                                            </td>
                                                       </tr>
                                                    ) 
                                        }   
                                )}                 
                                  
                                      
                                </>     
                            );  
                        })}
                    </tbody>
                    {tableFooter && <tfoot>
                                           <tr>
                                               <td colSpan={7}>
                                                   <div style={{paddingLeft: "35px", marginTop: "51px", display: "flex"}}>
                                                       {tableFooter.map(({ id, name}) => {
                                                           return (
                                                               <div key={id} style={{display: "flex", alignItems: "center", paddingRight: "30px"}}>
                                                                   <Plus fillColor={"#0071BC"}/> 
                                                                   <div style={{fontSize: "12px", paddingLeft: "8px"}}>
                                                                       {name}
                                                                   </div>
                                                               </div>  
                                                            )
                                                       })}
                                                  </div> 
                                              </td> 
                                         </tr>
                                    </tfoot>
                     }
                </table>
            </div>
        </div>
    );
};

export default Table;
