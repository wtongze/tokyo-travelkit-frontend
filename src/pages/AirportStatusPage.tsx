import { ListItem, List, Typography, Grid, Chip, Divider } from '@mui/material';
import AppFrame from '../components/AppFrame';
import { useHistory, useRouteMatch } from 'react-router';
import {
  ChevronLeft as ChevronLeftIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';

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

interface FlightInformationDeparture {
  id: string;
  operator: string;
  airline?: string;
  flightNumber: string[];
  flightStatus?: string;
  flightInformationSummary?: object;
  flightInformationText?: object;
  scheduledDepartureTime?: string;
  estimatedDepartureTime?: string;
  actualDepartureTime?: string;
  departureAirport: AirportInfo;
  departureAirportTerminal?: string;
  departureGate?: string;
  checkInCounter?: string[];
  destinationAirport?: AirportInfo;
  viaAirport?: AirportInfo[];
  aircraftType?: string;
}

interface FlightInformationArrival {
  id: string;
  operator: string;
  airline?: string;
  flightNumber: string[];
  flightStatus?: string;
  flightInformationSummary?: object;
  flightInformationText?: object;
  scheduledArrivalTime?: string;
  estimatedArrivalTime?: string;
  actualArrivalTime?: string;
  arrivalAirport: AirportInfo;
  arrivalAirportTerminal?: string;
  arrivalGate?: string;
  baggageClaim?: string;
  originAirport?: AirportInfo;
  viaAirport?: AirportInfo[];
  aircraftType?: string;
}

function AirportStatusPage() {
  const match = useRouteMatch<{
    airportCode: string;
    direction: 'departure' | 'arrival';
  }>();
  const history = useHistory();
  const { airportCode, direction } = match.params;

  const [airportInfo, setAirportInfo] = useState({ label: '', value: '' });
  const [flights, setFlights] = useState<
    (FlightInformationDeparture | FlightInformationArrival)[]
  >([]);

  useEffect(() => {
    let subscribe = true;
    setTimeout(() => {
      const airportInfo = {
        label: 'Narita',
        value: 'NRT',
      };
      const arrivalFlights = [
        {
          id: 'odpt.FlightInformationArrival:HND-TIAT.HND.HA863',
          airline: 'Hawaiian Airlines',
          operator: 'Tokyo International Air Terminal',
          flightNumber: ['HA863', 'JL6415'],
          flightStatus: 'Cancelled',
          originAirport: {
            label: 'Honolulu',
            value: 'HNL',
          },
          arrivalAirport: {
            label: 'Tokyo Haneda',
            value: 'HND',
          },
          scheduledArrivalTime: '17:10',
          arrivalAirportTerminal: 'Terminal 3',
        },
      ];
      const departureFlights = [
        {
          id: 'odpt.FlightInformationDeparture:HND-TIAT.HND.MU576',
          airline: 'China Eastern Airlines',
          operator: 'Tokyo International Air Terminal',
          aircratfType: '359',
          flightNumber: ['MU576', 'JL5791'],
          flightStatus: 'Cancelled',
          checkInCounter: ['L', 'K', 'M'],
          departureAirport: {
            label: 'Tokyo Haneda',
            value: 'HND',
          },
          destinationAirport: {
            label: 'Shanghai Pudong',
            value: 'PVG',
          },
          scheduledDepartureTime: '08:40',
          departureAirportTerminal: 'Terminal 3',
        },
      ];
      if (subscribe) {
        setAirportInfo(airportInfo);
        setFlights(
          direction === 'departure' ? departureFlights : arrivalFlights
        );
      }
    }, 500);
    return () => {
      subscribe = false;
    };
  }, [direction]);

  return (
    <AppFrame
      minimize
      tabs={tabs}
      onChangeTab={(index) => {
        setFlights([]);
        history.push(tabs[index].match.replace(':airportCode', airportCode));
      }}
      title={'Airport Status'}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push('/flight/status')}
    >
      <div style={{ padding: '16px' }}>
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
        <List sx={{ mt: 2, mx: -4 }}>
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
          {direction === 'departure'
            ? flights.map((f) => {
                const flight = f as FlightInformationDeparture;
                return (
                  <div key={flight.id}>
                    <ListItem button>
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
                            {flight.destinationAirport?.label}
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
                            <Chip
                              color={(() => {
                                switch (flight.flightStatus) {
                                  case 'Cancelled':
                                    return 'error';
                                  default:
                                    return undefined;
                                }
                              })()}
                              label={flight.flightStatus}
                              size='small'
                              sx={{
                                borderRadius: '6px',
                                fontWeight: 'medium',
                              }}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })
            : null}
        </List>
      </div>
    </AppFrame>
  );
}

export default AirportStatusPage;
