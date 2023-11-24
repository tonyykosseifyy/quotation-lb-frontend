import React, { useEffect, useState } from "react";
import InputContainer from "../UI/InputContainer/InputContainer";
import FourArrows from "@/components/UI/Icons/FourArrows";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import { createQuotationHeaderList, rowInputFlexList } from "@/data/constants";
import styles from "./OrderLines.module.css";
import { ucfirst } from "@/helpers/formatString";
import axiosClient from "@/api/axiosClient";
import debounce from "lodash.debounce";
import { calculateTotal } from "@/helpers/calculate";
import AddButton from "../UI/AddButton/AddButton";
import { useMutation } from "@tanstack/react-query";
import { storeItem } from "@/controllers/items.controller";

const permissions = {
  "edit item description in quotation": true,
  "edit item unit price in quotation": true,
  "edit combo description in quotation": true,
  "edit combo unit price in quotation": true,
};

const OrderLinesRows = ({ control, register, fields, append, remove, move, indices, isFooterShown = false, footerList, footerPaddingTop, footerPaddingLeft, tableWidth, fieldsWatch, setValue, handleQuotationTotalChange, isDisabled, action }) => {
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
    if (lineType?.name === "item") {
      return action !== "create" ? "main_code" : "mainCode";
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

  const checkAndRemoveEmptyLine = () => {
    const index = fieldsWatch.length - 1;
    const lastField = fieldsWatch[index];
    const lineType = getLineTypeByTypeId(lastField?.type);
    if ((lineType?.name === "item" && lastField.item == null) || (lineType?.name === "combo" && lastField.combo == null) || (lineType?.name === "image" && lastField.image == null)) {
      remove(index);
    }
  };

  const { mutate: mutateItem } = useMutation(storeItem, {
    onSuccess: (data, variables) => {
      const { inputName } = variables;
      setValue(inputName, data.data);
    },
  });

  const handleCreateResource = (name, resourceName, inputName) => {
    if (resourceName === "item") {
      const payload = {
        itemTypeId: 1,
        mainCode: name,
        inputName: inputName,
      };
      mutateItem(payload, { inputName });
    }
  };

  return (
    <>
      <div className={`${styles.tableDiv} overflow-auto`}>
        <div
          className={`overflow-auto`}
          style={{ width: tableWidth }}>
          <div className={`${styles.headerLayout}`}>
            {createQuotationHeaderList.map((header, index) => (
              <span
                key={index}
                style={{ flex: header.flex }}>
                {header.title}
              </span>
            ))}
          </div>
          <div className={`${styles.rowsLayout} mt-3`}>
            <ul
              id='itemRows'
              className={`${styles.itemRows}`}>
              {fields?.map((field, fieldIdx) => {
                return (
                  <li
                    key={field.id}
                    id={fieldIdx}>
                    <div className={`${styles.singleItemRow} d-flex align-items-center`}>
                      <span
                        className='sortHandle'
                        style={{
                          flex: 0.3,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        <FourArrows />
                      </span>
                      {rowInputFlexList[field.type - 1].inputs.map((input, index) => {
                        const inpType = action === "view" && (input.inputName === "item" || input.inputName === "combo") ? "select" : input.inputType;
                        return (
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
                                inputType={inpType}
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
                                  action !== "create"
                                    ? inpType === "image" || inpType === "select"
                                      ? field[input.inputName]
                                      : undefined
                                    : input.inputName === "total"
                                    ? handleTotal(fieldsWatch[fieldIdx][input.inputName], fieldsWatch[fieldIdx][input.referenceKeyUnitPrice], fieldsWatch[fieldIdx]["quantity"], fieldsWatch[fieldIdx]["discount"])
                                    : input.referenceKey != null
                                    ? fieldsWatch[fieldIdx][input.referenceKey]
                                    : null
                                }
                                defaultValue={input.defaultValue}
                                isDisabled={isDisabled || input.isDisabled || (input.permission && !permissions[input.permission])}
                                setValue={setValue}
                                referenceInput={fieldsWatch[fieldIdx][input.referenceKey]}
                                referenceKey={input.referenceKey}
                                inputKey={input.inputKey}
                                onCreateOption={(name) => handleCreateResource(name, input.inputName, `orderLines.${fieldIdx}.${input.inputName}`)}
                              />
                            )}
                          </span>
                        );
                      })}
                      <>
                        <span
                          style={{
                            flex: 0.7,
                            textAlign: "center",
                          }}>
                          {!isDisabled && <Ellipsis />}
                        </span>
                        <span
                          style={{
                            flex: 0.5,
                            textAlign: "center",
                          }}>
                          {!isDisabled && (
                            <Trashcan
                              onClick={() => {
                                remove(fieldIdx);
                              }}
                              fillColor={"var(--primary-clr)"}
                            />
                          )}
                        </span>
                      </>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {isFooterShown && !isDisabled ? (
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
                      if (fieldsWatch.length > 0) {
                        checkAndRemoveEmptyLine();
                      }
                      append({ type: id });
                    }}
                    className={`${styles.footerRow}`}>
                    <AddButton label={ucfirst(name)} />
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
