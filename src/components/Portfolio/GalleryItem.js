import React from "react";
import classes from "./Gallery.module.css";
function GalleryItem(props) {
  return (
    <div className={`${classes.galleryContainer} ${classes.w3}  ${classes.h3}`}>
      <div className={classes.galleryItem}>
        <div className={classes.image}>
          <img src={props.img} alt={"Womans hand with made manicure"} />
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;
