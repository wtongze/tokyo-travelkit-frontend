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
import TicketTabPage from './pages/TicketTabPage';
import { connect, ReduxProps } from './redux';
import { API } from './api';
import { useEffect } from 'react';
import TicketFarePage from './pages/TicketFarePage';
import StationsTabPage from './pages/StationsTabPage';
import StationInfoPage from './pages/StationInfoPage';

function App(props: ReduxProps) {
  useEffect(() => {
    if (props.stations.length === 0) {
      API.getStations().then((data) => {
        if (data) {
          props.setStations(data);
        }
      });
    }
    if (props.railways.length === 0) {
      API.getRailways().then((data) => {
        if (data) {
          props.setRailways(data);
        }
      });
    }
  }, [props]);

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/direction'></Redirect>
        </Route>
        <Route path='/stations/station-info/:stationId/:mode'>
          <StationInfoPage />
        </Route>
        <Route path='/stations' exact>
          <Redirect to='/stations/station-info'></Redirect>
        </Route>
        <Route path='/ticket/calculator/:from/:to'>
          <TicketFarePage />
        </Route>
        <Route path='/ticket' exact>
          <Redirect to='/ticket/calculator'></Redirect>
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
              <Route path='/stations'>
                <StationsTabPage />
              </Route>
              <Route path='/ticket'>
                <TicketTabPage />
              </Route>
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

export default connect(App);
