import {
  ListItem,
  List,
  Typography,
  Grid,
  Chip,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  LinearProgress,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AppFrame from '../components/AppFrame';
import { useHistory, useRouteMatch } from 'react-router';
import {
  ChevronLeft as ChevronLeftIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { connect, ReduxProps } from '../redux';
import { API } from '../api';

const tabs = [
  {
    label: 'Departure',
    match: 'departure',
  },
  {
    label: 'Arrival',
    match: 'arrival',
  },
];

interface AirportInfo {
  label: string;
  value: string;
}

interface Info {
  id: string;
  title: {
    en?: string;
    ja?: string;
  } | null;
}

interface DepartureInformationItem {
  dcDate: string;
  dctValid?: string;
  id: string;
  operator: Info;
  airline?: Info;
  flightNumber: string[];
  flightStatus?: Info;
  flightInformationSummary?: object;
  flightInformationText?: object;
  scheduledDepartureTime?: string;
  estimatedDepartureTime?: string;
  actualDepartureTime?: string;
  departureAirport: Info;
  departureAirportTerminal?: Info;
  departureGate?: string;
  checkInCounter?: string[];
  destinationAirport?: Info;
  viaAirport?: Info[];
  aircraftType?: string;
}

interface ArrivalInformationItem {
  dcDate: string;
  dctValid?: string;
  id: string;
  operator: Info;
  airline?: Info;
  flightNumber: string[];
  flightStatus?: Info;
  flightInformationSummary?: object;
  flightInformationText?: object;
  scheduledArrivalTime?: string;
  estimatedArrivalTime?: string;
  actualArrivalTime?: string;
  arrivalAirport: Info;
  arrivalAirportTerminal?: Info;
  arrivalGate?: string;
  baggageClaim?: string[];
  originAirport?: Info;
  viaAirport?: Info[];
  aircraftType?: string;
}

function AirportStatusPage(props: ReduxProps) {
  const match = useRouteMatch<{
    airportCode: string;
    direction: 'departure' | 'arrival';
  }>();
  const history = useHistory();

  const [airportCode] = useState(match.params.airportCode);
  const [direction, setDirection] = useState<string>(match.params.direction);
  const airportInfo: AirportInfo =
    airportCode === 'NRT'
      ? {
          label: 'Narita',
          value: 'NRT',
        }
      : {
          label: 'Tokyo Haneda',
          value: 'HND',
        };
  const [flights, setFlights] = useState<
    (DepartureInformationItem | ArrivalInformationItem)[]
  >([]);

  const [terminal, setTerminal] = useState(airportCode === 'HND' ? '3' : '1');

  const handleChange = (event: SelectChangeEvent) => {
    setFlights([]);
    setLoading(true);
    setTerminal(event.target.value);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscribe = true;

    if (direction === 'departure') {
      API.getDepartureInformation(airportCode, terminal).then((data) => {
        if (subscribe) {
          setFlights(data);
          setLoading(false);
        }
      });
    } else {
      API.getArrivalInformation(airportCode, terminal).then((data) => {
        if (subscribe) {
          setFlights(data);
          setLoading(false);
        }
      });
    }

    return () => {
      subscribe = false;
    };
  }, [airportCode, direction, terminal]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppFrame
      hideBottomNav
      tabs={tabs}
      onChangeTab={(index) => {
        history.push('/flight/' + airportCode + '/' + tabs[index].match);
        setFlights([]);
        setLoading(true);
        setDirection(tabs[index].match);
      }}
      title={'Search by Airport'}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push('/flight')}
      backgroundColor='white'
    >
      <Container
        className='airport-status-page'
        sx={{
          px: 0,
          mt: isMobile ? 0 : 4,
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: '#f1f3f5',
            borderRadius: isMobile ? undefined : '8px',
          }}
        >
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Typography variant='h6' fontWeight='regular'>
                {airportInfo.label} ({airportInfo.value})
              </Typography>
              <Typography
                alignItems='center'
                display='flex'
                variant='h5'
                fontWeight='medium'
              >
                {direction === 'departure' ? (
                  <FlightTakeoffIcon sx={{ mr: 1 }} />
                ) : (
                  <FlightLandIcon sx={{ mr: 1 }} />
                )}
                {direction === 'departure' ? 'Departure' : 'Arrival'}
              </Typography>
            </Grid>
            <Grid item>
              <Select
                value={terminal}
                onChange={handleChange}
                sx={{
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit',
                  '& .MuiSelect-select': {
                    paddingTop: '8px',
                    paddingBlock: '8px',
                  },
                }}
              >
                <MenuItem value={'1'}>Terminal 1</MenuItem>
                <MenuItem value={'2'}>Terminal 2</MenuItem>
                <MenuItem value={'3'}>Terminal 3</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </div>
        <List sx={{ pt: 1 }}>
          <ListItem>
            <Grid container alignItems='center'>
              <Grid item xs={2}>
                <Typography variant='subtitle2' textAlign='center'>
                  Time
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' textAlign='center'>
                  Destination
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='subtitle2' textAlign='center'>
                  Flight
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='subtitle2' textAlign='center'>
                  Status
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          {loading ? <LinearProgress /> : null}
          {direction === 'departure'
            ? flights.map((f) => {
                const flight = f as DepartureInformationItem;
                return (
                  <div key={flight.id}>
                    <ListItem
                      button
                      onClick={() =>
                        history.push(
                          `/flight/${airportCode}/${direction}/${flight.id}`
                        )
                      }
                    >
                      <Grid container alignItems='center'>
                        <Grid item xs={2}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            fontSize={20}
                            lineHeight={1.25}
                          >
                            {flight.scheduledDepartureTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            lineHeight={1.25}
                          >
                            {flight.destinationAirport?.title?.en}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            lineHeight={1.25}
                          >
                            {flight.flightNumber.join('\n')}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            lineHeight={1.25}
                          >
                            {flight.flightStatus ? (
                              <Chip
                                color={(() => {
                                  switch (flight.flightStatus.id) {
                                    case 'odpt.FlightStatus:Cancelled':
                                      return 'error';
                                    case 'odpt.FlightStatus:OnTime':
                                      return 'success';
                                    case 'odpt.FlightStatus:Departed':
                                      return 'info';
                                    default:
                                      return undefined;
                                  }
                                })()}
                                label={flight.flightStatus.title?.en}
                                size='small'
                                sx={{
                                  borderRadius: '6px',
                                  fontWeight: 'medium',
                                  width: '82px',
                                  color: 'white',
                                }}
                              />
                            ) : (
                              '-'
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })
            : flights.map((f) => {
                const flight = f as ArrivalInformationItem;
                return (
                  <div key={flight.id}>
                    <ListItem
                      button
                      onClick={() =>
                        history.push(
                          `/flight/${airportCode}/${direction}/${flight.id}`
                        )
                      }
                    >
                      <Grid container alignItems='center'>
                        <Grid item xs={2}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            fontSize={20}
                            lineHeight={1.25}
                          >
                            {flight.scheduledArrivalTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            lineHeight={1.25}
                          >
                            {flight.originAirport?.title?.en}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            lineHeight={1.25}
                          >
                            {flight.flightNumber.join('\n')}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant='subtitle1'
                            textAlign='center'
                            fontWeight='medium'
                            lineHeight={1.25}
                          >
                            {flight.flightStatus ? (
                              <Chip
                                color={(() => {
                                  switch (flight.flightStatus.id) {
                                    case 'odpt.FlightStatus:Cancelled':
                                      return 'error';
                                    case 'odpt.FlightStatus:OnTime':
                                      return 'success';
                                    case 'odpt.FlightStatus:Departed':
                                      return 'info';
                                    default:
                                      return undefined;
                                  }
                                })()}
                                label={flight.flightStatus.title?.en}
                                size='small'
                                sx={{
                                  borderRadius: '6px',
                                  fontWeight: 'medium',
                                  width: '82px',
                                  color: 'white',
                                }}
                              />
                            ) : (
                              '-'
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
        </List>
      </Container>
    </AppFrame>
  );
}

export default connect(AirportStatusPage);
