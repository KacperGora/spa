import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import NavBar from "../mainPage/NavBar";
import plLocale from "@fullcalendar/core/locales/pl";

import Modal from "../UI/Modal";
import { modalActions } from "../../store/modalSlice";
import {useSelector, useDispatch} from 'react-redux'
const Calendar = () => {

  const modal = useSelector(state => state.modal.isVisible)
   const dispatch = useDispatch()

    const addEventHandler = (e) => {
     dispatch(modalActions.modalToggle())
     console.log(e)
    }
  return (
    <section>
      <NavBar />
      {modal && <Modal />}
      <FullCalendar
        locale={plLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        select={addEventHandler}
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
       
      />
    </section>
  );
};
export default Calendar;
