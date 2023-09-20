"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

import QuotationComponent from "@/components/Quotation/QuotationComponent";
import { VAT } from "@/data/constants";
import { calculateTotalAfterDiscounts } from "@/helpers/calculate";

const permissions = {
  "edit salesperson cashing method in quotation": true,
  "edit salesperson commission method in quotation": true,
  "edit salesperson commission in quotation": true,
};

const storeClient = async (payload) => {
  const response = await axiosClient.post(`/quotations`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const CreateQuotation = () => {
  const [resetForm, setResetForm] = useState(false);
  const createQuotationResponse = useQuery({
    queryKey: ["createQuotation"],
    queryFn: () => axiosClient.get(`/quotations/create`),
  });

  const createQuotationData = createQuotationResponse.data?.data.data;

  const onSubmit = (storeData) => {
    storeData.orderLines.forEach((orderLine) => {
      const type = createQuotationData.lineTypes.find((type) => type.id === orderLine.type);
      if (type.name === "item" || type.name === "combo") orderLine[type.name] = orderLine[type.name].id;
    });
    Object.keys(storeData).forEach(function (key) {
      if (storeData[key] && typeof storeData[key] === "object" && Array.isArray(storeData[key]) === false) {
        storeData[key] = storeData[key].id;
      }
    });

    storeData["total"] = Number(calculateTotalAfterDiscounts(storeData["totalBeforeVat"], [Number(storeData["globalDiscountPercentage"]), Number(storeData["specialDiscountPercentage"]), VAT * 100])).toFixed(2);

    delete storeData["globalDiscount"];
    delete storeData["specialDiscount"];
    if (isNaN(storeData["total"])) {
      storeData["total"] = 0;
    }
    mutation.mutate(storeData);
  };

  const mutation = useMutation(storeClient, {
    onSuccess: (data) => {
      setResetForm(true);
    },
  });

  if (createQuotationResponse.isLoading) {
    return <>Loading...</>;
  }

  if (mutation.isLoading) {
    return <>Storing Quotation</>;
  }

  return (
    <QuotationComponent
      action='create'
      componentId='create'
      onSubmit={onSubmit}
      title='Create New Quotation'
      quotationData={createQuotationData}
      permissions={permissions}
      resetForm={resetForm}
      setResetForm={setResetForm}
    />
  );
};

export default CreateQuotation;
