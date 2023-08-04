"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import Search from "@/components/UI/Search/Search";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import { useForm } from "react-hook-form";
import { settingsOptions } from "@/data/stocks";
import GridIcon from "@/components/UI/Icons/GridIcon";
import ListIcon from "@/components/UI/Icons/ListIcon";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import DataTable from "react-data-table-component";
import DownArrow from "@/components/UI/Icons/DownArrow";
import { Dropdown } from "@nextui-org/react";
import Link from "next/link";

const ListOfClients = () => {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [buttonState, setButtonState] = useState("general");

  const handleTabChange = (e) => {
    setButtonState(() => e.target.value);
  };

  const [view, setView] = useState( "grid");

  const handleClickMoreOptions = (id) => {
    console.log(id);
  };

  const [columns, setColumns] = useState([
    {
      name: 'Code',
      selector: (row) => row.code,
      allowOverflow: true,
      sortable: true,
      sortFunction: (a, b) => handleHeaderClick(a, b, "code"),
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
      
    },
    {
      name: 'Balance USD',
      selector: (row) => row.balanceUSD,
      
    },
    {
      name: 'Balance LBP',
      selector: (row) => row.balanceLBP,
      end: true,
      isVisible: true,
    },
    {
      name: "More Options",
      center: true,
      selector: (row) => <Ellipsis onClick={() => handleClickMoreOptions(row.id)} />,
    },
  ]);

  const data = [
    { id: 1, code: "CODE1", name: 'John Doe', phoneNumber: 70000000, balanceUSD: "1.500.000", balanceLBP: "1.500.000" },
    { id: 2, code: "CODE2", name: 'John Doe', phoneNumber: 70000000, balanceUSD: "1.500.000", balanceLBP: "1.500.000" },
    { id: 3, code: "CODE3", name: 'John Doe', phoneNumber: 70000000, balanceUSD: "1.500.000", balanceLBP: "1.500.000" },
    { id: 4, code: "CODE4", name: 'John Doe', phoneNumber: 70000000, balanceUSD: "1.500.000", balanceLBP: "1.500.000" },
    { id: 5, code: "CODE5", name: 'John Doe', phoneNumber: 70000000, balanceUSD: "1.500.000", balanceLBP: "1.500.000" },
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
        <div className={`${styles.title}`}>List of Clients</div>
            <Link href="/dashboard/clients/create" style={{ textDecoration: "none" }}>
              <Button
                title="Create New Client"
                fillBackground={true}
                rounded={true}
              />
            </Link>
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
    
        <div className="mt-5">
          <Button
            title="General"
            rounded={true}
            fillBackground={buttonState === "general"}
            onClick={handleTabChange}
            value="general"
            type="button"
            width="180px"
            tab
          />
          <Button
            title="Transitions"
            rounded={true}
            fillBackground={buttonState === "transactions"}
            onClick={handleTabChange}
            type="button"
            value="transactions"
            width="180px"
            tab
          />
        </div>
      { buttonState === "general" && (
        <DataTable
        // title="Dynamic DataTable"
        columns={columns}
        data={data}
        customStyles={customStyles}
        />
      )}
    </div>     
  )
}

export default ListOfClients;