"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import React, { useLayoutEffect } from "react";
import useAuthStore from "@/store/store";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, setToken, setUser } = useAuthStore();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      setToken(null);
      setUser(null);
      redirect("/login");
    }
  }, []);

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
