import React from "react";
import Image from "next/image";
import styles from '../styles/mic-button.module.css';

function UpdatedComponent({ onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.content}>
        <Image
          src="/mic-s.png"
          alt="Image"
          width={24}
          height={24}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default UpdatedComponent;
