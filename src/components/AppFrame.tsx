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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Directions as DirectionsIcon,
  Train as TrainIcon,
  Flight as FlightIcon,
  Translate as TranslateIcon,
  ConfirmationNumber as TicketIcon,
} from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router';

interface TabItem {
  label: string;
  path?: string;
  match?: string;
}
interface Props {
  children: JSX.Element;
  hideBottomNav?: boolean;
  title?: string;
  tabs?: TabItem[];
  prevIcon?: JSX.Element;
  backgroundColor?: string;
  onChangeTab?: (index: number) => void;
  onPrev?: () => void;
}

const menuItems = [
  {
    label: 'Direction',
    icon: <DirectionsIcon />,
    path: '/direction',
  },
  {
    label: 'Stations',
    icon: <TrainIcon />,
    path: '/stations',
  },
  {
    label: 'Ticket',
    icon: <TicketIcon />,
    path: '/ticket',
  },
  {
    label: 'Flight',
    icon: <FlightIcon />,
    path: '/flight',
  },
];

const getDefaultTabs = (path: string): TabItem[] => {
  if (path.includes('/ticket')) {
    return [
      {
        label: 'Calculator',
        path: '/ticket/calculator',
      },
      {
        label: 'Travel Pass',
        path: '/ticket/travel-pass',
      },
    ];
  }
  if (path.includes('/stations/')) {
    return [
      {
        label: 'Station Info',
        path: '/stations/station-info',
      },
      {
        label: 'Railway Info',
        path: '/stations/railway-info',
      },
    ];
  } else {
    return [];
  }
};

function AppFrame(props: Props) {
  const location = useLocation();

  const [innerHeight, setInnerHight] = useState<number>(window.innerHeight);

  function reportWindowSize() {
    setInnerHight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
    return () => {
      window.removeEventListener('resize', reportWindowSize);
    };
  });

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
            {props.title || 'Tokyo TravelKit'}
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
                  {i.label}
                </Button>
              ))}

          <IconButton color='inherit'>
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
                label={label}
                value={index}
                key={label}
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
                label={i.label}
                icon={i.icon}
                onClick={() => history.push(i.path)}
                key={i.label}
              />
            ))}
          </BottomNavigation>
        </div>
      ) : null}
    </div>
  );
}

export default AppFrame;
