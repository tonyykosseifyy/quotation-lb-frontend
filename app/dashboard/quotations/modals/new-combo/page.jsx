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
      /* Commented this out because the layout was breaking on bigger screens... should investigate if we must do this for other modals as well.
       * width: "88%",
       */
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
          <div>
            <InputContainer inputPlaceholder='' inputBorder={styles.inputContainerBorder} inputType='text' inputName='combo_name' inputId='combo_name' height='38' width='1220' widthUnit='px' fontWeight='700' control={control} register={register} />
          </div>
          <div style={{ marginTop: "38px" }}>
            <OrderLinesRows control={control} register={register} itemListState={[itemList, setItemList]} isFooterShown footerList={newComboFooterElements} footerPaddingTop={"63px"} footerPaddingLeft={"12px"} tableWidth={"1220px"} />
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default createNewComboModal;
