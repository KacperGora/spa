import React, { useState } from "react";
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
import NavBar from "../layout/navBar/NavBar";
import { modalActions } from "../../store/modalSlice";
import { calendarActions } from "../../store/calendarSlice";

import CalendarForm from "./CalendarForm";
import FetchEvent from "../fetchEvent";
import "./react-datepicker.css";
import fetchFn from "../fetch";

const Calendar = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modal.isVisible);
  const events = useSelector((state) => state.calendar.meetings);
  const loggedUserMail = useSelector((state) => state.user.user.email);
  const auth = useSelector((state) => state.auth.admin);

  const [newDate, setNewDate] = useState(new Date());

  const addEventHandler = (e) => {
    setNewDate(new Date(e.startStr));
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setDate(e.startStr));
  };

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
    setNewDate(e.event._instance.range.start)
  //allowing admin for changing every event, and user can only change his own events
    if (auth) {
      dispatch(modalActions.modalToggle());
      dispatch(calendarActions.setIsChangingEvent(true));
      dispatch(calendarActions.findKey(e.event._def.extendedProps.key));
    }
    else {
      if (e.event._def.extendedProps.email === loggedUserMail) {
        dispatch(modalActions.modalToggle());
        dispatch(calendarActions.setIsChangingEvent(true));
        dispatch(calendarActions.findKey(e.event._def.extendedProps.key));
      }
    }
  };
  // only for admin
  const eventChangeHandler = (e) => {
    if (auth) {
      let filteredEvent = events.filter(
        (event) => event.key === e.event._def.extendedProps.key
      );
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
      //prepare data for changing at firebase
      const url = `https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings/${filteredEvent[0].key}.json`;
      const body = {
        serviceName: filteredEvent[0].serviceName,
        title: filteredEvent[0].title,
        date: subHours(e.event._instance.range.start, 2),
        end: subHours(e.event._instance.range.end, 2),
        times,
        email: filteredEvent[0].email,
      };
      fetchFn(url, "PUT", body);
    }
  };

  return (
    <section>
      <FetchEvent />
      <NavBar />
      {modal && (
        <Modal>
          <CalendarForm startDate={newDate} />
        </Modal>
      )}
      <FullCalendar
        stickyHeaderDates={true}
        eventDurationEditable={true}
        locale={plLocale}
        eventChange={eventChangeHandler}
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
      
    </section>
  );
};
export default Calendar;
