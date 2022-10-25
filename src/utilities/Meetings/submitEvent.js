import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function submitEvent(workingMeeting) {
  const docRef = doc(collection(db, "meetings"));
  await setDoc(docRef, {
    ...workingMeeting,
    id: docRef.id,
    timeStamp: serverTimestamp(),
  });
}
export default submitEvent();
