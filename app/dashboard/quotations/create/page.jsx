"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

import QuotationComponent from "@/components/Quotation/QuotationComponent";
import { VAT, VAT_LEB_RATE } from "@/data/constants";
import { calculateTotalAfterDiscounts } from "@/helpers/calculate";
import { Routes } from "@/router/routes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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

  const router = useRouter();

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

    storeData["vatLebanese"] = storeData["vat"] * VAT_LEB_RATE;
    if (isNaN(storeData["total"])) {
      storeData["total"] = 0;
    }
    console.log(storeData);
    // mutation.mutate(storeData);
  };

  const mutation = useMutation(storeClient, {
    onSuccess: (data) => {
      setResetForm(true);
      toast(data.message);
      router.push(Routes.QuotationsSummary);
    },
    onError: (data) => {
      toast(data.message);
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
