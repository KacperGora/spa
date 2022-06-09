
import './App.css';

import {Route, Switch} from 'react-router-dom'
import Main from './pages/Main';
import Appointment from './pages/AppointmentPage';
import AppointmentPage from './pages/AppointmentPage';
import Register from './components/appointment/Register';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/appointment" exact>
          <AppointmentPage />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="*">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
