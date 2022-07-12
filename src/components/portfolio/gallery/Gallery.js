import port1 from '../../../images/port1.jpeg'
import port2 from '../../../images/port2.jpeg'
import port3 from '../../../images/port3.jpeg'
import port4 from '../../../images/port4.jpeg'
import port5 from '../../../images/port5.jpeg'
import classes from './Gallery.module.css'
const Gallery = () => {
  return (
    <div className={classes.container}>
      <div className={classes.gallery}>
        <figure className={classes.galleryItem}>
          <img src={port1} />
        </figure>

        <figure className={classes.galleryItem}>
          <img src={port2} />
        </figure>
        <figure className={classes.galleryItem}>
          <img src={port3} />
        </figure>

        <figure className={classes.galleryItem}>
          <img src={port4} />
        </figure>
        <figure className={classes.galleryItem}>
          <img src={port5} />
        </figure>
      </div>
  
    </div>
  );
};

export default Gallery;
