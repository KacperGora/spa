import classes from "./NavBar.module.css";

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import useNavbarConfig from "./useNavbarConfig";
const NavBar = () => {
  const navigate = useNavigate();

  const [active, setIsActive] = useState(false);
  const navbarLinksConfiguration = useNavbarConfig();

  const burgerHandler = () => {
    setIsActive(!active);
  };

  return (
    <header className={`${classes.header} ${active ? classes.navOpen : ""}`}>
      <img
        onClick={() => navigate("/")}
        className={classes.logo}
        src={logo}
        alt="Brand logo"
      />
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          {navbarLinksConfiguration.map((link) => {
            return (
              link.condition && (
                <li key={Math.random()}>
                  <NavLink className={`${classes.navLink}`} to={link.address}>
                    {link.title}
                  </NavLink>
                </li>
              )
            );
          })}
        </ul>
      </nav>
      <button onClick={burgerHandler} className={classes.btnNav}>
        <FaBars className={classes.iconNavMenu} />
        <GrClose className={classes.iconNavClose} />
      </button>
    </header>
  );
};
export default NavBar;
