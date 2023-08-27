"use client";

import React, { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import axiosClient from "@/api/axiosClient";
import CheckBox from "@/components/UI/CheckBox/Checkbox";
import CreateItemsModal from "./create/page";
import PaginationComponent from "@/components/Pagination/Pagination";

const Products = () => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const debouncedSearch = useDebounce(search, 500);
  const [showModal, setShowModal] = useState(false);

  const getItemsResponse = useQuery({
    queryKey: ["quotations", page, perPage, debouncedSearch],
    queryFn: () =>
      axiosClient.get(`items`, {
        params: {
          page: page,
          perPage: perPage,
          search: debouncedSearch,
        },
      }),
    keepPreviousData: true,
  });

  const itemsData = getItemsResponse.data?.data;

  useEffect(() => {
    setFilteredItems(itemsData?.data);
    setTotalRows(itemsData?.meta.total);
  }, [itemsData?.data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleCreateProduct = () => {
    //
  };

  const columns = [
    {
      name: "",
      width: "30px",
      allowOverflow: true,
    },
    {
      name: "Code",
      maxWidth: "130px",
      selector: (row) => row.mainCode,
    },
    {
      name: "Description",
      maxWidth: "650px",
      selector: (row) => row.mainDescription,
    },
    {
      name: "Qty on Hand",
      maxWidth: "150px",
      selector: (row) => row.qtyOnHand ?? 0,
      center: true,
    },
    {
      name: "Price",
      width: "100px",
      selector: (row) => row.unitPrice,
      // sortable: true,
      center: true,
    },
    {
      name: "Currency",
      width: "100px",
      selector: (row) => row.currency.name,
      center: true,
    },
    {
      name: "Qty on Order",
      width: "150px",
      selector: (row) => row.qtyOnOrder ?? 0,
      center: true,
    },
    {
      name: "Qty Shipped",
      width: "150px",
      selector: (row) => row.qtyShipped ?? 0,
      center: true,
    },
    {
      name: "",
      width: "30px",
    },
  ];

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

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
        <div className='d-flex'>
          <div className={`${styles.title}`}>Products</div>
          <>
            <Dropdown placement='bottom-right'>
              <Dropdown.Trigger>
                <span className='ps-2'>
                  <DownArrow />
                </span>
              </Dropdown.Trigger>
              <Dropdown.Menu
                aria-label='Static Actions'
                items={productsCheckboxOptions}
                // closeOnSelect={false}
                // selectionMode="multiple"
                className={styles.dropDownMenu}>
                {(item) => (
                  <Dropdown.Item key={item.inputName} className={styles.dropDownItem}>
                    <CheckBox inputName={item.inputName} labelText={item.labelText} inputId={item.inputName} value={item.inputName} isChecked={checkboxValues.value} onChange={(event) => handleCheckboxChange(event)} />
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </>
        </div>
        <div>
          <Button title='Create New Product' fillBackground={true} rounded={true} onClick={() => setShowModal(true)} />
        </div>
      </div>
      <div className='d-flex flex-column flex-md-row justify-content-between mt-4' style={{ gap: "15px" }}>
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
        <div className='d-flex' style={{ gap: "22px" }}>
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
          <div className='d-flex d-inline-block' style={{ gap: "12px" }}>
            <span style={{ cursor: "pointer" }}>
              <Dropdown placement='bottom-right'>
                <Dropdown.Trigger>
                  <div className='pt-2 pt-md-1'>
                    <img src='/assets/svg/settings.svg' />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu aria-label='Static Actions' items={settingsOptions} onAction={(actionKey) => console.log({ actionKey })} className={styles.dropDownMenu}>
                  {(item) => (
                    <Dropdown.Item key={item.key} className={styles.dropDownItem}>
                      {item.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </span>
            <span className='pt-2 pt-md-1' style={{ cursor: "pointer" }} onClick={() => setView("grid")}>
              <GridIcon fillColor={view === "grid" ? "#4472c4" : "#535353"} />
            </span>
            <span className='pt-2 pt-md-1' style={{ cursor: "pointer" }} onClick={() => setView("list")}>
              <ListIcon fillColor={view === "list" ? "#4472c4" : "#535353"} />
            </span>
          </div>
        </div>
      </div>
      {view === "grid" && (
        <>
          <div className='row pt-3'>
            {filteredItems?.map((item) => (
              <div key={item.id} className='col-12 col-md-6 col-lg-4 mt-4'>
                <div className={`card ${styles.singleCard}`}>
                  <div className='card-body p-0'>
                    <div className='d-flex align-items-center'>
                      {item.img && <img src={item.src} className='rounded-circle mt-1' width='56px' height='56px' />}
                      <div className='ps-3 w-100'>
                        <div className='d-flex justify-content-between'>
                          <div className={`card-title ${styles.cardTitle}`}>{item.mainCode}</div>
                          <span style={{ cursor: "pointer" }}>
                            <Heart />
                          </span>
                        </div>
                        <p className={`card-text pe-4 pe-sm-4 pe-md-5 ${styles.cardBodyText}`}>{item.mainDescription}</p>
                      </div>
                    </div>
                    <hr className='mb-1' />
                    <div className={`d-flex justify-content-end pt-0 ${styles.cardTitle}`}>
                      {item.currency.name !== "LBP" && item.currency.symbol}
                      {item.unitPrice}
                      {item.currency.name === "LBP" && item.currency.symbol}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredItems?.length > 0 && (
            <div className={styles.paginationDiv}>
              <PaginationComponent total={Math.ceil(totalRows / perPage)} handleChange={setPage} />
            </div>
          )}
        </>
      )}
      {view === "list" && (
        <div className='pt-3 mt-4'>
          <DataTable
            columns={columns}
            data={filteredItems}
            customStyles={customStyles}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            defaultSortFieldId={1}
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
          />
        </div>
      )}
      {showModal && <CreateItemsModal setIsModalOpen={setShowModal} />}
    </div>
  );
};

export default Products;
