"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import ChevronLeft from "../Chevron/ChevronLeft";

const navData = [
    {
        id: 0,
        icon: <img src="/assets/svg/quotation.svg" alt="Quotation" />,
        text: "Quotation",
        link: "/",
    },
    {
        id: 1,
        icon: <img src="/assets/svg/people.svg" alt="Clients" />,
        text: "Clients",
        link: "/",
    },
    {
        id: 2,
        icon: <img src="/assets/svg/stock.svg" alt="Stock" />,
        text: "Stock",
        link: "/",
    },
    {
        id: 3,
        icon: <img src="/assets/svg/report.svg" alt="Report" />,
        text: "Reports",
        link: "/",
    },
    {
        id: 4,
        icon: <img src="/assets/svg/quilt.svg" alt="Dashboard Summary" />,
        text: "Dashboard Summary",
        link: "/",
    },
    {
        id: 5,
        icon: <img src="/assets/svg/admin-panel.svg" alt="Admin Panel" />,
        text: "Admin Panel",
        link: "/",
    },
    {
        id: 6,
        icon: (
            <img
                src="/assets/svg/account-settings.svg"
                alt="Account Settings"
            />
        ),
        text: "Account Settings",
        link: "/",
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
                <img
                    src="/assets/svg/logo.svg"
                    alt="Logo"
                    className={open ? styles.logo : styles.logoClosed}
                />
            </div>
            <div className={open ? styles.list : styles.listClosed}>
                {navData.map((item) => {
                    return (
                        <div key={item.id} className={styles.listItem}>
                            <div className={styles.listItemContainer}>
                                <div className={styles.itemLogo}>
                                    {item.icon}
                                </div>
                                {open && (
                                    <div className={styles.itemText}>
                                        {item.text}
                                    </div>
                                )}
                            </div>
                            {!open && (
                                <div className={styles.tooltip}>
                                    {item.text}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
