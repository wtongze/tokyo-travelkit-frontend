import React, { useEffect, useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Button,
  Slide,
  Dialog,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Directions as DirectionsIcon,
  Train as TrainIcon,
  Flight as FlightIcon,
  Translate as TranslateIcon,
  ConfirmationNumber as TicketIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router';
import { TransitionProps } from '@mui/material/transitions';
import { connect, ReduxProps } from '../redux';
import { MultiLangObject } from '../type';

interface TabItem {
  label: MultiLangObject;
  path?: string;
  match?: string;
}
interface Props {
  children: JSX.Element;
  hideBottomNav?: boolean;
  title?: MultiLangObject;
  tabs?: TabItem[];
  prevIcon?: JSX.Element;
  backgroundColor?: string;
  onChangeTab?: (index: number) => void;
  onPrev?: () => void;
}

const menuItems = [
  {
    label: {
      en: 'Direction',
      'zh-Hans': '路径',
    },
    icon: <DirectionsIcon />,
    path: '/direction',
  },
  {
    label: {
      en: 'Stations',
      'zh-Hans': '站点',
    },
    icon: <TrainIcon />,
    path: '/stations',
  },
  {
    label: {
      en: 'Ticket',
      'zh-Hans': '票务',
    },
    icon: <TicketIcon />,
    path: '/ticket',
  },
  {
    label: {
      en: 'Flight',
      'zh-Hans': '航班',
    },
    icon: <FlightIcon />,
    path: '/flight',
  },
];

const primaryLangList = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'zh-Hans',
    label: 'Simplified Chinese',
  },
];

const secondaryLangList = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ja',
    label: 'Japanese',
  },
];

