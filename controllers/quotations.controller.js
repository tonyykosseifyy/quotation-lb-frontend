import axiosClient from "@/api/axiosClient";
import { VAT, VAT_LEB_RATE } from "@/data/constants";
import { calculateTotalAfterDiscounts } from "@/helpers/calculate";

export const storeQuotation = async (payload) => {
  const response = await axiosClient.post(`/quotations`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const handlePreview = async (id) => {
  if (id) {
    const response = await axiosClient.get(`/invoices/${id}`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    window.open(url, "_blank");
  }
};

export const handleDownload = async (row) => {
  const filename = "Invoice-For";
  if (row.id) {
    const response = await axiosClient.get(`/invoices/${row.id}`, { responseType: "blob" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(response.data);
    link.download = `${filename}-${row.client.name}.pdf`;
    link.click();

    window.URL.revokeObjectURL(link.href);
  }
};

export const generatePreviewForUnsubmittedQuotation = async (values) => {
  Object.keys(values).forEach(function (key) {
    if (values[key] && typeof values[key] === "object" && Array.isArray(values[key]) === false) {
      values[key] = values[key].id;
    }
  });

  values["total"] = Number(calculateTotalAfterDiscounts(values["totalBeforeVat"], [Number(values["globalDiscountPercentage"]), Number(values["specialDiscountPercentage"]), VAT * 100])).toFixed(2);

  values["vatLebanese"] = values["vat"] * VAT_LEB_RATE;
  if (isNaN(values["total"])) {
    values["total"] = 0;
  }

  const response = await axiosClient.post(`/quotations/preview-new`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });
  const url = URL.createObjectURL(response.data);
  window.open(url, "_blank");
};
