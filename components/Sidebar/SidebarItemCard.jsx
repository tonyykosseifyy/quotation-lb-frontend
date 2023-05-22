import React from "react";
import styles from "./SidebarItemCard.module.css";
import Link from "next/link";

const SidebarItemCard = ({ title, items }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.linksContainer}>
                {items?.map((item) => (
                    <Link href={item.link} className={styles.link}>
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SidebarItemCard;
