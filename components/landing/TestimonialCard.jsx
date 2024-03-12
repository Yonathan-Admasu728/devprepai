import React from "react";
import styles from "../../styles/TestimonialCard.module.css";

function TestimonialCard({ avatar, content, name, role, isActive }) {
  const cardClass = isActive
    ? `${styles.card} ${styles.activeCard}`
    : styles.card;

  return (
    <div className={cardClass}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.avatar}>{avatar}</div>
          <div className={styles.details}>
            <div className={styles.name}>{name}</div>
            <div className={styles.role}>{role}</div>
          </div>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}

export default TestimonialCard;
