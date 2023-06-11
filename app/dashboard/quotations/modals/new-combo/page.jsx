"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
// import Modal from 'react-modal';
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Table from "@/components/Table/Table";
import { useForm } from "react-hook-form";
import { newCombo } from "@/data/tableData";
import ModalComponent from "@/components/Modal/Modal";

const itemOptions = [
  { id: "item_1", name: "item 1" },
  { id: "item_2", name: "item 2" },
  { id: "item_3", name: "item 3" },
];

const tableFooterElements = [
  { id: "create_new_combo", name: "Create new combo" },
  { id: "create_&_append", name: "Create & Append" }, 
];

const newObject =[
  { type: 2 },
  { type: 2 },
  { type: 2 },
  { type: 2 },
];

const createNewComboModal = () => {

  const [showModal, setShowModal] = useState(true);

    const modalStyle = { 
        overlay: { 
          backgroundColor: "var(--modal-overlay-background-clr)"
        }, 
        content: { 
            top: '55%', left: '50%', right: 'auto', bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "88%", 
            height: "auto",
            padding: "40px 44px 0px 45px",
            borderRadius: "8px",
         } 
      };
        
        const {
          register,
          handleSubmit,
          watch,
          control,
          formState: { errors },
          reset,
      } = useForm();
  
      const eachTableHeaderWidth = {
          item: "273px !important",
          description: "1115px !important",
          quantity: "100px !important",
          discount: "160px !important",
          unitPrice: "190px !important",
          total: "645px !important",
        };

  return (
    <div className={`container m-0`}>
      <div
          className={styles.title}
            onClick={() => setShowModal(true)}
          >
            New Combo 
        </div>
        <ModalComponent
                title="Combo's Name"
                titlePaddingBottom="12px" 
                isOpen={showModal} 
                onRequestClose={() => setShowModal(false)} 
                style={modalStyle}
                >
                <div>
                    <div>
                    <InputContainer
                        inputPlaceholder=""
                        inputBorder={styles.inputContainerBorder}
                        inputType="text"
                        inputName="combo_name"
                        inputId="combo_name"
                        height="38"
                        width="1600"
                        widthUnit="px"
                        fontWeight="700"
                        control={control}
                        register={register}
                      />
                    </div>
                <div style={{marginTop: "38px"}}>
                      <Table
                          headings={newCombo}
                          headingBackgroundColor={`var(--primary-clr)`}
                          headingBorderRadius="5px"
                          headingBorderBottom="5px"
                          headingBorderTop={`5px`}
                          headingsColor={`#FFFFFF`}
                          headingsFontSize={`13px`}
                          headingsFontWeight={`600`}
                          headingsWidth={eachTableHeaderWidth}
                          columnSpan={7}
                          data={newObject}
                          bodyBorderTop={`0px !important`}
                          tableBorderRadius={`8px`}
                          tablePaddingTop={`0px`}
                          tablePaddingLeft={`0px`}
                          tablePaddingRight={`0px`}
                          tablePaddingBottom="26px"
                          bodyPadding={"15px 15px 0px 0px"}
                          tableFooter={tableFooterElements}
                          footerPaddingLeft="3px"
                          footerMarginTop="71px"
                        />
                   </div>
                </div>
         </ModalComponent>    
    </div>
  )
}

export default createNewComboModal;