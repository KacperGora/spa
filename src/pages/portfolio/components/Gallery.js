import { doc, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";
import Spinner from "../../../components/UI/spinner/Spinner";
import { db } from "../../../firebase";
import classes from "./Gallery.module.css";

const Gallery = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "images", "portfolio"), (doc) => {
      const images = [];
      images.push(...doc.data().portfolioCollection);

      setImgUrl(images);
      setIsLoaded(true);
    });
  }, []);
  

  const content = imgUrl.map((item, index) => {
    return (
      <div key={Math.random()} className={`${classes.w2} ${classes.h4}`}>
        <div className={classes.galleryItem}>
          <div className={classes.image}>
            <img src={item} alt={"Womans hand with made manicure"} />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={classes.container}>
      {content}
      {!isLoaded ? <Spinner /> : content}
    </div>
  );
};

export default Gallery;
