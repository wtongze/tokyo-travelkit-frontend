import { Typography, Container, Alert, Button } from '@mui/material';
import { useHistory } from 'react-router';
import AppFrame from '../components/AppFrame';
import {
  ChevronLeft as ChevronLeftIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { connect, ReduxProps } from '../redux';
import { MultiLangObject } from '../type';

function AboutPage(props: ReduxProps) {
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
    <div className='about'>
      <AppFrame
        title={{ en: 'About', 'zh-Hans': '关于' }}
        hideBottomNav
        prevIcon={<ChevronLeftIcon />}
        onPrev={() => history.push('/flight')}
      >
        <Container sx={{ padding: 4 }}>
          <Typography variant='h5' fontWeight={'medium'}>
            {getText({ en: 'About', 'zh-Hans': '关于' })}
          </Typography>

          <Alert sx={{ mt: 4, mb: 4 }} severity='warning'>
            {getText({ en: 'Warning', 'zh-Hans': '警告' })}
          </Alert>

          {props.primaryLang === 'en' ? (
            <Typography>
              The source of the public transportation data in this app, etc. is
              the Open Data Challenge for Public Transportation in Tokyo. They
              are based on the data provided by the public transportation
              operators. The accuracy and integrity of the data are not
              guaranteed. Please do not contact the public transportation
              operators directly regarding the content of the app. For inquiries
              on the app, please contact the following email address.
              <br />
              wtongze@outlook.com
            </Typography>
          ) : (
            <Typography>
              本应用使用的公共交通数据来源于 Open Data Challenge for Public
              Transportation in Tokyo 。
              这些数据基于公共交通运营商所提供的数据。这些数据的准确性与真实性无法保证。
              请不要因此应用提供的内容而直接联系公共交通运营商。
              关于此应用的任何咨询，请通过以下电子邮件地址联系。
              <br />
              wtongze@outlook.com
            </Typography>
          )}
          <div style={{ paddingTop: '16px' }}>
            {props.primaryLang === 'en' ? (
              <Typography>
                This app is made by Tongze Wang. All the code of this app are
                licensed in AGPLv3 or later.
              </Typography>
            ) : (
              <Typography>
                本应用由 Tongze Wang 编写。本应用的全部代码使用 AGPLv3 or later
                许可。
              </Typography>
            )}
          </div>
          <div>
            <Button
              endIcon={<OpenInNewIcon />}
              variant='contained'
              disableElevation
              href='https://github.com/wtongze/tokyo-travelkit-frontend'
              target='_blank'
              sx={{ mt: 4 }}
            >
              {getText({ en: 'Front-End Codebase', 'zh-Hans': '前端代码库' })}
            </Button>
          </div>
          <div>
            <Button
              endIcon={<OpenInNewIcon />}
              variant='contained'
              disableElevation
              sx={{ mt: 4 }}
              href='https://github.com/wtongze/tokyo-travelkit-backend'
              target='_blank'
            >
              {getText({ en: 'Back-End Codebase', 'zh-Hans': '后端代码库' })}
            </Button>
          </div>
        </Container>
      </AppFrame>
    </div>
  );
}

export default connect(AboutPage);
