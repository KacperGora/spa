import classes from "./NavBar.module.css";
import React from "react";
import logo from "../../images/logo.png";
import { NavLink} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const NavBar = () => {
  const history = useHistory();
 const isAuth = useSelector((state) => state.auth.isLogged);
  const homeHandler = () => {
    history.push("/");
  };
  return (
    <header>
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
         {isAuth && <li><NavLink to='/profil'className={`${classes.navLink}`}>Profil</NavLink></li>}
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
              >Umów wizytę</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default NavBar;
