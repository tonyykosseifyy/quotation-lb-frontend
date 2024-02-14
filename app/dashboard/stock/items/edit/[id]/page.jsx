"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import { updateItem } from "@/controllers/items.controller";
import { toast } from "react-toastify";
import ItemModalComponent from "@/components/ItemModalComponent/ItemModalComponent";
import * as yup from "yup";
import { ItemAction } from "@/constants/ItemActions";
const EditItem = ({ closeModal, id }) => {
  const queryClient = useQueryClient();

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

  let editItemResponse = useQuery({
    queryKey: ["editItem", id],
    queryFn: () => axiosClient.get(`/items/edit/${id}`),
  });

  let editItemData = editItemResponse.data?.data.data;

  const mutation = useMutation(updateItem, {
    onSuccess: (data) => {
      setIsResettingForm(true);
      setCheckboxValues({
        canBeSold: false,
        canBePurchased: false,
        warranty: false,
        discontinued: false,
        blocked: false,
      });
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["editItem", id] });
      toast(data.message);
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

      const editProductInfo = {
        ...data,
        subRef: state.subRef,
        canBeSold: checkboxValues.canBeSold,
        canBePurchased: checkboxValues.canBePurchased,
        warranty: checkboxValues.warranty,
        discontinued: checkboxValues.discontinued,
        packageId: packageType,
      };

      editProductInfo["itemCodes"] = editProductInfo["itemCodes"].map((obj) => {
        const { icon, ...newObj } = obj;
        return newObj;
      });

      Object.keys(editProductInfo).forEach(function (key) {
        if (editProductInfo[key] && typeof editProductInfo[key] === "object" && Array.isArray(editProductInfo[key]) === false) {
          editProductInfo[key] = editProductInfo[key].id;
        }
      });
      mutation.mutate({ id, payload: editProductInfo });
    } catch (err) {
      err.inner.forEach((error) => {
        toast(error.message);
      });
    }
  };

  if (editItemResponse.isLoading) {
    return <></>;
  }

  editItemData = { ...editItemData, ...editItemData.item };

  return (
    <ItemModalComponent
      action={ItemAction.EDIT}
      modalName={"editItem"}
      data={editItemData}
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

export default EditItem;
