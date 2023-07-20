"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ModalComponent from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import DataTable from "react-data-table-component";
import Trashcan from "@/components/UI/Icons/Trashcan";
import Plus from "@/components/UI/Icons/Plus";
import { warehousesGeneral } from "@/data/admin";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import InputContainer from "@/components/UI/InputContainer/InputContainer";

const StockWarehouses = () => {

  const warehousesGeneralDuplicate = [...warehousesGeneral];

  const [showModal, setShowModal] = useState(true);
  const [buttonState, setButtonState] = useState("general");
  const [generalTableRows, setGeneralTableRows] = useState(warehousesGeneralDuplicate);

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

  const warehousesGeneralTableColumns = [
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
      const stockWarehousesInfo = {...data};
      console.log(stockWarehousesInfo);
  }

  return (
    <ModalComponent
      title="Stock Warehouses"
      titlePaddingBottom="20px"
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={modalStyle}
    >
      <form id="stockWarehouses"
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form}`}>
        <>
          <div className="mt-3">
            <Button title="General" rounded={true} fillBackground={buttonState === "general"} onClick={handleExtraInfoChange} value="general" type="button" width="180px" tab />
            {buttonState === "general" && (
              <>
                <DataTable
                  columns={warehousesGeneralTableColumns}
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
                    New Stock Warehouses
                  </div>
                </div>
                <div className="mt-5 d-flex flex-column" style={{ gap: "10px" }}>
                  <div className="d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "10px" }}>
                    <div className={`pe-md-4 ${styles.labelText}`}> Address </div>
                    <InputContainer inputPlaceholder='' inputType='text' inputName='address' register={register} control={control} width="100" widthUnit="%"/>
                  </div>
                  <div className="d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "10px" }}>
                    <div className={`pe-md-3 ${styles.labelText}`}> Compensation Warehouse </div>
                    <InputContainer inputPlaceholder='' inputType='text' inputName='compensationWarehouse' register={register} control={control}  width="100" widthUnit="%"/>
                  </div>
                  {/* <InputContainer label='Address' inputPlaceholder='' inputType='text' inputName='address' register={register} control={control} />
                  <InputContainer label='Compensation Warehouse'  inputPlaceholder='' inputType='text' inputName='compensationWarehouse' register={register} control={control} /> */}
                </div>
              </>
            )}
          </div>
          <div className={`${styles.actionButtons} mt-5 mt-lg-0`}>
            <div
              className={`${styles.discard}`}
              onClick={() => { reset(), setGeneralTableRows(warehousesGeneral) }}
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

export default StockWarehouses;