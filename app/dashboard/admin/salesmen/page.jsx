"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import { salesmenGeneral, commissionGrantedOptions, commissionsPaymentOptions } from "@/data/admin";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import InputContainer from "@/components/UI/InputContainer/InputContainer";

const Salesmen = () => {

  const salesmenGeneralDuplicate = [...salesmenGeneral];

  const [showModal, setShowModal] = useState(true);
  const [buttonState, setButtonState] = useState("general");
  const [generalTableRows, setGeneralTableRows] = useState(salesmenGeneralDuplicate);

  const handleExtraInfoChange = (e) => {
    setButtonState(() => e.target.value);
  };

  const generalHandleDeleteRow = (id) => {
    const generalUpdatedRows = generalTableRows.filter(row => row.id !== id);
    setGeneralTableRows(generalUpdatedRows);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "var(--modal-overlay-background-clr)",
      zIndex: 100,
    },
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "88%",
      minHeight: "600px",
      padding: "40px 44px 34px 45px",
      borderRadius: "8px",
      borderTop: "2px solid var(--primary-clr)",
      backgroundColor: "var(--modal-background-clr)",
    }
  };

  const salesmenGeneralTableColumns = [
    {
      name: "Code",
      width: "100px",
      selector: (row) => row.code,
      allowOverflow: true,
    },
    {
      name: "Name",
      width: "100px",
      selector: (row) => row.name,
    },
    {
      name: "Discontinued",
      width: "110px",
      selector: (row) => <CheckBox />,
      center: true,
    },
    {
      name: "",
      maxWidth: "auto",
    },
    {
      name: "",
      width: "50px",
      cell: (row) => (
        <div style={{ cursor: "pointer" }}>
          <Trashcan
            fillColor={"var(--primary-clr)"}
            onClick={() => generalHandleDeleteRow(row.id)}
          />
        </div>
      ),
      center: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "var(--primary-clr)",
        color: "white",
        fontSize: "13px",
        fontWeight: 600,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        minHeight: "40px !important",
        paddingLeft: "20px",
      },
    },
    rows: {
      style: {
        minHeight: "5px !important",
        borderBottom: "none !important",
        paddingLeft: "20px",
      },
    },
    cells: {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--secondary-text-clr)",
        paddingTop: "0px !important",
        height: "45px !important",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.id === 1,
      style: {
        backgroundColor: "var(--table-row-background-clr)",
      },
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
      e.preventDefault();
      const salesmenInfo = {...data};
      console.log(salesmenInfo);
  }

  return (
    <ModalComponent
      title="Salesmen Records"
      titlePaddingBottom="20px"
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={modalStyle}
    >
      <form id="salesmen"
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form}`}>
        <>
          <div className="mt-3">
            <Button title="General" rounded={true} fillBackground={buttonState === "general"} onClick={handleExtraInfoChange} value="general" type="button" width="180px" tab />
            <Button title="Properties" rounded={true} fillBackground={buttonState === "properties"} onClick={handleExtraInfoChange} value="properties" type="button" width="180px" tab />
            {buttonState === "general" && (
              <>
                <DataTable
                  columns={salesmenGeneralTableColumns}
                  data={generalTableRows}
                  customStyles={customStyles}
                  conditionalRowStyles={conditionalRowStyles}
                />
                <div
                  // onClick={() => { }}
                  className={`${styles.footerRow} pt-3`}>
                  <Plus fillColor='var(--primary-clr-light)' />
                  <div
                    style={{
                      fontSize: "12px",
                      paddingLeft: "8px",
                    }}
                  >
                    New Salesmen
                  </div>
                </div>
              </>
            )}
            { buttonState === "properties" && (
              <>
                <div className="mt-5 d-flex flex-column" style={{ gap: "10px" }}>
                  <div className="d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "10px" }}>
                    <div className={`pe-md-4 ${styles.labelText}`}> Commission granted </div>
                      <div className="d-flex flex-row" style={{ gap: "10px" }}>
                        <InputContainer inputPlaceholder='7.50 %' inputType='number' inputName='commissionGrantedPercentage' register={register} control={control} textAlign="end" width="80" />
                        <InputContainer inputPlaceholder='on invoice net sales amount total' inputType='select' inputName='commissionGrantedPercentage' selectOptions={commissionGrantedOptions} register={register} control={control} width="100" widthUnit="%" placeholderColor placeholderStyle/>
                      </div>
                  </div>
                  <div className="mt-2 d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "10px" }}>
                    <div className={`pe-md-3 ${styles.labelText}`}> Commissions Payment </div>
                    <InputContainer inputPlaceholder='upon total cashing of invoice' inputType='select' inputName='commissionsPayment' selectOptions={commissionsPaymentOptions} register={register} control={control} width="100" widthUnit="%" placeholderColor placeholderStyle/>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
            <div
              className={`${styles.discard}`}
              onClick={() => { reset(), setGeneralTableRows(salesmenGeneral) }}
            >
              Discard
            </div>
            <div className="">
              <Button title="Save" rounded={false} fillBackground={true} paddingTop={10} paddingBottom={10} paddingRight={64} paddingLeft={64} />
            </div>
          </div>
        </>
      </form>
    </ModalComponent>
  );
};

export default Salesmen;