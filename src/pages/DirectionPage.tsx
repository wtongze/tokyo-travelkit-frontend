import {
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import StationPicker from '../components/StationPicker';
import { StationItem } from '../type';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useHistory } from 'react-router';

const OperatorsWithTrainTimetable: string[] = [
  'odpt.Operator:Sotetsu',
  'odpt.Operator:YokohamaMunicipal',
  'odpt.Operator:TamaMonorail',
  'odpt.Operator:TWR',
  'odpt.Operator:JR-East',
  'odpt.Operator:TokyoMetro',
  'odpt.Operator:Toei',
];

function DirectionPage() {
  const [origin, setOrigin] = useState<StationItem>();
  const [destination, setDestination] = useState<StationItem>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();

  return (
    <div className='direction-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5'>Direction</Typography>
        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              Origin Station
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
            title={'Select Origin Station'}
            value={origin}
            onChange={(o) => {
              setOrigin(o);
            }}
            operator={OperatorsWithTrainTimetable}
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
              Destination Station
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
            title={'Select Destination Station'}
            value={destination}
            onChange={(o) => {
              setDestination(o);
            }}
            operator={OperatorsWithTrainTimetable}
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
                    `/direction/${origin.id}/${destination.id}?mode=all&fromTime=14:00&calendar=weekday`
                  );
                }
              }}
            >
              Get Direction
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DirectionPage;
