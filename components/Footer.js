import React from "react";
import styles from "../styles/Comp.module.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <p className={styles.copyright}>© Michaël Rasolonjatovo 2023</p>
      <p className={styles.copyright}>Tous droits réservés</p>
      <a className={styles.copyright}href="mailto:rasolon.michael@gmail.com" target="_blank"><EmailIcon /></a>
      <a className={styles.copyright}href="https://www.linkedin.com/in/mrasolon/" target="_blank"><LinkedInIcon /></a>
          </footer>
  );
}

export default Footer;
