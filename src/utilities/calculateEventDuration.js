import { addHours, addMinutes } from "date-fns";

function calculateEventDuration(service, pickedDate) {
  let serviceDuration = [];
  for (let i = 0; i < service; i += 15) {
    serviceDuration.push(
      addHours(new Date(addMinutes(pickedDate, i)), 2).toISOString()
    );
  }

  return serviceDuration;
}

export default calculateEventDuration;
