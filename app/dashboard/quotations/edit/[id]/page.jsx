"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

import QuotationComponent from "@/components/Quotation/QuotationComponent";
import { useParams, useRouter } from "next/navigation";
import { QuotationAction } from "@/constants/QuotationsActions";
import { useClients } from "@/hooks/clients/useClients";
import { calculateTotalAfterDiscounts } from "@/helpers/calculate";
import { VAT, VAT_LEB_RATE } from "@/data/constants";
import { updateQuotation } from "@/controllers/quotations.controller";
import { storeClient } from "@/controllers/clients.controller";
import debounce from "lodash.debounce";
import { Routes } from "@/routes/routes";
import { toast } from "react-toastify";

const permissions = {
  "edit salesperson cashing method in quotation": true,
  "edit salesperson commission method in quotation": true,
  "edit salesperson commission in quotation": true,
};

const EditQuotation = () => {
  const { id } = useParams();

  const [resetForm, setResetForm] = useState(false);
  const [createdClient, setCreatedClient] = useState({});

  const router = useRouter();

  const { mutate: mutateClient } = useMutation(storeClient, {
    onSuccess: (data) => {
      setCreatedClient({ ...data.data, isNew: true });
    },
  });

  let editQuotationResponse = useQuery({
    queryKey: ["getQuotationById", id],
    queryFn: () => axiosClient.get(`/quotations/edit/${id}`),
  });

  let editQuotationData = editQuotationResponse.data?.data.data;

  const onSubmit = (storeData) => {
    console.log("storeData", storeData);
    storeData.orderLines.forEach((orderLine) => {
      const type = editQuotationData.lineTypes.find((type) => type.id === orderLine.type);
      if (type.name === "item" || type.name === "combo") orderLine[type.name] = orderLine[type.name].id;
    });
    Object.keys(storeData).forEach(function (key) {
      if (storeData[key] && typeof storeData[key] === "object" && Array.isArray(storeData[key]) === false) {
        storeData[key] = storeData[key].id;
      }
    });

    storeData["total"] = Number(calculateTotalAfterDiscounts(storeData["totalBeforeVat"], [Number(storeData["globalDiscountPercentage"]), Number(storeData["specialDiscountPercentage"])]) + Number(storeData["vat"])).toFixed(2);

    storeData["vatLebanese"] = storeData["vat"] * VAT_LEB_RATE;

    if (isNaN(storeData["total"])) {
      storeData["total"] = 0;
    }
    mutation.mutate({ id, payload: storeData });
  };

  const mutation = useMutation(updateQuotation, {
    onSuccess: (data) => {
      setResetForm(true);
      toast(data.message);
      router.push(Routes.QuotationsSummary);
      queryClient.invalidateQueries({ queryKey: ["getQuotationById", id] });
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

  if (editQuotationData && editQuotationData.quotation.orderLines?.length > 0) {
    const updatedOrderLines = editQuotationData.quotation.orderLines.map((orderLine, index) => {
      if (orderLine.type === 4 && orderLine.image) {
        const filePath = orderLine.image;
        return {
          ...orderLine,
          image: filePath,
        };
      }

      return { ...orderLine, id: index };
    });
    editQuotationData.quotation.orderLines = updatedOrderLines;
  }

  if (editQuotationResponse.isLoading) {
    return <>Loading...</>;
  }

  if (mutation.isLoading) {
    return <>Editing Quotation</>;
  }

  editQuotationData = { ...editQuotationData, ...editQuotationData.quotation };

  return (
    <QuotationComponent
      action={QuotationAction.EDIT}
      title='Edit Quotation'
      quotationData={editQuotationData}
      onSubmit={onSubmit}
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

export default EditQuotation;
