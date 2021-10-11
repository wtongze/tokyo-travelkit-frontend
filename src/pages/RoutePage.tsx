import AppFrame from '../components/AppFrame';
import {
  ChevronLeft as ChevronLeftIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { useHistory, useLocation, useParams } from 'react-router';
import {
  Container,
  Grid,
  Typography,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DirectionRoute } from '../type';
import { connect, ReduxProps } from '../redux';
import { API } from '../api';

function RoutePage(props: ReduxProps) {
  const history = useHistory();
  const params = useParams<{ origin: string; destination: string }>();
  const location = useLocation();
  const [route, setRoute] = useState<DirectionRoute>();
  const [hideList, setHideList] = useState<boolean[][]>([]);

  const { origin, destination } = params;

  useEffect(() => {
    let subscribe = true;

    const query = new URLSearchParams(location.search.substring(1));
    const operatorPref: { [operator: string]: boolean } = {
      Sotetsu: query.get('Sotetsu') === 'true',
      YokohamaMunicipal: query.get('YokohamaMunicipal') === 'true',
      TamaMonorail: query.get('TamaMonorail') === 'true',
      MIR: query.get('MIR') === 'true',
      TWR: query.get('TWR') === 'true',
      'JR-East': query.get('JR-East') === 'true',
      TokyoMetro: query.get('TokyoMetro') === 'true',
      Toei: query.get('Toei') === 'true',
    };

    const fromTime = query.get('fromTime') || undefined;
    const toTime = query.get('toTime') || undefined;

    if (
      route === undefined &&
      (fromTime !== undefined || toTime !== undefined) &&
      fromTime !== toTime
    ) {
      API.getDirection(
        origin,
        destination,
        fromTime,
        toTime,
        operatorPref
      ).then((data) => {
        if (data && subscribe) {
          setRoute(data);

          let total: boolean[][] = [];
          for (let i = 0; i < data.directions.length; i++) {
            const step = data.directions[i];
            if (step.type === 'TRAIN') {
              if (step.via) {
                const temp: boolean[] = [];

                for (let j = 0; j < step.via.length; j++) {
                  temp.push(true);
                }
                total.push(temp);
              } else {
                total.push([]);
              }
            } else {
              total.push([]);
            }
          }
          setHideList(total);
        }
      });
    }

    return () => {
      subscribe = false;
    };
  }, [route, origin, destination, location.search]);

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
          {(() => {
            if (route && route.time >= 0) {
              const hour = parseInt((route.time / 60).toString());
              const min = parseInt((route.time % 60).toString());
              const searchTime = route.searchTime / 1000;

              return (
                <div>
                  <Typography fontSize={14} sx={{ mt: 1 }}>
                    Search took {searchTime.toFixed(4)} second
                    {searchTime > 1 ? 's' : ''}.
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontWeight={'medium'}
                    sx={{ mt: 4 }}
                  >
                    Total:{' '}
                    {`${hour} hour${hour > 1 ? 's' : ''} ${min} min${
                      min > 1 ? 's' : ''
                    }`}
                  </Typography>
                </div>
              );
            } else {
              return null;
            }
          })()}
          {route ? (
            route.directions.map((r, stepIndex) => {
              if (r.type === 'START_TRANSFER') {
                const station = props.stations.find((i) => i.id === r.from);
                return (
                  <div className='start-transfer' key={stepIndex}>
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
                            height: '16px',
                            borderRadius: '8px',
                            margin: '7px auto',
                          }}
                        ></div>
                        <div
                          style={{
                            width: '8px',
                            height: 'calc(100% - 30px)',
                            margin: '0 auto',
                            borderLeft: '8px dotted grey',
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
                            ) : null}
                          </div>
                        ) : null}
                        <Typography
                          fontWeight={'medium'}
                          fontSize={18}
                          sx={{ my: 6 }}
                        >
                          {(() => {
                            const nextStep =
                              undefined || route.directions[stepIndex + 1];
                            if (
                              nextStep &&
                              // @ts-ignore
                              nextStep.from === r.from
                            ) {
                              return 'Wait';
                            } else {
                              return 'Transfer';
                            }
                          })()}
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
                  <div className='train' key={stepIndex}>
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
                            ) : null}
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
                        <Typography sx={{ mt: 1 }} fontSize={14}>
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
                      </Grid>
                    </Grid>
                    {r.via.map((v, viaIndex) => {
                      const vRailway = props.railways.find(
                        (i) => i.id === v.railwayId
                      );

                      const vNextRailway = props.railways.find((i) =>
                        viaIndex < r.via.length - 1
                          ? i.id === r.via[viaIndex + 1].railwayId
                          : false
                      );

                      let hide = true;
                      if (
                        hideList.length > 0 &&
                        hideList[stepIndex] !== undefined &&
                        hideList[stepIndex][viaIndex] !== undefined
                      ) {
                        hide = hideList[stepIndex][viaIndex];
                      }

                      return v.stops.map((s, stopIndex) => {
                        const stop = props.stations.find((i) => i.id === s);

                        return (
                          <div
                            key={stepIndex + ' ' + viaIndex + '-' + stopIndex}
                          >
                            {stopIndex === 0 ? (
                              <Grid container>
                                <Grid item xs={2} />
                                <Grid item xs={1}>
                                  <div
                                    style={{
                                      backgroundColor:
                                        vRailway?.color || 'grey',
                                      width: '16px',
                                      height: '100%',
                                      margin: '0 auto',
                                    }}
                                  ></div>
                                </Grid>
                                <Grid item xs={9} sx={{ px: 4, py: 3 }}>
                                  <Button
                                    size='small'
                                    variant='text'
                                    endIcon={
                                      hide ? (
                                        <KeyboardArrowDownIcon />
                                      ) : (
                                        <KeyboardArrowUpIcon />
                                      )
                                    }
                                    onClick={() => {
                                      const tempList = [...hideList];
                                      tempList[stepIndex][viaIndex] =
                                        !hideList[stepIndex][viaIndex];
                                      setHideList(tempList);
                                    }}
                                  >
                                    {hide ? 'Show More' : 'Show Less'}
                                  </Button>
                                </Grid>
                              </Grid>
                            ) : null}
                            {hide ? null : (
                              <Grid container>
                                <Grid item xs={2} />
                                <Grid item xs={1}>
                                  <div
                                    style={{
                                      backgroundColor:
                                        vRailway?.color || 'grey',
                                      width: '16px',
                                      height: '100%',
                                      margin: '0 auto',
                                    }}
                                  ></div>
                                </Grid>
                                <Grid item xs={9} sx={{ px: 4, py: 3 }}>
                                  <Typography>{stop?.title?.en}</Typography>
                                  {stop?.hasStationIcon ? (
                                    <img
                                      src={API.getStationIconPath(stop?.id)}
                                      alt={stop?.stationCode}
                                      height={25}
                                      style={{ display: 'block' }}
                                      loading={'lazy'}
                                    />
                                  ) : stop?.stationCode ? (
                                    <Typography letterSpacing={1}>
                                      {stop?.stationCode}
                                    </Typography>
                                  ) : null}
                                </Grid>
                              </Grid>
                            )}
                            {stopIndex === v.stops.length - 1 &&
                            fromRailway?.id !== toRailway?.id ? (
                              <Grid container key={viaIndex + '-' + stopIndex}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={1}>
                                  <div
                                    style={{
                                      backgroundColor:
                                        vRailway?.color || 'grey',
                                      width: '16px',
                                      height: '50%',
                                      margin: '0 auto',
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      backgroundColor:
                                        viaIndex === r.via.length - 1
                                          ? toRailway?.color
                                          : vNextRailway?.color || 'grey',
                                      width: '16px',
                                      height: '50%',
                                      margin: '0 auto',
                                    }}
                                  ></div>
                                </Grid>
                                <Grid item xs={9} sx={{ px: 4, py: 3 }}>
                                  {vNextRailway ? (
                                    <Typography>
                                      Direct service to {vNextRailway.title?.en}{' '}
                                      via {stop?.title?.en}
                                    </Typography>
                                  ) : null}
                                </Grid>
                              </Grid>
                            ) : null}
                          </div>
                        );
                      });
                    })}
                    <Grid container>
                      <Grid
                        item
                        xs={2}
                        textAlign='center'
                        alignSelf={'flex-end'}
                      >
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
                      <Grid item xs={9} sx={{ px: 4, pt: 4 }}>
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
                            ) : null}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  </div>
                );
              }
              if (r.type === 'TRANSFER') {
                return (
                  <div className='transfer' key={stepIndex}>
                    <Grid container sx={{ mt: 4 }}>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={1}>
                        <div
                          style={{
                            width: '8px',
                            height: '100%',
                            margin: '0 auto',
                            borderLeft: '8px dotted gray',
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
                  <div className='end-transfer' key={stepIndex}>
                    <Grid container sx={{ mt: 4 }}>
                      <Grid item xs={2} textAlign='center' alignSelf='flex-end'>
                        <Typography fontSize={20} fontWeight={'bold'}>
                          {r.toTime}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <div
                          style={{
                            width: '8px',
                            height: 'calc(100% - 30px)',
                            margin: '0 auto',
                            borderLeft: '8px dotted grey',
                          }}
                        ></div>
                        <div
                          style={{
                            backgroundColor: 'grey',
                            width: '16px',
                            height: '16px',
                            borderRadius: '8px',
                            margin: '7px auto',
                          }}
                        ></div>
                      </Grid>
                      <Grid item xs={9} sx={{ px: 4 }}>
                        <Typography
                          fontWeight={'medium'}
                          fontSize={18}
                          sx={{ my: 6 }}
                        >
                          {(() => {
                            const nextStep =
                              undefined || route.directions[stepIndex - 1];
                            if (
                              nextStep &&
                              // @ts-ignore
                              nextStep.to === r.to
                            ) {
                              return 'Wait';
                            } else {
                              return 'Transfer';
                            }
                          })()}
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
                            ) : null}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <Alert severity='error' sx={{ mt: 4 }}>
              <Typography>
                Route not found. Please refine the search parameter and try again.
              </Typography>
            </Alert>
          )}
        </Container>
      </AppFrame>
    </div>
  );
}

export default connect(RoutePage);
