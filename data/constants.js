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
        inputPlaceholder: "Title",
        flex: 9,
      },
    ],
  },
  {
    inputs: [
      {
        inputType: "async-select",
        inputName: "item",
        inputPlaceholder: "Item 1",
        inputBorderColor: "var(--input-border-2)",
        placeholderWeight: 700,
        selectOptions: dummyItems,
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "description",
        inputKey: "mainDescription",
        referenceKey: "item",
        permission: "edit item description in quotation",
        inputPlaceholder: "lorem ipsumlorem ipsum",
        inputBorderColor: "var(--input-border-2)",
        inputValue: "",
        placeholderWeight: 700,
        flex: 4.25,
      },
      {
        inputType: "text",
        inputName: "quantity",
        inputKey: "quantity",
        referenceKey: "item",
        inputPlaceholder: "1.00",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputKey: "unitPrice",
        referenceKey: "item",
        permission: "edit item unit price in quotation",
        inputPlaceholder: "150.0",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "discount",
        defaultValue: 0,
        referenceKey: "item",
        inputPlaceholder: "15%",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "total",
        isDisabled: true,
        referenceKeyUnitPrice: "unitPrice",
        inputPlaceholder: "1.500.000",
        inputBorderColor: "var(--input-border-2)",
        placeholderWeight: 700,
        flex: 1.25,
      },
    ],
  },
  {
    inputs: [
      {
        inputType: "async-select",
        inputName: "combo",
        inputPlaceholder: (
          <div className={`${orderLinesStyles.row}`}>
            <img src='/assets/svg/combo.svg' />
            <span className={`${orderLinesStyles.comboPlaceheolderText}`}> Combo</span>
          </div>
        ),
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
        inputPlaceholder: "lorem ipsumlorem ipsum",
        flex: 4.25,
      },
      {
        inputType: "text",
        inputName: "quantity",
        defaultValue: 1,
        referenceKey: "combo",
        inputPlaceholder: "1.00",
        textAlign: "center",
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputKey: "total",
        referenceKey: "combo",
        permission: "edit combo unit price in quotation",
        inputPlaceholder: "150.0",
        textAlign: "center",
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "discount",
        referenceKey: "combo",
        defaultValue: 0,
        inputPlaceholder: "15%",
        textAlign: "center",
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "total",
        isDisabled: true,
        referenceKeyUnitPrice: "total",
        inputPlaceholder: "1.500.000",
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
        inputType: "text",
        inputName: "note",
        inputPlaceholder: "Note",
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
