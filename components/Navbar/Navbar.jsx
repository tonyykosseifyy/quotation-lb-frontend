"use client";

import React from "react";
import styles from "./Navbar.module.css";
import { Dropdown, User } from "@nextui-org/react";
import BellIcon from "@/components/UI/Icons/BellIcon";
import DownArrow from "@/components/UI/Icons/DownArrow";

const Navbar = () => {
    return (
        <nav className={`navbar navbar-expand-md navbar-light ${styles.nav}`}>
            <div className={styles.options}>
                <div className={styles.option}>Orders</div>
                <div className={styles.option}>To Invoice</div>
                <div className={styles.option}>Products</div>
            </div>
            <div className={styles.userInfo}>
                <BellIcon hasNewNotification={true} />
                <Dropdown placement="bottom-right">
                    <Dropdown.Trigger>
                        <div className={styles.userContainer}>
                            <User
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                name="Ariana Wattson"
                                squared
                                size="sm"
                            />

                            <DownArrow />
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                        aria-label="User menu actions"
                        onAction={(actionKey) => console.log({ actionKey })}
                    >
                        <Dropdown.Item key="hi" className={styles.dropdownItem}>
                            Hi
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
