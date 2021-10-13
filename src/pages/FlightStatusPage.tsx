import {
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useHistory, useRouteMatch } from 'react-router';
import AppFrame from '../components/AppFrame';
import {
  ChevronLeft as ChevronLeftIcon,
  Flight as FlightIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  ArrivalInformationItem,
  DepartureInformationItem,
  MultiLangObject,
} from '../type';
import { API } from '../api';
import { connect, ReduxProps } from '../redux';

function FlightStatusPage(props: ReduxProps) {
  const match = useRouteMatch<{
    airportCode: string;
    direction: 'departure' | 'arrival';
    flightId: string;
  }>();
  const history = useHistory();
  const { airportCode, direction, flightId } = match.params;
  const [flightInfo, setFlightInfo] = useState<
    DepartureInformationItem | ArrivalInformationItem
  >();

  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<Date>();

  useEffect(() => {
    let subscribe = true;
    let intervalId: any;

    if (flightInfo === undefined) {
      if (direction === 'departure') {
        API.getDepartureFlightInformation(flightId).then((data) => {
          if (data && subscribe) {
            setFlightInfo(data);
            setLoading(false);
            setTime(new Date());
            intervalId = setInterval(() => {
              API.getDepartureFlightInformation(flightId).then((data) => {
                if (data && subscribe) {
                  setFlightInfo(data);
                  setTime(new Date());
                }
              });
            }, 2 * 60 * 1000);
          }
        });
      } else {
        API.getArrivalFlightInformation(flightId).then((data) => {
          if (data && subscribe) {
            setFlightInfo(data);
            setLoading(false);
            setTime(new Date(data.dcDate));
            intervalId = setInterval(() => {
              API.getArrivalFlightInformation(flightId).then((data) => {
                if (data && subscribe) {
                  setFlightInfo(data);
                  setTime(new Date(data.dcDate));
                }
              });
            }, 2 * 60 * 1000);
          }
        });
      }
    }

    return () => {
      subscribe = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [direction, flightId, flightInfo, loading]);

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
      title={{ en: 'Flight Status', 'zh-Hans': '航班动态' }}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push(`/flight/${airportCode}/${direction}`)}
      hideBottomNav
    >
      <Container>
        <Card sx={{ mt: 4, borderRadius: 2 }}>
          {flightInfo ? (
            <CardContent>
              <Typography sx={{ mb: -1 }}>
                {getText(flightInfo.airline?.title)}
              </Typography>
              <Grid
                container
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h6' fontWeight='medium'>
                    {flightInfo.flightNumber[0]}
                  </Typography>
                </Grid>
                <Grid>
                  {flightInfo.flightStatus ? (
                    <Chip
                      size='small'
                      sx={{
                        borderRadius: '6px',
                        fontWeight: 'medium',
                        fontSize: '1rem',
                        color: 'white',
                      }}
                      label={getText(flightInfo.flightStatus?.title)}
                      color={'info'}
                    ></Chip>
                  ) : null}
                </Grid>
              </Grid>
              {flightInfo.flightNumber.slice(1).length > 0 ? (
                <Typography fontSize={18}>
                  ({flightInfo.flightNumber.slice(1).join(' / ')})
                </Typography>
              ) : null}
              {direction === 'departure'
                ? (() => {
                    const fInfo = flightInfo as DepartureInformationItem;
                    return (
                      <div>
                        <Grid
                          container
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                          sx={{ mt: 6 }}
                        >
                          <Grid item xs={5}>
                            <Typography variant='h4' fontWeight='bold'>
                              {fInfo.departureAirport.id.split(':')[1]}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            display='flex'
                            justifyContent='center'
                            xs={2}
                          >
                            <FlightIcon sx={{ transform: 'rotate(90deg)' }} />
                          </Grid>
                          <Grid item xs={5} textAlign='right'>
                            <Typography variant='h4' fontWeight='bold'>
                              {fInfo.destinationAirport?.id.split(':')[1]}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          display='flex'
                          alignItems='flex-start'
                          justifyContent='space-between'
                        >
                          <Grid item xs={5}>
                            <Typography fontSize={18} fontWeight='medium'>
                              {getText(fInfo.departureAirport.title)}
                            </Typography>
                            <Typography fontSize={18}>
                              ({getText(fInfo.departureAirportTerminal?.title)})
                            </Typography>
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={5} textAlign='right'>
                            <Typography fontSize={18} fontWeight='medium'>
                              {getText(fInfo.destinationAirport?.title)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container display='flex' sx={{ mt: 6 }}>
                          <Grid item xs={6}>
                            <Typography fontSize={16} fontWeight='medium'>
                              {getText({
                                en: 'Check-In Counter',
                                'zh-Hans': '值机柜台',
                              })}
                            </Typography>
                            <Typography>
                              {fInfo.checkInCounter?.join(' / ') || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign='right'>
                            <Typography fontSize={16} fontWeight='medium'>
                              {getText({ en: 'Gate', 'zh-Hans': '登机口' })}
                            </Typography>
                            <Typography>
                              {fInfo.departureGate || '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          fontSize={16}
                          fontWeight='medium'
                          sx={{ mt: 4 }}
                        >
                          {getText({
                            en: 'Departure Time',
                            'zh-Hans': '出发时间',
                          })}
                        </Typography>
                        <Grid container display='flex'>
                          <Grid item xs={4}>
                            <Typography fontSize={16}>
                              {getText({ en: 'Scheduled', 'zh-Hans': '计划' })}
                            </Typography>
                            <Typography>
                              {fInfo.scheduledDepartureTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='center'>
                            <Typography fontSize={16}>
                              {getText({ en: 'Estimated', 'zh-Hans': '预计' })}
                            </Typography>
                            <Typography>
                              {fInfo.estimatedDepartureTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='right'>
                            <Typography fontSize={16}>
                              {getText({ en: 'Actual', 'zh-Hans': '实际' })}
                            </Typography>
                            <Typography>
                              {fInfo.actualDepartureTime || '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })()
                : (() => {
                    const fInfo = flightInfo as ArrivalInformationItem;
                    return (
                      <div>
                        <Grid
                          container
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                          sx={{ mt: 6 }}
                        >
                          <Grid item xs={5}>
                            <Typography variant='h4' fontWeight='bold'>
                              {fInfo.originAirport?.id.split(':')[1]}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            display='flex'
                            justifyContent='center'
                            xs={2}
                          >
                            <FlightIcon sx={{ transform: 'rotate(90deg)' }} />
                          </Grid>
                          <Grid item xs={5} textAlign='right'>
                            <Typography variant='h4' fontWeight='bold'>
                              {fInfo.arrivalAirport?.id.split(':')[1]}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          display='flex'
                          alignItems='flex-start'
                          justifyContent='space-between'
                        >
                          <Grid item xs={5}>
                            <Typography fontSize={18} fontWeight='medium'>
                              {getText(fInfo.originAirport?.title)}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={5} textAlign='right'>
                            <Typography fontSize={18} fontWeight='medium'>
                              {getText(fInfo.arrivalAirport.title)}
                            </Typography>
                            <Typography fontSize={18}>
                              ({getText(fInfo.arrivalAirportTerminal?.title)})
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container display='flex' sx={{ mt: 6 }}>
                          <Grid item xs={6}>
                            <Typography fontSize={16} fontWeight='medium'>
                              {getText({
                                en: 'Baggage Claim',
                                'zh-Hans': '行李提取',
                              })}
                            </Typography>
                            <Typography>
                              {fInfo.baggageClaim?.join(' / ') || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign='right'>
                            <Typography fontSize={16} fontWeight='medium'>
                              {getText({ en: 'Gate', 'zh-Hans': '登机口' })}
                            </Typography>
                            <Typography>{fInfo.arrivalGate || '-'}</Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          fontSize={16}
                          fontWeight='medium'
                          sx={{ mt: 4 }}
                        >
                          {getText({
                            en: 'Arrival Time',
                            'zh-Hans': '到达时间',
                          })}
                        </Typography>
                        <Grid container display='flex'>
                          <Grid item xs={4}>
                            <Typography fontSize={16}>
                              {getText({ en: 'Scheduled', 'zh-Hans': '计划' })}
                            </Typography>
                            <Typography>
                              {fInfo.scheduledArrivalTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='center'>
                            <Typography fontSize={16}>
                              {getText({ en: 'Estimated', 'zh-Hans': '预计' })}
                            </Typography>
                            <Typography>
                              {fInfo.estimatedArrivalTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='right'>
                            <Typography fontSize={16}>
                              {getText({ en: 'Actual', 'zh-Hans': '实际' })}
                            </Typography>
                            <Typography>
                              {fInfo.actualArrivalTime || '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })()}
            </CardContent>
          ) : loading ? (
            <CardContent>
              <Skeleton />
            </CardContent>
          ) : null}
        </Card>
        {time ? (
          <Typography fontSize={12} sx={{ mt: 2 }}>
            {getText({ en: 'Last Updated at ', 'zh-Hans': '最近更新于 ' })}
            {time.toLocaleString()}
          </Typography>
        ) : null}
      </Container>
    </AppFrame>
  );
}

export default connect(FlightStatusPage);
