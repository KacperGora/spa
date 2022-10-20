import React from "react";
import classes from "./FooterMain.module.css";
import logo from "../../../../assets/images/logotransparent.png";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function FooterMain() {
  const navigate = useNavigate();
  return (
    <section className={classes.firstColumnContainer}>
      <div className={classes.flexContainer}>
        <img
          onClick={() => navigate("/")}
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
    </section>
  );
}

export default FooterMain;
