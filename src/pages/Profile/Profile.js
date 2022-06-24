import { Fragment, useEffect, useMemo, useState } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import classes from "./Profile.module.css";

import React from "react";
import { useSelector } from "react-redux";


const Profile = () => {
  const loggedUser = useSelector((state) => state.user.user.name);
  const meetings = useSelector((state) => state.calendar.meetings);
  const [userMeetings, setUserMeetings] = useState([]);
  const loggedUserMail = useSelector((state) => state.user.user.email);
  const [noMeeting, setNoMeeting] = useState(true);

  useEffect(() => {
    setUserMeetings(
      meetings.filter((meeting) => meeting.email === loggedUserMail),
      setNoMeeting(false)
    );
  }, [loggedUserMail, meetings]);
  useEffect(() => {
    if (userMeetings.length === 0) {
      setNoMeeting(false);
    }
  }, [userMeetings.length]);

  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.hero}>
          <p className={classes.heading}>
            Hej <span>{loggedUser}</span>, fajnie Cię widzieć
          </p>
          <p className={classes.description}>Twoje przyszłe wizyty:</p>
          <p className={classes.description}>
            {userMeetings.map((meeting) => (
              <li>{`${meeting.serviceName} dnia ${new Date(
                meeting.date
              ).toLocaleDateString()} o godzinie ${new Date(
                meeting.date
              ).toLocaleTimeString()}`}</li>
            ))}
          </p>
          {noMeeting && (
            <p style={{ fontSize: "16px" }}>
              Najprawdopodbniej nie masz jeszcze żadnych umówionych wizyt.
            </p>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
