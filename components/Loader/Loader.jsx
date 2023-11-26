import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div class={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
