import React from 'react';
import { ButtonBase, ButtonBaseProps, Paper, Typography } from '@mui/material';
import { Flight as FlightIcon } from '@mui/icons-material';

interface Props {
  code: string;
  name: string;
}

function AirportCard(props: Props & ButtonBaseProps) {
  return (
    <ButtonBase {...props}>
      <Paper
        className='airport-card'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 8,
          py: 4,
          width: '100%',
        }}
        elevation={0}
      >
        <div>
          <Typography
            variant='h5'
            sx={{ fontWeight: 'medium' }}
            alignItems='center'
            display='flex'
          >
            <FlightIcon sx={{ mr: 1 }} />
            {props.code}
          </Typography>
        </div>
        <div>
          <Typography>{props.name}</Typography>
        </div>
      </Paper>
    </ButtonBase>
  );
}

export default AirportCard;
