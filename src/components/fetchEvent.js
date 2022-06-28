import { useEffect } from "react";
import { calendarActions } from "../store/calendarSlice";
import { useDispatch } from "react-redux";

const FetchEvent = () => {
  //fetching events from firebase
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(
      "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json"
    )
      .then((resp) => resp.json())
      .then((data) => {
       
         const fetchedMeetings = [];
      
 for (const [key, value] of Object.entries(data)) {
           fetchedMeetings.push({ ...value, key });
         }
         
        
       
   
        dispatch(calendarActions.fetchMeetings(fetchedMeetings));
      
      });
  }, [dispatch]);
  //fetching events from firebase
};
export default FetchEvent;
