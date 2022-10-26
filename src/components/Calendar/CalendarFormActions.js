import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import useFetchEvents from "../../hooks/calendar hooks/useFetchEvents";
import { calendarActions } from "../../store/calendarSlice";
import useToggleModal from "../../hooks/useToggleModal";
import cancelMeetingHandler from "../../utilities/Meetings/cancelMeetingHandler";
import editMeetingHandler from "../../utilities/Meetings/editMeetingHandler";

import classes from "./CalendarFormActions.module.css";
function CalendarFormActions({ workingMeeting, isOverlapped, isChanging }) {
  const key = useSelector((state) => state.calendar.key);
  const toggleModal = useToggleModal();
  const dispatch = useDispatch();
  const getEvents = useFetchEvents();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isOverlapped) {
      return;
    }
    toggleModal();
    dispatch(calendarActions.setMeeting(workingMeeting));
    dispatch(calendarActions.setExcludedTimes(...workingMeeting.times));
    try {
      const docRef = doc(collection(db, "meetings"));
      await setDoc(docRef, {
        ...workingMeeting,
        id: docRef.id,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      const { code, message } = error;
      throw new Error(message, code);
    }
  };

  const firstButtonChangeEvent = {
    text: "Anuluj Spotkanie",
    action: (e) => {
      e.preventDefault();
      cancelMeetingHandler([key, getEvents, toggleModal]);
    },
  };
  const secondButtonChangeEvent = {
    text: "Akceptuj zmiany",
    action: (e) => {
      e.preventDefault();
      editMeetingHandler([key, workingMeeting, getEvents, toggleModal]);
    },
  };
  const firstButtonMain = {
    text: "Anuluj",
    action: toggleModal,
  };
  const secondButtonMain = {
    text: "Akceptuj",
    action: submitHandler,
  };
  return (
    <div className={classes.actions}>
      <button
        className={classes.button}
        onClick={
          isChanging ? firstButtonChangeEvent.action : firstButtonMain.action
        }
      >
        {isChanging ? firstButtonChangeEvent.text : firstButtonMain.text}
      </button>

      <button
        className={classes.button}
        onClick={
          isChanging ? secondButtonChangeEvent.action : secondButtonMain.action
        }
      >
        {isChanging ? secondButtonChangeEvent.text : secondButtonMain.text}
      </button>
    </div>
  );
}
export default CalendarFormActions;
