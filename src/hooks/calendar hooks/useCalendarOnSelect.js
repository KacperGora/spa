import { useDispatch } from "react-redux";
import { calendarActions } from "../../store/calendarSlice";
import { modalActions } from "../../store/modalSlice";

const useCalendarOnSelect = () => {
  const dispatch = useDispatch();

  const openModal = (e) => {
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setDate(e.startStr));
  };
  return openModal;
};

export default useCalendarOnSelect;
