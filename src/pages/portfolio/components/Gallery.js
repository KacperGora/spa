import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Spinner from "../../../components/UI/spinner/Spinner";
import classes from "./Gallery.module.css";

const Gallery = () => {
  const storage = getStorage();
  const storageLength = storage.app.options.storageBucket.length;
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    let urlArr = [];
    const getUrl = async () => {
      for (let i = 1; i <= storageLength; i++) {
        const data = await getDownloadURL(
          ref(storage, `gs://aroundher.appspot.com/port${i}.jpeg`)
        );
        urlArr.push(data);
        setImgUrl(urlArr);
      }
    };
    getUrl();
  }, [storage, storageLength]);
  useEffect(() => {
    if (imgUrl.length === storageLength || imgUrl.length > 15) {
      setIsLoaded(true);
      console.log(isLoaded);
    }
  }, [imgUrl.length, isLoaded, storageLength]);

  // function randomIntFromInterval(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  const content = imgUrl.map((item, index) => {
    return (
      <div
        key={Math.random()}
        // className={`${classes[`w${randomIntFromInterval(2, 4).toString()}`]} ${
        //   classes[`h${randomIntFromInterval(2, 4).toString()}`]
        // }`}
        className={`${classes.w4} ${classes.h4}`}
      >
        <div className={classes.galleryItem}>
          <div className={classes.image}>
            <img
              src={item}
              alt={"Womans hand with made manicure"}
            />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={classes.container}>
      {!isLoaded ? <Spinner /> : content}
      
    </div>
  );
};

export default Gallery;
