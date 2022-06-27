import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import classes from "../appointment/appointmentForm/AppointmentForm.module.css";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";
import { useEffect } from "react";
import { useCallback } from "react";
import moment from "moment";

import {
  parseISO,
  setHours,
  setMinutes,
  getDay,
  addMinutes,
  areIntervalsOverlapping,
  addHours,
} from "date-fns";

import { useState } from "react";
const CalendarForm = ({ startDate }) => {
  const meetings = useSelector((state) => state.calendar.meetings);

  const dates = useSelector((state) => state.calendar.excludedTimes);
  const [excludedTimes, setExcludedTimes] = useState([]);
  const service = useSelector((state) => state.calendar.service);
  const [newDate, setNewDate] = useState(
    setHours(setMinutes(new Date(startDate), 0), 9)
  );
  const loggedUserName = useSelector((state) => state.user.user.name);
  const loggedUserSecondName = useSelector(
    (state) => state.user.user.secondName
  );
  const [name, setName] = useState(loggedUserName);
  const [secondName, setSecondName] = useState(loggedUserSecondName);
  const [isOverlapped, setOverlapped] = useState(false);
  const fullName = `${name} ${secondName}`;
  const isChanging = useSelector((state) => state.calendar.changeEvent);
  const loggedUserMail = useSelector((state) => state.user.user.email);
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

  const workingMeeting = {
    title: fullName,
    date: newDate,
    end: addMinutes(newDate, service),
    times: [],
    serviceName: serviceName,
    email: loggedUserMail,
  };
  for (let i = 0; i < service; i = i + 15) {
    workingMeeting.times.push(addMinutes(newDate, i));
  }

  console.log(workingMeeting);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    if (isOverlapped) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    dispatch(calendarActions.setMeeting(workingMeeting));
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setIsChangingEvent(false));
  };
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
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
  const getExcludedTimes = useCallback(
    (date) => {
      let arrSpecificDates = [];
      console.log(dates);
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
    <form onSubmit={submitHandler}>
      <div className={classes.container}>
        <DatePicker
          locale="pl"
          filterDate={isWeekday}
          onChange={(e) => {
            setNewDate(e);
            getExcludedTimes();
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
          value={newDate ? newDate : "09:00"}
          selected={newDate}
          onChange={(e) => {
            setNewDate(e);
            getExcludedTimes();
          }}
          onSelect={getExcludedTimes}
          excludeTimes={excludedTimes}
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
          value={loggedUserName}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Imię"
        />
        <input
          value={loggedUserSecondName}
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
          <button
            onClick={() => {
              dispatch(modalActions.modalToggle());
              dispatch(calendarActions.setIsChangingEvent(false));
            }}
          >
            Anuluj
          </button>
          <button type="submit" onClick={submitHandler}>
            Akceptuj
          </button>
        </div>
        {isChanging && (
          <button style={{ width: "200%", display: "flex" }}>
            Anuluj spotkanie
          </button>
        )}
      </div>
      {isOverlapped && (
        <p style={{ padding: "12px", color: "red" }}>
          Istnieje inne wydarzenie w tym okresie, wybierz proszę inny.
        </p>
      )}
    </form>
  );
};

export default CalendarForm;
