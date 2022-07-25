import { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Hero from './components/heroSection/Hero'
import HowItWorks from './components/howItWorksSection/HowItWorks'
import Testimonials from './components/testimonialSection/Testimonials'
import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar"; 
import { getDownloadURL, getStorage, ref } from "firebase/storage";


const Main = () => {
  const dispatch = useDispatch()
   
  
    const storage = getStorage();


    const storageLength = storage.app.options.storageBucket.length;
    useEffect(() => {
      let urlArr = [];
      const getUrl = async () => {
        for (let i = 1; i <= storageLength-1; i++) {
          const data = await getDownloadURL(
            ref(storage, `gs://aroundher.appspot.com/port${i}.jpeg`)
          );
          urlArr.push(data);
         
         
     
        }
      };
      getUrl();
    }, [dispatch, storage, storageLength]);

 
    return (
      <Fragment>
        
        <NavBar />
        <Hero />
        <HowItWorks />
        <Testimonials />
        <Footer />
      </Fragment>
    );
}
export default Main