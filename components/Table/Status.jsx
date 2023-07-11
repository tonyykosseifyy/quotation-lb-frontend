import styles from "./Status.module.css";

export const Status = ({ centerStatus, status, statusText }) => {
  return (
    <div
      className={`
    ${styles.container}
    ${centerStatus ? styles.justifyCenter : ""}
  
    `}>
      <div
        className={`
                ${statusText ? styles.textStatus : styles.emptyStatus}
                ${status[statusText] === 0 ? styles.warning : status[statusText] === 1 ? styles.success : styles.danger}`}>
        {statusText}
      </div>
    </div>
  );
};
