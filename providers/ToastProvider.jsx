"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer progressStyle={{ background: "var(--primary-clr)" }} />
    </>
  );
}
