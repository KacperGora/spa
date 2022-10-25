import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../../store/calendarSlice";

import classes from "./CalendarFormSelectService.module.css";

function CalendarFormSelectService() {
  const service = useSelector((state) => state.calendar.service);
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  const options = [
    {
      value: "45",
      name: "Manicure Klasyczny 45 minut 120zł",
      condition: true,
    },
    {
      value: "90",
      name: "Manicure Hybrydowy 90 minut 120zł",
      condition: true,
    },
    {
      value: "120",
      name: "Uzupełnienie Żelowe 120 minut 120zł",
      condition: true,
    },
    {
      value: "150",
      name: "Przedłużenie paznokci żelem 150 minut 120zł",
      condition: true,
    },
    {
      value: "40",
      name: "Pedicure",
      condition: true,
    },
    {
      value: "45",
      name: "Praca własna",
      condition: admin,
    },
  ];
  const changeHandler = (e) => {
    dispatch(calendarActions.setTypeOfService(e.target.value));
  };
  return (
    <div className={classes.serviceContainer}>
      <label htmlFor="select">Wybierz usługę</label>
      <select id="select" value={service} required onChange={changeHandler}>
        {options.map(
          (option) =>
            option.condition && (
              <option key={Math.random()} value={option.value}>
                {option.name}
              </option>
            )
        )}
      </select>
    </div>
  );
}
export default CalendarFormSelectService;
