import { Typography } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppFrame from './components/AppFrame';
import FlightPage from './pages/FlightPage';

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/flight' exact>
          <Redirect to='/flight/status'></Redirect>
        </Route>
        <Route path='/' exact>
          <Redirect to='/direction'></Redirect>
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
