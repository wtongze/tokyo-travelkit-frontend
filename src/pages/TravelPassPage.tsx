import { Container, Typography, Grid } from '@mui/material';
import TravelPassLinkCard from '../components/TravelPassLinkCard';
import { connect, ReduxProps } from '../redux';
import { MultiLangObject } from '../type';

interface TravelPassLinkItem {
  title: MultiLangObject;
  link: string;
}
const links: TravelPassLinkItem[] = [
  {
    title: { en: 'JR East', ja: 'JR東日本' },
    link: 'https://www.jreast.co.jp/multi/en/pass/index.html',
  },
  {
    title: { en: 'Tokyo Metro', ja: '東京メトロ' },
    link: 'https://www.tokyometro.jp/en/ticket/travel/index.html',
  },
  {
    title: {
      en: 'Tokyo Metropolitan Bureau of Transportation',
      ja: '東京都交通局',
    },
    link: 'https://www.kotsu.metro.tokyo.jp/eng/tickets/value.html',
  },
  {
    title: {
      en: 'Tokyo Waterfront Area Rapid Transit',
      ja: '東京臨海高速鉄道',
    },
    link: 'https://www.twr.co.jp/en/tabid/234/Default.aspx',
  },
  {
    title: { en: 'Metropolitan Intercity Railway', ja: '首都圏新都市鉄道' },
    link: 'https://www.mir.co.jp/en/ticket/#anc-discount_tickets',
  },
  {
    title: { en: 'Keikyu Corporation', ja: '京急電鉄' },
    link: 'https://www.haneda-tokyo-access.com/en/ticket/discount/',
  },
  {
    title: { en: 'Keisei Electric Railway', ja: '京成電鉄' },
    link: 'https://www.keisei.co.jp/keisei/tetudou/skyliner/us/tickets/index.php',
  },
  {
    title: { en: 'Tokyo Tama Intercity Monorail', ja: '多摩都市モノレール' },
    link: 'https://www.tama-monorail.co.jp.e.afy.hp.transer.com/monorail/ticket/set/index.html',
  },
  {
    title: { en: 'Tokyu Corporation', ja: '東急電鉄' },
    link: 'https://www.tokyu.co.jp/global/railway/ticket/#section02',
  },
  {
    title: {
      en: 'Transportation Bureau, City of Yokohama',
      ja: '横浜市交通局',
    },
    link: 'https://www.city.yokohama.lg.jp/lang/residents/en/bus-subway/ticket/various/',
  },
  {
    title: { en: 'Tobu Railway', ja: '東武鉄道' },
    link: 'https://www.tobu.co.jp/en/ticket/',
  },
  {
    title: { en: 'Sagami Railway', ja: '相模鉄道' },
    link: 'https://www.sotetsu.co.jp/',
  },
  {
    title: { en: 'Seibu Railway', ja: '西武鉄道' },
    link: 'https://www.seiburailway.jp/railways/tourist/english/',
  },
  {
    title: { en: 'Yurikamome', ja: 'ゆりかもめ' },
    link: 'https://www.yurikamome.co.jp/en/ticket/coupon.html',
  },
  {
    title: { en: 'Keio Corporation', ja: '京王電鉄' },
    link: 'https://www.keio.co.jp/english/tickets/discount.html',
  },
  {
    title: { en: 'Odakyu Electric Railway', ja: '小田急電鉄' },
    link: 'https://www.odakyu.jp/english/passes/',
  },
];

function TravelPassPage(props: ReduxProps) {
  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='discounted-ticket-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          {getText({ en: 'Discounted Ticket', 'zh-Hans': '优惠车票' })}
        </Typography>
        <Grid container sx={{ mt: 2 }} flexWrap={'wrap'} spacing={2}>
          {links.map((i, index) => (
            <Grid item xs={12} md={6} key={index}>
              <TravelPassLinkCard {...i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default connect(TravelPassPage);
