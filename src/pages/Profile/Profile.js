import { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import classes from "./Profile.module.css";
import formatDistance from "date-fns/formatDistance";
import React from "react";
import { useSelector } from "react-redux"
import { pl } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
registerLocale("pl", pl);

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

  let pastMeetings = [
    ...userMeetings.filter(
      (meeting) => meeting.date < new Date().toISOString()
    ),
  ];
  let futureMeetings = [
    ...userMeetings.filter(
      (meeting) => meeting.date > new Date().toISOString()
    ),
  ];
  while (pastMeetings.length > 3) {
    pastMeetings = pastMeetings.slice(1);
  }


  const futureContent = futureMeetings.map((meeting) => (
    <li key={Math.random()}>
      {`${meeting.serviceName} dnia ${new Date(
        meeting.date
      ).toLocaleDateString()} o godzinie ${new Date(
        meeting.date
      ).toLocaleTimeString()}`}
      {` za
                   ${formatDistance(new Date(meeting.date), new Date(), {
                     locale: pl,
                   })}`}
    </li>
  ));
  const pastContent = pastMeetings.map((meeting) => (
    <li key={Math.random()}>
      {`  ${`${meeting.serviceName}`} w dniu
      ${`${new Date(meeting.date).toLocaleDateString()}`}, (
      ${formatDistance(new Date(meeting.date), new Date(), {
        locale: pl,
      })}
      temu)`}
    </li>
  ));

  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.hero}>
          <p className={classes.heading}>
            Hej <span>{loggedUser}</span>, fajnie Cię widzieć
          </p>
          <div>
            <p className={classes.description}>Twoje ostatnie wizyty:</p>
            <p className={classes.description}>{pastContent}</p>
          </div>
          <div>
            <p className={classes.description}>Twoje przyszłe wizyty:</p>
            <p className={classes.description}> {futureContent}</p>
          </div>
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
