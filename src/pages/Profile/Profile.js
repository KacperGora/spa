import { Fragment } from "react";

import classes from "./Profile.module.css";

import React from "react";
import { useSelector } from "react-redux";
import { pl } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import ProfileMeetings from "./components/ProfileMeetings";
import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";
registerLocale("pl", pl);

const Profile = () => {
  const loggedUser = useSelector((state) => state.user.user);
  console.log(loggedUser);

  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.hero}>
          <p className={classes.heading}>
            Hej <span>{loggedUser ? loggedUser.name : ""}</span>, fajnie Cię
            widzieć
          </p>
          <ProfileMeetings />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Profile;
