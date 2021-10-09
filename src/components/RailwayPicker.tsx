import {
  AppBar,
  ButtonBase,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  Close as CloseIcon,
  FilterList as FilterListIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { connect, ReduxProps } from '../redux';
import { RailwayItem } from '../type';

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
  operator?: string[];
  disable?: boolean;
  value?: RailwayItem;
  onChange?: (station: RailwayItem) => void;
}

function RailwayPicker(props: Props & ReduxProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filter, setFilter] = useState('');
  const selected = props.value;

  const source = props.railways.filter((i) => {
    if (props.operator !== undefined) {
      return props.operator.some((j) => i.operator === j);
    } else {
      return true;
    }
  });
  const fuse = new Fuse(source, {
    keys: ['title.en', 'operatorTitle.en'],
  });

  const list = filter === '' ? source : fuse.search(filter).map((i) => i.item);

  const [open, setOpen] = React.useState(false);
  const [limit, setLimit] = useState(50);

  const handleClickOpen = () => {
    if (props.disable !== true) {
      setLimit(50);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='railway-picker'>
      <ButtonBase
        sx={{
          // border: '1px solid #b9bbbd',
          borderRadius: isMobile ? 0 : 1,
          px: 4,
          py: 2,
          width: '100%',
          minHeight: '66px',
          background: '#ffffff',
        }}
        onClick={handleClickOpen}
        disableRipple={props.disable}
      >
        {selected !== undefined ? (
          <Grid container alignItems='center'>
            <Grid item xs={2} textAlign='center'>
              {selected.lineCode || selected.color ? (
                <Grid container alignItems='center' wrap='nowrap'>
                  {selected.color ? (
                    <Grid item xs={5}>
                      <div
                        style={{
                          width: '15px',
                          height: '50px',
                          backgroundColor: selected.color,
                        }}
                      ></div>
                    </Grid>
                  ) : null}
                  <Grid item flexGrow={1} textAlign='center'>
                    <Typography
                      fontWeight={'bold'}
                      fontSize={20}
                      letterSpacing={1}
                    >
                      {selected.lineCode}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <TrainIcon
                  sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
                />
              )}
            </Grid>
            <Grid item xs={10} sx={{ px: 4 }} textAlign='left'>
              <Typography fontWeight={'medium'} fontSize={20} lineHeight={1.25}>
                {selected.title?.en}
              </Typography>
              <Typography fontSize={14} sx={{ mt: 1 }}>
                {selected.operatorTitle?.en}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems='center'>
            <Grid item xs={2} textAlign='center'>
              <TrainIcon
                sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
              />
            </Grid>
            <Grid item xs={10} sx={{ px: 4 }} textAlign='left'>
              <Typography fontSize={20}>Select a railway...</Typography>
            </Grid>
          </Grid>
        )}
      </ButtonBase>
      <Dialog
        fullScreen={isMobile}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
      >
        <AppBar sx={{ position: 'sticky' }}>
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
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder={'Railway Line Code / Name'}
        ></TextField>
        <List>
          {list.slice(0, limit).map((railway, index) => (
            <div key={railway.id}>
              <ListItem
                button
                onClick={() => {
                  if (props.onChange) {
                    props.onChange(railway);
                  }
                  handleClose();
                }}
              >
                <Grid container alignItems='center'>
                  <Grid item xs={2} textAlign='center'>
                    {railway.lineCode || railway.color ? (
                      <Grid container alignItems='center' wrap='nowrap'>
                        {railway.color ? (
                          <Grid item xs={5}>
                            <div
                              style={{
                                width: '15px',
                                height: '50px',
                                backgroundColor: railway.color,
                              }}
                            ></div>
                          </Grid>
                        ) : null}
                        <Grid item flexGrow={1} textAlign='center'>
                          <Typography
                            fontWeight={'bold'}
                            fontSize={20}
                            letterSpacing={1}
                          >
                            {railway.lineCode}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <TrainIcon
                        sx={{ verticalAlign: 'middle', fontSize: '1.75rem' }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={10} sx={{ px: 4 }}>
                    <Typography
                      fontWeight={'medium'}
                      fontSize={20}
                      lineHeight={1.25}
                    >
                      {railway.title?.en}
                    </Typography>
                    <Typography fontSize={14} sx={{ mt: 1 }}>
                      {railway.operatorTitle?.en}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              {(index === list.length - 1 || index === limit - 1) &&
              limit < list.length ? (
                <ListItem
                  button
                  onClick={() => {
                    setLimit(limit + 50);
                  }}
                >
                  <Typography
                    textAlign='center'
                    fontSize='20'
                    sx={{ width: '100%' }}
                  >
                    Load More...
                  </Typography>
                </ListItem>
              ) : null}
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

export default connect(RailwayPicker);
