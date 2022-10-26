import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function useFetchImages(location) {
  const [imgUrl, setImgUrl] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      setIsLoaded(false);
      onSnapshot(doc(db, "images", location), (doc) => {
        const images = [];
        images.push(doc.data());
        setImgUrl(images[0]);
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoaded(true);
    }
  }, [location]);

  return { imgUrl, isLoaded };
}
export default useFetchImages;
