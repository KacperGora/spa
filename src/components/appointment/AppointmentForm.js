import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";
const AppointmentForm = () => {
  const [name, setName] = useState("");
  const meeting = useSelector((state) => state.calendar.meeting);
  const meetings = useSelector((state) => state.calendar.meetings);
  const [secondName, setSecondName] = useState("");

  const fullName = `${name} ${secondName}`;
  const [mail, setMail] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const workingMeeting = { title: fullName, date: date };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(meeting);
    dispatch(calendarActions.setMeeting(workingMeeting));
    dispatch(calendarActions.addMeeting());
    console.log(meeting);
    console.log(meetings);
    dispatch(modalActions.modalToggle());
  };

  return (
    <div>
      <h2>Dodaj spotkanie</h2>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => setDate(e.target.value)}
          type="datetime-local"
        ></input>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Imię"
        ></input>
        <input
          onChange={(e) => {
            setSecondName(e.target.value);
          }}
          placeholder="Nazwisko"
        ></input>
        <select>
          <option>Hybryda</option>
          <option>Żel</option>
        </select>
        <button onClick={() => dispatch(modalActions.modalToggle())}>
          Anuluj
        </button>
        <button onClick={submitHandler}>Akceptuj</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
