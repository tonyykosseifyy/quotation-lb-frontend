"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import Search from "@/components/UI/Search/Search";
import { useForm } from "react-hook-form";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import { items, settingsOptions, productsCheckboxOptions } from "@/data/stocks";
import GridIcon from "@/components/UI/Icons/GridIcon";
import ListIcon from "@/components/UI/Icons/ListIcon";
import DataTable from "react-data-table-component";
import Heart from "@/components/UI/Icons/Heart";
import DownArrow from "@/components/UI/Icons/DownArrow";
import { Dropdown } from "@nextui-org/react";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import CreateItemsModal from "./create/page";

const Products = () => {
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [checkboxValues, setCheckboxValues] = useState({
        allProducts: false,
        physical: false,
        services: false,
        combo: false,
        onHand: false,
        favorites: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const [showModal, setShowModal] = useState(false);
    const [view, setView] = useState( "grid");

    const columns = [
        {
            name: "",
            width: "30px",
            allowOverflow: true,
        },
        {
            name: "Code",
            maxWidth: "130px",
            selector: (row) => row.code,
        },
        {
            name: "Description",
            maxWidth: "650px",
            selector: (row) => row.description,
        },
        {
            name: "Qty on Hand",
            maxWidth: "150px",
            selector: (row) => row.qtyOnHand,
            center: true,
        },
        {
            name: "Price",
            width: "100px",
            selector: (row) => row.price,
            // sortable: true,
            center: true,
        },
        {
            name: "Currency",
            width: "100px",
            selector: (row) => row.currency,
            center: true,
        },
        {
            name: "Qty on Order",
            width: "150px",
            selector: (row) => row.qtyOnOrder,
            center: true,
        },
        {
            name: "Qty Shipped",
            width: "150px",
            selector: (row) => row.qtyShipped,
            center: true,
        },
        {
            name: "",
            width: "30px",
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
            },
        },
        cells: {
            style: {
                fontSize: 12,
                fontWeight: 700,
                color: "var(--table-data-text-clr)",
            },
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

    return (
        <div className={`container m-0`}>
            <div className={`${styles.header} pt-4`}>
                <div className="d-flex">
                    <div className={`${styles.title}`}>Products</div>
                    <>
                        <Dropdown placement="bottom-right">
                            <Dropdown.Trigger >
                                <span className="ps-2">
                                    <DownArrow />
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Menu 
                                aria-label="Static Actions"
                                items={productsCheckboxOptions}
                                // closeOnSelect={false}
                                // selectionMode="multiple"
                                className={styles.dropDownMenu}
                            >
                                {(item) => (
                                    <Dropdown.Item
                                      key={item.inputName}
                                      className={styles.dropDownItem}
                                    >
                                      <CheckBox  
                                          inputName={item.inputName} labelText={item.labelText} inputId={item.inputName} value={item.inputName}
                                          isChecked={checkboxValues.value} onChange={(event) => handleCheckboxChange(event)} 
                                      />
                                    </Dropdown.Item>
                                )}
                              </Dropdown.Menu>
                        </Dropdown>
                    </>
                </div>
                <div>
                    <Button
                        title="Create New Product"
                        fillBackground={true}
                        rounded={true}
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-4" style={{ gap: "15px" }}>
                <div className={styles.searchDiv}>
                    <Search
                        value={search}
                        placeholder="Search..."
                        borderWidth={1}
                        borderColor={"var(--primary-clr)"}
                        borderStyle={"solid"}
                        paddingLeft={25}
                        paddingTop={5}
                        paddingBottom={5}
                        paddingRight={25}
                        fillBackground={true}
                        backgroundColor={"white"}
                        rounded={true}
                        height={"38.5px"}
                        handleSearch={handleSearch}   
                    />
                </div>
                <div className="d-flex" style={{ gap: "22px"}}>
                    <InputContainer
                        inputPlaceholder="Filter by"
                        inputType="select"
                        inputName=""
                        inputBorderColor={"var(--primary-clr)"}
                        placeholderColor={"var(--primary-clr)"}
                        placeholderStyle={"normal"}
                        placeholderWeight={"700"}
                        dropdownArrowColor={"var(--primary-clr)"}
                        // selectOptions={filterByOptions}
                        control={control}
                        register={register}
                        width={"112"}
                    />
                    <div className="d-flex d-inline-block" style={{gap: "12px"}} >
                        <span style={{ cursor: "pointer" }}>
                            <Dropdown placement="bottom-right">
                                <Dropdown.Trigger>
                                    <div className="pt-2 pt-md-1">
                                        <img src="/assets/svg/settings.svg" />
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Menu 
                                    aria-label="Static Actions"
                                    items={settingsOptions}
                                    onAction={(actionKey) => console.log({ actionKey })}
                                    className={styles.dropDownMenu}
                                >
                                    {(item) => (
                                        <Dropdown.Item
                                            key={item.key}
                                            className={styles.dropDownItem}
                                        >
                                            {item.name}
                                      </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </span>
                        <span className="pt-2 pt-md-1" style={{ cursor: "pointer" }} onClick={() => setView("grid")}>
                            <GridIcon fillColor={ view === "grid" ? "#4472c4" : "#535353" } />
                        </span> 
                        <span className="pt-2 pt-md-1" style={{ cursor: "pointer" }} onClick={() => setView("list")}>
                            <ListIcon fillColor={ view === "list" ? "#4472c4" : "#535353" } />
                        </span> 
                    </div> 
                </div>   
            </div>
            {
                view === "grid" && (
                    <div className="row pt-3">
                        {items.map( item => {
                            if (search === "" || (item.code.toLowerCase().includes(search.toLowerCase())))
                                return (
                                    <div key={item.id} className="col-12 col-md-6 col-lg-4 mt-4">
                                        <div className={`card ${styles.singleCard}`}>
                                            <div className="card-body p-0">
                                                <div className="d-flex">
                                                    <img src={item.src} className="rounded-circle mt-1" width="56px" height="56px"/> 
                                                    <div className="ps-3">
                                                       <div className="d-flex justify-content-between">
                                                            <div className={`card-title ${styles.cardTitle}`}>{item.title}</div>
                                                            <span style={{ cursor: "pointer"}}>
                                                                < Heart/>
                                                            </span>
                                                        </div>
                                                        <p className={`card-text pe-4 pe-sm-4 pe-md-5 ${styles.cardBodyText}`}>
                                                          {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr className="mb-1"/>
                                                <div className={`d-flex justify-content-end pt-0 ${styles.cardTitle}`}>
                                                    {item.currencySymbol !== "LL" && item.currencySymbol}{item.price}{item.currencySymbol === "LL" && item.currencySymbol}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                              return null; 
                        })}
                    </div>
                )
            }
            {
                view === "list" && (
                  <div className="pt-3 mt-4">
                      <DataTable 
                          columns={columns}
                          data={items}
                          customStyles={customStyles}
                      />
                  </div>
                )
            }
            { showModal && <CreateItemsModal setIsModalOpen={setShowModal} /> }
        </div>     
    )
}

export default Products;