import { addMinutes } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


const onAdminChange = async (e, meetings) => {
  const key = e.event._def.publicId;
  let times = [];

  let eventToChange = meetings.filter(
    (event) => event.id === e.event._def.publicId
  );

  const numberOfIntervals15min =
    (e.event._instance.range.end - e.event._instance.range.start) /
    1000 /
    60 /
    15;

  for (let i = 0; i < numberOfIntervals15min; i++) {
    times.push(addMinutes(e.event._instance.range.start, i * 15));
  }

  const eventToEditRef = doc(db, "meetings", key);
  
  await updateDoc(eventToEditRef, {
    serviceName: eventToChange[0].serviceName,
    title: eventToChange[0].title,
    date: e.event._instance.range.start.toISOString(),
    end: e.event._instance.range.end.toISOString(),
    times,
    email: eventToChange[0].email,
  });
};

export default onAdminChange;
