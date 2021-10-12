import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import StationPicker from '../components/StationPicker';
import { StationItem } from '../type';
import { useHistory } from 'react-router';

const operatorWithFareInfo: string[] = [
  'odpt.Operator:Sotetsu',
  'odpt.Operator:YokohamaMunicipal',
  'odpt.Operator:TamaMonorail',
  'odpt.Operator:MIR',
  'odpt.Operator:Yurikamome',
  'odpt.Operator:Tobu',
  'odpt.Operator:Tokyu',
  'odpt.Operator:TWR',
  'odpt.Operator:Seibu',
  'odpt.Operator:Keikyu',
  'odpt.Operator:Keisei',
  'odpt.Operator:TokyoMetro',
  'odpt.Operator:Toei',
];

function TicketCalculatorPage() {
  const history = useHistory();
  const [origin, setOrigin] = useState<StationItem | undefined>();
  const [destination, setDestination] = useState<StationItem | undefined>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className='ticket-calculator-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          Ticket Fare Calculator
        </Typography>
        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              Origin
            </Typography>
          </Grid>
          <Grid item>
            {origin ? (
              <Button
                variant='text'
                onClick={() => {
                  setOrigin(undefined);
                }}
              >
                Clear
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <StationPicker
            title={{ en: 'Select Origin', 'zh-Hans': '选择出发车站' }}
            value={origin}
            operator={
              destination ? [destination.operator] : operatorWithFareInfo
            }
            onChange={(o) => {
              setOrigin(o);
            }}
          />
        </div>

        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              Destination
            </Typography>
          </Grid>
          <Grid item>
            {destination ? (
              <Button
                variant='text'
                onClick={() => {
                  setDestination(undefined);
                }}
              >
                Clear
              </Button>
            ) : null}
          </Grid>
        </Grid>

        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <StationPicker
            title={{ en: 'Select Destination', 'zh-Hans': '选择到达车站' }}
            operator={origin ? [origin.operator] : operatorWithFareInfo}
            value={destination}
            onChange={(d) => {
              setDestination(d);
            }}
          />
        </div>
        <Grid container sx={{ mt: 4 }} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='contained'
              disableElevation
              endIcon={<ChevronRightIcon />}
              disabled={origin && destination ? false : true}
              onClick={() => {
                if (origin && destination) {
                  history.push(
                    `/ticket/calculator/${origin.id}/${destination.id}`
                  );
                }
              }}
            >
              Calculate Fare
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default TicketCalculatorPage;
