import { formatDistance } from "date-fns";
import { pl } from "date-fns/locale";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Profile.module.css";
const ProfileMeetings = () => {
 
  const meetings = useSelector((state) => state.calendar.meetings);
  const [userMeetings, setUserMeetings] = useState([]);
  const loggedUserMail = useSelector((state) => state.user.user.email);

  useEffect(() => {
    setUserMeetings(
      meetings.filter((meeting) => meeting.email === loggedUserMail),
    );
  }, [loggedUserMail, meetings]);
 

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
     
      <div>
        <p className={classes.description}>Twoje ostatnie wizyty:</p>
        <p className={classes.description}>{pastContent}</p>
      </div>
      <div>
        <p className={classes.description}>Twoje przyszłe wizyty:</p>
        <p className={classes.description}> {futureContent}</p>
      </div>
      {userMeetings.length === 0 ? (
        <p style={{ fontSize: "16px" }}>
          Najprawdopodbniej nie masz jeszcze żadnych umówionych wizyt.
        </p>
      ) : ''}
    </Fragment>
  );
};
export default ProfileMeetings;
