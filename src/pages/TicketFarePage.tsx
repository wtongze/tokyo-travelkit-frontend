import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  Train as TrainIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useHistory, useRouteMatch } from 'react-router';
import AppFrame from '../components/AppFrame';
import { useEffect, useState } from 'react';
import { MultiLangObject, RailwayFareInfo } from '../type';
import { API } from '../api';
import { connect, ReduxProps } from '../redux';

function TicketFarePage(props: ReduxProps) {
  const history = useHistory();
  const match = useRouteMatch<{ from: string; to: string }>();
  const [fareInfo, setFareInfo] = useState<RailwayFareInfo[]>();
  const { from, to } = match.params;
  const fromInfo = props.stations.find((i) => i.id === from);
  const toInfo = props.stations.find((i) => i.id === to);

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  useEffect(() => {
    let subscribe = true;

    if (fareInfo === undefined) {
      API.getRailwayFareInformation(from, to).then((data) => {
        if (data && subscribe) {
          setFareInfo(data);
        }
      });
    }

    return () => {
      subscribe = false;
    };
  });

  return (
    <div className='ticket-fare-page'>
      <AppFrame
        hideBottomNav
        title={{ en: 'Ticket Fare Information', 'zh-Hans': '票价信息' }}
        prevIcon={<ChevronLeftIcon />}
        onPrev={() => history.push('/ticket/calculator')}
        tabs={[]}
      >
        <Container sx={{ padding: 4 }}>
          <Typography variant='h5' sx={{ mb: 4 }}>
            {getText({ en: 'Fare Information', 'zh-Hans': '票价信息' })}
          </Typography>
          {fromInfo && toInfo ? (
            <Grid container sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Grid container alignItems='center'>
                  <Grid item xs={2} textAlign='center'>
                    {fromInfo.hasStationIcon ? (
                      <img
                        src={API.getStationIconPath(fromInfo.id)}
                        alt={fromInfo.stationCode}
                        height={50}
                        style={{ display: 'block', margin: '0 auto' }}
                        loading={'lazy'}
                      />
                    ) : fromInfo.stationCode ? (
                      <Typography
                        fontWeight={'bold'}
                        fontSize={20}
                        letterSpacing={1}
                      >
                        {fromInfo.stationCode}
                      </Typography>
                    ) : (
                      <TrainIcon
                        sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={10} sx={{ px: 4 }}>
                    <Typography fontWeight={'medium'} fontSize={20}>
                      {getText(fromInfo.title)}
                    </Typography>
                    <Typography fontSize={14} sx={{ mt: -1 }}>
                      {getText(fromInfo.operatorTitle)} -{' '}
                      {getText(fromInfo.railwayTitle)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} textAlign='center' sx={{ py: 1 }}>
                <ArrowDownwardIcon sx={{ verticalAlign: 'middle' }} />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems='center'>
                  <Grid item xs={2} textAlign='center'>
                    {toInfo.hasStationIcon ? (
                      <img
                        src={API.getStationIconPath(toInfo.id)}
                        alt={toInfo.stationCode}
                        height={50}
                        style={{ display: 'block', margin: '0 auto' }}
                        loading={'lazy'}
                      />
                    ) : toInfo.stationCode ? (
                      <Typography
                        fontWeight={'bold'}
                        fontSize={20}
                        letterSpacing={1}
                      >
                        {toInfo.stationCode}
                      </Typography>
                    ) : (
                      <TrainIcon
                        sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={10} sx={{ px: 4 }}>
                    <Typography fontWeight={'medium'} fontSize={20}>
                      {getText(toInfo.title)}
                    </Typography>
                    <Typography fontSize={14} sx={{ mt: -1 }}>
                      {getText(toInfo.operatorTitle)} -{' '}
                      {getText(toInfo.railwayTitle)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          <Grid container>
            {fareInfo
              ? fareInfo.map((f) => (
                  <Grid item xs={12} key={f.id} sx={{ mb: 4 }}>
                    <Card elevation={0} sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant='h6'>
                          {getText(f.operatorTitle)}
                        </Typography>
                        {f.viaStation ? (
                          <Typography>
                            {getText({ en: 'via', 'zh-Hans': '经由' })}:{' '}
                            {f.viaStation
                              .map((i) => getText(i.stationTitle))
                              .join(', ')}
                          </Typography>
                        ) : null}
                        {f.viaRailway ? (
                          <Typography>
                            {getText({ en: 'via', 'zh-Hans': '经由' })}:{' '}
                            {f.viaRailway
                              .map((i) => getText(i.railwayTitle))
                              .join(', ')}
                          </Typography>
                        ) : null}
                        <Grid container sx={{ mt: 4 }}>
                          <Grid item xs={6}>
                            <Typography fontWeight={'bold'}>
                              {getText({ en: 'Adult', 'zh-Hans': '成人' })}
                            </Typography>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography>
                                  {getText({
                                    en: 'Ticket Fare',
                                    'zh-Hans': '车票票价',
                                  })}
                                  : <br /> {`¥ ${f.ticketFare}`}
                                </Typography>
                                {f.icCardFare ? (
                                  <Typography sx={{ mt: 2 }}>
                                    {getText({
                                      en: 'IC Card Fare',
                                      'zh-Hans': 'IC 卡票价',
                                    })}
                                    : <br /> {`¥ ${f.icCardFare}` || '-'}
                                  </Typography>
                                ) : null}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight={'bold'}>
                              {getText({ en: 'Child', 'zh-Hans': '儿童' })}
                            </Typography>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography>
                                  {getText({
                                    en: 'Ticket Fare',
                                    'zh-Hans': '车票票价',
                                  })}
                                  : <br /> {`¥ ${f.childTicketFare}` || '-'}
                                </Typography>
                                {f.icCardFare ? (
                                  <Typography sx={{ mt: 2 }}>
                                    {getText({
                                      en: 'IC Card Fare',
                                      'zh-Hans': 'IC 卡票价',
                                    })}
                                    : <br /> {`¥ ${f.childIcCardFare}` || '-'}
                                  </Typography>
                                ) : null}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Container>
      </AppFrame>
    </div>
  );
}

export default connect(TicketFarePage);
