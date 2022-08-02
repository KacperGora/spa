import React from 'react'
import { Link } from 'react-router-dom';
import classes from './FooterLinks.module.css'
function FooterLinks() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to={"/register"}>Zarejestruj konto</Link>
        </li>
        <li>
          <Link to={"/login"}>Zaloguj się</Link>
        </li>
        <li>
          <Link to={"/login"}>Umów wizytę</Link>
        </li>
        <li>
          <Link to={"/kontakt"}>Skontaktuj się z nami</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterLinks