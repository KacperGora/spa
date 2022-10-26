import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const editMeetingHandler = async ([
  key,
  workingMeeting,
  getEvents,
  toggleModal,
]) => {
  const editDoc = doc(db, "meetings", key);
  await updateDoc(editDoc, {
    ...workingMeeting,
  });
  getEvents();
  toggleModal();
};

export default editMeetingHandler;
