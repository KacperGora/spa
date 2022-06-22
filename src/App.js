import "./App.css";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { calendarActions } from "./store/calendarSlice";

import Main from "./pages/mainPage/Main";
import Register from "./components/appointment/Register";
import Calendar from "./components/appointment/Calendar";
import LoginPage from "./pages/loginPage/LoginPage";
import AboutMe from "./pages/aboutMe/AboutMe";
import Portfolio from "./pages/portfolio/Portfolio";
import Kontakt from "./pages/contactUs/Kontakt";


function App() {
  const dispatch = useDispatch();

  //new single event
  const event = useSelector((state) => state.calendar.meeting);

  //sending event to firebase
  useEffect(() => {
    fetch(
      "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json",
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-type": "application / json",
        },
      }
    )
  }, [event]);

  //fetching events from firebase
  useEffect(() => {
    fetch(
      "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json"
    )
      .then((resp) => resp.json())
      .then((data) => {
        const fetchedMeetings = [];
        for (const key in data) {
          fetchedMeetings.push(data[key]);
        }
        dispatch(calendarActions.fetchMeetings(fetchedMeetings));
      });
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/about" exact>
          <AboutMe />
        </Route>
        <Route path="/portfolio" exact>
          <Portfolio />
        </Route>
        <Route path="/kontakt" exact>
          <Kontakt />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="*">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
