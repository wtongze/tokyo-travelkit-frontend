import {
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useState } from 'react';
import StationPicker from '../components/StationPicker';
import { StationItem } from '../type';
import { useHistory } from 'react-router';

const OperatorsWithStationTimetable: string[] = [
  'odpt.Operator:Sotetsu',
  'odpt.Operator:YokohamaMunicipal',
  'odpt.Operator:TamaMonorail',
  'odpt.Operator:MIR',
  'odpt.Operator:Yurikamome',
  'odpt.Operator:Tokyu',
  'odpt.Operator:TWR',
  'odpt.Operator:Seibu',
  'odpt.Operator:Keikyu',
  'odpt.Operator:Keisei',
  'odpt.Operator:Keio',
  'odpt.Operator:JR-East',
  'odpt.Operator:TokyoMetro',
  'odpt.Operator:Toei',
];

function StationsInfoPage() {
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [station, setStation] = useState<StationItem>();

  return (
    <div className='stations-info-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          Station Information
        </Typography>
        <Typography variant='subtitle1'>Check timetables here...</Typography>
        <Grid
          container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mt: 4, mb: 2, height: '36px' }}
        >
          <Grid item>
            <Typography fontWeight={'medium'} fontSize={20}>
              Station
            </Typography>
          </Grid>
          <Grid item>
            {station ? (
              <Button
                variant='text'
                onClick={() => {
                  setStation(undefined);
                }}
              >
                Clear
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <StationPicker
            title={{ en: 'Select Station', 'zh-Hans': '选择车站' }}
            value={station}
            onChange={(o) => {
              setStation(o);
            }}
            operator={OperatorsWithStationTimetable}
          />
        </div>
        <Grid container sx={{ mt: 4 }} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='contained'
              disableElevation
              endIcon={<ChevronRightIcon />}
              disabled={station ? false : true}
              onClick={() => {
                if (station) {
                  history.push(
                    `/stations/station-info/${station.id}/timetable`
                  );
                }
              }}
            >
              Get Information
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default StationsInfoPage;
