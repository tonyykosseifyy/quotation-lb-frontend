import React, { useEffect, useState } from "react";
import InputContainer from "../UI/InputContainer/InputContainer";
import FourArrows from "@/components/UI/Icons/FourArrows";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import Plus from "@/components/UI/Icons/Plus";
import { createQuotationHeaderList, rowInputFlexList } from "@/data/constants";
import styles from "./OrderLines.module.css";
import { ucfirst } from "@/helpers/formatString";
import axiosClient from "@/api/axiosClient";
import debounce from "lodash.debounce";
import { calculateTotal } from "@/helpers/calculate";

const permissions = {
  "edit item description in quotation": true,
  "edit item unit price in quotation": true,
  "edit combo description in quotation": true,
  "edit combo unit price in quotation": true,
};

const OrderLinesRows = ({ control, register, fields, append, remove, move, indices, isFooterShown = false, footerList, footerPaddingTop, footerPaddingLeft, tableWidth, fieldsWatch, setValue, handleQuotationTotalChange }) => {
  useEffect(() => {
    if (indices?.oldIndex) {
      move(indices.oldIndex, indices.newIndex);
    }
  }, [indices]);

  const getLineTypeByTypeId = (type) => {
    return footerList.find((obj) => obj.id === type);
  };

  const getOptionName = (type) => {
    const lineType = getLineTypeByTypeId(type);
    if (lineType.name === "item") {
      return "mainCode";
    } else if (lineType.name === "combo") {
      return "code";
    }
  };

  const handleTotal = (oldTotal, unitPrice, quantity, discount) => {
    if (unitPrice == null || quantity == null) return 0;
    if (oldTotal != null) {
      handleQuotationTotalChange("subtract", oldTotal);
    }
    const newTotal = calculateTotal(unitPrice, quantity, discount);
    handleQuotationTotalChange("add", newTotal);

    return newTotal;
  };

  const loadItemOptions = (inputValue, callback) => {
    debouncedLoadItemOptions(inputValue, callback);
  };
  const debouncedLoadItemOptions = debounce(async (inputValue, callback) => {
    const response = await axiosClient.get(`items`, {
      params: {
        isPaginated: false,
        search: inputValue,
      },
    });

    const data = await response.data.data;

    callback(data);
  }, 500);

  const loadComboOptions = (inputValue, callback) => {
    debouncedLoadComboOptions(inputValue, callback);
  };
  const debouncedLoadComboOptions = debounce(async (inputValue, callback) => {
    const response = await axiosClient.get(`combos`, {
      params: {
        isPaginated: false,
        search: inputValue,
      },
    });
    const data = await response.data.data;

    callback(data);
  }, 500);

  return (
    <>
      <div className={`${styles.tableDiv} overflow-auto`}>
        <div className={`overflow-auto`} style={{ width: tableWidth }}>
          <div className={`${styles.headerLayout}`}>
            {createQuotationHeaderList.map((header, index) => (
              <span key={index} style={{ flex: header.flex }}>
                {header.title}
              </span>
            ))}
          </div>
          <div className={`${styles.rowsLayout} mt-3`}>
            <ul id='itemRows' className={`${styles.itemRows}`}>
              {fields?.map((field, fieldIdx) => {
                return (
                  <li key={field.id} id={fieldIdx}>
                    <div className={`${styles.singleItemRow} d-flex align-items-center`}>
                      <span
                        style={{
                          flex: 0.3,
                        }}>
                        <FourArrows />
                      </span>
                      {rowInputFlexList[field.type - 1].inputs.map((input, index) => (
                        <span
                          key={index}
                          style={{
                            flex: input.flex,
                            paddingRight: index === rowInputFlexList[field.type - 1].inputs.length - 1 ? "0px" : "5px",
                          }}>
                          {input.customHtml ? (
                            input.customHtml
                          ) : (
                            <InputContainer
                              placeholderColor
                              placeholderStyle
                              inputfontWeight={input.inputfontWeight}
                              inputBorderColor={input.inputBorderColor}
                              placeholderWeight={input.placeholderWeight}
                              inputPlaceholder={input.inputPlaceholder}
                              textAlign={input.textAlign}
                              inputType={input.inputType}
                              inputName={input.inputName}
                              inputId={input.inputName}
                              width='100'
                              height='100'
                              heightUnit='%'
                              widthUnit='%'
                              fontWeight='700'
                              fontSize='12px'
                              selectOptions={input.selectOptions}
                              optionName={getOptionName(field.type)}
                              control={control}
                              register={register}
                              registerArrayName={"orderLines"}
                              registerArrayKey={input.inputName}
                              registerArrayIndex={fieldIdx}
                              loadOptions={input.inputName === "item" ? loadItemOptions : loadComboOptions}
                              isSearchable={input.isSearchable}
                              initialValue={
                                input.inputName === "total"
                                  ? handleTotal(fieldsWatch[fieldIdx][input.inputName], fieldsWatch[fieldIdx][input.referenceKeyUnitPrice], fieldsWatch[fieldIdx]["quantity"], fieldsWatch[fieldIdx]["discount"])
                                  : input.referenceKey != null
                                  ? fieldsWatch[fieldIdx][input.referenceKey]
                                  : null
                              }
                              defaultValue={input.defaultValue}
                              isDisabled={input.isDisabled || (input.permission && !permissions[input.permission])}
                              setValue={setValue}
                              referenceInput={fieldsWatch[fieldIdx][input.referenceKey]}
                              referenceKey={input.referenceKey}
                              inputKey={input.inputKey}
                            />
                          )}
                        </span>
                      ))}
                      <span
                        style={{
                          flex: 0.7,
                          textAlign: "center",
                        }}>
                        <Ellipsis />
                      </span>
                      <span
                        style={{
                          flex: 0.5,
                          textAlign: "center",
                        }}>
                        <Trashcan
                          onClick={() => {
                            remove(fieldIdx);
                          }}
                          fillColor={"var(--primary-clr)"}
                        />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {isFooterShown ? (
            <div
              style={{
                display: "flex",
                padding: "16px 0px",
                paddingLeft: footerPaddingLeft,
                paddingTop: footerPaddingTop,
                gap: 30,
              }}>
              {footerList.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      append({ type: id });
                    }}
                    className={`${styles.footerRow}`}>
                    <Plus fillColor='var(--primary-clr-light)' />
                    <div
                      style={{
                        fontSize: "12px",
                        paddingLeft: "8px",
                      }}>
                      {ucfirst(name)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderLinesRows;
