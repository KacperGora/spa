import { Fragment } from "react";
import Appointment from "../components/appointment/Appointment";
import NavBar from "../components/mainPage/NavBar";


const AppointmentPage = () => {
  return (
    <Fragment>
  
      <NavBar />
      <Appointment />
    </Fragment>
  );
};
export default AppointmentPage;
