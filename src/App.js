
import './App.css';

import {Route, Switch} from 'react-router-dom'
import Main from './pages/Main';
import Appointment from './pages/AppointmentPage';
import AppointmentPage from './pages/AppointmentPage';
import Register from './components/appointment/Register';
import Calendar from './components/appointment/Calendar';
import LoginPage from './pages/LoginPage';
import AboutMe from './pages/AboutMe';
import Portfolio from './pages/Portfolio';
import Kontakt from './pages/Kontakt';

function App() {
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
        <Route path="/appointment" exact>
          <AppointmentPage />
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
