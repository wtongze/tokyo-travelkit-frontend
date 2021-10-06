import { Container, Typography } from '@mui/material';
import StationPicker from '../components/StationPicker';

function TicketCalculatorPage() {
  return (
    <div className='ticket-calculator-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          Ticket Fare Calculator
        </Typography>
        <Typography sx={{ mt: 4 }} fontWeight={'medium'}>
          Origin
        </Typography>
        <StationPicker title={'Select Origin'} />
        <Typography sx={{ mt: 4 }} fontWeight={'medium'}>
          Destination
        </Typography>
        <StationPicker title={'Select Destination'} />
      </Container>
    </div>
  );
}

export default TicketCalculatorPage;
