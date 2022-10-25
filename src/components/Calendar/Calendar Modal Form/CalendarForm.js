import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./CalendarForm.module.css";
import { setHours, setMinutes, addMinutes, addHours } from "date-fns";
import CalendarFormSelectService from "../Calendar Service Select/CalendarFormSelectService";
import CalendarFormTitle from "../Calendar Title/CalendarFormTitle";
import WarningParagraph from "../Warning Paragraph/WarningParagraph";

import CalendarFormActions from "../../../components/Calendar/CalendarFormActions";
import useCalendarFormConfiguration from "../CalendarFormConfiguration";
import getServiceNameAndPrice from "../../../utilities/Meetings/getServiceNameAndPrice";
import calculateEventDuration from "../../../utilities/Meetings/calculateEventDuration";
import useCheckOverlappingEvents from "../../../hooks/calendar hooks/useCheckOverlappingEvents";

const CalendarForm = () => {
  const meetings = useSelector((state) => state.calendar.meetings);
  const date = useSelector((state) => state.calendar.pickedDate);
  const service = useSelector((state) => state.calendar.service);
  const isChanging = useSelector((state) => state.calendar.changeEvent);
  const loggedUserMail = useSelector((state) => state.user.user?.email);

  const [pickedDate, setPickedDate] = useState(
    setHours(setMinutes(new Date(date), 0), 9)
  );
  const isOverlapped = useCheckOverlappingEvents(pickedDate, meetings, service);
  const { serviceName, servicePrice } = getServiceNameAndPrice(service);
  const [formConfiguration, fullName] = useCalendarFormConfiguration(
    pickedDate,
    setPickedDate
  );

  const workingMeeting = {
    title: fullName,
    date: addHours(pickedDate, 2).toISOString(),
    end: addHours(addMinutes(pickedDate, service), 2).toISOString(),
    times: calculateEventDuration(service, pickedDate),
    serviceName,
    servicePrice,
    email: loggedUserMail,
  };

  return (
    <Fragment>
      <form>
        <CalendarFormTitle />
        <div className={classes.container}>
          <div className={classes.subContainer}>
            {formConfiguration.map((entry) => {
              return (
                <div key={Math.random()} className={classes.inputLineContainer}>
                  {entry.icon}
                  {entry.toRender && entry.toRender}
                  {!entry.toRender && (
                    <input
                      value={entry.value}
                      required
                      onChange={(e) => entry.onChange(e.target.value)}
                      type={entry.type}
                      placeholder={entry.placeholder}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <CalendarFormSelectService />
          {!isChanging && (
            <CalendarFormActions
              isOverlapped={isOverlapped}
              workingMeeting={workingMeeting}
            />
          )}
        </div>
        {isOverlapped && (
          <WarningParagraph>
            Termin zajety, wybierz proszę inny.
          </WarningParagraph>
        )}
        {isChanging && (
          <CalendarFormActions
            isChanging
            isOverlapped={isOverlapped}
            workingMeeting={workingMeeting}
          />
        )}
      </form>
    </Fragment>
  );
};

export default CalendarForm;
