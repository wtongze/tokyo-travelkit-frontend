import {
  useMediaQuery,
  Container,
  Typography,
  useTheme,
  Button,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router';
import RailwayPicker from '../components/RailwayPicker';
import { RailwayItem } from '../type';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

function RailwaysInfoPage() {
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [railway, setRailway] = useState<RailwayItem>();

  return (
    <div className='railway-info-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          Railway Information
        </Typography>
        <Typography variant='subtitle1'>
          Check railway routes here...
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
              Railway
            </Typography>
          </Grid>
          <Grid item>
            {railway ? (
              <Button
                variant='text'
                onClick={() => {
                  setRailway(undefined);
                }}
              >
                Clear
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <div style={{ margin: isMobile ? '0 -16px' : undefined }}>
          <RailwayPicker
            title={{ en: 'Select Railway', 'zh-Hans': '选择线路' }}
            value={railway}
            onChange={(o) => {
              setRailway(o);
            }}
          />
        </div>
        <Grid container sx={{ mt: 4 }} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='contained'
              disableElevation
              endIcon={<ChevronRightIcon />}
              disabled={railway ? false : true}
              onClick={() => {
                if (railway) {
                  history.push(
                    `/stations/railway-info/${railway.id}/station-order`
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

export default RailwaysInfoPage;
