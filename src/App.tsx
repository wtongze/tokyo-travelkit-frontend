import { Typography } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppFrame from './components/AppFrame';
import AirportStatusPage from './pages/AirportStatusPage';
import FlightStatusPage from './pages/FlightStatusPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/direction'></Redirect>
        </Route>
        <Route path='/flight/:airportCode/:direction'>
          <AirportStatusPage />
        </Route>
        <Route path='/flight'>
          <FlightStatusPage />
        </Route>
        <Route>
          <AppFrame backgroundColor='#f1f3f5'>
            <Typography variant='h1'>Default</Typography>
          </AppFrame>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
