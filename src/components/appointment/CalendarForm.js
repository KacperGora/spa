import DatePicker from "react-datepicker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CalendarForm.module.css";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";
import { Fragment, useEffect } from "react";
import { useCallback } from "react";
import moment from "moment";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";

import {
  parseISO,
  setHours,
  setMinutes,
  getDay,
  addMinutes,
  areIntervalsOverlapping,
} from "date-fns";

import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import FetchEvents from "./components/FetchEvents";

const CalendarForm = ({ startDate }) => {
  const meetings = useSelector((state) => state.calendar.meetings);
  const admin = useSelector((state) => state.auth.admin);
  const excludedEventsTimes = useSelector(
    (state) => state.calendar.excludedTimes
  );

  const service = useSelector((state) => state.calendar.service);
  const loggedUserLastName = useSelector((state) => state.user.user.secondName);
  const loggedUserName = useSelector((state) => state.user.user.name);
  const dispatch = useDispatch();
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [newDate, setNewDate] = useState(
    setHours(setMinutes(new Date(startDate), 0), 9)
  );

  const [name, setName] = useState(loggedUserName);
  const [secondName, setSecondName] = useState(loggedUserLastName);
  const [isOverlapped, setOverlapped] = useState(false);
  const fullName = `${name} ${secondName}`;
  const isChanging = useSelector((state) => state.calendar.changeEvent);
  const loggedUserMail = useSelector((state) => state.user.user.email);
  const key = useSelector((state) => state.calendar.key);
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
    date: newDate.toISOString(),
    end: addMinutes(newDate, service).toISOString(),
    times: [],
    serviceName: serviceName,
    email: loggedUserMail,
  };
  //adding excluded times to  array
  for (let i = 0; i < service; i = i + 15) {
    workingMeeting.times.push(addMinutes(newDate, i).toISOString());
  }

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

  useEffect(() => {
    let preOverlappedArray = [
      ...meetings.filter(
        (meeting) =>
          new Date(meeting.date).toLocaleDateString() ===
          newDate.toLocaleDateString()
      ),
    ];
    const checkOverlap = () => {
      for (let i = 0; i < preOverlappedArray.length; i++) {
        setOverlapped(
          areIntervalsOverlapping(
            {
              start: newDate,
              end: addMinutes(newDate, service),
            },
            {
              start: new Date(preOverlappedArray[i].date),
              end: new Date(preOverlappedArray[i].end),
            }
          )
        );
      }
    };
    checkOverlap();
  }, [meetings, newDate, service]);

  const getExcludedTimes = useCallback(
    (date) => {
      let arrSpecificDates = [];
      let overlappedArr = [];

      for (let i = 0; i < excludedEventsTimes.length; i++) {
        if (
          moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
          moment(excludedEventsTimes[i], moment.ISO_8601).format("YYYY/MM/DD")
        ) {
          arrSpecificDates.push(
            moment(excludedEventsTimes[i], moment.ISO_8601).toObject()
          );
          overlappedArr.push(new Date(excludedEventsTimes[i]));
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
    },
    [excludedEventsTimes]
  );
  useEffect(() => {
    getExcludedTimes();
  }, [getExcludedTimes]);

  /////
  useEffect(() => {
    const getMeetings = async () => {
      const meeting = await FetchEvents();
      dispatch(calendarActions.fetchMeetings(meeting));
    };
    getMeetings();
  }, [dispatch]);

  ///Submit meeting
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isOverlapped) {
      return;
    }
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setMeeting(workingMeeting));
    dispatch(calendarActions.setExcludedTimes(...workingMeeting.times));
    dispatch(calendarActions.setIsChangingEvent(false));
    try {
      const docRef = doc(collection(db, "meetings"));
      await setDoc(docRef, { ...workingMeeting, id: docRef.id });
    } catch (error) {
      const { code, message } = error;
      throw new Error(message, code);
    }
  };
  // function for fetching events
  const fetchEvents = async () => {
    let meetings = [];
    const querySnapshot = await getDocs(collection(db, "meetings"));
    querySnapshot.forEach((doc) => {
      meetings.push(doc.data());
    });
    dispatch(calendarActions.fetchMeetings(meetings));
  };
  ///Cancel meeting
  const cancelMeetingHandler = async (e) => {
    await deleteDoc(doc(db, "meetings", key));
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setIsChangingEvent(false));
    fetchEvents();
  };

  ///Edit meeting
  const editMeetingHandler = async (e) => {
    const editDoc = doc(db, "meetings", key);
    await updateDoc(editDoc, {
      ...workingMeeting,
    });
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setIsChangingEvent(false));
    fetchEvents();
  };

  ////

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        {isChanging ? (
          <h2 style={{ paddingBottom: "16px" }}>Edytuj lub anuluj spotkanie</h2>
        ) : (
          <h2 style={{ paddingBottom: "16px" }}>Dodaj spotkanie</h2>
        )}
        <div className={classes.container}>
          <div className={classes.subContainer}>
            <div className={classes.inputLineContainer}>
              <CalendarMonthIcon />
              <DatePicker
                locale="pl"
                filterDate={isWeekday}
                onChange={(e) => {
                  setNewDate(e);
                  getExcludedTimes();
                }}
                value={newDate ? newDate : "Wybierz datę"}
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
            </div>
            <div className={classes.inputLineContainer}>
              <QueryBuilderIcon />
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
            </div>
          </div>
          <div className={classes.subContainer}>
            <div className={classes.inputLineContainer}>
              <BadgeIcon />
              <input
                value={loggedUserName}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Imię"
              />
            </div>
            <div className={classes.inputLineContainer}>
              <PersonIcon />
              <input
                value={loggedUserLastName}
                required
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
                placeholder="Nazwisko"
              />
            </div>
          </div>
          <div className={classes.serviceContainer}>
            <label htmlFor="select">Wybierz usługę</label>
            <select
              id="select"
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
              {admin && <option value={"45"}>Praca własna</option>}
            </select>
          </div>
          <div className={classes.actions}>
            <button
              onClick={() => {
                dispatch(modalActions.modalToggle());
                dispatch(calendarActions.setIsChangingEvent(false));
              }}
            >
              Anuluj
            </button>
            {!isChanging && (
              <button type="submit" onClick={submitHandler}>
                Akceptuj
              </button>
            )}
          </div>
        </div>
        {isOverlapped && (
          <p style={{ padding: "12px", color: "red" }}>
            Istnieje inne wydarzenie w tym okresie, wybierz proszę inny.
          </p>
        )}
        <div className={classes.actions}>
          {isChanging && (
            <button onClick={cancelMeetingHandler}>Anuluj spotkanie</button>
          )}
          {isChanging && (
            <button onClick={editMeetingHandler}>Edytuj spotkanie</button>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default CalendarForm;
