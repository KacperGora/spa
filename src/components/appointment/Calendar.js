import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import NavBar from "../mainPage/NavBar";
import plLocale from "@fullcalendar/core/locales/pl";

import Modal from "../UI/Modal";
import { modalActions } from "../../store/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import { calendarActions } from "../../store/calendarSlice";
const Calendar = () => {
  const modal = useSelector((state) => state.modal.isVisible);
  const events = useSelector((state) => state.calendar.meetings);
  const date = useSelector((state) => state.calendar.pickedDate);
  const [newEvents, setEvents] = useState([]);
  const [newDate, setNewDate] = useState("");
  const newAppointment = useSelector(
    (state) => state.calendar.dateForAppointment
  );

  const dispatch = useDispatch();
  const addEventHandler = (e) => {
    console.log(e)
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setDate(e.startStr));
    dispatch(calendarActions.setNewAppointment(e.startStr));
  };
  const changeEventHandler = e => {
    dispatch(modalActions.modalToggle())
  }

  useEffect(() => {
    setEvents(events);
  }, [events]);
  return (
    <section>
      <NavBar />
      {modal && (
        <Modal>
          <AppointmentForm />
        </Modal>
      )}
      <FullCalendar
        locale={plLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        
        select={addEventHandler}
           weekends={false}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        slotDuration={"00:15"}
        events={newEvents}
        eventClick={changeEventHandler
        }
        plugins={[
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
