import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Directions as DirectionsIcon,
  TripOrigin as OriginIcon,
  Flight as FlightIcon,
  Translate as TranslateIcon,
  ConfirmationNumber as TicketIcon,
} from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router';

interface Props {
  children: JSX.Element;
}

const menuItems = [
  {
    label: 'Direction',
    icon: <DirectionsIcon />,
    path: '/direction',
    children: [],
  },
  {
    label: 'Station',
    icon: <OriginIcon />,
    path: '/station',
    children: [],
  },
  {
    label: 'Ticket',
    icon: <TicketIcon />,
    path: '/ticket',
    children: [],
  },
  {
    label: 'Flight',
    icon: <FlightIcon />,
    path: '/flight',
    children: [
      {
        label: 'Status',
        path: '/flight/status',
      },
      {
        label: 'Schedule',
        path: '/flight/schedule',
      },
    ],
  },
];

function AppFrame(props: Props) {
  const location = useLocation();
  const [bottomNav, setBottomNav] = useState(
    menuItems.findIndex((i) => location.pathname.startsWith(i.path))
  );
  const [tab, setTab] = useState(
    menuItems[bottomNav].children.findIndex((i) => location.pathname === i.path)
  );
  const theme = useTheme();
  const history = useHistory();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLandscape = useMediaQuery('orientation: landscape');
  const headerHeight = isLandscape ? 48 : isMobile ? 56 : 64;

  return (
    <div className='app-frame'>
      <AppBar position='sticky' sx={{ flexWrap: 'wrap' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Tokyo TravelKit
          </Typography>
          <IconButton color='inherit'>
            <TranslateIcon />
          </IconButton>
        </Toolbar>
        {menuItems[bottomNav].children.length > 0 ? (
          <Tabs
            value={tab}
            sx={{ width: '100%' }}
            textColor='inherit'
            variant='scrollable'
            TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
            onChange={(e, v) => setTab(v)}
          >
            {menuItems[bottomNav].children.map(({ label, path }, index) => (
              <Tab
                label={label}
                value={index}
                key={label}
                onClick={() => history.push(path)}
              />
            ))}
          </Tabs>
        ) : null}
      </AppBar>
      <div
        className='content'
        style={{
          height: `calc(100vh - ${
            isMobile ? '56px' : '0px'
          } - ${headerHeight}px - ${
            menuItems[bottomNav].children.length > 0 ? '48px' : '0px'
          })`,
          backgroundColor: '#f1f3f5',
          overflow: 'auto',
        }}
      >
        {props.children}
      </div>
      {isMobile ? (
        <div
          className='bottom-nav'
          style={{ position: 'sticky', bottom: 0, width: '100vw' }}
        >
          <BottomNavigation
            showLabels
            value={bottomNav}
            onChange={(e, v) => {
              setBottomNav(v);
            }}
          >
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
