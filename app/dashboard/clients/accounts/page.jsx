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
import { Dropdown } from "@nextui-org/react";
import Link from "next/link";
import GeneralTab from "@/components/ClientsAccount/GeneralTab";
import TransactionsTab from "@/components/ClientsAccount/TransactionsTab";

const ListOfClients = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [buttonState, setButtonState] = useState("general");

  const handleTabChange = (e) => {
    setButtonState(() => e.target.value);
  };

  const [view, setView] = useState("grid");

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
        <Link
          href='/dashboard/clients/create'
          style={{ textDecoration: "none" }}>
          <Button
            title='Create New Client'
            fillBackground={true}
            rounded={true}
          />
        </Link>
      </div>
      <div
        className='d-flex flex-column flex-md-row justify-content-between mt-4'
        style={{ gap: "15px" }}>
        <div className={styles.searchDiv}>
          <Search
            value={search}
            placeholder='Search...'
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
        <div
          className='d-flex'
          style={{ gap: "22px" }}>
          <InputContainer
            inputPlaceholder='Filter by'
            inputType='select'
            inputName=''
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
          <div
            className='d-flex d-inline-block'
            style={{ gap: "12px" }}>
            <span style={{ cursor: "pointer" }}>
              <Dropdown placement='bottom-right'>
                <Dropdown.Trigger>
                  <div className='pt-2 pt-md-1'>
                    <img src='/assets/svg/settings.svg' />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu
                  aria-label='Static Actions'
                  items={settingsOptions}
                  onAction={(actionKey) => console.log({ actionKey })}
                  className={styles.dropDownMenu}>
                  {(item) => (
                    <Dropdown.Item
                      key={item.key}
                      className={styles.dropDownItem}>
                      {item.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </span>
            <span
              className='pt-2 pt-md-1'
              style={{ cursor: "pointer" }}
              onClick={() => setView("grid")}>
              <GridIcon fillColor={view === "grid"} />
            </span>
            <span
              className='pt-2 pt-md-1'
              style={{ cursor: "pointer" }}
              onClick={() => setView("list")}>
              <ListIcon fillColor={view === "list"} />
            </span>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Button
          title='General'
          rounded={true}
          fillBackground={buttonState === "general"}
          onClick={handleTabChange}
          value='general'
          type='button'
          width='180px'
          tab
        />
        <Button
          title='Transactions'
          rounded={true}
          fillBackground={buttonState === "transactions"}
          onClick={handleTabChange}
          type='button'
          value='transactions'
          width='180px'
          tab
        />
      </div>
      {buttonState === "general" && <GeneralTab />}
      {buttonState === "transactions" && <TransactionsTab />}
      {/* { view === "grid" && ()} */}
      {/* { view === "list" && ()} */}
    </div>
  );
};

export default ListOfClients;
