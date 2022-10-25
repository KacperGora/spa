import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const cancelMeetingHandler = async ([key, getEvents, toggleModal]) => {
  await deleteDoc(doc(db, "meetings", key));
  getEvents();
  toggleModal();
};

export default cancelMeetingHandler;
