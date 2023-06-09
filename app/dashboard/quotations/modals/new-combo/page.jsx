"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Modal from 'react-modal';
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Table from "@/components/Table/Table";
import { useForm } from "react-hook-form";
import { newCombo } from "@/data/tableData";

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
        overlay: { backgroundColor: 'rgba(65, 65, 65, 0.3)'}, 
         content: { 
            top: '56%', left: '50%', right: 'auto', bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "88%", 
            height: "auto",
            backgroundColor: 'white',
            padding: "40px 44px 0px 45px",
            borderRadius: "8px",
            // borderTop: "2px solid var(--primary-clr)",
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
        <Modal 
                isOpen={showModal} 
                onRequestClose={() => setShowModal(false)} 
                style={modalStyle}
                 >
                <div className={`${styles.xIcon}`}>
                    <svg  
                      width="21" 
                      height="21"
                      viewBox="0 0 16 16"
                      fill="#535353" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi bi-x-circle-fill" 
                      onClick={() => setShowModal(false)}
                      >
                      <path 
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                      />
                    </svg>
                </div>
                <div>
                    <div className={`${styles.modalFormTitle}`}>
                          Combo's Name
                    </div> 
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
         </Modal>    
    </div>
  )
}

export default createNewComboModal;