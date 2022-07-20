import classes from "./Footer.module.css";
import logo from '../../../images/logotransparent.png'
import { Link, useNavigate } from "react-router-dom";
import {  FaInstagram } from "react-icons/fa";

import { FiFacebook } from "react-icons/fi";

const Footer = () => {
      const navigate = useNavigate();
     const homeHandler = () => {
       navigate("/");
     };
  return (
    <footer className={classes.footer}>
      <div className={`${classes.container} ${classes.grid} ${classes.grid5}`}>
        <div className={classes.logo}>
          <div className={classes.flexContainer}>
            <img
              onClick={homeHandler}
              className={classes.logoImg}
              src={logo}
              alt="Brand logo"
            />
            <a href="https://www.facebook.com/aroundherbeauty/">
              <FiFacebook className={classes.icons} />
            </a>
            <a href="https://www.instagram.com/aroundherbeauty/">
              <FaInstagram className={classes.icons} />
            </a>
          </div>
          <p>Copyright &copy; 2022 by Around Her Beauty</p>
        </div>
        <div className={classes.addressCol}>
          <p>
            Justyna Góra <br />Ptaszkowa 20 <br />
            33-333 Ptaszkowa
          </p>
          <p>
            <span></span>
            <a href="tel:123-456-789">Nr telefonu :123-456-789</a>
          </p>
          <span></span>
          <a href="mailto:kontakt@aroundherbeauty.com.pl">
            kontakt@aroundherbeauty.com
          </a>
        </div>
        <nav className={classes.nav}>
            <ul>
                <li><Link to={'/register'}>Zarejestruj konto</Link></li>
                <li><Link to={'/login'}>Zaloguj się</Link></li>
                <li><Link to={'/login'}>Umów wizytę</Link></li>
                <li><Link to={'/kontakt'}>Skontaktuj się z nami</Link></li>
            </ul>
        </nav>
     
      
      </div>
    </footer>
  );
};

export default Footer;
