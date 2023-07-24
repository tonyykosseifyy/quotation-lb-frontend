import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.box}>
        <Navbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
