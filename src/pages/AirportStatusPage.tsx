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
import {
  DepartureInformationItem,
  ArrivalInformationItem,
  MultiLangObject,
} from '../type';
import { AIRPORT_INFO } from '../const';

const tabs = [
  {
    label: {
      en: 'Departure',
      'zh-Hans': '出发',
    },
    match: 'departure',
  },
  {
    label: {
      en: 'Arrival',
      'zh-Hans': '到达',
    },
    match: 'arrival',
  },
];

function AirportStatusPage(props: ReduxProps) {
  const match = useRouteMatch<{
    airportCode: string;
    direction: 'departure' | 'arrival';
  }>();
  const history = useHistory();

  const [airportCode] = useState(match.params.airportCode);
  const [direction, setDirection] = useState<string>(match.params.direction);
  const airportInfo = AIRPORT_INFO[airportCode];
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
    let intervalId: any;

    if (direction === 'departure') {
      API.getDepartureInformation(airportCode, terminal).then((data) => {
        if (data && subscribe) {
          setFlights(data);
          setLoading(false);

          if (data.length > 0) {
            setTime(new Date(data[0].dcDate));
          }

          intervalId = setInterval(() => {
            API.getDepartureInformation(airportCode, terminal).then((data) => {
              if (data && subscribe) {
                setFlights(data);
                if (data.length > 0) {
                  setTime(new Date(data[0].dcDate));
                }
              }
            });
          }, 2 * 60 * 1000);
        }
      });
    } else {
      API.getArrivalInformation(airportCode, terminal).then((data) => {
        if (data && subscribe) {
          setFlights(data);
          setLoading(false);
          if (data.length > 0) {
            setTime(new Date(data[0].dcDate));
          }

          intervalId = setInterval(() => {
            API.getArrivalInformation(airportCode, terminal).then((data) => {
              if (data && subscribe) {
                setFlights(data);
                if (data.length > 0) {
                  setTime(new Date(data[0].dcDate));
                }
              }
            });
          }, 2 * 60 * 1000);
        }
      });
    }

    return () => {
      subscribe = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [airportCode, direction, terminal]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [time, setTime] = useState<Date>();

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <AppFrame
      hideBottomNav
      tabs={tabs}
      onChangeTab={(index) => {
        history.push('/flight/' + airportCode + '/' + tabs[index].match);
        setFlights([]);
        setLoading(true);
        setDirection(tabs[index].match);
        setTime(undefined);
      }}
      title={{ en: 'Search by Airport', 'zh-Hans': '以机场搜索' }}
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
                {direction === 'departure'
                  ? getText({ en: 'Departure', 'zh-Hans': '出发' })
                  : getText({ en: 'Arrival', 'zh-Hans': '到达' })}
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
                <MenuItem value={'1'}>
                  {getText({ en: 'Terminal 1', 'zh-Hans': '1 号航站楼' })}
                </MenuItem>
                <MenuItem value={'2'}>
                  {getText({ en: 'Terminal 2', 'zh-Hans': '2 号航站楼' })}
                </MenuItem>
                <MenuItem value={'3'}>
                  {getText({ en: 'Terminal 3', 'zh-Hans': '3 号航站楼' })}
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </div>
        <List sx={{ pt: 1 }}>
          <ListItem>
            <Grid container alignItems='center'>
              <Grid item xs={2}>
                <Typography variant='subtitle2' textAlign='center'>
                  {getText({ en: 'Time', 'zh-Hans': '时间' })}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' textAlign='center'>
                  {direction === 'departure'
                    ? getText({ en: 'Destination', 'zh-Hans': '目的地' })
                    : getText({ en: 'Origin', 'zh-Hans': '始发地' })}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='subtitle2' textAlign='center'>
                  {getText({ en: 'Flight', 'zh-Hans': '航班' })}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='subtitle2' textAlign='center'>
                  {getText({ en: 'Status', 'zh-Hans': '状态' })}
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
                            {getText(flight.destinationAirport?.title)}
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
                                      return 'primary';
                                  }
                                })()}
                                label={getText(flight.flightStatus.title)}
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
                            {getText(flight.originAirport?.title)}
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
                                      return 'primary';
                                  }
                                })()}
                                label={getText(flight.flightStatus.title)}
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
        {time ? (
          <Typography fontSize={12} sx={{ mt: 2, mb: 4, px: 2 }}>
            {getText({ en: 'Last Updated at ', 'zh-Hans': '最近更新于 ' })}
            {time.toLocaleString()}
          </Typography>
        ) : null}
      </Container>
    </AppFrame>
  );
}

export default connect(AirportStatusPage);
