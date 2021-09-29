import {
  AppBar,
  ButtonBase,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
  Container,
} from '@mui/material';
import {
  Close as CloseIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

interface Props {
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface AirportItem {
  label: string;
  value: string;
}

function AirportPicker(props: Props) {
  const [open, setOpen] = useState(false);
  const [airportList, setAirportList] = useState<AirportItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<AirportItem>>();
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    let subscribed = true;
    setTimeout(() => {
      const airportList = [
        {
          label: 'Narita',
          value: 'NRT',
        },
        {
          label: 'Tokyo Haneda',
          value: 'HND',
        },
        {
          label: 'Osaka Kansai',
          value: 'KIX',
        },
        {
          label: 'Fukuoka',
          value: 'FUK',
        },
        {
          label: 'Nagoya Centrair',
          value: 'NGO',
        },
      ];
      if (subscribed) {
        setAirportList(airportList);
        setFuse(new Fuse(airportList, { keys: ['label', 'value'] }));
      }
    }, 500);
    return () => {
      subscribed = false;
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='airport-picker'>
      <ButtonBase sx={{ mt: 1, width: '100%' }}>
        <Paper elevation={0} sx={{ width: '100%' }}>
          <InputBase
            placeholder={props.placeholder || 'Airport Name...'}
            fullWidth
            size='small'
            disabled
            onClick={handleClickOpen}
            sx={{
              fontFamily: 'inherit',
              '& .MuiInputBase-input': {
                padding: '8px 16px',
              },
            }}
          />
        </Paper>
      </ButtonBase>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Choose an airport
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField
          variant='outlined'
          size='small'
          sx={{
            px: 4,
            mt: 4,
            '& .MuiOutlinedInput-root': {
              fontFamily: 'inherit',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <FilterListIcon />
              </InputAdornment>
            ),
          }}
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></TextField>
        <List>
          {(query && fuse
            ? fuse.search(query).map((i) => i.item)
            : airportList
          ).map((i, index) => (
            <div key={i.value}>
              <ListItem
                button
                onClick={() => {
                  handleClose();
                  if (props.onSelect) {
                    props.onSelect(i.value);
                  }
                }}
              >
                <Container
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 8,
                    py: 2,
                    width: '100%',
                  }}
                >
                  <Typography
                    variant='h5'
                    sx={{ fontWeight: 'medium' }}
                    alignItems='center'
                    display='flex'
                  >
                    {i.value}
                  </Typography>
                  <Typography>{i.label}</Typography>
                </Container>
              </ListItem>
              {index === airportList.length - 1 ? null : <Divider />}
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

export default AirportPicker;
