"use client";

import React from "react";
import styles from "./Modal.module.css";
import Modal from "react-modal";

const ModalComponent = ({
    isOpen,
    onRequestClose,
    style,
    title,
    titlePaddingBottom,
    children,
}) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
            <div className={`${styles.xIcon}`}>
                <span onClick={onRequestClose}>
                    <img src="/assets/svg/xIcon.svg" alt="close modal" />
                </span>
            </div>
            <div
                className={`${styles.modalTitle}`}
                style={{ paddingBottom: titlePaddingBottom }}
            >
                {title}
            </div>
            {children}
        </Modal>
    );
};

export default ModalComponent;
