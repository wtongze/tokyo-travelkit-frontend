import { Container, Typography, Grid } from '@mui/material';
import TravelPassLinkCard from '../components/TravelPassLinkCard';

interface TravelPassLinkItem {
  title: string;
  link: string;
}
const links: TravelPassLinkItem[] = [
  {
    title: 'JR-East',
    link: 'https://www.jreast.co.jp/multi/en/pass/index.html',
  },
  {
    title: 'Tokyo Metro',
    link: 'https://www.tokyometro.jp/en/ticket/travel/index.html',
  },
];

function TravelPassPage() {
  return (
    <div className='travel-pass-page'>
      <Container sx={{ padding: 4 }}>
        <Typography variant='h5' fontWeight={'medium'}>
          Travel Pass
        </Typography>
        <Grid container sx={{ mt: 2 }} flexWrap={'wrap'} spacing={2}>
          {links.map((i) => (
            <Grid item xs={12} md={6} key={i.title}>
              <TravelPassLinkCard {...i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default TravelPassPage;
