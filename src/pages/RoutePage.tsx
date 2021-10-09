import AppFrame from '../components/AppFrame';
import {
  ChevronLeft as ChevronLeftIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import { useHistory, useParams } from 'react-router';
import { Container, Grid, Typography, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import routeTest from './RouteTest.json';
import { DirectionRoute } from '../type';
import { connect, ReduxProps } from '../redux';
import { API } from '../api';

function RoutePage(props: ReduxProps) {
  const history = useHistory();
  const params = useParams<{ origin: string; destination: string }>();
  const [route, setRoute] = useState<DirectionRoute>();

  const { origin, destination } = params;
  const mode = 'all';
  const fromTime = '14:00';

  useEffect(() => {
    let subscribe = true;

    setTimeout(() => {
      console.log(origin, destination, fromTime, mode);
      if (route === undefined && subscribe) {
        setRoute(routeTest as DirectionRoute);
      }
    }, 1000);

    return () => {
      subscribe = false;
    };
  });

  return (
    <div className='route-page'>
      <AppFrame
        hideBottomNav
        title={'Routes'}
        prevIcon={<ChevronLeftIcon />}
        onPrev={() => {
          history.push('/direction');
        }}
        backgroundColor={'#f1f3f5'}
      >
        <Container sx={{ padding: 4 }}>
          <Typography variant='h5'>Route Page</Typography>
          {route?.directions.map((r, i) => {
            if (r.type === 'START_TRANSFER') {
              const station = props.stations.find((i) => i.id === r.from);
              return (
                <div className='start-transfer' key={i}>
                  <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={2} textAlign='center'>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {r.fromTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <div
                        style={{
                          backgroundColor: 'grey',
                          width: '16px',
                          height: '100%',
                          borderRadius: '8px',
                          margin: '0 auto',
                        }}
                      ></div>
                    </Grid>
                    <Grid item xs={9} sx={{ px: 4 }}>
                      {station ? (
                        <div>
                          <Typography fontWeight={'bold'} fontSize={20}>
                            {station.title?.en}
                          </Typography>
                          {station.hasStationIcon ? (
                            <img
                              src={API.getStationIconPath(station.id)}
                              alt={station.stationCode}
                              height={25}
                              style={{ display: 'block' }}
                              loading={'lazy'}
                            />
                          ) : station.stationCode ? (
                            <Typography letterSpacing={1}>
                              {station.stationCode}
                            </Typography>
                          ) : (
                            <TrainIcon
                              sx={{
                                verticalAlign: 'middle',
                                fontSize: '1.75rem',
                              }}
                            />
                          )}
                        </div>
                      ) : null}
                      <Typography
                        fontWeight={'medium'}
                        fontSize={18}
                        sx={{ my: 6 }}
                      >
                        Transfer
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              );
            } else if (r.type === 'TRAIN') {
              const fromStation = props.stations.find((i) => i.id === r.from);
              const fromRailway = props.railways.find(
                (i) => i.id === fromStation?.railway
              );
              const toStation = props.stations.find((i) => i.id === r.to);
              const toRailway = props.railways.find(
                (i) => i.id === toStation?.railway
              );

              return (
                <div className='train' key={i}>
                  <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={2} textAlign='center'>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {r.fromTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <div
                        style={{
                          backgroundColor: fromRailway?.color || 'grey',
                          width: '16px',
                          height: '100%',
                          borderRadius: '8px 8px 0 0',
                          margin: '0 auto',
                        }}
                      ></div>
                    </Grid>
                    <Grid item xs={9} sx={{ px: 4 }}>
                      {fromStation ? (
                        <div>
                          <Typography fontWeight={'bold'} fontSize={20}>
                            {fromStation.title?.en}
                          </Typography>
                          {fromStation.hasStationIcon ? (
                            <img
                              src={API.getStationIconPath(fromStation.id)}
                              alt={fromStation.stationCode}
                              height={25}
                              style={{ display: 'block' }}
                              loading={'lazy'}
                            />
                          ) : fromStation.stationCode ? (
                            <Typography letterSpacing={1}>
                              {fromStation.stationCode}
                            </Typography>
                          ) : (
                            <TrainIcon
                              sx={{
                                verticalAlign: 'middle',
                                fontSize: '1.75rem',
                              }}
                            />
                          )}
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={1}>
                      <div
                        style={{
                          backgroundColor: fromRailway?.color || 'grey',
                          width: '16px',
                          height: '100%',
                          margin: '0 auto',
                        }}
                      ></div>
                    </Grid>
                    <Grid item xs={9} sx={{ px: 4, pt: 2, pb: 4 }}>
                      <Chip
                        label={r.trainTimetable.trainTypeTitle?.en}
                        size='small'
                        sx={{
                          borderRadius: 1,
                          fontWeight: 'medium',
                          fontSize: '14px',
                        }}
                      />
                      <Typography sx={{ mt: 1 }}>
                        {r.trainTimetable.railDirectionTitle?.en}
                      </Typography>
                      <Typography fontWeight={'bold'} fontSize={18}>
                        For{' '}
                        {(() => {
                          if (r.trainTimetable.destinationStation) {
                            const destinations =
                              r.trainTimetable.destinationStation.map((s) =>
                                props.stations.find((k) => k.id === s)
                              );
                            return destinations
                              .filter((i) => i !== undefined)
                              .map((i) => i?.title?.en)
                              .join(' / ');
                          } else {
                            return null;
                          }
                        })()}
                      </Typography>
                      {r.trainTimetable.trainOwnerTitle ? (
                        <Typography>
                          Operated by {r.trainTimetable.trainOwnerTitle.en}
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} textAlign='center' alignSelf={'flex-end'}>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {r.toTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <div
                        style={{
                          backgroundColor: toRailway?.color || 'grey',
                          width: '16px',
                          height: '100%',
                          borderRadius: '0 0 8px 8px',
                          margin: '0 auto',
                        }}
                      ></div>
                    </Grid>
                    <Grid item xs={9} sx={{ px: 4 }}>
                      {toStation ? (
                        <div>
                          <Typography fontWeight={'bold'} fontSize={20}>
                            {toStation.title?.en}
                          </Typography>
                          {toStation.hasStationIcon ? (
                            <img
                              src={API.getStationIconPath(toStation.id)}
                              alt={toStation.stationCode}
                              height={25}
                              style={{ display: 'block' }}
                              loading={'lazy'}
                            />
                          ) : toStation.stationCode ? (
                            <Typography letterSpacing={1}>
                              {toStation.stationCode}
                            </Typography>
                          ) : (
                            <TrainIcon
                              sx={{
                                verticalAlign: 'middle',
                                fontSize: '1.75rem',
                              }}
                            />
                          )}
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              );
            }
            if (r.type === 'TRANSFER') {
              return (
                <div className='transfer' key={i}>
                  <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={1}>
                      <div
                        style={{
                          backgroundColor: 'grey',
                          width: '16px',
                          height: '100%',
                          borderRadius: '8px',
                          margin: '0 auto',
                        }}
                      ></div>
                    </Grid>
                    <Grid item xs={9} sx={{ px: 4 }}>
                      <Typography
                        fontWeight={'medium'}
                        fontSize={18}
                        sx={{ my: 6 }}
                      >
                        Transfer
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              );
            }
            if (r.type === 'END_TRANSFER') {
              const station = props.stations.find((i) => i.id === r.to);
              return (
                <div className='end-transfer' key={i}>
                  <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={2} textAlign='center' alignSelf='flex-end'>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {r.toTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <div
                        style={{
                          backgroundColor: 'grey',
                          width: '16px',
                          height: '100%',
                          borderRadius: '8px',
                          margin: '0 auto',
                        }}
                      ></div>
                    </Grid>
                    <Grid item xs={9} sx={{ px: 4 }} >
                      <Typography
                        fontWeight={'medium'}
                        fontSize={18}
                        sx={{ my: 6 }}
                      >
                        Transfer
                      </Typography>
                      {station ? (
                        <div>
                          <Typography fontWeight={'bold'} fontSize={20}>
                            {station.title?.en}
                          </Typography>
                          {station.hasStationIcon ? (
                            <img
                              src={API.getStationIconPath(station.id)}
                              alt={station.stationCode}
                              height={25}
                              style={{ display: 'block' }}
                              loading={'lazy'}
                            />
                          ) : station.stationCode ? (
                            <Typography letterSpacing={1}>
                              {station.stationCode}
                            </Typography>
                          ) : (
                            <TrainIcon
                              sx={{
                                verticalAlign: 'middle',
                                fontSize: '1.75rem',
                              }}
                            />
                          )}
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              );
            } else {
              return null;
            }
          })}
        </Container>
      </AppFrame>
    </div>
  );
}

export default connect(RoutePage);
