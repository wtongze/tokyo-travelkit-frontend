import { Container, Typography } from '@mui/material';
import { useHistory, useRouteMatch } from 'react-router';
import AppFrame from '../components/AppFrame';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

function FlightStatusPage() {
  const match = useRouteMatch<{
    airportCode: string;
    direction: 'departure' | 'arrival';
    flightId: string;
  }>();
  const history = useHistory();
  const { airportCode, direction, flightId } = match.params;
  return (
    <AppFrame
      title={'Flight Status'}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push(`/flight/${airportCode}/${direction}`)}
      hideBottomNav
    >
      <Container>
        <Typography>Flight Status</Typography>
        <Typography>{flightId}</Typography>
      </Container>
    </AppFrame>
  );
}

export default FlightStatusPage;
