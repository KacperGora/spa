import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import { parseISO, setHours, setMinutes } from "date-fns";

import { maxDate } from "../../utilities/getOneMonthFurther";
import "./react-datepicker.css";
import { getBusinessDay } from "../../utilities/getBuisnessDay";
registerLocale("pl", pl);
function DatePickerCalendarComponent({
  pickedDate,
  setPickedDate,
  arrExcludedTimes,
  timePick,
}) {
  if (timePick) {
    return (
      <DatePicker
        value={pickedDate ? pickedDate : "09:00"}
        selected={pickedDate}
        onChange={(e) => {
          setPickedDate(e);
        }}
        excludeTimes={arrExcludedTimes}
        timeCaption="Godzina"
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeFormat="HH:mm"
        dateFormat="HH:mm"
        minDate={new Date()}
        minTime={setHours(setMinutes(new Date(), 0), 9)}
        maxTime={setHours(setMinutes(new Date(), 0), 17)}
      />
    );
  } else {
    return (
      <DatePicker
        locale="pl"
        filterDate={getBusinessDay}
        onChange={(e) => {
          setPickedDate(e);
        }}
        value={pickedDate}
        selected={pickedDate}
        minDate={new Date()}
        maxDate={parseISO(maxDate)}
        required
        excludeOut
        timeIntervals={15}
        shouldCloseOnSelect={true}
        name="startDate"
        dateFormat="dd MMMM, yyyy "
        fixedHeight
        excludeTimes={arrExcludedTimes}
        placeholderText="Wybierz datę"
      />
    );
  }
}
export default DatePickerCalendarComponent;
