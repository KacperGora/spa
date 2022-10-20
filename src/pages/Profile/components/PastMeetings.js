import { formatDistance } from "date-fns";
import { pl } from "date-fns/locale";
import classes from "./PastMeetings.module.css";
function PastMeetings({ userMeetings }) {
  let pastMeetings = userMeetings.filter(
    (meeting) => meeting.date < new Date().toISOString()
  );

  return (
    <div>
      <h2>Twoje ostatnie wizyty:</h2>
      {pastMeetings.map((meeting) => (
        <li key={Math.random()}>
          <p>
            {`  ${`${meeting.serviceName}`} w dniu
      ${`${new Date(meeting.date).toLocaleDateString()}`}, (
      ${formatDistance(new Date(meeting.date), new Date(), {
        locale: pl,
      })}
      temu)`}
          </p>
        </li>
      ))}
    </div>
  );
}

export default PastMeetings;
