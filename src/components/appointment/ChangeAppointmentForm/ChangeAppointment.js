// import DatePicker from "react-datepicker";
// import classes from "./ChangeAppointment.module.css";
// import { useState, useCallback, useEffect } from "react";
// import {
//   parseISO,
//   setHours,
//   setMinutes,
//   getDay,
//   addMinutes,
//   areIntervalsOverlapping,
//   addHours,
// } from "date-fns";
// import { registerLocale } from "react-datepicker";
// import pl from "date-fns/locale/pl";

// registerLocale("pl", pl);
// const ChangeAppointment = () => {
//     const [newDate, setNewDate] = useState(addHours(new Date(startDate), 7));
//   return (
//     <form>
//       <div className={classes.pickerCont}>
//         <DatePicker />
//         <DatePicker
//         onChange={e=> {
//             setNewDate(e)
//         }}
//           showTimeSelect
//           showTimeSelectOnly
//           timeIntervals={15}
//           timeFormat="HH:mm"
//           dateFormat="HH:mm"
//           timeCaption="Godzina"
//           minTime={setHours(setMinutes(new Date(), 0), 9)}
//           maxTime={setHours(setMinutes(new Date(), 0), 17)}
//           selected={newDate}
//         />
//       </div>
//       <input />
//       <input />
//       <input />
//     </form>
//   );
// };

// export default ChangeAppointment;
