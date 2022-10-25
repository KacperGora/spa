import React from "react";
import useFetchImages from "../../../../utilities/useFetchImages";
import classes from "./TestimonialImages.module.css";

function TestimonialImages() {
  const { imgUrl, isLoaded } = useFetchImages("testimonialGallery");
  const imgCollection = imgUrl["testimonialGallery"];

  return (
    <div className={classes.gallery}>
      {imgCollection?.map((img) => {
        return (
          <figure key={Math.random()} className={classes.galleryItem}>
            <img src={img} alt="Gallery item" />
          </figure>
        );
      })}
    </div>
  );
}

export default TestimonialImages;
