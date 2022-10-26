import React from "react";
import { useSelector } from "react-redux";
import classes from "./ContactDetail.module.css";
import { contactConfiguration } from "./contactConfiguration";
import CustomButton from "../../UI/PrimaryButton/CustomButton";

function ContactDetail() {
  const isAuth = useSelector((state) => state.auth.isLogged);
  return (
    <div className={classes.contactDetail}>
      {contactConfiguration.map((item) => {
        return (
          <>
            {item.render}
            {item.text}
            {item.renderActions}
          </>
        );
      })}
      <CustomButton destination={isAuth ? "/calendar" : "/login"}>
        Zadbaj o swoje dłonie
      </CustomButton>
    </div>
  );
}

export default ContactDetail;
