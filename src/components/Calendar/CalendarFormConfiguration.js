import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { useState } from "react";

import DatePickerCalendarComponent from "./DatePickerCalendarComponent";
import useSetExcludedTimes from "../../hooks/calendar hooks/useSetExcludedTimes";

function useCalendarFormConfiguration(pickedDate, setPickedDate) {
  const loggedUserLastName = useSelector(
    (state) => state.user.user?.secondName
  );
  const loggedUserName = useSelector((state) => state.user.user?.name);
  const [name, setName] = useState(loggedUserName);
  const [secondName, setSecondName] = useState(loggedUserLastName);
  const fullName = `${name} ${secondName}`;
  const arrExcludedTimes = useSetExcludedTimes(pickedDate);
  const calendarFormConfiguration = [
    {
      icon: <CalendarMonthIcon />,
      toRender: (
        <DatePickerCalendarComponent
          arrExcludedTimes={arrExcludedTimes}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
        />
      ),
    },
    {
      icon: <QueryBuilderIcon />,
      toRender: (
        <DatePickerCalendarComponent
          arrExcludedTimes={arrExcludedTimes}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
          timePick
        />
      ),
    },
    {
      icon: <BadgeIcon />,
      value: name,
      onChange: setName,
      type: "text",
      placeholder: "Imię",
    },
    {
      icon: <PersonIcon />,
      value: secondName,
      onChange: setSecondName,
      type: "text",
      placeholder: "Nazwisko",
    },
  ];
  return [calendarFormConfiguration, fullName];
}
export default useCalendarFormConfiguration;
