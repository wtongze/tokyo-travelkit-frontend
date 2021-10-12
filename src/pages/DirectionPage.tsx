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
import { StationItem } from '../type';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { MobileTimePicker } from '@mui/lab';
import jaLocale from 'date-fns/locale/ja';
import OperatorPicker from '../components/OperatorPicker';

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

function DirectionPage() {
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

  return (
    <div className='direction-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5'>Direction</Typography>
        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              Origin Station
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
                Clear
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
              Destination Station
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
                Clear
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
          Calendar
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
              {c.en}
            </MenuItem>
          ))}
        </Select>
        <Typography fontWeight={'medium'} fontSize={20} sx={{ mt: 4, mb: 2 }}>
          Time
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
              <MenuItem value={0}>Depart at</MenuItem>
              <MenuItem value={1}>Arrive by</MenuItem>
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
          Operator Preference
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
              Get Direction
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DirectionPage;
