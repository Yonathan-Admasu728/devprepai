import React from "react";
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image src="/logo-h.png" alt="Logo" width={200} height={100} loading="lazy" />
            <div className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper purus eleifend purus faucibus faucibus.
            </div>
          </div>
          {/* social media handles here  */}
        </div>
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>Resources</li>
            <li className={styles.menuItem}>Services</li>
            <li className={styles.menuItem}>Pricing</li>
            <li className={styles.menuItem}>Testimonials</li>
            <li className={styles.menuItem}>Blog</li>
          </ul>
        </div>
        <div className={styles.links}>
          <div className={styles.linkSection}>Useful Links</div>
          <div className={styles.linkItem}>Terms of Services</div>
          <div className={styles.linkItem}>Privacy Policy</div>
          <div className={styles.linkItem}>Cookie Policy</div>
          <div className={styles.linkItem}>Contact Us</div>
        </div>
        <div className={styles.newsletter}>
          <div className={styles.newsletterTitle}>Newsletter</div>
          <div className={styles.newsletterDescription}>
            Sign up and receive the latest news via email.
          </div>
          <div className={styles.newsletterForm}>
            <input type="email" className={styles.newsletterInput} placeholder="Email address" />
            <button className={styles.newsletterButton}>Send</button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        Copyright 2023 DEVPREPAI. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
