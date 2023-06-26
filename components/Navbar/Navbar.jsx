"use client";

import React from "react";
import styles from "./Navbar.module.css";
import { Dropdown, User } from "@nextui-org/react";
import BellIcon from "@/components/UI/Icons/BellIcon";
import DownArrow from "@/components/UI/Icons/DownArrow";
import Link from "next/link";
import { configurationDropDownItems } from "@/data/navBar";

const Navbar = () => {
    return (
        <nav className={`navbar navbar-expand-md navbar-light ${styles.nav}`}>
            <div className={styles.options}>
                <div className={styles.option}>Orders</div>
                <div className={styles.option}>To Invoice</div>
                <div className={styles.option}>Products</div>
                <div className={styles.option}>
                    <Dropdown placement="bottom-right">
                        <Dropdown.Trigger>
                            <div>
                                Configuration <DownArrow />
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Menu 
                            aria-label="Static Actions"
                            items={configurationDropDownItems}
                            onAction={(actionKey) => console.log({ actionKey })}
                            className={styles.dropDownMenu}
                        >
                            {(item) => (
                                <Dropdown.Item
                                    key={item.key}
                                    className={styles.configurationDropDownItem}
                                >
                                    <Link
                                        href={item.link}
                                        className={styles.configurationDropDownItemLink}
                                    >
                                        {item.name}
                                    </Link>
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
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
