import React from "react";
import styles from "./OrderLines.module.css";
import InputContainer from "../UI/InputContainer/InputContainer";
import Ellipsis from "../UI/Icons/Ellipsis";
import Trashcan from "../UI/Icons/Trashcan";
import FourArrows from "../UI/Icons/FourArrows";
import { useForm } from "react-hook-form";

const names = [
    { id: "title", name: "Title" },
    { id: "item", name: "Item" },
    { id: "combo", name: "Combo" },
    { id: "image", name: "Image" },
    { id: "note", name: "Note" },
];

const combo = [
    { id: 1, name: "CCTVACCS" },
    { id: 2, name: "CCTVACCS" },
    { id: 3, name: "CCTVACCS" },
];

const items = [
    { id: "item_1", name: "item 1" },
    { id: "item_2", name: "item 2" },
    { id: "item_3", name: "item 3" },
];

const OrderLinesRows = ({ type, width, inputBorderColor }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        reset,
    } = useForm();

    return (
        <>
            {type === "item" && (
                <InputContainer
                    inputBorder
                    inputPlaceholder="Item 1"
                    inputType="select"
                    inputName="item"
                    inputId="item"
                    width="107"
                    height="38"
                    //  widthUnit="px"
                    fontWeight="700"
                    fontSize="12px"
                    selectOptions={items}
                    control={control}
                    register={register}
                    inputBorderColor={inputBorderColor && inputBorderColor}
                />
            )}

            {type === "combo" && (
                <InputContainer
                    fontSize="12px"
                    fontWeight="600"
                    inputPlaceholder={
                        <div className={`${styles.row}`}>
                            <img src="/assets/svg/combo.svg" />
                            <span className={`${styles.comboPlaceheolderText}`}>
                                Combo
                            </span>
                        </div>
                    }
                    inputType="select"
                    inputName="combo"
                    inputId="combo"
                    width="107"
                    height="38"
                    // widthUnit="px"
                    selectOptions={combo}
                    control={control}
                    register={register}
                />
            )}

            {type === "description" && (
                <InputContainer
                    inputBorder
                    inputPlaceholder="lorem ipsumlorem ipsum"
                    inputType="text"
                    inputName="description"
                    inputId="description"
                    height="38"
                    width={width ? width : "562"}
                    fontWeight="700"
                    control={control}
                    register={register}
                    inputBorderColor={inputBorderColor && inputBorderColor}
                />
            )}

            {type === "quantity" && (
                <InputContainer
                    inputBorder
                    inputPlaceholder="1.00"
                    inputType="text"
                    inputName="quantity"
                    inputId="quantity"
                    width="75"
                    height="38"
                    //  widthUnit="px"
                    fontWeight="700"
                    textAlign="center"
                    control={control}
                    register={register}
                    inputBorderColor={inputBorderColor && inputBorderColor}
                />
            )}

            {type === "discount" && (
                <InputContainer
                    inputBorder
                    inputPlaceholder="15%"
                    inputType="text"
                    inputName="discount"
                    inputId="discount"
                    width="75"
                    height="38"
                    //  widthUnit="px"
                    fontWeight="700"
                    textAlign="center"
                    control={control}
                    register={register}
                    inputBorderColor={inputBorderColor && inputBorderColor}
                />
            )}

            {type === "unitPrice" && (
                <InputContainer
                    inputBorder
                    inputPlaceholder="150.0"
                    inputType="text"
                    inputName="unitPrice"
                    inputId="unitPrice"
                    width="75"
                    height="38"
                    //  widthUnit="px"
                    fontWeight="700"
                    textAlign="center"
                    control={control}
                    register={register}
                    inputBorderColor={inputBorderColor && inputBorderColor}
                />
            )}

            {type === "total" && (
                <InputContainer
                    inputBorder
                    inputPlaceholder="1.500.000"
                    inputType="text"
                    inputName="total"
                    inputId="total"
                    width="137"
                    height="38"
                    widthUnit="px"
                    fontWeight="700"
                    control={control}
                    register={register}
                    inputBorderColor={inputBorderColor && inputBorderColor}
                />
            )}

            {type === "title" && (
                <InputContainer
                    style={{ paddingTop: "10px" }}
                    inputPlaceholder="Title"
                    inputType="text"
                    inputName="title"
                    inputId="title"
                    // width="68"
                    height="38"
                    // widthUnit="vw"
                    //  width="1043"
                    width="1075"
                    // widthUnit="px"
                    // widthUnit="%"
                    control={control}
                    register={register}
                />
            )}

            {type === "note" && (
                <InputContainer
                    inputPlaceholder="Note"
                    inputType="text"
                    inputName="note"
                    inputId="note"
                    // width="68"
                    height="38"
                    // widthUnit="vw"
                    // width="1043"
                    width="1075"
                    // widthUnit="px"
                    control={control}
                    register={register}
                />
            )}

            {type === "image" && (
                <div className={`${styles.row}`}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            className={`${styles.dragAndDropContainer}`}
                            style={{ width: "1075px" }}
                        >
                            <img src="/assets/svg/upload.svg" />
                            <div className={`${styles.dragAndDropText}`}>
                                Drag and Drop your image here or{" "}
                                <span
                                    style={{
                                        color: "var(--primary-clr-light)",
                                        paddingLeft: "4px",
                                    }}
                                >
                                    {" "}
                                    Browse
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {type === 6 && (
                <hr style={{ color: "black" }} className="pb-2 pt-3" />
            )}
        </>
    );
};

export default OrderLinesRows;
