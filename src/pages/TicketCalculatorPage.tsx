import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import StationPicker from '../components/StationPicker';
import { MultiLangObject, StationItem } from '../type';
import { useHistory } from 'react-router';
import { connect, ReduxProps } from '../redux';

const operatorWithFareInfo: string[] = [
  'odpt.Operator:Sotetsu',
  'odpt.Operator:YokohamaMunicipal',
  'odpt.Operator:TamaMonorail',
  'odpt.Operator:MIR',
  'odpt.Operator:Yurikamome',
  'odpt.Operator:Tobu',
  'odpt.Operator:Tokyu',
  'odpt.Operator:TWR',
  'odpt.Operator:Seibu',
  'odpt.Operator:Keikyu',
  'odpt.Operator:Keisei',
  'odpt.Operator:TokyoMetro',
  'odpt.Operator:Toei',
];

function TicketCalculatorPage(props: ReduxProps) {
  const history = useHistory();
  const [origin, setOrigin] = useState<StationItem | undefined>();
  const [destination, setDestination] = useState<StationItem | undefined>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='ticket-calculator-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          {getText({
            en: 'Ticket Fare Calculator',
            'zh-Hans': '车票费用计算器',
          })}
        </Typography>
        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              {getText({ en: 'Origin', 'zh-Hans': '出发站' })}
            </Typography>
          </Grid>
          <Grid item>
            {origin ? (
              <Button
                variant='text'
                onClick={() => {
                  setOrigin(undefined);
                }}
              >
                {getText({ en: 'Clear', 'zh-Hans': '清空' })}
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <StationPicker
            title={{ en: 'Select Origin', 'zh-Hans': '选择出发车站' }}
            value={origin}
            operator={
              destination ? [destination.operator] : operatorWithFareInfo
            }
            onChange={(o) => {
              setOrigin(o);
            }}
          />
        </div>

        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              {getText({ en: 'Destination', 'zh-Hans': '到达站' })}
            </Typography>
          </Grid>
          <Grid item>
            {destination ? (
              <Button
                variant='text'
                onClick={() => {
                  setDestination(undefined);
                }}
              >
                {getText({ en: 'Clear', 'zh-Hans': '清空' })}
              </Button>
            ) : null}
          </Grid>
        </Grid>

        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <StationPicker
            title={{ en: 'Select Destination', 'zh-Hans': '选择到达车站' }}
            operator={origin ? [origin.operator] : operatorWithFareInfo}
            value={destination}
            onChange={(d) => {
              setDestination(d);
            }}
          />
        </div>
        <Grid container sx={{ mt: 4 }} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='contained'
              disableElevation
              endIcon={<ChevronRightIcon />}
              disabled={origin && destination ? false : true}
              onClick={() => {
                if (origin && destination) {
                  history.push(
                    `/ticket/calculator/${origin.id}/${destination.id}`
                  );
                }
              }}
            >
              {getText({ en: 'Calculate Fare', 'zh-Hans': '计算车费' })}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default connect(TicketCalculatorPage);
