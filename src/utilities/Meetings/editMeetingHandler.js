import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const editMeetingHandler = async ([key, workingMeeting]) => {
  const editDoc = doc(db, "meetings", key);
  await updateDoc(editDoc, {
    ...workingMeeting,
  });
};

export default editMeetingHandler;
