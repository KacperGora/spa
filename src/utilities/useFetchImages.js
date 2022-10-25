import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function useFetchImages(location) {
  const [imgUrl, setImgUrl] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const unsub = onSnapshot(doc(db, "images", location), (doc) => {
      const images = [];
      images.push(doc.data());
      setImgUrl(images[0]);
    });
    setIsLoaded(true);
    return () => unsub();
  }, [location]);

  return { imgUrl, isLoaded };
}
export default useFetchImages;
