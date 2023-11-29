import { dummyItems } from "./dummyItems";

import orderLinesStyles from "@/components/Table/OrderLines.module.css";

export const createQuotationHeaderList = [
  { title: "", flex: 0.3 },
  { title: "Item Code", flex: 1 },
  { title: "Description", flex: 4.25 },
  { title: "Quantity", flex: 0.75 },
  { title: "Unit Price", flex: 0.75 },
  { title: "Disc %", flex: 0.75 },
  { title: "Total", flex: 1.25 },
  { title: "", flex: 0.7 },
  { title: "", flex: 0.5 },
];

export const createQuotationFooterElements = [
  { id: 0, name: "Title" },
  { id: 1, name: "Item" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Image" },
  { id: 4, name: "Note" },
];

export const newComboFooterElements = [{ id: 1, name: "Item" }];

/**
 * 0: title
 * 1: item
 * 2: combo
 * 3: image
 * 4: note
 */
export const rowInputFlexList = [
  {
    inputs: [
      {
        inputType: "text",
        inputName: "title",
        flex: 9,
      },
    ],
  },
  {
    inputs: [
      {
        inputType: "asyncCreatableSelect",
        inputName: "item",
        inputBorderColor: "var(--input-border-2)",
        placeholderWeight: 700,
        inputfontWeight: 700,
        selectOptions: dummyItems,
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "description",
        inputKey: "mainDescription",
        referenceKey: "item",
        permission: "edit item description in quotation",
        inputBorderColor: "var(--input-border-2)",
        inputValue: "",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 4.25,
      },
      {
        inputType: "text",
        inputName: "quantity",
        inputKey: "quantity",
        referenceKey: "item",
        defaultValue: 1,
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputKey: "unitPrice",
        referenceKey: "item",
        permission: "edit item unit price in quotation",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "discount",
        defaultValue: 0,
        referenceKey: "item",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "total",
        isDisabled: true,
        referenceKeyUnitPrice: "unitPrice",
        inputBorderColor: "var(--input-border-2)",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 1.25,
      },
    ],
  },
  {
    inputs: [
      {
        inputType: "async-select",
        inputName: "combo",
        // inputPlaceholder: (
        //   <div className={`${orderLinesStyles.row}`}>
        //     <img src='/assets/svg/combo.svg' />
        //     <span className={`${orderLinesStyles.comboPlaceheolderText}`}> Combo</span>
        //   </div>
        // ),
        selectOptions: dummyItems,
        placeholderWeight: 600,
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "description",
        inputKey: "description",
        referenceKey: "combo",
        permission: "edit combo description in quotation",
        flex: 4.25,
      },
      {
        inputType: "text",
        inputName: "quantity",
        defaultValue: 1,
        referenceKey: "combo",
        textAlign: "center",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputKey: "total",
        referenceKey: "combo",
        permission: "edit combo unit price in quotation",
        // isDisabled: true,
        textAlign: "center",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "discount",
        referenceKey: "combo",
        defaultValue: 0,
        textAlign: "center",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "total",
        isDisabled: true,
        referenceKeyUnitPrice: "unitPrice",
        placeholderWeight: 700,
        inputfontWeight: 700,
        flex: 1.25,
      },
    ],
  },
  {
    inputs: [
      {
        inputType: "image",
        inputName: "image",
        flex: 9,
      },
    ],
  },
  {
    inputs: [
      {
        inputType: "textarea",
        inputName: "note",
        flex: 9,
      },
    ],
  },
];

export const MAX_ITEM_GROUPS = 7;
export const numbering = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
};

export const VAT = 0.11;
export const VAT_LEB_RATE = 85300;
