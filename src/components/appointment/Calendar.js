import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import plLocale from "@fullcalendar/core/locales/pl";

import { addMinutes, subHours } from "date-fns";

import Modal from "../UI/modal/Modal";
import NavBar from "../../layout/navBar/NavBar";
import { modalActions } from "../../store/modalSlice";
import { calendarActions } from "../../store/calendarSlice";

import CalendarForm from "./CalendarForm";
import "./react-datepicker.css";
import classes from './Calendar.module.css'
import FetchEvents from "./components/FetchEvents";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Footer from "../../layout/footer/Footer";
const Calendar = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.isVisible);
  const events = useSelector((state) => state.calendar.meetings);
  const loggedUserMail = useSelector((state) => state.user.user.email);
  const auth = useSelector((state) => state.auth.admin);
  const [newDate, setNewDate] = useState(new Date());
  const key = useSelector((state) => state.calendar.key);

  //fetching meetings when calendar is loaded
  useEffect(() => {
    const getMeetings = async () => {
      const meeting = await FetchEvents();
      dispatch(calendarActions.fetchMeetings(meeting));
    };
    getMeetings();
  }, [dispatch]);

  const addEventHandler = (e) => {
    setNewDate(new Date(e.startStr));
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setDate(e.startStr));
  };
  // hiding events titles from other users
  let eventsWithNoNames = [
    ...events.filter((meeting) => meeting.email !== loggedUserMail),
  ];

  let eventsForUSers = [];
  eventsWithNoNames.forEach((event) =>
    eventsForUSers.push({
      title: "Termin niedostępny",
      date: event.date,
      end: event.end,
    })
  );
  let eventsWithNames = [
    ...events.filter((meeting) => meeting.email === loggedUserMail),
  ];

  const arr = eventsForUSers.concat(...eventsWithNames);

  const eventClickHandler = (e) => {
    setNewDate(e.event._instance.range.start);

    //allowing admin for changing every event, and user can only change his own events
    if (auth) {
      dispatch(modalActions.modalToggle());
      dispatch(calendarActions.setIsChangingEvent(true));
      dispatch(calendarActions.findKey(e.event._def.publicId));
    } else {
      if (e.event._def.extendedProps.email === loggedUserMail) {
        dispatch(modalActions.modalToggle());
        dispatch(calendarActions.setIsChangingEvent(true));
        dispatch(calendarActions.findKey(e.event._def.publicId));
      }
    }
  };
  // only  admin can drag and drop events and manually change it's length
  const onlyAdminEdit = async (e) => {
    if (auth) {
      let filteredEvent = events.filter(
        (event) => event.id === e.event._def.publicId
      );
      dispatch(calendarActions.findKey(e.event._def.publicId));

      const interval15 =
        (e.event._instance.range.end - e.event._instance.range.start) /
        1000 /
        60 /
        15;

      let times = [];

      for (let i = 0; i < interval15; i++) {
        times.push(
          subHours(addMinutes(e.event._instance.range.start, i * 15), 2)
        );
      }

      const editDoc = doc(db, "meetings", key);
      await updateDoc(editDoc, {
        serviceName: filteredEvent[0].serviceName,
        title: filteredEvent[0].title,
        date: subHours(e.event._instance.range.start, 2).toISOString(),
        end: subHours(e.event._instance.range.end, 2).toISOString(),
        times,
        email: filteredEvent[0].email,
      });
      dispatch(calendarActions.setIsChangingEvent(false));
      FetchEvents();
    }
  };
  return (
    <section>
      <NavBar />
      {modal && (
        <Modal>
          <CalendarForm startDate={newDate} />
        </Modal>
      )}
      <div className={classes.calendarContainer}>
        <FullCalendar
          stickyHeaderDates={true}
          eventDurationEditable={true}
          locale={plLocale}
          eventChange={onlyAdminEdit}
          headerToolbar={
            auth
              ? {
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay, listWeek",
                }
              : {
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }
          }
          select={addEventHandler}
          eventClick={eventClickHandler}
          eventOverlap={false}
          weekends={false}
          editable={auth ? true : false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          slotDuration={"00:15"}
          events={auth ? events : arr}
          eventColor={"#378006"}
          displayEventTime={true}
          displayEventEnd={true}
          plugins={[
            listPlugin,
            dayGridPlugin,
            interactionPlugin,
            momentPlugin,
            timeGridPlugin,
          ]}
          initialView="dayGridMonth"
        />
      </div>
      <Footer />
    </section>
  );
};
export default Calendar;
