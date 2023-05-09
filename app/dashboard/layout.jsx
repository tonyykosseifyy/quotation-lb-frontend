import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardLayout({ children }) {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div>
                <Navbar />
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    );
}
