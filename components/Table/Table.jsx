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
    headings,
    additionalHeadings,
    columnSpan,
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
    bodyPadding,
    tableFooter,
    footerPaddingLeft,
    footerMarginTop,
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
                paddingBottom: tablePaddingBottom
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
                                        paddingLeft: 
                                            heading === "Item" ? "48px" : 
                                            ( heading === "Item Code" ? "33px" : 
                                            ( heading === "Total" ? "0px" : "") ),
                                        borderBottomLeftRadius: heading === "Item" || heading === "Item Code" ? "5px" : "",
                                        borderBottomRightRadius: 
                                            (heading === "More Options" || heading === "Total") 
                                            && i === headings.length - 1  ? "5px" : "",
                                    }
                                return (
                                    <th
                                        width={headingsWidth && headingsWidth[Object.keys(header)[0]]}
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
                                                        padding: "12px 15px",
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
                                                        padding: "12px 15px",
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
                                        <td style={{padding: "12px 15px",}}>
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
                                                            padding: "12px 15px",
                                                        }}
                                                    >
                                                        {headerObj.value}
                                                    </td>
                                                );
                                            }
                                        )}
                                       {Object.keys(dataRow).map((keyName, i) => 
                                        !headings.some((heading) => keyName in heading) ? 
                                               (
                                                   dataRow[keyName] !== null ? (
                                                           <td  
                                                                colSpan={columnSpan}
                                                                style={{ 
                                                                        width: "100%",
                                                                        padding: dataRow[keyName] === 6 ? "0px" : bodyPadding,  
                                                                    }}
                                                            >
                                                               {keyName === "type" ? (
                                                                <OrderLinesRows type={dataRow[keyName]} />
                                                                ) :  null  } 
                                                            </td>
                                                        )  : null  
                                                ) : null
                                        )}          
                                </tr>       
                            );  
                        })}
                    </tbody>
                    {tableFooter && <tfoot>
                                           <tr>
                                               <td colSpan={columnSpan} style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                                   <div style={{paddingLeft: footerPaddingLeft, marginTop: footerMarginTop, display: "flex"}}>
                                                       {tableFooter.map(({ id, name}) => {
                                                           return (
                                                               <div key={id} style={{display: "flex", alignItems: "center", paddingRight: "30px"}}>
                                                                   <Plus fillColor="var(--primary-clr-light)"/> 
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
