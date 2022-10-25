import { useDispatch } from "react-redux";
import { calendarActions } from "../../store/calendarSlice";
import callForMeetings from "./callForMeetings";

function useFetchEvents() {
  const dispatch = useDispatch();
  async function getEvents() {
    const meeting = await callForMeetings();
    dispatch(calendarActions.fetchMeetings(meeting));
  }
  return getEvents;
}
export default useFetchEvents;
