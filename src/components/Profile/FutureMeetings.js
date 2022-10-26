import { formatDistance } from "date-fns";
import { pl } from "date-fns/locale";
import classes from "./FutureMeetings.module.css";
function FutureMeetings({ userMeetings }) {
  const futureMeetings = userMeetings.filter(
    (meeting) => meeting.date >= new Date().toISOString()
  );

  return (
    <div>
      <h2>Twoje przyszłe wizyty:</h2>
      {futureMeetings.map((meeting) => (
        <li key={Math.random()}>
          <p>
            {`${meeting.serviceName} dnia ${new Date(
              meeting.date
            ).toLocaleDateString()} o godzinie ${new Date(
              meeting.date
            ).toLocaleTimeString()}`}
            {` za
                   ${formatDistance(new Date(meeting.date), new Date(), {
                     locale: pl,
                   })}`}
          </p>
        </li>
      ))}
    </div>
  );
}

export default FutureMeetings;
