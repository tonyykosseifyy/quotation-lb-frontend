"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import { useForm } from "react-hook-form";
import { newCombo } from "@/data/tableData";
import ModalComponent from "@/components/Modal/Modal";
import { comboItemsList } from "@/data/dummyItems";
import OrderLinesRows from "@/components/Table/OrderLines";
import { newComboFooterElements } from "@/data/constants";

const tableFooterElements = [
  { id: "create_new_combo", name: "Create new combo" },
  { id: "create_&_append", name: "Create & Append" },
];

const createNewComboModal = () => {
  const [itemList, setItemList] = useState(comboItemsList);

  const [showModal, setShowModal] = useState(true);

  const modalStyle = {
    overlay: {
      backgroundColor: "var(--modal-overlay-background-clr)",
    },
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "88%",
      height: "auto",
      padding: "40px 44px 10px 45px",
      borderRadius: "8px",
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    var el = document.getElementById("itemRows");
    if (el)
      Sortable.create(el, {
        ghostClass: `${styles.sortableGhostBlue}`,
      });
  }, []);

  return (
    <div className={`container m-0`}>
      <div className={styles.title} onClick={() => setShowModal(true)}>
        New Combo
      </div>
      <ModalComponent title="Combo's Name" titlePaddingBottom='12px' isOpen={showModal} onRequestClose={() => setShowModal(false)} style={modalStyle}>
        <div>
          <InputContainer inputPlaceholder='' inputBorder={styles.inputContainerBorder} inputType='text' inputName='combo_name' inputId='combo_name' height='38' width='1220' widthUnit='px' fontWeight='700' control={control} register={register} />
          <div className="pt-3 d-flex flex-column flex-md-row" style={{ gap: "15px" }}>
            <div className={`d-flex flex-column ${styles.inputRow}`} >
              <InputContainer inputPlaceholder='' label='Code' inputBorder={styles.inputContainerBorder} inputType='text' inputName='code' inputId='code' height='38' fontWeight='700' control={control} register={register} />
              <InputContainer inputPlaceholder='' label='Main Description' inputBorder={styles.inputContainerBorder} inputType='text' inputName='main_description' inputId='main_description' height='38' fontWeight='700' control={control} register={register} />
            </div>
            <div className={`ps-md-5 ${styles.inputRow2}`} >
              <InputContainer inputPlaceholder='' label='Price' inputBorder={styles.inputContainerBorder} inputType='text' inputName='price' inputId='price' height='38' fontWeight='700' control={control} register={register} />
            </div>
          </div>
          <div style={{ marginTop: "38px" }}>
            <OrderLinesRows control={control} register={register} itemListState={[itemList, setItemList]} isFooterShown footerList={newComboFooterElements} footerPaddingTop={"63px"} footerPaddingLeft={"12px"} tableWidth={"1220px"}/>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default createNewComboModal;
