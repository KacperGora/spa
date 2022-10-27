import { useSelector } from "react-redux";

function CalendarFormTitle() {
  const isChanging = useSelector((state) => state.calendar.changeEvent);
  const content = isChanging
    ? "Edytuj lub anuluj spotkanie"
    : "Dodaj spotkanie";

  return <h2>{content}</h2>;
}

export default CalendarFormTitle;
