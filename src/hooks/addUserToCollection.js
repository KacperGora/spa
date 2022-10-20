import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

async function addUserToCollection(authCredentials) {
  console.log(authCredentials);
  if (authCredentials) {
    const docRef = await setDoc(doc(db, "users", authCredentials.email), {
      email: authCredentials?.email,
      phoneNumber: authCredentials?.phoneNumber,
      name: authCredentials?.name,
      secondName: authCredentials?.secondName,
      meetings: [],
      timestamp: serverTimestamp(),
    });
  }
}
export default addUserToCollection;
