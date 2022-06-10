import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import NavBar from "../layout/NavBar";
import plLocale from "@fullcalendar/core/locales/pl";
import { useState } from "react";
import Modal from "../UI/Modal";
const Calendar = () => {
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const eventClickHandler = (e) => {
    console.log(e);
    setIsClicked(true);
  };
  return (
    <section>
      {isClicked && <Modal />}
      <NavBar />
      <FullCalendar
        locale={plLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        select={eventClickHandler}
        // select={this.handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        // eventClick={this.handleEventClick}
        // eventsSet={this.handleEvents} //
        weekends={false}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          momentPlugin,
          timeGridPlugin,
        ]}
        initialView="dayGridMonth"
        events={events}
      />
    </section>
  );
};
export default Calendar;
