import React from "react";
import InputContainer from "../UI/InputContainer/InputContainer";
import FourArrows from "@/components/UI/Icons/FourArrows";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import Plus from "@/components/UI/Icons/Plus";
import { createQuotationFooterElements, createQuotationHeaderList, rowInputFlexList } from "@/data/constants";
import styles from "./OrderLines.module.css";

const OrderLinesRows = ({ control, register, itemListState, isFooterShown = false, footerList, footerPaddingTop, footerPaddingLeft, tableWidth }) => {
  const [itemList, setItemList] = itemListState;
  return (
    <>
      <div className={`${styles.tableDiv} overflow-auto`}>
        <div className={`overflow-auto`} style={{ width: tableWidth }}>
          <div className={`${styles.headerLayout}`}>
            {createQuotationHeaderList.map((header) => (
              <span style={{ flex: header.flex }}>{header.title}</span>
            ))}
          </div>
          <div className={`${styles.rowsLayout} mt-3`}>
            <ul id='itemRows' className={`${styles.itemRows}`}>
              {itemList.map((item, itemIdx) => (
                <li>
                  <div className={`${styles.singleItemRow} d-flex align-items-center`}>
                    <span
                      style={{
                        flex: 0.3,
                      }}>
                      <FourArrows />
                    </span>
                    {rowInputFlexList[item.type].inputs.map((input, index) => (
                      <span
                        style={{
                          flex: input.flex,
                          paddingRight: index === rowInputFlexList[item.type].inputs.length - 1 ? "0px" : "5px",
                        }}>
                        {input.customHtml ? (
                          input.customHtml
                        ) : (
                          <InputContainer
                            placeholderColor
                            placeholderStyle
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
                            control={control}
                            register={register}
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
                          itemList.splice(itemIdx, 1);
                          setItemList([...itemList]);
                        }}
                        fillColor={"var(--primary-clr)"}
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {isFooterShown ? (
            <div
              style={{
                display: "flex",
                padding: "16px 0px",
                paddingLeft: footerPaddingLeft,
                paddingTop: footerPaddingTop,
              }}>
              {footerList.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setItemList([...itemList, { type: id }]);
                    }}
                    className={`${styles.footerRow}`}>
                    <Plus fillColor='var(--primary-clr-light)' />
                    <div
                      style={{
                        fontSize: "12px",
                        paddingLeft: "8px",
                      }}>
                      {name}
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
