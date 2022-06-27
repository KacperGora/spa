import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import momentPlugin from "@fullcalendar/moment";
import NavBar from "../layout/navBar/NavBar";
import plLocale from "@fullcalendar/core/locales/pl";

import Modal from "../UI/modal/Modal";
import { modalActions } from "../../store/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import AppointmentForm from "./appointmentForm/AppointmentForm";

import { calendarActions } from "../../store/calendarSlice";
import FetchEvent from "../fetchEvent";
import CalendarForm from "./CalendarForm";

const Calendar = () => {
  const modal = useSelector((state) => state.modal.isVisible);
  const events = useSelector((state) => state.calendar.meetings);
  const excludedTimes = useSelector((state) => state.calendar.excludedTimes);
  const [newDate, setNewDate] = useState(new Date());
  const loggedUserMail = useSelector((state) => state.user.user.email);
  const auth = useSelector((state) => state.auth.admin);
  const changingEvent = useSelector((state) => state.calendar.changeEvent);

  const dispatch = useDispatch();
  const addEventHandler = (e) => {
    setNewDate(new Date(e.startStr));
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setDate(e.startStr));
  };
  useEffect(() => {}, []);

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
    if (e.event._def.extendedProps.email === loggedUserMail) {
      dispatch(modalActions.modalToggle());
      dispatch(calendarActions.setIsChangingEvent(true));
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
      {/* {modal && <Modal>  <EventClicked></EventClicked></Modal>} */}
      <FullCalendar
        stickyHeaderDates={true}
        eventDurationEditable={true}
        locale={plLocale}
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
        eventOverlap={false}
        weekends={false}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        slotDuration={"00:15"}
        events={auth ? events : arr}
        eventColor={"#378006"}
        displayEventTime={true}
        displayEventEnd={true}
        eventClick={eventClickHandler}
        plugins={[
          listPlugin,
          dayGridPlugin,
          interactionPlugin,
          momentPlugin,
          timeGridPlugin,
        ]}
        initialView="dayGridMonth"
      />
    <FetchEvent></FetchEvent>
    </section>
  );
};
export default Calendar;
