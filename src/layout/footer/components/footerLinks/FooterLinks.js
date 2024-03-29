import React from "react";
import { Link } from "react-router-dom";
import classes from "./FooterLinks.module.css";
function FooterLinks() {
  const linksConfiguration = [
    { to: "/register", label: "Zarejestruj konto" },
    { to: "/login", label: "Zaloguj się" },
    { to: "/login", label: "Umów wizytę" },
    { to: "/kontakt", label: "Skontaktuj się z nami" },
  ];

  return (
    <ul className={classes.footerLinksContainer}>
      {linksConfiguration.map((link) => {
        return (
          <li key={Math.random()}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
export default FooterLinks;
