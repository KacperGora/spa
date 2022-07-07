import { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import classes from "./Profile.module.css";
import formatDistance from "date-fns/formatDistance";
import React from "react";
import { useSelector } from "react-redux"
import { pl } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import ProfileMeetings from "./ProfileMeetings";
import FetchEvent from "../../components/fetchEvent";
registerLocale("pl", pl);

const Profile = () => {
  const loggedUser = useSelector((state) => state.user.user.name);
  const meetings = useSelector((state) => state.calendar.meetings);
  const [userMeetings, setUserMeetings] = useState([]);
  const loggedUserMail = useSelector((state) => state.user.user.email);
 

  return (
    <Fragment>
      <FetchEvent />
      <NavBar />
      <section className={classes.container}>
        <div className={classes.hero}>
          <p className={classes.heading}>
            Hej <span>{loggedUser}</span>, fajnie Cię widzieć
          </p>
        <ProfileMeetings />
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
