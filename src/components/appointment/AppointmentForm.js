import { useState } from "react";
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
  addHours,
  addMinutes,
} from "date-fns";
registerLocale("pl", pl);

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const service = useSelector((state) => state.calendar.service);
  const [newDate, setNewDate] = useState(new Date(2022, 5, 20));
  const [excludedTimes, setExcludedTimes] = useState([]);
  const meetings = useSelector((state) => state.calendar.meetings);

  const fullName = `${name} ${secondName} ${service}`;
  console.log(service);
  const dispatch = useDispatch();
  const workingMeeting = { title: fullName, date: newDate };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(calendarActions.setMeeting(workingMeeting));
    dispatch(calendarActions.addMeeting());
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

  let dates = [];
  let dateArr = [];
  meetings.map((item) => dates.push(item.date));
  dates.forEach((date) => dateArr.push(new Date(date)));

  const getExcludedTimes = (date) => {
    let arrSpecificDates = [];
    for (let i = 0; i < dateArr.length; i++) {
      if (
        moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(dateArr[i], moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(moment(dateArr[i], moment.ISO_8601).toObject());
      }
    }

    let arrExcludedTimes = [];
    console.log(service);
    /// Manicure klasyczny 45 minut
    if (service === "1") {
      for (let i = 0; i < arrSpecificDates.length; i++) {
        const pickedDate = setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        );

        arrExcludedTimes.push(
          pickedDate,
          addMinutes(pickedDate, 15),
          addMinutes(pickedDate, 30)
        );
        setExcludedTimes(arrExcludedTimes);
      }
    }
    /// Manicure hybryda 90 minut
    if (service === "2") {
      for (let i = 0; i < arrSpecificDates.length; i++) {
        const pickedDate = setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        );

        arrExcludedTimes.push(
          pickedDate,
          addMinutes(pickedDate, 15),
          addMinutes(pickedDate, 30),
          addMinutes(pickedDate, 45),
          addMinutes(pickedDate, 60),
          pickedDate,
          addMinutes(pickedDate, 75)
        );
        setExcludedTimes(arrExcludedTimes);
      }
    }
    //Manicure 120 minut
    if (service === "3") {
      for (let i = 0; i < arrSpecificDates.length; i++) {
        const pickedDate = setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        );

        arrExcludedTimes.push(
          pickedDate,
          addMinutes(pickedDate, 15),
          addMinutes(pickedDate, 30),
          addMinutes(pickedDate, 45),
          addMinutes(pickedDate, 60),
          addMinutes(pickedDate, 75),
          addMinutes(pickedDate, 90),
          addMinutes(pickedDate, 105),
          
        );
        setExcludedTimes(arrExcludedTimes);
      }
    }
    if (service === "2") {
      for (let i = 0; i < arrSpecificDates.length; i++) {
        const pickedDate = setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        );

        arrExcludedTimes.push(
          pickedDate,
          addMinutes(pickedDate, 15),
          addMinutes(pickedDate, 30),
          addMinutes(pickedDate, 45),
          addMinutes(pickedDate, 60)
        );
        setExcludedTimes(arrExcludedTimes);
      }
    }
  };

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
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Imię"
          />
          <input
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
            placeholder="Nazwisko"
          />

          <select
            onChange={(e) => {
              dispatch(calendarActions.setTypeOfService(e.target.value));
            }}
          >
            <option value={"1"}>Manicure Klasyczny 40 minut 120zł</option>
            <option value={"2"}>Manicure Hybrydowy 90 minut 120zł</option>
            <option value={"3"}>Uzupełnienie Żelowe 120 minut 120zł</option>
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
