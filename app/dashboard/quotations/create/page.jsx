"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

import QuotationComponent from "@/components/Quotation/QuotationComponent";
import { VAT, VAT_LEB_RATE } from "@/data/constants";
import { calculateTotalAfterDiscounts } from "@/helpers/calculate";
import { Routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { storeClient } from "@/controllers/clients.controller";
import { useClients } from "@/hooks/clients/useClients";
import { storeQuotation } from "@/controllers/quotations.controller";

const permissions = {
  "edit salesperson cashing method in quotation": true,
  "edit salesperson commission method in quotation": true,
  "edit salesperson commission in quotation": true,
};

const CreateQuotation = () => {
  const [resetForm, setResetForm] = useState(false);
  const [createdClient, setCreatedClient] = useState({});

  const router = useRouter();

  const { mutate: mutateClient } = useMutation(storeClient, {
    onSuccess: (data) => {
      setCreatedClient({ ...data.data, isNew: true });
    },
  });

  const createQuotationResponse = useQuery({
    queryKey: ["createQuotation"],
    queryFn: () => axiosClient.get(`/quotations/create`),
  });

  const createQuotationData = createQuotationResponse.data?.data.data;

  const onSubmit = (storeData) => {
    console.log(storeData);
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
    mutation.mutate(storeData);
  };

  const mutation = useMutation(storeQuotation, {
    onSuccess: (data) => {
      setResetForm(true);
      toast(data.message);
      router.push(Routes.QuotationsSummary);
    },
    onError: (data) => {
      if (data.response.status === 422) {
        toast(data.response.data.message);
      } else {
        toast(data.message);
      }
    },
  });

  const loadClientOptions = (inputValue, callback) => {
    debouncedLoadClientOptions(inputValue, callback);
  };
  const debouncedLoadClientOptions = debounce(async (inputValue, callback) => {
    const response = await axiosClient.get(`clients`, {
      params: {
        perPage: 5,
        isPaginated: false,
        name: inputValue,
      },
    });
    const data = await response.data.data;

    callback(data);
  }, 500);

  const getClientsDefaultResponse = useClients(1, 5, "");

  const clientsDefaultData = getClientsDefaultResponse.data?.data;

  const handleCreateClient = (name) => {
    const payload = {
      name,
      clientType: "individual",
      addressType: "contact",
    };
    mutateClient(payload);
  };

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
      loadClientOptions={loadClientOptions}
      handleCreateClient={handleCreateClient}
      defaultClientOptions={clientsDefaultData?.data}
      createdClient={createdClient}
    />
  );
};

export default CreateQuotation;
