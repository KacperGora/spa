import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";

function useAddNewEvent(workingMeeting, userMeetings, loggedUserMail) {

  async function sendData() {
    try {
      const docRef = doc(collection(db, "meetings"));
      await setDoc(docRef, {
        ...workingMeeting,
        id: docRef.id,
        timeStamp: serverTimestamp(),
      });

      const userRef = doc(db, "users", loggedUserMail);
      await updateDoc(userRef, { meetings: [...userMeetings, workingMeeting] });
    } catch (error) {
      const { code, message } = error;
      throw new Error(message, code);
    }
  }

  return sendData();
}

export default useAddNewEvent;
