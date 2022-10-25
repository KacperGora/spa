import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import plLocale from "@fullcalendar/core/locales/pl";
import { useSelector } from "react-redux";
import classes from "./CalendarForm.module.css";
import useCalendarEventClick from "../../hooks/calendar hooks/useCalendarEventClick";
import useCalendarOnSelect from "../../hooks/calendar hooks/useCalendarOnSelect";
import onAdminChange from "../../utilities/onAdminChange";


function CalendarComponent() {
  const events = useSelector((state) => state.calendar.meetings);
  const admin = useSelector((state) => state.auth.admin);

  const openModal = useCalendarOnSelect();
  const calendarEventClickHandler = useCalendarEventClick();
  const adminChangeHandler = (e) => {
    onAdminChange(e, events);
  };
  return (
    <div className={classes.calendarContainer}>
      <FullCalendar
        locale={plLocale}
        timeZone="UTC"
        stickyHeaderDates={true}
        eventDurationEditable={admin && true}
        eventChange={adminChangeHandler}
        select={openModal}
        eventClick={calendarEventClickHandler}
        headerToolbar={
          admin
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
        eventOverlap={false}
        weekends={false}
        editable={admin && true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        slotDuration={"00:15"}
        events={events}
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
  );
}

export default CalendarComponent;
