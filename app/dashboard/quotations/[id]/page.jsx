"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

import QuotationComponent from "@/components/Quotation/QuotationComponent";
import { useParams } from "next/navigation";

const ViewQuotation = () => {
  const { id } = useParams();

  const getQuotationResponse = useQuery({
    queryKey: ["getQuotation", id],
    queryFn: () => axiosClient.get(`/quotations/${id}`),
  });

  const getLineTypesResponse = useQuery({
    queryKey: ["lineTypes"],
    queryFn: () => axiosClient.get("/lineTypes"),
  });

  const getQuotationData = getQuotationResponse.data?.data.data;

  const getLineTypesData = getLineTypesResponse.data?.data.data;

  if (getQuotationResponse.isLoading || getLineTypesResponse.isLoading) {
    return <>Loading...</>;
  }

  if (getQuotationData && getQuotationData.orderLines?.length > 0) {
    const updatedOrderLines = getQuotationData.orderLines.map((orderLine, index) => {
      if (orderLine.type === 4 && orderLine.image) {
        const filePath = orderLine.image;
        return {
          ...orderLine,
          image: filePath,
        };
      }

      return { ...orderLine, id: index };
    });
    getQuotationData.orderLines = updatedOrderLines;
  }

  getQuotationData["lineTypes"] = getLineTypesData;

  return (
    <QuotationComponent
      action='view'
      componentId='view quotation'
      title='View Quotation'
      quotationData={getQuotationData}
    />
  );
};

export default ViewQuotation;
