import { useDispatch } from "react-redux";
import { calendarActions } from "../store/calendarSlice";
import { modalActions } from "../store/modalSlice";

function useToggleModal() {
  const dispatch = useDispatch();
  function toggleModal() {
    dispatch(modalActions.modalToggle());
    dispatch(calendarActions.setIsChangingEvent(false));
  }
  return toggleModal;
}

export default useToggleModal;
