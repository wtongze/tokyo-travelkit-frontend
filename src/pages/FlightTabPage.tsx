import { Container, Typography } from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import AirportCard from '../components/AirportCard';

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
      <div className='flight-status-page' style={{ padding: 16 }}>
        <Container sx={{ px: 0 }}>
          <Typography variant='h5' fontWeight={500}>
            Flight Status
          </Typography>
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
    );
  }
}

export default withRouter(FlightStatusPage);
