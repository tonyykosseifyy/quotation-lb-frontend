"use client";

import React, { useState } from "react";
import styles from "./Table.module.css";
import Button from "@/components/UI/Button/Button";
import { Status } from "@/components/Table/Status";
import { formatId } from "@/helpers/formatId";
import { formatDate } from "@/helpers/formatDate";
import { formatRevenue } from "@/helpers/formatRevenue";
import Search from "@/components/UI/Search/Search";

const Table = ({
  title,
  tablePaddingTop,
  tablePaddingBottom,
  tablePaddingLeft,
  tablePaddingRight,
  tableBorderRadius,
  headingBackgroundColor,
  headingsColor,
  headingBorderTop,
  headingBorderRadius,
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
}) => {
  const [search, setSearch] = useState("");

  const filterArray = (arr) => {
    return arr.filter((obj) => {
      const searchParamKeyword = searchParam;
      if (search === "") return obj;
      return obj[searchParamKeyword].toLowerCase().includes(search.toLowerCase());
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
      }}>
      {title && (
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          {canSearch && <Search value={search} placeholder='Search' handleSearch={handleSearch} />}
        </div>
      )}
      <div className={`table-responsive ${styles.tableDiv}`} style={{ borderRadius: tableBorderRadius }}>
        <table className={`${styles.table}`}>
          <thead>
            <tr
              className={styles.headingsRow}
              data-no-details={showDetails}
              style={{
                borderTop: headingBorderTop,
                backgroundColor: headingBackgroundColor,
              }}>
              {headings.map((header, i) => {
                const heading = header[Object.keys(header)[0]].title;
                return (
                  <th
                    className={styles.tableHeader}
                    style={{
                      color: headingsColor,
                      textAlign: heading === "Status" && centerStatus ? "center" : "",
                    }}
                    key={i}>
                    {heading}
                  </th>
                );
              })}
              {showDetails && <th className={styles.hidden}>hi</th>}
              {additionalHeadings &&
                additionalHeadings.map((headerObj, i) => {
                  return (
                    <th
                      className={styles.tableHeader}
                      style={{
                        color: headingsColor,
                        textAlign: "center",
                      }}
                      key={i}>
                      {headerObj.title}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {list.map((dataRow, i) => {
              return (
                <tr key={dataRow.id ? dataRow.id : i} style={{ borderTop: bodyBorderTop }}>
                  {Object.keys(dataRow).map((keyName, i) =>
                    headings.some((heading) => keyName in heading) ? (
                      dataRow[keyName] !== null ? (
                        <td
                          className={styles.dataText}
                          key={i}
                          style={{
                            fontWeight: dataFontWeight,
                            color: dataColor,
                          }}>
                          {keyName === "id" ? (
                            formatId(dataRow[keyName])
                          ) : keyName === "dueDate" ? (
                            formatDate(dataRow[keyName], ".")
                          ) : keyName === "status" ? (
                            <Status status={dataRow[keyName]} centerStatus={centerStatus} statusText={statusText} />
                          ) : keyName === "revenue" ? (
                            (showUnit ? "$" : "") + formatRevenue(dataRow[keyName])
                          ) : keyName === "createdAt" ? (
                            showCreatedAt ? (
                              formatDate(dataRow[keyName], "/")
                            ) : (
                              ""
                            )
                          ) : (
                            dataRow[keyName]
                          )}
                        </td>
                      ) : (
                        <td
                          className={`${styles.dataText} ${styles.alignItems}`}
                          key={i}
                          style={{
                            fontWeight: dataFontWeight,
                            color: dataColor,
                          }}>
                          {headings.find((heading) => keyName in heading)?.[keyName].nullIcon && headings.find((heading) => keyName in heading)?.[keyName].nullIcon}
                          {headings.find((heading) => keyName in heading)?.[keyName].nullText && headings.find((heading) => keyName in heading)?.[keyName].nullText}
                        </td>
                      )
                    ) : null,
                  )}
                  {showDetails && (
                    <td>
                      <Button title='Details' fillBackground={false} rounded={true} fontSize={12} fontWeight={600} />
                    </td>
                  )}
                  {additionalHeadings &&
                    additionalHeadings.map((headerObj, i) => {
                      return (
                        <td
                          className={styles.dataText}
                          key={i}
                          style={{
                            fontWeight: dataFontWeight,
                            color: dataColor,
                            textAlign: "center",
                          }}>
                          {headerObj.value}
                        </td>
                      );
                    })}
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
