import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const callForMeetings = async () => {
  const meetings = [];
  const querySnapshot = await getDocs(collection(db, "meetings"));
  querySnapshot.forEach((doc) => {
    meetings.push(doc.data());
  });
  return meetings;
};

export default callForMeetings;
