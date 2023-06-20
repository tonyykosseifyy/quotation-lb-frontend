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
  { title: "", flex: 0.70 },
  { title: "", flex: 0.5 },
];

export const createQuotationFooterElements = [
  { id: 0, name: "Title" },
  { id: 1, name: "Item" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Image" },
  { id: 4, name: "Note" },
];

export const newComboFooterElements = [
  { id: 1, name: "Item" },
];

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
        inputType: "select",
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
        inputPlaceholder: "lorem ipsumlorem ipsum",
        inputBorderColor: "var(--input-border-2)",
        placeholderWeight: 700,
        flex: 4.25,
      },
      {
        inputType: "text",
        inputName: "quantity",
        inputPlaceholder: "1.00",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputPlaceholder: "150.0",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "discount",
        inputPlaceholder: "15%",
        inputBorderColor: "var(--input-border-2)",
        textAlign: "center",
        placeholderWeight: 700,
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "total",
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
        inputType: "select",
        inputName: "item",
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
        inputPlaceholder: "lorem ipsumlorem ipsum",
        flex: 4.25,
      },
      {
        inputType: "text",
        inputName: "quantity",
        inputPlaceholder: "1.00",
        textAlign: "center",
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputPlaceholder: "150.0",
        textAlign: "center",
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "discount",
        inputPlaceholder: "15%",
        textAlign: "center",
        flex: 0.75,
      },
      {
        inputType: "text",
        inputName: "total",
        inputPlaceholder: "1.500.000",
        flex: 1.25,
      },
    ],
  },
  {
    inputs: [
      {
        flex: 9,
        customHtml: (
          <div className={`${orderLinesStyles.row}`}>
            <div className={`${orderLinesStyles.dragAndDropContainer}`}>
              <img src='/assets/svg/upload.svg' />
              <div className={`${orderLinesStyles.dragAndDropText}`}>
                Drag and Drop your image here or{" "}
                <span
                  style={{
                    color: "var(--primary-clr-light)",
                    paddingLeft: "4px",
                  }}>
                  {" "}
                  Browse
                </span>
              </div>
            </div>
          </div>
        ),
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
