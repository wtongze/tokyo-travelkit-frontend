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
import { useHistory, useLocation, useRouteMatch } from 'react-router';

interface TabItem {
  label: string;
  path?: string;
  match?: string;
}
interface Props {
  children: JSX.Element;
  minimize?: boolean;
  title?: string;
  tabs?: TabItem[];
  onChangeTab?: (index: number) => void;
  prevIcon?: JSX.Element;
  onPrev?: () => void;
}

const menuItems = [
  {
    label: 'Direction',
    icon: <DirectionsIcon />,
    path: '/direction',
  },
  {
    label: 'Station',
    icon: <OriginIcon />,
    path: '/station',
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
  const match = useRouteMatch();

  let menuIndex = 0;
  let subMenus: TabItem[] = [];
  if (!props.minimize) {
    menuIndex = menuItems.findIndex((i) =>
      location.pathname.startsWith(i.path)
    );
    subMenus = menuItems[menuIndex].children || [];
  } else {
    if (props.tabs) {
      subMenus = props.tabs;
    }
  }

  const [bottomNav, setBottomNav] = useState<number>(menuIndex);
  const [tab, setTab] = useState<number>(
    subMenus.findIndex((i) =>
      i.path
        ? location.pathname.startsWith(i.path)
        : i.match
        ? match.url.includes(i.match)
        : false
    )
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
            onClick={() => (props.onPrev ? props.onPrev() : null)}
          >
            {props.prevIcon || <MenuIcon />}
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {props.title || 'Tokyo TravelKit'}
          </Typography>
          <IconButton color='inherit'>
            <TranslateIcon />
          </IconButton>
        </Toolbar>
        {subMenus.length > 0 ? (
          <Tabs
            value={tab}
            sx={{ width: '100%' }}
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
          height: `calc(100vh - ${
            isMobile && !props.minimize ? '56px' : '0px'
          } - ${headerHeight}px - ${subMenus.length > 0 ? '48px' : '0px'})`,
          backgroundColor: '#f1f3f5',
          overflow: 'auto',
        }}
      >
        {props.children}
      </div>
      {isMobile && !props.minimize ? (
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
