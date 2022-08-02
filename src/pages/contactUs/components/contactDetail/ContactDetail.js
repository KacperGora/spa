import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdSmartphone,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./ContactDetail.module.css";
function ContactDetail() {
  const isAuth = useSelector((state) => state.auth.isLogged);
  return (
    <div className={classes.contactDetail}>
      <span>
        <MdOutlineLocationOn className={classes.icons} />
      </span>{" "}
      Ptaszkowa 20, 33-333 PTASZKOWA,
      <p>
        <span>
          <MdSmartphone className={classes.icons} />
        </span>
        <a href="tel:123-456-789">123-456-789</a>
      </p>
      <span>
        <MdOutlineEmail className={classes.icons} />
      </span>
      <a href="mailto:kontakt@aroundherbeauty.com.pl">
        kontakt@aroundherbeauty.com
      </a>
      <br />
      Znajdziesz nas również tutaj!
      <br />
      <a href="https://www.facebook.com/aroundherbeauty/">
        <FaFacebook className={classes.icons} />
      </a>
      <a href="https://www.instagram.com/aroundherbeauty/">
        <FaInstagram className={classes.icons} />
      </a>
      <br />
      {isAuth && (
        <Link
          to="/calendar"
          className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
        >
          Zadbaj o swoje dłonie
        </Link>
      )}
      {!isAuth && (
        <Link
          to="/login"
          className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
        >
          Zadbaj o swoje dłonie
        </Link>
      )}
    </div>
  );
}

export default ContactDetail;
