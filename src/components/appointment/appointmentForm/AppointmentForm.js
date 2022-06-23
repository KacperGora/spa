import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../../store/calendarSlice";
import { modalActions } from "../../../store/modalSlice";
import moment from "moment";
import DatePicker from "react-datepicker";
import classes from "./AppointmentForm.module.css";
import "../react-datepicker.css";
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
  const meetings = useSelector((state) => state.calendar.meetings);
  const service = useSelector((state) => state.calendar.service);
  const dates = useSelector((state) => state.calendar.excludedTimes);

  const dispatch = useDispatch();
  let serviceName = "";
switch (service) {
  case "45":
    serviceName = "Manicure Klasyczny";
    break;

  case "90":
    serviceName = "Manicure Hybrydowy";
    break;
  case "120":
    serviceName = "Uzupełnienie żelowe";
    break;
  case "150":
    serviceName = "Przedłużanie paznokci żelem";
    break;
  case "40":
    serviceName = "Pedicure";
    break;
  default:
    serviceName = "Nie podano usługi";
}

  const fullName = `${name} ${secondName} ${serviceName}`;

  

  const [isOverlapped, setOverlapped] = useState(false);
  const workingMeeting = {
    title: fullName,
    date: newDate,
    end: addMinutes(newDate, service),
    times: [],
    serviceName: serviceName
  };

  for (let i = 0; i < service; i = i + 15) {
    workingMeeting.times.push(addMinutes(newDate, i));
  }

  const submitHandler = (e) => {
    if (
      name.trim() === "" ||
      name.trim().length < 2 ||
      secondName.trim() === "" ||
      secondName.trim().length < 2
    ) {
      alert("Uzupelnij dane");
      e.preventDefault();
      return;
    }
    if (isOverlapped) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    dispatch(calendarActions.setMeeting(workingMeeting));
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

  const getExcludedTimes = useCallback(
    (date) => {
      let arrSpecificDates = [];

      for (let i = 0; i < dates.length; i++) {
        if (
          moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
          moment(dates[i], moment.ISO_8601).format("YYYY/MM/DD")
        ) {
          arrSpecificDates.push(moment(dates[i], moment.ISO_8601).toObject());
        }
      }

      let arrExcludedTimes = [];
      let pickedDate;

      for (let i = 0; i < arrSpecificDates.length; i++) {
        pickedDate = setHours(
          setMinutes(new Date(date), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        );
        arrExcludedTimes.push(pickedDate);
      }

      setExcludedTimes(arrExcludedTimes);
      console.log(arrExcludedTimes);
    },
    [dates]
  );

  useEffect(() => {
    meetings.forEach((meeting) =>
      setOverlapped(
        areIntervalsOverlapping(
          {
            start: new Date(workingMeeting.date),
            end: new Date(workingMeeting.end),
          },
          {
            start: new Date(meeting.date),
            end: new Date(meeting.end),
          }
        )
      )
    );
  }, [meetings, workingMeeting.date, workingMeeting.end]);

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
            <option value={"150"}>
              Przedłużenie paznokci żelem 150 minut 120zł
            </option>
            <option value={"40"}>Pedicure</option>
          </select>
          <div className={classes.actions}>
            <button onClick={() => dispatch(modalActions.modalToggle())}>
              Anuluj
            </button>
            <button type="submit" onClick={submitHandler}>
              Akceptuj
            </button>
          </div>
        </div>
        {isOverlapped && (
          <p style={{ padding: "12px", color: "red" }}>
            Istnieje inne wydarzenie w tym okresie, wybierz proszę inny.
          </p>
        )}
      </form>
    </div>
  );
};

export default AppointmentForm;
