import { Fragment } from "react";
import useFetchUserMeetings from "../../../hooks/useFetchUsersMeetings";
import classes from "../Profile.module.css";
import FutureMeetings from "./FutureMeetings";
import PastMeetings from "./PastMeetings";
const ProfileMeetings = () => {
  const userMeetings = useFetchUserMeetings();

  return (
    <Fragment>
      <PastMeetings userMeetings={userMeetings} />
      <FutureMeetings userMeetings={userMeetings} />

      {userMeetings.length === 0 && (
        <p>Najprawdopodbniej nie masz jeszcze żadnych umówionych wizyt.</p>
      )}
    </Fragment>
  );
};
export default ProfileMeetings;
