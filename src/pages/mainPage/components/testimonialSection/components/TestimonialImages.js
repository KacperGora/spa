import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import classes from "./TestimonialImages.module.css";
import { db } from "../../../../../firebase";

function TestimonialImages() {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "images", "testimonialGallery"), (doc) => {
      const images = [];
      images.push(...doc.data().testimonialGallery);

      setImgUrl(images);
    });
  }, []);

  const content = imgUrl.map((img) => {
    return (
      <figure key={Math.random()} className={classes.galleryItem}>
        <img src={img} alt="Gallery item" />
      </figure>
    );
  });
  return <div className={classes.gallery}>{content}</div>;
}

export default TestimonialImages;
