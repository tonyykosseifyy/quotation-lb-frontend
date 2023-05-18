import styles from "./Status.module.css";

export const Status = ({ centerStatus, status, statusText }) => {
    return (
        <div
            className={`
    ${styles.container}
    ${centerStatus ? styles.justifyCenter : ""}
  
    `}
        >
            <div
                className={`
                ${statusText ? styles.textStatus : styles.emptyStatus}
                ${
                    status === 0
                        ? styles.warning
                        : status === 1
                        ? styles.success
                        : styles.danger
                }`}
            >
                {statusText && statusText[status]}
            </div>
        </div>
    );
};
