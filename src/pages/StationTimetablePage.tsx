import {
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Train as TrainIcon } from '@mui/icons-material';
import { API } from '../api';
import { ReduxProps, connect } from '../redux';
import { useEffect, useState } from 'react';
import { MultiLangObject, StationInfo, StationTimetableItem } from '../type';

interface Props {
  stationId: string;
}

function StationTimetablePage(props: Props & ReduxProps) {
  const station = props.stations.find((i) => i.id === props.stationId);
  const [stationDetailInfo, setStationDetailInfo] = useState<StationInfo>();
  const [selected, setSelected] = useState<string>('');
  const [timetable, setTimetable] = useState<StationTimetableItem>();

  useEffect(() => {
    let subscribe = true;

    if (stationDetailInfo === undefined) {
      API.getStationInfo(props.stationId).then((data) => {
        if (data && subscribe) {
          setStationDetailInfo(data);
          if (data.stationTimetable && data.stationTimetable.length > 0) {
            setSelected(data.stationTimetable[0].id);
          }
        }
      });
    }

    if (
      selected !== '' &&
      (timetable === undefined || timetable.id !== selected)
    ) {
      API.getStationTimetable(selected).then((data) => {
        if (data && subscribe) {
          setTimetable(data);
        }
      });
    }

    return () => {
      subscribe = false;
    };
  });

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='station-timetable-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'} sx={{ mb: 4 }}>
          {getText({ en: 'Station Timetable', 'zh-Hans': '车站时刻表' })}
        </Typography>
        {station ? (
          <div>
            <Grid container alignItems='center'>
              <Grid item xs={2} textAlign='center'>
                {station.hasStationIcon ? (
                  <img
                    src={API.getStationIconPath(station.id)}
                    alt={station.stationCode}
                    height={50}
                    style={{ display: 'block', margin: '0 auto' }}
                    loading={'lazy'}
                  />
                ) : station.stationCode ? (
                  <Typography
                    fontWeight={'bold'}
                    fontSize={20}
                    letterSpacing={1}
                  >
                    {station.stationCode}
                  </Typography>
                ) : (
                  <TrainIcon
                    sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
                  />
                )}
              </Grid>
              <Grid item xs={10} sx={{ px: 4 }}>
                <Typography fontWeight={'medium'} fontSize={20}>
                  {getText(station.title)}
                </Typography>
                <Typography fontSize={14} sx={{ mt: -1 }}>
                  {getText(station.operatorTitle)} -{' '}
                  {getText(station.railwayTitle)}
                </Typography>
              </Grid>
            </Grid>

            {stationDetailInfo ? (
              stationDetailInfo.stationTimetable ? (
                <div>
                  <Select
                    sx={{ mt: '16px', backgroundColor: 'white' }}
                    value={selected}
                    onChange={(e) => {
                      setTimetable(undefined);
                      setSelected(e.target.value);
                    }}
                    fullWidth
                    size='small'
                  >
                    {stationDetailInfo.stationTimetable.map((t, i) => (
                      <MenuItem
                        value={t.id}
                        key={t.id}
                        sx={{ display: 'block', py: 2 }}
                      >
                        <Chip
                          size='small'
                          label={getText(t.calendarTitle)}
                          sx={{ borderRadius: 1 }}
                          color={i % 2 === 0 ? 'primary' : 'secondary'}
                        />
                        <Typography fontWeight={'medium'} sx={{ mt: 1 }}>
                          {getText(t.railDirectionTitle)}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {timetable && timetable.stationTimetableObject ? (
                    <List
                      sx={{ mt: 4, mx: -4, backgroundColor: 'white', pt: 0 }}
                    >
                      <Divider />
                      {timetable.stationTimetableObject.map(
                        (item, index, arr) => (
                          <div key={index}>
                            <ListItem>
                              <Grid container>
                                <Grid item xs={2} textAlign='center'>
                                  <Typography
                                    fontWeight={'medium'}
                                    fontSize={20}
                                    letterSpacing={1}
                                  >
                                    {item.departureTime}
                                  </Typography>
                                </Grid>
                                <Grid item xs={10} sx={{ px: 4 }}>
                                  <div style={{ display: 'flex' }}>
                                    <Chip
                                      label={getText(item.trainTypeTitle)}
                                      size='small'
                                      sx={{ borderRadius: 1 }}
                                    />
                                    {item.trainName ? (
                                      <Typography>
                                        {item.trainName
                                          .map((i) => getText(i))
                                          .join(' / ')}
                                      </Typography>
                                    ) : null}
                                  </div>
                                  {item.destinationStation
                                    ? item.destinationStation.map((i) => {
                                        const dest = props.stations.find(
                                          (j) => i.id === j.id
                                        );
                                        return (
                                          <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              marginTop: 6,
                                            }}
                                            key={i.id}
                                          >
                                            {dest ? (
                                              <div
                                                style={{
                                                  marginRight:
                                                    dest.hasStationIcon ||
                                                    dest.stationCode
                                                      ? 8
                                                      : undefined,
                                                }}
                                              >
                                                {dest.hasStationIcon ? (
                                                  <img
                                                    src={API.getStationIconPath(
                                                      dest.id
                                                    )}
                                                    alt={dest.stationCode}
                                                    height={25}
                                                    style={{
                                                      display: 'block',
                                                      margin: '0 auto',
                                                    }}
                                                    loading={'lazy'}
                                                  />
                                                ) : dest.stationCode ? (
                                                  <Typography
                                                    fontSize={20}
                                                    letterSpacing={1}
                                                  >
                                                    {dest.stationCode}
                                                  </Typography>
                                                ) : null}
                                              </div>
                                            ) : null}
                                            <Typography
                                              fontSize={20}
                                              fontWeight={'medium'}
                                            >
                                              {getText(i.stationTitle)}
                                            </Typography>
                                          </div>
                                        );
                                      })
                                    : null}
                                </Grid>
                              </Grid>
                            </ListItem>
                            {index !== arr.length - 1 ? <Divider /> : null}
                          </div>
                        )
                      )}
                    </List>
                  ) : null}
                </div>
              ) : null
            ) : null}
            <Typography fontSize={12} sx={{ mt: 2 }}>
              {getText({ en: 'Last Updated at ', 'zh-Hans': '最近更新于 ' })}
              {new Date(station.dcDate).toLocaleString()}
            </Typography>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default connect(StationTimetablePage);
