export const taxationGeneral = [
  {
    id: 1,
    code: "STANDARD",
    name: "Standard Taxation Group",
  },
];

export const taxationRates = [
  {
    id: 1,
    startDate: "20/06/2023",
    vat: 10.0000,
  },
  {
    id: 2,
    startDate: "20/06/2023",
    vat: 11.0000,
  },
];

export const subReferencesGeneral = [
  {
    id: 1,
    code: "Color",
    name: "Color",
  },
  {
    id: 2,
    code: "Size",
    name: "Size",
  },
];

export const checkboxInfo = [
  {
    inputName: "code",
    labelText: "Code"
  },
  {
    inputName: "shortDescription",
    labelText: "Short Description"
  },
  {
    inputName: "longDescription",
    labelText: "Long Description"
  },
];

export const shortDescription = [
  {
    id: 1,
    code: "R",
    description: "RED",
    shortDescription: "RED",
  },
  {
    id: 2,
    code: "B",
    description: "BLUE",
    shortDescription: "BLUE",
  },
];

export const priceListsGeneral = [
  {
    id: 1,
    code: "STANDARD",
    name: "Standard Price List",
  },
];

export const priceListsItems = [
  {
    id: 1,
    code: "22MP410",
    name: "LG MONITOR, HDMI FHDLG MONITOR, HDMI FHD",
    currency: "USD",
    salePrice: 0.00,
    discount: 0.00,
    discountPercent: "0.00%",
    priceDiscounted: 0.00,
  },
  {
    id: 2,
    code: "3000N",
    name: "LG MONITOR, HDMI FHDLG MONITOR, HDMI FHD",
    currency: "LBP",
    salePrice: 0.00,
    discount: 0.00,
    discountPercent: "0.00%",
    priceDiscounted: 0.00,
  },
];

export const priceListsDepartment = [
  {
    id: 1,
    departmentCode: "ALARM",
    departmentName: "INTRUDER ALARM",
    method: "STANDARD price minus",
    percentage: "0.00%"
  },
  {
    id: 2,
    departmentCode: "ACESS",
    departmentName: "ACESS CONTROL",
    method: "STANDARD price minus",
    percentage: "0.00%"
  },
];

export const percentageOptions = [
  { id: "global_percentage", name: "global percentage" },
  { id: "percentage_as_per_item_department", name: "percentage as per item department" },
];

