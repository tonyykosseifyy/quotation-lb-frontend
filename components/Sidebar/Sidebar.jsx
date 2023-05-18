"use client";

import styles from "./Sidebar.module.css";
import { useState } from "react";
import ChevronLeft from "../Chevron/ChevronLeft";
import Link from "next/link";

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
                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img
                                src="/assets/svg/quotation.svg"
                                alt="Quotation"
                            />
                        </div>
                        {open && (
                            <div>
                                <div className={styles.itemText}>Quotation</div>
                            </div>
                        )}
                    </div>
                    {!open && <div className={styles.tooltip}>Quotation</div>}
                </div>

                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img src="/assets/svg/people.svg" alt="Clients" />
                        </div>
                        {open && (
                            <div>
                                <div className={styles.itemText}>Clients</div>
                                <div className={styles.subHeaders}>
                                    <Link
                                        href="/dashboard/clients/create"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className={styles.subHeader}>
                                            Add New Client
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    {!open && <div className={styles.tooltip}>Clients</div>}
                </div>

                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img src="/assets/svg/stock.svg" alt="Stock" />
                        </div>
                        {open && <div className={styles.itemText}>Stock</div>}
                    </div>
                    {!open && <div className={styles.tooltip}>Stock</div>}
                </div>

                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img src="/assets/svg/report.svg" alt="Report" />
                        </div>
                        {open && <div className={styles.itemText}>Report</div>}
                    </div>
                    {!open && <div className={styles.tooltip}>Report</div>}
                </div>

                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img
                                src="/assets/svg/quilt.svg"
                                alt="Dashboard Summary"
                            />
                        </div>
                        {open && (
                            <div className={styles.itemText}>
                                Dashboard Summary
                            </div>
                        )}
                    </div>
                    {!open && (
                        <div className={styles.tooltip}>Dashboard Summary</div>
                    )}
                </div>

                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img
                                src="/assets/svg/admin-panel.svg"
                                alt="Admin Panel"
                            />
                        </div>
                        {open && (
                            <div className={styles.itemText}>Admin Panel</div>
                        )}
                    </div>
                    {!open && <div className={styles.tooltip}>Admin Panel</div>}
                </div>

                <div className={styles.listItem}>
                    <div className={styles.listItemContainer}>
                        <div className={styles.itemLogo}>
                            <img
                                src="/assets/svg/account-settings.svg"
                                alt="Account Settings"
                            />
                        </div>
                        {open && (
                            <div className={styles.itemText}>
                                Account Settings
                            </div>
                        )}
                    </div>
                    {!open && (
                        <div className={styles.tooltip}>Account Settings</div>
                    )}
                </div>
            </div>
        </div>
    );
}
