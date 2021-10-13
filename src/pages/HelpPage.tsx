import { Typography, Container, Button } from '@mui/material';
import { useHistory } from 'react-router';
import AppFrame from '../components/AppFrame';
import {
  ChevronLeft as ChevronLeftIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { connect, ReduxProps } from '../redux';
import { MultiLangObject } from '../type';

function HelpPage(props: ReduxProps) {
  const history = useHistory();

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='help'>
      <AppFrame
        title={{ en: 'Help', 'zh-Hans': '帮助' }}
        hideBottomNav
        prevIcon={<ChevronLeftIcon />}
        onPrev={() => history.push('/flight')}
      >
        <Container sx={{ padding: 4 }}>
          <Typography variant='h5' fontWeight={'medium'}>
            {getText({ en: 'Help', 'zh-Hans': '帮助' })}
          </Typography>

          <div>
            <Button
              endIcon={<OpenInNewIcon />}
              variant='contained'
              disableElevation
              href='/manual.pdf'
              target='_blank'
              sx={{ mt: 4 }}
            >
              {getText({ en: 'Manual', 'zh-Hans': '操作手册' })}
            </Button>
          </div>
        </Container>
      </AppFrame>
    </div>
  );
}

export default connect(HelpPage);
