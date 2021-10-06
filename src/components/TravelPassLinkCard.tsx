import { ButtonBase, Paper, Typography } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

interface Props {
  title: string;
  link: string;
}

function TravelPassLinkCard(props: Props) {
  const url = new URL(props.link);
  return (
    <ButtonBase sx={{ width: '100%' }}>
      <a
        href={props.link}
        style={{ textDecoration: 'none', width: '100%' }}
        target='_blank'
        rel="noreferrer"
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 8,
            py: 4,
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <Typography fontSize={18} fontWeight={'medium'}>
              {props.title}
            </Typography>
            <Typography>{url.hostname.replace('www.', '')}</Typography>
          </div>
          <div>
            <OpenInNewIcon />
          </div>
        </Paper>
      </a>
    </ButtonBase>
  );
}

export default TravelPassLinkCard;
