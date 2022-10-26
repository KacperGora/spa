import { addMinutes, areIntervalsOverlapping, subHours } from "date-fns";
import { useEffect, useState } from "react";

function useCheckOverlappingEvents(pickedDate, meetings, service) {
  const [isOverlapped, setOverlapped] = useState(false);

  const meetingsAtPickedDate = meetings.filter(
    (meeting) =>
      new Date(meeting.date).toLocaleDateString() ===
      pickedDate.toLocaleDateString()
  );
  useEffect(() => {
    setOverlapped(false);
    meetingsAtPickedDate.forEach((meeting) => {
      if (
        areIntervalsOverlapping(
          {
            start: pickedDate,
            end: addMinutes(pickedDate, service),
          },
          {
            start: subHours(new Date(meeting.date), 2),
            end: subHours(new Date(meeting.end), 2),
          }
        )
      ) {
        setOverlapped(true);
      }
    });
  }, [meetingsAtPickedDate, pickedDate, service]);

  return isOverlapped;
}

export default useCheckOverlappingEvents;
