import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import StationPicker from '../components/StationPicker';
import { MultiLangObject, StationItem } from '../type';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { MobileTimePicker } from '@mui/lab';
import jaLocale from 'date-fns/locale/ja';
import OperatorPicker from '../components/OperatorPicker';
import { connect, ReduxProps } from '../redux';

const OperatorsWithTrainTimetable: string[] = [
  'odpt.Operator:Sotetsu',
  'odpt.Operator:YokohamaMunicipal',
  'odpt.Operator:TamaMonorail',
  'odpt.Operator:TWR',
  'odpt.Operator:JR-East',
  'odpt.Operator:TokyoMetro',
  'odpt.Operator:Toei',
];

const calendarList = [
  { en: 'Weekday', ja: '平日' },
  { en: 'Saturday and Holiday', ja: '土休日' },
];

function DirectionPage(props: ReduxProps) {
  const [origin, setOrigin] = useState<StationItem>();
  const [destination, setDestination] = useState<StationItem>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();

  const [timeMode, setTimeMode] = useState(0);
  const [time, setTime] = useState(new Date());
  const [calendar, setCalendar] = useState(0);
  const [operatorPref, setOperatorPref] = useState<{
    [operator: string]: boolean;
  }>({
    Sotetsu: true,
    YokohamaMunicipal: true,
    TamaMonorail: true,
    MIR: true,
    TWR: true,
    'JR-East': true,
    TokyoMetro: true,
    Toei: true,
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
    <div className='direction-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5'>
          {getText({ en: 'Direction', 'zh-Hans': '路径搜索' })}
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
              {getText({ en: 'Origin Station', 'zh-Hans': '出发车站' })}
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
            title={{ en: 'Select Origin Station', 'zh-Hans': '选择出发车站' }}
            value={origin}
            onChange={(o) => {
              setOrigin(o);
            }}
            operator={OperatorsWithTrainTimetable}
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
              {getText({ en: 'Destination Station', 'zh-Hans': '到达车站' })}
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
            title={{
              en: 'Select Destination Station',
              'zh-Hans': '选择到达车站',
            }}
            value={destination}
            onChange={(o) => {
              setDestination(o);
            }}
            operator={OperatorsWithTrainTimetable}
          />
        </div>
        <Typography fontWeight={'medium'} fontSize={20} sx={{ mt: 4, mb: 2 }}>
          {getText({ en: 'Calendar', 'zh-Hans': '日历' })}
        </Typography>
        <Select
          value={calendar}
          onChange={(e) => {
            setCalendar(e.target.value as number);
          }}
          fullWidth
          sx={{ fontFamily: 'inherit', backgroundColor: 'white' }}
          size='small'
        >
          {calendarList.map((c, i) => (
            <MenuItem key={i} value={i}>
              {getText(c)}
            </MenuItem>
          ))}
        </Select>
        <Typography fontWeight={'medium'} fontSize={20} sx={{ mt: 4, mb: 2 }}>
          {getText({ en: 'Time', 'zh-Hans': '时间' })}
        </Typography>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <Select
              value={timeMode}
              onChange={(e) => {
                setTimeMode(e.target.value as number);
              }}
              fullWidth
              sx={{ fontFamily: 'inherit', backgroundColor: 'white' }}
              size='small'
            >
              <MenuItem value={0}>
                {getText({ en: 'Depart at', 'zh-Hans': '出发时间' })}
              </MenuItem>
              <MenuItem value={1}>
                {getText({ en: 'Arrive by', 'zh-Hans': '到达时间' })}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={jaLocale}
            >
              <MobileTimePicker
                value={time}
                onChange={(v) => {
                  if (v) {
                    setTime(v);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    size='small'
                    fullWidth
                    sx={{
                      backgroundColor: 'white',
                      fontFamily: 'inherit',
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'inherit',
                      },
                      '& .MuiOutlinedInput-input': {
                        cursor: 'pointer',
                      },
                    }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Typography fontSize={20} fontWeight={'medium'} sx={{ mt: 4, mb: 2 }}>
          {getText({ en: 'Operator Preference', 'zh-Hans': '运营公司偏好' })}
        </Typography>
        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <OperatorPicker
            value={operatorPref}
            onChange={(v) => {
              setOperatorPref(v);
            }}
          />
        </div>
        <Grid container sx={{ mt: 4 }} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='contained'
              disableElevation
              endIcon={<ChevronRightIcon />}
              disabled={
                origin &&
                destination &&
                timeMode !== undefined &&
                time !== undefined &&
                operatorPref
                  ? false
                  : true
              }
              onClick={() => {
                if (origin && destination) {
                  const params: any = {
                    calendar: calendar === 0 ? 'weekday' : 'saturdayHoliday',
                    ...operatorPref,
                  };
                  if (timeMode === 0) {
                    params.fromTime = time.toTimeString().slice(0, 5);
                  } else {
                    params.toTime = time.toTimeString().slice(0, 5);
                  }
                  const query = new URLSearchParams(params);
                  history.push(
                    `/direction/${origin.id}/${
                      destination.id
                    }?${query.toString()}`
                  );
                }
              }}
            >
              {getText({ en: 'Get Direction', 'zh-Hans': '获取路线' })}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default connect(DirectionPage);
