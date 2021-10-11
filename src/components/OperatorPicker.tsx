import {
  Alert,
  AppBar,
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { MultiLangObject } from '../type';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const operators: { key: string; title: MultiLangObject }[] = [
  {
    key: 'Sotetsu',
    title: { en: 'Sagami Railway', ja: '相模鉄道' },
  },
  {
    key: 'YokohamaMunicipal',
    title: {
      en: 'Transportation Bureau, City of Yokohama',
      ja: '横浜市交通局',
    },
  },
  {
    key: 'TamaMonorail',
    title: { en: 'Tokyo Tama Intercity Monorail', ja: '多摩都市モノレール' },
  },
  {
    key: 'MIR',
    title: { en: 'Metropolitan Intercity Railway', ja: '首都圏新都市鉄道' },
  },
  {
    key: 'TWR',
    title: {
      en: 'Tokyo Waterfront Area Rapid Transit',
      ja: '東京臨海高速鉄道',
    },
  },
  {
    key: 'JR-East',
    title: { en: 'JR East', ja: 'JR東日本' },
  },
  {
    key: 'TokyoMetro',
    title: { en: 'Tokyo Metro', ja: '東京メトロ' },
  },
  {
    key: 'Toei',
    title: {
      en: 'Tokyo Metropolitan Bureau of Transportation',
      ja: '東京都交通局',
    },
  },
];

export interface OperatorPreference {
  [operator: string]: boolean;
}

interface Props {
  value: OperatorPreference;
  onChange?: (OperatorPreference: OperatorPreference) => void;
}

function OperatorPicker(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selected, setSelected] = useState<OperatorPreference>(props.value);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const countOperator = (v: OperatorPreference) => {
    let counter = 0;
    for (const k of Object.values(v)) {
      if (k) {
        counter += 1;
      }
    }
    return counter;
  };

  return (
    <div className='railway-picker'>
      <ButtonBase
        sx={{
          borderRadius: isMobile ? 0 : 1,
          px: 4,
          py: 2,
          width: '100%',
          minHeight: '40px',
          background: '#ffffff',
        }}
        onClick={handleClickOpen}
      >
        <Typography sx={{ mt: 1 }}>
          {countOperator(selected)} operator
          {countOperator(selected) > 1 ? 's' : null} selected
        </Typography>
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
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant='h6'
              component='div'
              lineHeight={1.25}
            >
              Select Operator
            </Typography>
            <Button
              color='inherit'
              onClick={() => {
                if (props.onChange) {
                  props.onChange(selected);
                }
                handleClose();
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Alert severity='info'>
          <Typography>Choose your prefered operator...</Typography>
        </Alert>
        <List disablePadding>
          <Divider />
          {operators.map((operator, index) => (
            <div key={operator.key}>
              <ListItem disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={() => {
                    setSelected({
                      ...selected,
                      [operator.key]: !selected[operator.key],
                    });
                  }}
                  dense
                >
                  <ListItemText>
                    <Typography fontSize={16} lineHeight={1.25}>
                      {operator.title.en}
                    </Typography>
                  </ListItemText>
                  <ListItemIcon>
                    <Checkbox
                      edge='end'
                      checked={selected[operator.key]}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

export default OperatorPicker;