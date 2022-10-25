import { addHours, addMinutes } from "date-fns";

function calculateEventDuration(service, pickedDate) {
  let eventDuration = [];
  for (let i = 0; i < service; i += 15) {
    eventDuration.push(
      addHours(new Date(addMinutes(pickedDate, i)), 2).toISOString()
    );
  }

  return eventDuration;
}

export default calculateEventDuration;
