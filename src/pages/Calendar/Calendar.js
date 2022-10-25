import React from "react";
import { useSelector } from "react-redux";

import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";
import Modal from "../../components/UI/modal/Modal";

import CalendarForm from "../../components/Calendar/Calendar Modal Form/CalendarForm";
import CalendarComponent from "../../components/Calendar/CalendarComponent";
import useFetchEvents from "../../hooks/calendar hooks/useFetchEvents";
const Calendar = () => {
  const getEvents = useFetchEvents();
  getEvents();
  const modal = useSelector((state) => state.modal.isVisible);

  return (
    <section>
      <NavBar />
      {modal && (
        <Modal>
          <CalendarForm />
        </Modal>
      )}
      <CalendarComponent />
      <Footer />
    </section>
  );
};
export default Calendar;
