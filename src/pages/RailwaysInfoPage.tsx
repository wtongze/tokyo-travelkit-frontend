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
import { MultiLangObject, RailwayItem } from '../type';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { connect, ReduxProps } from '../redux';

function RailwaysInfoPage(props: ReduxProps) {
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [railway, setRailway] = useState<RailwayItem>();

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='railway-info-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          {getText({ en: 'Railway Information', 'zh-Hans': '线路信息' })}
        </Typography>
        <Typography variant='subtitle1'>
          {getText({
            en: 'Check railway routes here...',
            'zh-Hans': '在此查看线路相关信息',
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
              {getText({ en: 'Railway', 'zh-Hans': '线路' })}
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
                {getText({ en: 'Clear', 'zh-Hans': '清空' })}
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
              {getText({ en: 'Get Information', 'zh-Hans': '获取信息' })}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default connect(RailwaysInfoPage);
