import Spinner from "../UI/spinner/Spinner";
import classes from "./Gallery.module.css";
import useFetchImages from "../../utilities/useFetchImages";

const Gallery = () => {
  const { imgUrl, isLoaded } = useFetchImages("portfolio");
  const imgCollection = imgUrl["portfolioCollection"];

  return (
    <div className={classes.container}>
      {imgCollection?.map((item, index) => {
        return (
          <div key={Math.random()} className={`${classes.w2} ${classes.h4}`}>
            <div className={classes.galleryItem}>
              <div className={classes.image}>
                <img src={item} alt={"Womans hand with made manicure"} />
              </div>
            </div>
          </div>
        );
      })}
      {!isLoaded && <Spinner />}
    </div>
  );
};

export default Gallery;
