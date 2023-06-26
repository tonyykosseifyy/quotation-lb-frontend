"use client";

import styles from "./Sidebar.module.css";
import { useState } from "react";
import ChevronLeft from "../Chevron/ChevronLeft";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import SidebarItemCard from "@/components/Sidebar/SidebarItemCard";
import SidebarItem from "@/components/Sidebar/SidebarItem";

const sidebarItems = [
    {
        title: "Quotation",
        logo: "/assets/svg/quotation.svg",
        items: [
            {
                title: "New Quotation",
                link: "/dashboard/quotations/create",
            },
            {
                title: "Quotations Summary",
                link: "/dashboard/quotations/",
            },
        ],
    },
    {
        title: "Clients",
        logo: "/assets/svg/people.svg",
        items: [
            {
                title: "Accounts",
                link: "/dashboard",
            },
            {
                title: "Add New Client",
                link: "/dashboard/clients/create",
            },
        ],
    },
    {
        title: "Stock",
        logo: "/assets/svg/stock.svg",
        items: [
            {
                title: "Items",
                link: "/dashboard/stock/items",
            },
            {
                title: "Create Items",
                link: "/dashboard/",
            },
            {
                title: "Combos",
                link: "/dashboard/",
            },
            {
                title: "Brands",
                link: "/dashboard/",
            },
        ],
    },
    {
        title: "Report",
        logo: "/assets/svg/report.svg",
    },
    {
        title: "Dashboard Summary",
        logo: "/assets/svg/quilt.svg",
    },
    {
        title: "Admin Panel",
        logo: "/assets/svg/admin-panel.svg",
    },
    {
        title: "Account Settings",
        logo: "/assets/svg/account-settings.svg",
        items: [
            {
                title: "Create Users",
                link: "/dashboard",
            },
            {
                title: "Category Security Level",
                link: "/dashboard/",
            },
            {
                title: "Paper Template",
                link: "/dashboard/",
            },
            {
                title: "Domination Name",
                link: "/dashboard/",
            },
        ],
    },
];

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    };
    return (
        <div className={open ? styles.openContainer : styles.closedContainer}>
            <button
                className={
                    open ? styles.controlButton : styles.controlButtonClosed
                }
                onClick={toggleOpen}
            >
                {<ChevronLeft />}
            </button>
            <div className={styles.logoContainer}>
                <Link href="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        src="/assets/svg/logo.svg"
                        alt="Logo"
                        className={open ? styles.logo : styles.logoClosed}
                    />
                </Link>
            </div>
            <div className={open ? styles.list : styles.listClosed}>
                {sidebarItems.map((sidebarItem, index) => (
                    <SidebarItem
                        key={index}
                        sidebarItem={sidebarItem}
                        open={open}
                    />
                ))}
            </div>
        </div>
    );
}
