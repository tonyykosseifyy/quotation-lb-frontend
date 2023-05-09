import styles from "./Status.module.css";

export const Status = (props) => {
    return (
        <div
            className={`
    ${styles.container}
  
    `}
        >
            <div
                className={`
                ${styles.childContainer}
                ${
                    props.status === 0
                        ? styles.warning
                        : props.status === 1
                        ? styles.success
                        : styles.danger
                }`}
            ></div>
        </div>
    );
};
