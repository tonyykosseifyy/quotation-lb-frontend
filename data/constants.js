import { dummyItems } from "./dummyItems";

import orderLinesStyles from "@/components/Table/OrderLines.module.css";

export const createQuotationHeaderList = [
  { title: "", flex: 0.5 },
  { title: "Item Code", flex: 1.5 },
  { title: "Description", flex: 3.5 },
  { title: "Quantity", flex: 1 },
  { title: "Unit Price", flex: 1 },
  { title: "Disc %", flex: 1 },
  { title: "Total", flex: 1 },
  { title: "", flex: 1 },
  { title: "", flex: 0.5 },
];

export const createQuotationFooterElements = [
  { id: 0, name: "Title" },
  { id: 1, name: "Item" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Image" },
  { id: 4, name: "Note" },
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
        selectOptions: dummyItems,
        flex: 1.5,
      },
      {
        inputType: "text",
        inputName: "description",
        inputPlaceholder: "lorem ipsumlorem ipsum",
        flex: 3.5,
      },
      {
        inputType: "text",
        inputName: "quantity",
        inputPlaceholder: "1.00",
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputPlaceholder: "150.0",
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "discount",
        inputPlaceholder: "15%",
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "total",
        inputPlaceholder: "1.500.000",
        flex: 1,
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
        flex: 1.5,
      },
      {
        inputType: "text",
        inputName: "description",
        inputPlaceholder: "lorem ipsumlorem ipsum",
        flex: 3.5,
      },
      {
        inputType: "text",
        inputName: "quantity",
        inputPlaceholder: "1.00",
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "unitPrice",
        inputPlaceholder: "150.0",
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "discount",
        inputPlaceholder: "15%",
        flex: 1,
      },
      {
        inputType: "text",
        inputName: "total",
        inputPlaceholder: "1.500.000",
        flex: 1,
      },
    ],
  },
  {
    inputs: [
      {
        flex: 9,
        customHtml: (
          <div className={`${orderLinesStyles.row}`}>
            <div style={{ display: "flex", alignItems: "center" }}>
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
