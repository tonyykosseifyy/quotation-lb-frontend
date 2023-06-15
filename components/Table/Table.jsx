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
import FourArrows from "../UI/Icons/FourArrows";
import Trashcan from "../UI/Icons/Trashcan";
import Ellipsis from "../UI/Icons/Ellipsis";

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
    inputBorderColor,
    descriptionWidth,
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
                                            centerStatus || heading === "More Options"
                                                ? "center"
                                                : "",        
                                        borderBottomLeftRadius: 
                                                heading === "" && i === 0 ? "5px" : "",
                                        borderBottomRightRadius: 
                                            heading === "" 
                                            && i === headings.length - 1  ? "5px" : "",
                                            padding: (
                                                heading !== "Item" && 
                                                heading !== "Item Code" &&
                                                heading !== "Description" &&
                                                heading !== "Quantity" &&
                                                heading !== "Disc. %" &&
                                                heading !== "Unit Price" &&
                                                heading !== "Total" &&
                                                heading !== "More Options"  
                                                        ) ?  "12px 15px" :
                                                         ( heading === "More Options"? "7.5px 0px" : "12px 4.5px" ) ,                   
                                    }
                                return (
                                    <th
                                        className={styles.tableHeader}
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
                                    style={{ 
                                        borderTop: bodyBorderTop, 
                                    }}
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
                                                        padding: (
                                                            keyName !== "item" &&
                                                            keyName !== "description" &&
                                                            keyName !== "quantity" &&
                                                            keyName !== "discount" &&
                                                            keyName !== "unitPrice" &&
                                                            keyName !== "total" &&
                                                            keyName !== "moreOptions" &&
                                                            keyName !== "trash" 
                                                                ) ?  "12px 15px" :
                                                                (keyName == "moreOptions"?
                                                                "12px 60px" :  "7.5px 4.5px") ,
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
                                                    ): keyName === "arrows" ? (
                                                        <FourArrows />
                                                    ) : keyName === "item" ? (
                                                        <OrderLinesRows type={"item"} 
                                                        inputBorderColor={inputBorderColor && inputBorderColor}
                                                        />
                                                    ) : keyName === "description" ? (
                                                        <OrderLinesRows type={"description"} 
                                                        width={ descriptionWidth ? descriptionWidth : "562"} 
                                                        inputBorderColor={inputBorderColor && inputBorderColor}/>
                                                    ) : keyName === "quantity" ? (
                                                        <OrderLinesRows type={"quantity"} 
                                                        inputBorderColor={inputBorderColor && inputBorderColor}/>
                                                    ) : keyName === "discount" ? (
                                                        <OrderLinesRows type={"discount"} 
                                                        inputBorderColor={inputBorderColor && inputBorderColor}/>
                                                    )  : keyName === "unitPrice" ? (
                                                        <OrderLinesRows type={"unitPrice"} 
                                                        inputBorderColor={inputBorderColor && inputBorderColor}/>
                                                    ) : keyName === "total" ? (
                                                        <OrderLinesRows type={"total"} 
                                                        inputBorderColor={inputBorderColor && inputBorderColor}/>
                                                    ) : (
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
                                        ) : ( 
                                            Object.keys(dataRow).map((keyName, i) => 
                                                !headings.some((heading) => keyName in heading) ? 
                                                       (
                                                           dataRow[keyName] !== null ? (
                                                               <>
                                                                   <td  
                                                                        colSpan={( 
                                                                            keyName === "title" ||
                                                                            keyName === "note" || 
                                                                            keyName === "image") ? 
                                                                            columnSpan : ( keyName === "type" ? 9 : 0)}
                                                                        style={{ 
                                                                                width: "100%",
                                                                                padding: (
                                                                                    keyName !== "title" &&
                                                                                    keyName !== "image" &&
                                                                                    keyName !== "note" &&
                                                                                    keyName !== "item" &&
                                                                                    keyName !== "combo" &&
                                                                                    keyName !== "description" &&
                                                                                    keyName !== "quantity" &&
                                                                                    keyName !== "discount" &&
                                                                                    keyName !== "unitPrice" &&
                                                                                    keyName !== "total" &&
                                                                                    keyName !== "moreOptions" &&
                                                                                    keyName !== "type" &&
                                                                                    keyName !== "arrows" &&
                                                                                    keyName !== "trash" ) ? "12px 15px" : 
                                                                                    (keyName === "type" ? "30px 0px 0px 0px": 
                                                                                    (keyName === "title" ? "18px 4.5px 7.5px 4.5px" : "7.5px 4.5px" ) ),  
                                                                            }}
                                                                    >
                                                                        {keyName === "title" ? (
                                                                            <OrderLinesRows type={"title"} />
                                                                        ) 
                                                                        : keyName === "note" ? (
                                                                            <OrderLinesRows type={"note"} />
                                                                        )
                                                                         : keyName === "image" ? (
                                                                            <OrderLinesRows type={"image"} />
                                                                        ) : keyName === "type" ? (
                                                                            <OrderLinesRows type={6} /> 
                                                                        ) : keyName === "combo" ? (
                                                                            <OrderLinesRows type={"combo"} /> 
                                                                        ) 
                                                                         :   null  } 
                                                                    </td>
                                                               </>
                                                            )  : null  
                                                        ) : null
                                                )
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
                                                               <div key={id} className={`${styles.footerRow}`} >
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
