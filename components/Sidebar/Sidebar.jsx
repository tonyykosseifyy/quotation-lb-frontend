"use client";

import styles from "./Sidebar.module.css";
import { useState } from "react";
import ChevronLeft from "../Chevron/ChevronLeft";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import SidebarItemCard from "@/components/Sidebar/SidebarItemCard";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import { Routes } from "@/router/routes";

const sidebarItems = [
  {
    title: "Quotation",
    logo: "/assets/svg/quotation.svg",
    items: [
      {
        id: 1,
        title: "New Quotation",
        link: Routes.NewQuotation,
      },
      {
        id: 2,
        title: "Quotations Summary",
        link: Routes.QuotationsSummary,
      },
    ],
  },
  {
    title: "Clients",
    logo: "/assets/svg/people.svg",
    items: [
      {
        id: 3,
        title: "Accounts",
        link: Routes.ClientAccounts,
      },
      {
        id: 4,
        title: "Add New Client",
        link: Routes.CreateClient,
      },
    ],
  },
  {
    title: "Stock",
    logo: "/assets/svg/stock.svg",
    items: [
      {
        id: 5,
        title: "Items",
        link: Routes.ItemsSummary,
      },
      {
        id: 6,
        title: "Create Items",
        name: "createItems",
      },
      {
        // title: "Combos",
        // link: "/dashboard/",
      },
      // {
      //     title: "Brands",
      //     link: "/dashboard/",
      // },
    ],
  },
  // {
  //     title: "Report",
  //     logo: "/assets/svg/report.svg",
  //     items: [
  //         {
  //             title: "Report 1",
  //             link: "/dashboard",
  //         },
  //         {
  //             title: "Report 2",
  //             link: "/dashboard/",
  //         },
  //         {
  //             title: "Report 3",
  //             link: "/dashboard/",
  //         },
  //     ],
  // },
  // {
  //     title: "Dashboard Summary",
  //     logo: "/assets/svg/quilt.svg",
  // },
  {
    title: "Admin Panel",
    logo: "/assets/svg/admin-panel.svg",
    link: Routes.AdminPanel,
  },
  // {
  //     title: "Account Settings",
  //     logo: "/assets/svg/account-settings.svg",
  //     items: [
  //         {
  //             title: "Create Users",
  //             link: "/dashboard",
  //         },
  //         {
  //             title: "Category Security Level",
  //             link: "/dashboard/",
  //         },
  //         {
  //             title: "Paper Template",
  //             link: "/dashboard/",
  //         },
  //         {
  //             title: "Domination Name",
  //             link: "/dashboard/",
  //         },
  //     ],
  // },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.openContainer : styles.closedContainer}>
      <button className={open ? styles.controlButton : styles.controlButtonClosed} onClick={toggleOpen}>
        {<ChevronLeft />}
      </button>
      {open && (
        <div className={styles.logoContainer}>
          <Link href={Routes.Home} style={{ textDecoration: "none" }}>
            <img src='/assets/svg/logo/svg/logo-no-background.svg' alt='Logo' className={open ? styles.logo : styles.logoClosed} />
          </Link>
        </div>
      )}
      <div className={open ? styles.list : styles.listClosed}>
        {sidebarItems.map((sidebarItem, index) => (
          <SidebarItem key={index} sidebarItem={sidebarItem} open={open} />
        ))}
      </div>
    </div>
  );
}
