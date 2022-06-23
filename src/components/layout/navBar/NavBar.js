import classes from "./NavBar.module.css";
import React from "react";
import logo from "../../../images/logo.png";
import { NavLink} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginActions } from "../../../store/loginSlice";
const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  
 const isAuth = useSelector((state) => state.auth.isLogged);
  const homeHandler = () => {
    history.push("/");
  };
 const scrollHandler = () => {
    const header = this.document.querySelector('header');
    header.classList.toggle('sticky', this.window.scrollY>0)
    console.log('object')
  }
  return (
    <header onScroll={scrollHandler} className={classes.header}>
      <img
        onClick={homeHandler}
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
          {isAuth && (
            <li>
              <div className={classes.dropdown}>
                <NavLink to="/profil" className={`${classes.navLink}`}>
                  Profil
                </NavLink>
                <ul className={classes.dropdownContent}>
                  <li>
                    <NavLink className={classes.link} to="'/">
                      Oferta
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={classes.link} to="'/">
                      Praca
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={classes.link} to="'/">
                      Wyloguj
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}
          <li>
            {isAuth && (
              <button
                onClick={() => {
                  dispatch(loginActions.logout());
                  dispatch(loginActions.admin(false))
                  history.push("/");
                }}
              >
                Wyloguj
              </button>
            )}
          </li>
          <li>
            {!isAuth && (
              <NavLink
                to="/login"
                className={`${classes.navLink} ${classes.navCTA}`}
              >
                Zaloguj
              </NavLink>
            )}
            {isAuth && (
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
    </header>
  );
};
export default NavBar;
