import { Fragment } from "react";
import classes from "./Profile.module.css";
import React from "react";
import { useSelector } from "react-redux";
import ProfileMeetings from "./components/ProfileMeetings";
import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";

const Profile = () => {
  const loggedUser = useSelector((state) => state.user.user);
  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.hero}>
          <p className={classes.heading}>
            Hej <span>{loggedUser && loggedUser.name}</span>, fajnie Cię widzieć
          </p>
          <ProfileMeetings />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Profile;
