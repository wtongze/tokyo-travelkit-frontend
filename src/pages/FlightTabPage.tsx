import { Container, Typography } from '@mui/material';
import AirportCard from '../components/AirportCard';
import { connect, ReduxProps } from '../redux';
import { MultiLangObject } from '../type';

function FlightTabPage(props: ReduxProps) {
  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='flight-status-page' style={{ padding: 16 }}>
      <Container sx={{ px: 0 }}>
        <Typography variant='h5' fontWeight={500}>
          {getText({ en: 'Flight Status', 'zh-Hans': '航班动态' })}
        </Typography>
        <Typography variant='subtitle1' sx={{ marginTop: 2 }}>
          {getText({ en: 'Search by Airport', 'zh-Hans': '以机场搜索' })}
        </Typography>
        <AirportCard
          code='NRT'
          name='Narita'
          sx={{ width: '100%', mt: 1 }}
        ></AirportCard>
        <AirportCard
          code='HND'
          name='Tokyo Haneda'
          sx={{ width: '100%', mt: 2 }}
        ></AirportCard>
      </Container>
    </div>
  );
}

export default connect(FlightTabPage);
