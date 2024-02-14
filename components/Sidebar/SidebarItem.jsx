import React, { useState } from "react";
import styles from "@/components/Sidebar/SidebarItem.module.css";
import { Tooltip } from "@nextui-org/react";
import SidebarItemCard from "@/components/Sidebar/SidebarItemCard";
import Link from "next/link";
import CreateItemsModal from "@/app/dashboard/stock/items/create/page";

const SidebarItem = ({ sidebarItem, open }) => {
  const [isModalOpen, setIsModalOpen] = useState({
    createItems: false,
  });

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

  return (
    <>
      <div className={styles.listItemContainer}>
        <Tooltip
          content={
            !open && (
              <SidebarItemCard
                title={sidebarItem.title}
                items={sidebarItem.items}
                link={sidebarItem.link}
                openModal={openModal}
              />
            )
          }
          leaveDelay={100}
          hideArrow={true}
          placement={"rightStart"}
          offset={10}
          style={{ width: "100%" }}
          css={{ borderRadius: 0, padding: 0 }}>
          <div
            className={styles.listItem}
            style={{ width: "100%" }}>
            <div className={styles.itemLogo}>
              <img
                src={sidebarItem.logo}
                alt={sidebarItem.title}
              />
            </div>
            {open && (
              <div>
                <Link
                  href={sidebarItem.link ?? "#"}
                  style={{ textDecoration: "none" }}>
                  <div className={styles.itemText}>{sidebarItem.title}</div>
                </Link>
                {sidebarItem.items && (
                  <div className={styles.subHeaders}>
                    {sidebarItem.items?.map((item, index) =>
                      item.link ? (
                        <Link
                          href={item.link}
                          style={{ textDecoration: "none" }}
                          key={index}>
                          <div className={styles.subHeader}>{item.title}</div>
                        </Link>
                      ) : (
                        <div
                          key={index}
                          onClick={() => openModal(item.name)}
                          className={styles.subHeader}>
                          {item.title}{" "}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </Tooltip>
      </div>
      {isModalOpen.createItems && <CreateItemsModal closeModal={closeModal} />}
    </>
  );
};

export default SidebarItem;
