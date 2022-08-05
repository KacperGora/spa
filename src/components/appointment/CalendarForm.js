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
  addHours,
  subHours,
} from "date-fns";

import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteField,
  serverTimestamp,
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
  const [pickedDate, setPickedDate] = useState(
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
  let serviceAmount;
  const userMeetings = meetings.filter(
    (meeting) => meeting.email === loggedUserMail
  );
  switch (service) {
    case "45":
      serviceName = "Manicure Klasyczny";
      serviceAmount = 120;
      break;
    case "90":
      serviceName = "Manicure Hybrydowy";
      serviceAmount = 120;
      break;
    case "120":
      serviceName = "Uzupełnienie żelowe";
      serviceAmount = 120;
      break;
    case "150":
      serviceName = "Przedłużanie paznokci żelem";
      serviceAmount = 120;
      break;
    case "40":
      serviceName = "Pedicure";
      serviceAmount = 120;
      break;
    default:
      serviceName = "Nie podano usługi";
  }

  const workingMeeting = {
    title: fullName,
    date: addHours(pickedDate, 2).toISOString(),
    end: addHours(addMinutes(pickedDate, service), 2).toISOString(),
    times: [],
    serviceName,
    serviceAmount,
    email: loggedUserMail,
    overlap: false,
  };
  //adding excluded time range to  array
  for (let i = 0; i < service; i += 15) {
    workingMeeting.times.push(
      addHours(new Date(addMinutes(pickedDate, i)), 2).toISOString()
    );
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
    //filter from all events to events at picked date
    let meetingsAtPickedDate = meetings.filter(
      (meeting) =>
        new Date(meeting.date).toLocaleDateString() ===
        pickedDate.toLocaleDateString()
    );
    setOverlapped(false);
    const checkOverlap = () => {
      for (let i = 0; i < meetingsAtPickedDate.length; i++) {
        if (
          areIntervalsOverlapping(
            {
              start: pickedDate,
              end: addMinutes(pickedDate, service),
            },
            {
              start: subHours(new Date(meetingsAtPickedDate[i].date), 2),
              end: subHours(new Date(meetingsAtPickedDate[i].end), 2),
            }
          )
        )
          setOverlapped(true);
      }
    };
    checkOverlap();
  }, [meetings, pickedDate, service]);

  const getExcludedTimes = useCallback(() => {
    let arrSpecificDates = [];
    for (let i = 0; i < excludedEventsTimes.length; i++) {
      if (
        moment(pickedDate, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(excludedEventsTimes[i], moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(
          moment(excludedEventsTimes[i], moment.ISO_8601).toObject()
        );
      }
    }
    let arrExcludedTimes = [];

    for (let i = 0; i < arrSpecificDates.length; i++) {
      arrExcludedTimes.push(
        subHours(
          setHours(
            setMinutes(new Date(pickedDate), arrSpecificDates[i].minutes),
            arrSpecificDates[i].hours
          ),
          2
        )
      );
    }
    setExcludedTimes(arrExcludedTimes);
  }, [excludedEventsTimes, pickedDate]);
  useEffect(() => {
    getExcludedTimes();
  }, [getExcludedTimes]);
  // console.log(excludedEventsTimes)
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
    // await deleteDoc(doc(db, "meetings", key));
    // // const userRef = doc(db, "users", loggedUserMail);
    // // await updateDoc(userRef, {
    // //   meetings: deleteField(),
    // // });
    // dispatch(modalActions.modalToggle());
    // dispatch(calendarActions.setIsChangingEvent(false));
    // fetchEvents();
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
                  setPickedDate(e);
                  getExcludedTimes();
                }}
                value={pickedDate ? pickedDate : "Wybierz datę"}
                selected={pickedDate}
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
                value={pickedDate ? pickedDate : "09:00"}
                selected={pickedDate}
                onChange={(e) => {
                  setPickedDate(e);
                  getExcludedTimes();
                }}
                onSelect={getExcludedTimes}
                excludeTimes={excludedTimes}
                // excludeTimes={}
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
