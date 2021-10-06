import {
  AppBar,
  ButtonBase,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close as CloseIcon } from '@mui/icons-material';
import React from 'react';
import { connect } from '../redux';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface Props {
  title: string;
}

function StationPicker(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='station-picker'>
      <ButtonBase
        sx={{
          border: '1px solid #b9bbbd',
          borderRadius: 1,
          px: 4,
          py: 2,
          width: '100%',
          height: '42px',
          background: '#ffffff',
        }}
        onClick={handleClickOpen}
      ></ButtonBase>
      <Dialog
        fullScreen={isMobile}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
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
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary='Phone ringtone' secondary='Titania' />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary='Default notification ringtone'
              secondary='Tethys'
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default connect(StationPicker);
