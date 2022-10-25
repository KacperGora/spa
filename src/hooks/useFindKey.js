import { useDispatch } from "react-redux";
import { calendarActions } from "../store/calendarSlice";

function useFindKey({ params }) {
  const dispatch = useDispatch();
  dispatch(calendarActions.findKey(params));
  return;
}

export default useFindKey;
