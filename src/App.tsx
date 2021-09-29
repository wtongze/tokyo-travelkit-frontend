import { Typography } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppFrame from './components/AppFrame';
import AirportStatusPage from './pages/AirportStatusPage';
import FlightPage from './pages/FlightPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path='/flight/status/airport/:airportCode'
          exact
          render={(props) => (
            <Redirect
              to={`/flight/status/airport/${props.match.params.airportCode}/departure`}
            ></Redirect>
          )}
        ></Route>
        <Route path='/flight' exact>
          <Redirect to='/flight/status'></Redirect>
        </Route>
        <Route path='/' exact>
          <Redirect to='/direction'></Redirect>
        </Route>
        <Route path='/flight/status/airport/:airportCode/:direction'>
          <AirportStatusPage />
        </Route>
        <Route>
          <AppFrame>
            <Switch>
              <Route path='/flight/:mode'>
                <FlightPage />
              </Route>
              <Route>
                <Typography variant='h1'>Default</Typography>
              </Route>
            </Switch>
          </AppFrame>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
