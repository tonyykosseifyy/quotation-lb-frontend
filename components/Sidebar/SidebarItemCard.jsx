import React from "react";
import styles from "./SidebarItemCard.module.css";
import Link from "next/link";

const SidebarItemCard = ({ title, items, link = "#", openModal }) => {
  return (
    <div className={styles.container}>
      <Link href={link} style={{ textDecoration: "none" }}>
        <div className={styles.title}>{title}</div>
      </Link>
      <div className={styles.linksContainer}>
        {items?.map((item, index) =>
          item.link ? (
            <Link href={item.link} className={styles.link} key={index}>
              {item.title}
            </Link>
          ) : (
            <div key={index} onClick={() => openModal(item.name)} className={styles.link} style={{ cursor: "pointer" }}>
              {item.title}{" "}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default SidebarItemCard;
