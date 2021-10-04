import { Typography } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppFrame from './components/AppFrame';
import AirportStatusPage from './pages/AirportStatusPage';
import FlightTabPage from './pages/FlightTabPage';
import FlightStatusPage from './pages/FlightStatusPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/direction'></Redirect>
        </Route>
        <Route path='/flight/:airportCode/:direction/:flightId'>
          <FlightStatusPage />
        </Route>
        <Route path='/flight/:airportCode/:direction'>
          <AirportStatusPage />
        </Route>

        <Route>
          <AppFrame>
            <Switch>
              <Route path='/flight'>
                <FlightTabPage />
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
