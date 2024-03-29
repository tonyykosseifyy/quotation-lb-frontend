"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import Search from "@/components/UI/Search/Search";
import DataTable from "react-data-table-component";
import Clock from "@/components/UI/Icons/Clock";
import Ellipsis from "@/components/UI/Icons/Ellipsis";
import Trashcan from "@/components/UI/Icons/Trashcan";
import { formatId } from "@/helpers/formatId";
import { formatDate } from "@/helpers/formatDate";
import { Status } from "@/components/Table/Status";
import FourArrows from "@/components/UI/Icons/FourArrows";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/routes";
import { ApiEndpoint } from "@/api/apiEndpoints";
import { toast } from "react-toastify";
import { Dropdown } from "@nextui-org/react";
import { handleDownload, handlePreview } from "@/controllers/quotations.controller";
import { renderEmptyTableCellPlaceholder } from "@/helpers/table.Helper";

const deleteQuotation = async (id) => {
  const response = await axiosClient.delete(ApiEndpoint.deleteQuotation(id));
  return response.data;
};

const Page = () => {
  const [search, setSearch] = useState("");
  const [buttonState, setButtonState] = useState("all");
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [isRowDropdownShown, setIsRowDropdownShown] = useState({});
  const [delayHandler, setDelayHandler] = useState(null);
  const debouncedSearch = useDebounce(search, 500);

  const queryClient = useQueryClient();

  const router = useRouter();

  const getQuotationsResponse = useQuery({
    queryKey: ["quotations", page, perPage, debouncedSearch],
    queryFn: () =>
      axiosClient.get(`quotations`, {
        params: {
          page: page,
          perPage: perPage,
          search: debouncedSearch,
        },
      }),
    keepPreviousData: true,
  });

  const quotationsData = getQuotationsResponse.data?.data;

  const deleteMutation = useMutation(deleteQuotation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotations", page, perPage, debouncedSearch] });
      toast(data.message);
    },
  });

  useEffect(() => {
    setFilteredQuotations(quotationsData?.data);
    setTotalRows(quotationsData?.meta.total);
  }, [quotationsData?.data]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };

  const handleCreateQuotation = () => {
    router.push(Routes.NewQuotation);
  };

  const handleRowClick = (id) => {
    router.push(Routes.ViewQuotation.replace("${id}", id));
  };

  const handleExtraInfoChange = (e) => {
    setButtonState(() => e.target.value);
  };

  const createdAtSort = (rowA, rowB) => {
    const a = rowA.createdAtDate;
    const b = rowB.createdAtDate;

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const handleClickMoreOptions = (id) => {
    console.log(id);
  };

  const handleDeleteQuotation = (id) => {
    deleteMutation.mutate(id);
  };

  const handleShowPreview = async (id) => {
    try {
      await handlePreview(id);
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.message);
      else {
        toast.error("Something went wrong");
      }
    }
  };

  const handlePreviewDownload = async (row) => {
    try {
      await handleDownload(row);
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.message);
      else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleMouseEnter = (id) => {
    setIsRowDropdownShown((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      newState[id] = true;

      return newState;
    });
    clearTimeout(delayHandler);
  };

  const handleMouseLeave = (id) => {
    setDelayHandler(
      setTimeout(() => {
        setIsRowDropdownShown((prev) => ({ ...prev, [id]: false }));
      }, 200),
    );
  };

  const handleEdit = (id) => {
    router.push(Routes.EditQuotation.replace("${id}", id));
  };

  const columns = [
    {
      name: "Number",
      maxWidth: "120px",
      center: true,
      selector: (row) => row.quotationNumber ?? renderEmptyTableCellPlaceholder(),
      sortable: true,
    },
    {
      name: "Creation Date",
      center: true,
      maxWidth: "140px",
      selector: (row) => row.createdAtDate ?? renderEmptyTableCellPlaceholder(),
      sortable: true,
      sortFunction: createdAtSort,
    },
    {
      name: "Customer",
      center: true,
      selector: (row) => row.client?.name ?? renderEmptyTableCellPlaceholder(),
      sortable: true,
    },
    {
      name: "Salesperson",
      center: true,
      selector: (row) => row.salesperson?.name ?? renderEmptyTableCellPlaceholder(),
      sortable: true,
    },
    {
      name: "Task",
      center: true,
      selector: (row) => {
        if (row.task) return row.task;
        return (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}>
            <Clock />
            No Records
          </div>
        );
      },
    },
    {
      name: "Total",
      width: "100px",
      center: true,
      selector: (row) => `${row.currencySymbol} ${row.total}` ?? renderEmptyTableCellPlaceholder(),
    },
    {
      name: "Status",
      center: true,
      selector: (row) => (
        <Status
          status={statusIndicator}
          statusText={row.status}
          centerStatus
        />
      ),
    },
    {
      name: "More Options",
      right: true,
      selector: (row) => (
        <div style={{ display: 'flex' }}>
        
          <div 
            onMouseEnter={() => handleMouseEnter(row.id)}
            onMouseLeave={() => handleMouseLeave(row.id)}
            style={{marginRight: 10}}
            >
            <Dropdown
              placement='bottom-center'
              isOpen={isRowDropdownShown[row.id]}>
              <Dropdown.Trigger>
                <div>
                  <Ellipsis />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu aria-label='User menu actions'>
                <Dropdown.Item
                  aria-label='Edit'
                  key='edit'
                  className={styles.dropdownItem}>
                  <div
                    onClick={() => {
                      handleEdit(row.id);
                    }}>
                    Edit
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  aria-label='Show Preview'
                  key='preview'
                  className={styles.dropdownItem}>
                  <div
                    onClick={() => {
                      handleShowPreview(row.id);
                    }}>
                    Show Preview
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  aria-label='Download as PDF'
                  key='preview'
                  className={styles.dropdownItem}>
                  <div
                    onClick={() => {
                      handlePreviewDownload(row);
                    }}>
                    Download as PDF
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Trashcan
            fillColor={"var(--primary-clr)"}
            onClick={() => handleDeleteQuotation(row.id)}
          />

        </div>
      ),
    },
  ];

  const statusIndicator = {
    pending: 0,
    sent: 1,
    cancelled: 2,
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const paginationRowsPerPageOptions = [10, 20, 50];

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
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    pagination: {
      style: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>Quotations</div>
        <div>
          <Button
            title='Create New Quotation'
            fillBackground={true}
            rounded={true}
            onClick={handleCreateQuotation}
          />
        </div>
      </div>
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
          handleSearch={handleSearch}
        />
      </div>
      <div className={`${styles.buttonsDiv}`}>
        <Button
          title='All Quotations'
          rounded={true}
          fillBackground={buttonState === "all"}
          onClick={handleExtraInfoChange}
          value='all'
          type='button'
          tab
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredQuotations}
        pagination
        customStyles={customStyles}
        paginationComponentOptions={paginationComponentOptions}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        // defaultSortFieldId={1}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onRowDoubleClicked={(row) => {
          handleRowClick(row.id);
        }}
      />
    </div>
  );
};

export default Page;
