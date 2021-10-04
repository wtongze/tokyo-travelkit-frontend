import { Container, Typography } from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import AirportCard from '../components/AirportCard';
import AppFrame from '../components/AppFrame';

interface State {
  flightNumber?: string;
  airport?: string;
}

type Props = RouteComponentProps;

class FlightStatusPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      flightNumber: undefined,
      airport: undefined,
    };
  }

  render() {
    return (
      <AppFrame backgroundColor='#f1f3f5'>
        <div className='flight-status-page' style={{ padding: 16 }}>
          <Container sx={{ px: 0 }}>
            <Typography variant='h5'>Flight Status</Typography>
            <Typography variant='subtitle1' sx={{ marginTop: 2 }}>
              Search by Airport
            </Typography>
            <AirportCard
              code='NRT'
              name='Narita'
              sx={{ width: '100%', mt: 1 }}
            ></AirportCard>
            <AirportCard
              code='HND'
              name='Tokyo Haneda'
              sx={{ width: '100%', mt: 2 }}
            ></AirportCard>
          </Container>
        </div>
      </AppFrame>
    );
  }
}

export default withRouter(FlightStatusPage);
