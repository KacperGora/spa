import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";
import moment from "moment";
import DatePicker from "react-datepicker";
import classes from "./AppointmentForm.module.css";
import "./react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";

import {
  parseISO,
  setHours,
  setMinutes,
  getDay,
  addMinutes,
  areIntervalsOverlapping,
  addHours,
} from "date-fns";
registerLocale("pl", pl);

const AppointmentForm = ({ startDate }) => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [newDate, setNewDate] = useState(addHours(new Date(startDate), 7));
  const [excludedTimes, setExcludedTimes] = useState([]);

  const service = useSelector((state) => state.calendar.service);
  const meetings = useSelector((state) => state.calendar.meetings);

  const dispatch = useDispatch();

  const fullName = `${name} ${secondName} ${service}`;
  // const [isOverlaped, setOverlaped] = useState(false)

  const workingMeeting = {
    title: fullName,
    date: newDate,
    end: addMinutes(newDate, service),
    times: [],
  };

  for (let i = 0; i < service; i = i + 15) {
    workingMeeting.times.push(addMinutes(newDate, i));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(calendarActions.setMeeting(workingMeeting));
    // dispatch(calendarActions.addMeeting(e));
    dispatch(modalActions.modalToggle());
  };

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd + "T08:00";
  let newMM = +mm + 1;
  if (newMM < 10) {
    newMM = "0" + newMM;
  }
  let maxDate = yyyy + "-" + newMM + "-" + dd + "T08:00";

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  //=> true)
  let dates = [];
  let dateArr = [];
  useEffect(() => {
    console.log(meetings)
    meetings.forEach((item) => (dates = [...item.times]));
  }, [meetings]);

  const getExcludedTimes = useCallback(
    (date) => {
      let arrSpecificDates = [];

      for (let i = 0; i < dates.length; i++) {
        if (
          moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
          moment(dates[i], moment.ISO_8601).format("YYYY/MM/DD")
        ) {
          console.log("h");
          arrSpecificDates.push(moment(dates[i], moment.ISO_8601).toObject());
        }
      }

      let arrExcludedTimes = [];
      let pickedDate;
      /// Manicure klasyczny 45 minut
      for (let i = 0; i < arrSpecificDates.length; i++) {
        pickedDate = setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        );
        arrExcludedTimes.push(pickedDate);
        console.log(arrExcludedTimes);
      }

      setExcludedTimes(arrExcludedTimes);
    },
    [dates]
  );

  return (
    <div>
      <h2>Dodaj spotkanie</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.container}>
          <DatePicker
            locale="pl"
            filterDate={isWeekday}
            onChange={(e) => {
              setNewDate(e);
            }}
            selected={newDate}
            minDate={new Date()}
            maxDate={parseISO(maxDate)}
            required
            onSelect={getExcludedTimes}
            excludeOut
            timeIntervals={15}
            shouldCloseOnSelect={true}
            name="startDate"
            dateFormat="dd MMMM, yyyy "
            fixedHeight
            excludeTimes={excludedTimes}
            placeholderText="Wybierz datę"
          />
          <DatePicker
            onChange={(e) => {
              setNewDate(e);
            }}
            onSelect={getExcludedTimes}
            excludeTimes={excludedTimes}
            selected={newDate}
            timeCaption="Godzina"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            minDate={new Date()}
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 0), 17)}
          />

          <input
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Imię"
          />
          <input
            required
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
            placeholder="Nazwisko"
          />

          <select
            defaultValue={service}
            required
            onChange={(e) => {
              dispatch(calendarActions.setTypeOfService(e.target.value));
            }}
          >
            <option value={"45"}>Manicure Klasyczny 40 minut 120zł</option>
            <option value={"90"}>Manicure Hybrydowy 90 minut 120zł</option>
            <option value={"120"}>Uzupełnienie Żelowe 120 minut 120zł</option>
            <option value={"4"}>
              Przedłużenie paznokci żelem 150 minut 120zł
            </option>
            <option value={"P"}>Pedicure</option>
          </select>
          <div className={classes.actions}>
            <button onClick={() => dispatch(modalActions.modalToggle())}>
              Anuluj
            </button>
            <button onClick={submitHandler}>Akceptuj</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
