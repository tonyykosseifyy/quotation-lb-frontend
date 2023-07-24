import React from "react";
import styles from "./SidebarItemCard.module.css";
import Link from "next/link";

const SidebarItemCard = ({ title, items, link = "#" }) => {
  return (
    <div className={styles.container}>
      <Link href={link} style={{ textDecoration: "none" }}>
        <div className={styles.title}>{title}</div>
      </Link>
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
