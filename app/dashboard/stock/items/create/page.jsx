"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import { storeItem } from "@/controllers/items.controller";
import { toast } from "react-toastify";
import ItemModalComponent from "@/components/ItemModalComponent/ItemModalComponent";
import * as yup from "yup";
import { ItemAction } from "@/constants/ItemActions";

const CreateItems = ({ closeModal }) => {
  const [state, setState] = useState({
    subRef: "",
  });
  const [isResettingForm, setIsResettingForm] = useState(false);

  const [checkboxValues, setCheckboxValues] = useState({
    canBeSold: false,
    canBePurchased: false,
    warranty: false,
    discontinued: false,
  });

  const [packageType, setPackageType] = useState(null);

  const createItemResponse = useQuery({
    queryKey: ["createItem"],
    queryFn: () => axiosClient.get(`/items/create`),
  });

  const createItemData = createItemResponse.data?.data.data;

  const mutation = useMutation(storeItem, {
    onSuccess: (data) => {
      setIsResettingForm(true);
      setCheckboxValues({
        canBeSold: false,
        canBePurchased: false,
        warranty: false,
        discontinued: false,
        blocked: false,
      });
    },
  });

  const schema = yup.object().shape({
    mainDescription: yup.string().required().label("Main description"),
    unitPrice: yup.number().required().label("Unit price"),
  });

  const onSubmit = async (data, e) => {
    try {
      await schema.validate(data, { abortEarly: false });

      const convertToNumber = (fields) => {
        fields.forEach((field) => {
          if (data[field]) {
            data[field] = Number(data[field]);
          }
        });
      };

      convertToNumber(["unitCost", "decimalCost", "unitPrice", "decimalPrice", "decimalQuantity"]);

      if (data.itemGroups != null) {
        data.itemGroups = data.itemGroups.map((item) => item.itemGroupId.id);
      }

      const createNewProductInfo = {
        ...data,
        subRef: state.subRef,
        canBeSold: checkboxValues.canBeSold,
        canBePurchased: checkboxValues.canBePurchased,
        warranty: checkboxValues.warranty,
        discontinued: checkboxValues.discontinued,
      };

      createNewProductInfo["itemCodes"] = createNewProductInfo["itemCodes"].map((obj) => {
        const { icon, ...newObj } = obj;
        return newObj;
      });

      Object.keys(createNewProductInfo).forEach(function (key) {
        if (createNewProductInfo[key] && typeof createNewProductInfo[key] === "object" && Array.isArray(createNewProductInfo[key]) === false) {
          createNewProductInfo[key] = createNewProductInfo[key].id;
        }
      });
      mutation.mutate(createNewProductInfo);
    } catch (err) {
      err.inner.forEach((error) => {
        toast(error.message);
      });
    }
  };

  if (createItemResponse.isLoading) {
    return <></>;
  }

  return (
    <ItemModalComponent
      action={ItemAction.CREATE}
      modalName={"createItems"}
      data={createItemData}
      onSubmit={onSubmit}
      closeModal={closeModal}
      state={state}
      setState={setState}
      checkboxValues={checkboxValues}
      setCheckboxValues={setCheckboxValues}
      isResettingForm={isResettingForm}
      setIsResettingForm={setIsResettingForm}
      packageType={packageType}
      setPackageType={setPackageType}
    />
  );
};

export default CreateItems;
