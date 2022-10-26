import { useSelector } from "react-redux";
import classes from "./CalendarFormTitle.module.css";

function CalendarFormTitle() {
  const isChanging = useSelector((state) => state.calendar.changeEvent);
  const content = isChanging
    ? "Edytuj lub anuluj spotkanie"
    : "Dodaj spotkanie";

  return <h2 className={classes.header}>{content}</h2>;
}

export default CalendarFormTitle;
