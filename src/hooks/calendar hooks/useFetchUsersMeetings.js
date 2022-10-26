import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";

function useFetchUserMeetings() {
  const [userMeetings, setUserMeetings] = useState([]);
  const loggedUserMail = useSelector((state) => state.user.user?.email);
  useEffect(() => {
    async function get() {
      const q = query(
        collection(db, "meetings"),
        where("email", "==", loggedUserMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserMeetings((currState) => [...currState, doc.data()]);
      });
    }
    get();
  }, [loggedUserMail]);

  return userMeetings || [];
}

export default useFetchUserMeetings;
