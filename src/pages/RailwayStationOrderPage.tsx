import {
  Typography,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material';
import { API } from '../api';
import { ReduxProps, connect } from '../redux';
import { MultiLangObject, RailwayInfo } from '../type';
import { useState, useEffect } from 'react';
import { Train as TrainIcon } from '@mui/icons-material';
import { sortBy } from 'lodash';

interface Props {
  railwayId: string;
}

function RailwayStationOrderPage(props: Props & ReduxProps) {
  const railway = props.railways.find((i) => i.id === props.railwayId);
  const [railwayDetailInfo, setRailwayDetailInfo] = useState<RailwayInfo>();
  const [selected, setSelected] = useState('ascending');

  useEffect(() => {
    let subscribe = true;

    if (railwayDetailInfo === undefined) {
      API.getRailwayInfo(props.railwayId).then((data) => {
        if (data && subscribe) {
          setRailwayDetailInfo(data);
          setSelected('ascending');
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
    <div className='railway-station-order-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'} sx={{ mb: 4 }}>
          {getText({ en: 'Railway Station Order', 'zh-Hans': '线路站点顺序' })}
        </Typography>
        {railway ? (
          <div>
            <Grid container alignItems='center'>
              <Grid item xs={2} textAlign='center'>
                {railway.lineCode || railway.color ? (
                  <Grid container alignItems='center' wrap='nowrap'>
                    {railway.color ? (
                      <Grid item xs={5}>
                        <div
                          style={{
                            width: '15px',
                            height: '50px',
                            backgroundColor: railway.color,
                          }}
                        ></div>
                      </Grid>
                    ) : null}
                    <Grid item flexGrow={1} textAlign='center'>
                      <Typography
                        fontWeight={'bold'}
                        fontSize={20}
                        letterSpacing={1}
                      >
                        {railway.lineCode}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <TrainIcon
                    sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
                  />
                )}
              </Grid>
              <Grid item xs={10} sx={{ px: 4 }} textAlign='left'>
                <Typography
                  fontWeight={'medium'}
                  fontSize={20}
                  lineHeight={1.25}
                >
                  {getText(railway.title)}
                </Typography>
                <Typography fontSize={14} sx={{ mt: 1 }}>
                  {getText(railway.operatorTitle)}
                </Typography>
              </Grid>
            </Grid>

            {railwayDetailInfo ? (
              railwayDetailInfo.stationOrder.length > 0 ? (
                <div>
                  <Select
                    sx={{ mt: '16px', backgroundColor: 'white' }}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    fullWidth
                    size='small'
                  >
                    <MenuItem
                      value={'ascending'}
                      sx={{ display: 'block', py: 2 }}
                    >
                      <Typography fontWeight={'medium'} sx={{ mt: 1 }}>
                        {getText(railwayDetailInfo.ascendingRailDirectionTitle)}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value={'descending'}
                      sx={{ display: 'block', py: 2 }}
                    >
                      <Typography fontWeight={'medium'} sx={{ mt: 1 }}>
                        {getText(
                          railwayDetailInfo.descendingRailDirectionTitle
                        )}
                      </Typography>
                    </MenuItem>
                  </Select>
                  <List sx={{ mt: 4, mx: -4, backgroundColor: 'white', pt: 0 }}>
                    <Divider />
                    {(selected === 'ascending'
                      ? sortBy(railwayDetailInfo.stationOrder, 'index')
                      : sortBy(
                          railwayDetailInfo.stationOrder,
                          'index'
                        ).reverse()
                    ).map((item, index, arr) => {
                      const station = props.stations.find(
                        (i) => i.id === item.station
                      );
                      return (
                        <div key={index}>
                          <ListItem>
                            {station !== undefined ? (
                              <Grid container alignItems='center'>
                                <Grid item xs={2} textAlign='center'>
                                  {station.hasStationIcon ? (
                                    <img
                                      src={API.getStationIconPath(station.id)}
                                      alt={station.stationCode}
                                      height={50}
                                      style={{
                                        display: 'block',
                                        margin: '0 auto',
                                      }}
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
                                      sx={{
                                        verticalAlign: 'middle',
                                        fontSize: '1.75rem',
                                      }}
                                    />
                                  )}
                                </Grid>
                                <Grid
                                  item
                                  xs={10}
                                  sx={{ px: 4 }}
                                  textAlign='left'
                                >
                                  <Typography
                                    fontWeight={'medium'}
                                    fontSize={20}
                                    lineHeight={1.25}
                                  >
                                    {getText(station.title)}
                                  </Typography>
                                  <Typography fontSize={14} sx={{ mt: 1 }}>
                                    {getText(station.operatorTitle)} -{' '}
                                    {getText(station.railwayTitle)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container alignItems='center'>
                                <Grid item xs={2} textAlign='center'>
                                  <TrainIcon
                                    sx={{
                                      verticalAlign: 'middle',
                                      fontSize: '1.75rem',
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={10}
                                  sx={{ px: 4 }}
                                  textAlign='left'
                                >
                                  <Typography fontSize={20}>
                                    {getText(item.title)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          </ListItem>
                          {index !== arr.length - 1 ? <Divider /> : null}
                        </div>
                      );
                    })}
                  </List>
                </div>
              ) : null
            ) : null}
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default connect(RailwayStationOrderPage);
