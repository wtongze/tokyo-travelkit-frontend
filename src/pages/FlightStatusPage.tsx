import { Typography, Paper, InputBase } from '@mui/material';
import React from 'react';
import AirportCard from '../components/AirportCard';

interface State {
  flightNumber?: string;
}

class FlightStatusPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      flightNumber: undefined,
    };
  }

  render() {
    return (
      <div className='flight-status-page' style={{ padding: 16 }}>
        <Typography variant='h5'>Flight Status</Typography>
        <Typography variant='subtitle2' sx={{ marginTop: 4 }}>
          Search by Flight Number
        </Typography>
        <Paper
          sx={{
            marginTop: 1,
          }}
          elevation={0}
        >
          <InputBase
            id='flight-number'
            placeholder='Flight Number...'
            fullWidth
            size='small'
            disabled
            value={this.state.flightNumber}
            sx={{
              fontFamily: 'inherit',
              '& .MuiInputBase-input': {
                padding: '8px 16px',
              },
            }}
          />
        </Paper>
        <Typography variant='subtitle2' sx={{ marginTop: 6 }}>
          Search by Airport
        </Typography>
        <Paper
          sx={{
            marginTop: 1,
          }}
          elevation={0}
        >
          <InputBase
            id='airport'
            placeholder='Airport Name...'
            fullWidth
            size='small'
            disabled
            value={this.state.flightNumber}
            sx={{
              fontFamily: 'inherit',
              '& .MuiInputBase-input': {
                padding: '8px 16px',
              },
            }}
          />
        </Paper>
        <Typography variant='subtitle1' sx={{ marginTop: 6 }}>
          Popular Options
        </Typography>
        <AirportCard code='NRT' name='Narita' sx={{ width: '100%', mt: 1 }}></AirportCard>
        <AirportCard code='HND' name='Tokyo Haneda' sx={{ width: '100%', mt: 2 }}></AirportCard>
      </div>
    );
  }
}

export default FlightStatusPage;
