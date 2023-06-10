"use client";

import React from "react";
import styles from "./Modal.module.css";
import  Modal  from "react-modal";

const ModalComponent = ({ isOpen, onRequestClose, style, title, titlePaddingBottom, children }) => {

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      style={style}
    >
      <div className={`${styles.xIcon}`}>
         <svg 
            width="22" 
            height="21" 
            viewBox="0 0 22 21" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onClick={onRequestClose}
          >
            <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M21.6387 10.5C21.6387 16.2991 16.9378 21 11.1387 21C5.33952 21 0.638672 16.2991 0.638672 10.5C0.638672 4.70085 5.33952 0 11.1387 0C16.9378 0 21.6387 4.70085 21.6387 10.5ZM7.95717 7.3185C8.10483 7.17103 8.30498 7.08819 8.51367 7.08819C8.72236 7.08819 8.92251 7.17103 9.07017 7.3185L11.1387 9.387L13.2072 7.3185C13.3565 7.1794 13.5539 7.10367 13.7579 7.10727C13.9619 7.11087 14.1566 7.19351 14.3009 7.3378C14.4452 7.48208 14.5278 7.67674 14.5314 7.88075C14.535 8.08477 14.4593 8.28222 14.3202 8.4315L12.2517 10.5L14.3202 12.5685C14.4593 12.7178 14.535 12.9152 14.5314 13.1192C14.5278 13.3233 14.4452 13.5179 14.3009 13.6622C14.1566 13.8065 13.9619 13.8891 13.7579 13.8927C13.5539 13.8963 13.3565 13.8206 13.2072 13.6815L11.1387 11.613L9.07017 13.6815C8.92089 13.8206 8.72344 13.8963 8.51942 13.8927C8.31541 13.8891 8.12075 13.8065 7.97647 13.6622C7.83219 13.5179 7.74954 13.3233 7.74594 13.1192C7.74234 12.9152 7.81807 12.7178 7.95717 12.5685L10.0257 10.5L7.95717 8.4315C7.8097 8.28384 7.72686 8.08369 7.72686 7.875C7.72686 7.66631 7.8097 7.46616 7.95717 7.3185Z" 
                fill="#535353"
            />
        </svg>
      </div>
      <div className={`${styles.modalTitle}`} style={{paddingBottom: titlePaddingBottom}}>
          {title}
      </div>  
      {children}
   </Modal>
  )
}

export default ModalComponent;