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

const Calendar = () => {
  const modal = useSelector((state) => state.modal.isVisible);
  const events = useSelector((state) => state.calendar.meetings);
  const [newEvents, setEvents] = useState([]);
  const [newDate, setNewDate] = useState("");

  const auth = useSelector((state) => state.auth.admin);

  const dispatch = useDispatch();
  const addEventHandler = (e) => {
    setNewDate(new Date(e.startStr));
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setDate(e.startStr));
  };
  // const changeEventHandler = (e) => {
  //   dispatch(modalActions.modalToggle())
  // };
  let eventsWithNoNames = [];
  events.forEach((event) =>
    eventsWithNoNames.push({title: event.serviceName, date: event.date, end: event.end })
  );
  console.log(auth);

  useEffect(() => {
    setEvents(events);
  }, [events]);
  return (
    <section>
      <NavBar />
      {modal && (
        <Modal>
          <AppointmentForm startDate={newDate} />
        </Modal>
      )}
      {/* {modal && <Modal>  <EventClicked></EventClicked></Modal>} */}
      <FullCalendar
        stickyHeaderDates={true}
        eventDurationEditable={true}
        // dateClick={(e) => {
        //   console.log(e);
        // }}
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
        events={auth ? events : eventsWithNoNames}
        eventColor={"#378006"}
        displayEventTime={true}
        displayEventEnd={true}
        // eventClick={changeEventHandler}
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