const getDefaultTabs = (path: string): TabItem[] => {
  if (path.includes('/ticket')) {
    return [
      {
        label: {
          en: 'Calculator',
          'zh-Hans': '票价计算器',
        },
        path: '/ticket/calculator',
      },
      {
        label: { en: 'Discounted Ticket', 'zh-Hans': '优惠车票' },
        path: '/ticket/discounted-ticket',
      },
    ];
  }
  if (path.includes('/stations/')) {
    return [
      {
        label: {
          en: 'Station Info',
          'zh-Hans': '车站信息',
        },
        path: '/stations/station-info',
      },
      {
        label: {
          en: 'Railway Info',
          'zh-Hans': '线路信息',
        },
        path: '/stations/railway-info',
      },
    ];
  } else {
    return [];
  }
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function AppFrame(props: Props & ReduxProps) {
  const location = useLocation();

  const [innerHeight, setInnerHight] = useState<number>(window.innerHeight);

  function reportWindowSize() {
    setInnerHight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
    return () => {
      window.removeEventListener('resize', reportWindowSize);
    };
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuIndex =
    menuItems.findIndex((i) => location.pathname.startsWith(i.path)) || 0;

  const subMenus: TabItem[] = props.tabs || getDefaultTabs(location.pathname);
  const tabIndex =
    subMenus.findIndex((i) => {
      if (i.path) {
        return location.pathname.startsWith(i.path);
      } else if (i.match) {
        return location.pathname.includes(i.match);
      } else {
        return false;
      }
    }) || 0;
  const [tab, setTab] = useState<number>(tabIndex);

  const theme = useTheme();
  const history = useHistory();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLandscape = useMediaQuery('orientation: landscape');
  const headerHeight = isLandscape ? 48 : isMobile ? 56 : 64;

  const [tempPrimaryLang, setTempPrimaryLang] = useState(props.primaryLang);
  const [tempSecondaryLang, settempSecondaryLang] = useState(
    props.secondaryLang
  );

  const getText = (o?: MultiLangObject | null) => {
    if (o) {
      // @ts-ignore
      return o[props.primaryLang] || o[props.secondaryLang] || '';
    } else {
      return '';
    }
  };

  return (
    <div className='app-frame'>
      <AppBar position='relative' sx={{ flexWrap: 'wrap' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 0.5 }}
            onClick={() => (props.onPrev ? props.onPrev() : null)}
          >
            {props.prevIcon || <MenuIcon />}
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {getText(props.title) || 'Tokyo TravelKit'}
          </Typography>
          {isMobile || props.hideBottomNav
            ? undefined
            : menuItems.map((i) => (
                <Button
                  key={i.path}
                  startIcon={i.icon}
                  color='inherit'
                  sx={{ mr: 2, px: 4 }}
                  onClick={() => history.push(i.path)}
                >
                  {getText(i.label)}
                </Button>
              ))}

          <IconButton color='inherit' onClick={handleClickOpen}>
            <TranslateIcon />
          </IconButton>
        </Toolbar>
        {subMenus.length > 0 ? (
          <Tabs
            value={tab}
            sx={{ width: '100%', paddingLeft: isMobile ? undefined : '48px' }}
            textColor='inherit'
            variant='scrollable'
            TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
            onChange={(e, v) => setTab(v)}
          >
            {subMenus.map(({ label, path }, index) => (
              <Tab
                label={getText(label)}
                value={index}
                key={'tab-' + index}
                onClick={() =>
                  path
                    ? history.push(path)
                    : props.onChangeTab
                    ? props.onChangeTab(index)
                    : null
                }
              />
            ))}
          </Tabs>
        ) : null}
      </AppBar>
      <div
        className='content'
        style={{
          height: `calc(${innerHeight}px - ${
            isMobile && !props.hideBottomNav ? '56px' : '0px'
          } - ${headerHeight}px - ${subMenus.length > 0 ? '48px' : '0px'})`,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : '#f1f3f5',
          overflow: 'auto',
        }}
      >
        {props.children}
      </div>
      {isMobile && !props.hideBottomNav ? (
        <div
          className='bottom-nav'
          style={{ position: 'sticky', bottom: 0, width: '100vw' }}
        >
          <BottomNavigation showLabels value={menuIndex}>
            {menuItems.map((i) => (
              <BottomNavigationAction
                label={getText(i.label)}
                icon={i.icon}
                onClick={() => history.push(i.path)}
                key={i.label.en}
              />
            ))}
          </BottomNavigation>
        </div>
      ) : null}
      <Dialog
        fullScreen={isMobile}
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
              {getText({ en: 'Language', 'zh-Hans': '语言' })}
            </Typography>
            <Button
              autoFocus
              color='inherit'
              onClick={() => {
                if (props.primaryLang !== tempPrimaryLang) {
                  props.setPrimaryLang(tempPrimaryLang);
                }
                if (props.secondaryLang !== tempSecondaryLang) {
                  props.setSecondaryLang(tempSecondaryLang);
                }
                handleClose();
              }}
            >
              {getText({ en: 'Save', 'zh-Hans': '保存' })}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid sx={{ padding: 4 }}>
          <Typography sx={{ mb: 2 }}>
            {getText({ en: 'Primary Language', 'zh-Hans': '首选语言' })}
          </Typography>
          <Select
            fullWidth
            value={tempPrimaryLang}
            onChange={(e) => {
              setTempPrimaryLang(e.target.value);
            }}
            size='small'
            sx={{ fontFamily: 'inherit' }}
          >
            {primaryLangList.map((l) => (
              <MenuItem value={l.value} key={l.value}>
                {l.label}
              </MenuItem>
            ))}
          </Select>
          <Typography sx={{ mt: 4, mb: 2 }}>
            {getText({ en: 'Secondary Language', 'zh-Hans': '备选语言' })}
          </Typography>
          <Select
            fullWidth
            value={tempSecondaryLang}
            onChange={(e) => {
              settempSecondaryLang(e.target.value);
            }}
            size='small'
            sx={{ fontFamily: 'inherit' }}
          >
            {secondaryLangList.map((l) => (
              <MenuItem value={l.value} key={l.value}>
                {l.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Dialog>
    </div>
  );
}

export default connect(AppFrame);
