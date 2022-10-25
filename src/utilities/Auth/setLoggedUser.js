import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { userActions } from "../../store/usersSlice";

async function setLoggedUser(email) {
  let loggedUser;
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    loggedUser = userActions.setUser(doc.data()).payload;
  });

  return loggedUser;
}
export default setLoggedUser;
