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
import { ArrivalInformationItem, DepartureInformationItem } from '../type';
import { API } from '../api';

function FlightStatusPage() {
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

  useEffect(() => {
    let subscribe = true;

    const setData = (
      data: DepartureInformationItem | ArrivalInformationItem | undefined
    ) => {
      if (data !== undefined && subscribe) {
        setFlightInfo(data);
      }
    };

    if (flightInfo === undefined) {
      if (direction === 'departure') {
        API.getDepartureFlightInformation(flightId).then(setData);
      } else {
        API.getArrivalFlightInformation(flightId).then(setData);
      }
    }

    return () => {
      subscribe = false;
    };
  });

  return (
    <AppFrame
      title={'Flight Status'}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push(`/flight/${airportCode}/${direction}`)}
      hideBottomNav
    >
      <Container>
        <Card sx={{ mt: 4, borderRadius: 2 }}>
          {flightInfo ? (
            <CardContent>
              <Typography sx={{mb: -1}}>{flightInfo.airline?.title?.en}</Typography>
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
                  <Chip
                    size='small'
                    sx={{
                      borderRadius: '6px',
                      fontWeight: 'medium',
                      fontSize: '1rem',
                      color: 'white',
                    }}
                    label={flightInfo.flightStatus?.title?.en}
                    color={'info'}
                  ></Chip>
                </Grid>
              </Grid>
              <Typography fontSize={18}>
                ({flightInfo.flightNumber.slice(1).join(' / ')})
              </Typography>
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
                              {fInfo.departureAirport.title?.en}
                            </Typography>
                            <Typography fontSize={18}>
                              ({fInfo.departureAirportTerminal?.title?.en})
                            </Typography>
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={5} textAlign='right'>
                            <Typography fontSize={18} fontWeight='medium'>
                              {fInfo.destinationAirport?.title?.en}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container display='flex' sx={{ mt: 6 }}>
                          <Grid item xs={6}>
                            <Typography fontSize={16} fontWeight='medium'>
                              Check-In Counter
                            </Typography>
                            <Typography>
                              {fInfo.checkInCounter?.join(' / ') || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign='right'>
                            <Typography fontSize={16} fontWeight='medium'>
                              Gate
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
                          Departure Time
                        </Typography>
                        <Grid container display='flex'>
                          <Grid item xs={4}>
                            <Typography fontSize={16}>Scheduled</Typography>
                            <Typography>
                              {fInfo.scheduledDepartureTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='center'>
                            <Typography fontSize={16}>Estimated</Typography>
                            <Typography>
                              {fInfo.estimatedDepartureTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='right'>
                            <Typography fontSize={16}>Actual</Typography>
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
                              {fInfo.originAirport?.title?.en}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={5} textAlign='right'>
                            <Typography fontSize={18} fontWeight='medium'>
                              {fInfo.arrivalAirport.title?.en}
                            </Typography>
                            <Typography fontSize={18}>
                              ({fInfo.arrivalAirportTerminal?.title?.en})
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container display='flex' sx={{ mt: 6 }}>
                          <Grid item xs={6}>
                            <Typography fontSize={16} fontWeight='medium'>
                              Baggage Claim
                            </Typography>
                            <Typography>
                              {fInfo.baggageClaim?.join(' / ') || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign='right'>
                            <Typography fontSize={16} fontWeight='medium'>
                              Gate
                            </Typography>
                            <Typography>{fInfo.arrivalGate || '-'}</Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          fontSize={16}
                          fontWeight='medium'
                          sx={{ mt: 4 }}
                        >
                          Arrival Time
                        </Typography>
                        <Grid container display='flex'>
                          <Grid item xs={4}>
                            <Typography fontSize={16}>Scheduled</Typography>
                            <Typography>
                              {fInfo.scheduledArrivalTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='center'>
                            <Typography fontSize={16}>Estimated</Typography>
                            <Typography>
                              {fInfo.estimatedArrivalTime || '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} textAlign='right'>
                            <Typography fontSize={16}>Actual</Typography>
                            <Typography>
                              {fInfo.actualArrivalTime || '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })()}
            </CardContent>
          ) : (
            <CardContent>
              <Skeleton></Skeleton>
            </CardContent>
          )}
        </Card>
      </Container>
    </AppFrame>
  );
}

export default FlightStatusPage;
