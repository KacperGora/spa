import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";

const useCalendarEventClick = () => {
  const admin = useSelector((state) => state.auth.admin);
  const loggedUserMail = useSelector((state) => state.user.user?.email);
  const dispatch = useDispatch();
  function calendarEventClickHandler(e) {
    
    if (admin) {
      dispatch(modalActions.modalToggle());
      dispatch(calendarActions.setIsChangingEvent(true));
      dispatch(calendarActions.findKey(e?.event._def.publicId));
    } else if (e?.event._def.extendedProps.email === loggedUserMail) {
      dispatch(modalActions.modalToggle());
      dispatch(calendarActions.setIsChangingEvent(true));
      dispatch(calendarActions.findKey(e?.event._def.publicId));
    }
  }
  return calendarEventClickHandler;
};
export default useCalendarEventClick;
