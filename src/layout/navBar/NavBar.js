import classes from "./NavBar.module.css";

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { MdPerson } from "react-icons/md";
import { loginActions } from "../../store/loginSlice";
import { userActions } from "../../store/usersSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setIsActive] = useState(false);
  const isAuth = useSelector((state) => state.auth.isLogged);
  const user = useSelector(state => state.user.user.name)
  const isLogged = isAuth && user

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
          <li>
            <NavLink to="/about" className={`${classes.navLink}`}>
              O mnie
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={`${classes.navLink}`}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/kontakt" className={`${classes.navLink}`}>
              Kontakt
            </NavLink>
          </li>
          {isLogged &&(
            <li>
              <NavLink to="/profile" className={`${classes.navLink}`}>
                <MdPerson className={classes.icons} />
              </NavLink>
            </li>
          )}
          <li>
            {isLogged && (
              <button
                className={classes.logoutButton}
                onClick={() => {
                  dispatch(loginActions.logout(""));

                  dispatch(loginActions.admin(false));
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Wyloguj
              </button>
            )}
          </li>
          <li>
            {!isLogged && (
              <NavLink
                to="/login"
                className={`${classes.navLink} ${classes.navCTA}`}
              >
                Zaloguj
              </NavLink>
            )}
            {isLogged && (
              <NavLink
                to="/calendar"
                className={`${classes.navLink} ${classes.navCTA}`}
              >
                Umów wizytę
              </NavLink>
            )}
          </li>
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
