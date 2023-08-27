import { dummyDropdownOptions } from "./dummyItems";

export const typeOptions = [
  { id: "regular", name: "Regular" },
  { id: "services", name: "Services" },
  { id: "with_subRef", name: "With SubRef" },
];

export const taxationOptions = [
  { id: "vat", name: "VAT" },
  { id: "without_vat", name: "W/O VAT" },
];

export const checkboxInfo = [
  {
    inputName: "canBeSold",
    labelText: "Can Be Sold",
  },
  {
    inputName: "canBePurchased",
    labelText: "Can Be Purchased",
  },
  {
    inputName: "warranty",
    labelText: "Warranty",
  },
  {
    inputName: "discontinued",
    labelText: "Discontinued",
  },
];

export const altCodes = [
  {
    itemCode: "CODE 1",
    creationDate: "01/06/2023",
  },
];

export const grouping = [
  {
    label: "Grouping One",
    isRequired: true,
    inputName: "groupingOne",
    selectOptions: dummyDropdownOptions,
  },
  {
    label: "Grouping Two",
    inputName: "groupingTwo",
    selectOptions: dummyDropdownOptions,
  },
  {
    label: "Grouping Three",
    inputName: "groupingThree",
    selectOptions: dummyDropdownOptions,
  },
  {
    label: "Grouping Four",
    inputName: "groupingFour",
    selectOptions: dummyDropdownOptions,
  },
  {
    label: "Grouping Five",
    inputName: "groupingFive",
    selectOptions: dummyDropdownOptions,
  },
  {
    label: "Grouping Six",
    inputName: "groupingSix",
    selectOptions: dummyDropdownOptions,
  },
];

export const transactionalQuantity = [
  {
    id: 1,
    transaction: "Physical on hand",
    quantity: "25 Pcs",
  },
  {
    id: 2,
    transaction: "Quantity owned",
    quantity: "25 Pcs",
  },
  {
    id: 3,
    transaction: "Ordered not invoiced",
    quantity: "0 Pcs",
  },
  {
    id: 4,
    transaction: "Delivered not invoiced",
    quantity: "0 Pcs",
  },
  {
    id: 5,
    transaction: "Invoiced not delivered",
    quantity: "0 Pcs",
  },
  {
    id: 6,
    transaction: "Ordered not delivered",
    quantity: "0 Pcs",
  },
  {
    id: 7,
    transaction: "Recieved not purchased",
    quantity: "0 Pcs",
  },
  {
    id: 8,
    transaction: "Purchased not recieved",
    quantity: "0 Pcs",
  },
  {
    id: 9,
    transaction: "Ordered not purchased",
    quantity: "0 Pcs",
  },
  {
    id: 10,
    transaction: "Shipped in not recieved",
    quantity: "0 Pcs",
  },
  {
    id: 11,
    transaction: "Requisitions not transferred",
    quantity: "0 Pcs",
  },
  {
    id: 12,
    transaction: "Quantity to order",
    quantity: "0 Pcs",
  },
  {
    id: 13,
    transaction: "Global minimum quantity",
    quantity: "0 Pcs",
  },
  {
    id: 14,
    transaction: "Global maximum quantity",
    quantity: "25 Pcs",
  },
];

export const warehouses = [
  {
    id: 1,
    code: "Code 1",
    name: "Lorem Ipsum",
    shelving: "Lorem Ipsum",
    quantity: "25 Pcs",
  },
  {
    id: 2,
    code: "Code 2",
    name: "Lorem Ipsum",
    shelving: "Lorem Ipsum",
    quantity: "25 Pcs",
  },
  {
    id: 3,
    code: "Code 3",
    name: "Lorem Ipsum",
    shelving: "Lorem Ipsum",
    quantity: "25 Pcs",
  },
];

export const packageTypeOptions = [
  { id: "units", name: "Units" },
  { id: "sets", name: "Sets" },
  { id: "supersets", name: "Supersets" },
  { id: "palette", name: "Palette" },
  { id: "container", name: "Container" },
];

const unitFields = [
  {
    label: "Unit Name *",
    placeholder: "PCS",
    inputName: "packageUnitName",
  },
];

const setFields = [
  ...unitFields,
  {
    label: "Set Name *",
    placeholder: "SET",
    inputName: "packageSetName",
    inputNameQuantity: "packageSetQuantity",
    referenceField: unitFields[unitFields.length - 1].inputName,
  },
];

const supersetFields = [
  ...setFields,
  {
    label: "Superset Name *",
    placeholder: "CTN",
    inputName: "packageSupersetName",
    inputNameQuantity: "packageSupersetQuantity",
    referenceField: setFields[setFields.length - 1].inputName,
  },
];

const paletteFields = [
  ...supersetFields,
  {
    label: "Palette Name *",
    placeholder: "PAL",
    inputName: "packagePaletteName",
    inputNameQuantity: "packagePaletteQuantity",
    referenceField: supersetFields[supersetFields.length - 1].inputName,
  },
];

const containerFields = [
  ...paletteFields,
  {
    label: "Container Name *",
    placeholder: "CON",
    inputName: "packageContainerName",
    inputNameQuantity: "packageContainerQuantity",
    referenceField: paletteFields[paletteFields.length - 1].inputName,
  },
];

export const packageTypeFields = {
  unit: unitFields,
  set: setFields,
  superset: supersetFields,
  palette: paletteFields,
  container: containerFields,
};
