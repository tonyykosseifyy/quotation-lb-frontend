"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Dropdown, User } from "@nextui-org/react";
import BellIcon from "@/components/UI/Icons/BellIcon";
import DownArrow from "@/components/UI/Icons/DownArrow";
import { configurationDropDownItems } from "@/data/navBar";
import TaxationGroupsModal from "@/app/dashboard/admin/taxation-groups/page";
import SubReferencesModal from "@/app/dashboard/admin/sub-references/page";
import GroupsModal from "@/app/dashboard/admin/groups/page";
import SalesmenModal from "@/app/dashboard/admin/salesmen/page";
import StockWarehousesModal from "@/app/dashboard/admin/stock-warehouses/page";
import PriceListsModal from "@/app/dashboard/admin/price-lists/page";
import Link from "next/link";
import { Routes } from "@/routes/routes";
import useAuthStore from "@/store/store";
import { useRouter } from "next/navigation";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { logout } from "@/controllers/auth.controller";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    taxation: false,
    subReferences: false,
    groups: false,
    salesmen: false,
    warehouses: false,
    priceLists: false,
  });

  const { user } = useAuthStore();

  const openModal = (modalName) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  const handleItemClick = (actionKey) => {
    if (actionKey === "1") {
      openModal("taxation");
    } else if (actionKey === "2") {
      openModal("subReferences");
    } else if (actionKey === "3") {
      openModal("groups");
    } else if (actionKey === "5") {
      openModal("salesmen");
    } else if (actionKey === "6") {
      openModal("warehouses");
    } else if (actionKey === "7") {
      openModal("priceLists");
    }
  };

  const router = useRouter();

  const queryClient = new QueryClient();
  const { setIsAuthenticated, setUser, setToken } = useAuthStore();

  const { mutate: mutateLogout, isLoading: isLoadingLogout } = useMutation(logout, {
    onSuccess: (data) => {
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
      queryClient.invalidateQueries();
      router.replace(Routes.Login);
      toast(data.message);
    },
    onError: (error) => {
      toast(error.response.data.message);
    },
  });

  const handleLogout = () => {
    mutateLogout();
  };

  return (
    <nav className={`navbar navbar-expand-md navbar-light ${styles.nav}`}>
      <div className={styles.options}>
        <Link
          href={Routes.ItemsSummary}
          className={`${styles.option} ${styles.optionLink}`}>
          Products
        </Link>
        <div className={styles.option}>
          <Dropdown placement='bottom-right'>
            <Dropdown.Trigger>
              <div>
                Configuration <DownArrow />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label='Static Actions'
              items={configurationDropDownItems}
              onAction={(actionKey) => handleItemClick(actionKey)}
              className={styles.dropDownMenu}>
              {(item) => (
                <Dropdown.Item
                  key={item.key}
                  className={styles.configurationDropDownItem}>
                  {item.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          {isModalOpen.taxation && <TaxationGroupsModal setIsModalOpen={() => closeModal("taxation")} />}
          {isModalOpen.subReferences && <SubReferencesModal setIsModalOpen={() => closeModal("subReferences")} />}
          {isModalOpen.groups && <GroupsModal setIsModalOpen={() => closeModal("groups")} />}
          {isModalOpen.salesmen && <SalesmenModal setIsModalOpen={() => closeModal("salesmen")} />}
          {isModalOpen.warehouses && <StockWarehousesModal setIsModalOpen={() => closeModal("warehouses")} />}
          {isModalOpen.priceLists && <PriceListsModal setIsModalOpen={() => closeModal("priceLists")} />}
        </div>
      </div>
      <div className={styles.userInfo}>
        <BellIcon hasNewNotification={true} />
        <Dropdown placement='bottom-right'>
          <Dropdown.Trigger>
            <div className={styles.userContainer}>
              <User
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                name={user?.name}
                squared
                size='sm'
              />

              <DownArrow />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu
            aria-label='User menu actions'
            onAction={handleLogout}>
            <Dropdown.Item
              key='hi'
              className={styles.dropdownItem}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
