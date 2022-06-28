import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./react-datepicker.css";
import momentPlugin from "@fullcalendar/moment";
import NavBar from "../layout/navBar/NavBar";
import plLocale from "@fullcalendar/core/locales/pl";

import Modal from "../UI/modal/Modal";
import { modalActions } from "../../store/modalSlice";
import { useSelector, useDispatch } from "react-redux";
// import AppointmentForm from "./appointmentForm/AppointmentForm";

import { calendarActions } from "../../store/calendarSlice";
import FetchEvent from "../fetchEvent";
import CalendarForm from "./CalendarForm";

import { addMinutes, subHours } from "date-fns";

const Calendar = () => {
  const modal = useSelector((state) => state.modal.isVisible);
  const events = useSelector((state) => state.calendar.meetings);
  const excludedTimes = useSelector((state) => state.calendar.excludedTimes);
  const [newDate, setNewDate] = useState(new Date());
  const loggedUserMail = useSelector((state) => state.user.user.email);
  const auth = useSelector((state) => state.auth.admin);
  const changingEvent = useSelector((state) => state.calendar.changeEvent);
  const service = useSelector((state) => state.calendar.service);
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
      dispatch(calendarActions.findKey(e.event._def.extendedProps.key));
    }
  };
  const eventChangeHandler = (e) => {
    // console.log(e);
    if (auth) {
      let filteredEvent = events.filter(
        (event) => event.key === e.event._def.extendedProps.key
      );
      // console.log( events.filter((event) => event.mail === e.event._def.extendedProps.email));
      console.log(filteredEvent);
      const interval15 =((((e.event._instance.range.end - e.event._instance.range.start)/1000)/60)/15);
      let times = [];
      for (let i = 1; i < interval15; i++) {
       times.push(subHours(addMinutes(e.event._instance.range.start,(i * 15)),2))
      }
 
      fetch(
        `https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings/${filteredEvent[0].key}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            serviceName: filteredEvent[0].serviceName,
            title: filteredEvent[0].title,
            date: subHours(e.event._instance.range.start, 2),
            end: subHours(e.event._instance.range.end, 2),

            times: times,

            email: filteredEvent[0].email,
          }),
          headers: {
            "Content-type": "application / json",
          },
        }
      );
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
        // eventDragStart={eventDragHandler}
        // eventDragStop={(e) => console.log(e.el.fcSeg.eventRange.range.end)}
        eventChange={eventChangeHandler}
        // eventChange={ (e) =>
        //  { console.log(
        //     e.oldEvent._instance.range.start,
        //     e.oldEvent._instance.range.end
        //   )
        //    console.log(
        //     e.event._instance.range.start,
        //     e.event._instance.range.end)}}
        // (e) =>
        //  { console.log(
        //     e.oldEvent._instance.range.start,
        //     e.oldEvent._instance.range.end
        //   )
        //    console.log(
        //     e.event._instance.range.start,
        //     e.event._instance.range.end
        //   )}
        // }
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
        eventClick={auth ? eventClickHandler : ""}
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
      <FetchEvent></FetchEvent>
    </section>
  );
};
export default Calendar;
