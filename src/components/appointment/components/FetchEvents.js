import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const FetchEvents = async () => {
  let meeting = [];
  const querySnapshot = await getDocs(collection(db, "meetings"));
  querySnapshot.forEach((doc) => {
    meeting.push(doc.data());
  });
  return meeting;
};

export default FetchEvents;
