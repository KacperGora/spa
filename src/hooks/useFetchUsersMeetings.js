import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

function useFetchUserMeetings() {
  const [userMeetings, setUserMeetings] = useState([]);
  const loggedUserMail = useSelector((state) => state.user.user?.email);

    const fetchUsersMeetings = async () => {
      const docRef = doc(db, "users", loggedUserMail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserMeetings(docSnap.data().meetings);
      } else {
        console.log("No such document!");
      }
    };
    fetchUsersMeetings();


  return userMeetings;
}

export default useFetchUserMeetings;
