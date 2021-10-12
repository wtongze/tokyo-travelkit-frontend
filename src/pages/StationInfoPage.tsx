import { useHistory, useRouteMatch } from 'react-router';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import AppFrame from '../components/AppFrame';
import StationTimetablePage from './StationTimetablePage';
import { ReduxProps, connect } from '../redux';

const tabs = [
  {
    label: {
      en: 'Timetable',
      'zh-Hans': '时刻表',
    },
    match: 'timetable',
  },
  // {
  //   label: 'Station Map',
  //   match: 'station-map',
  // },
];

function StationInfoPage(props: ReduxProps) {
  const history = useHistory();
  const match = useRouteMatch<{
    stationId: string;
    mode: 'timetable' | 'station-map';
  }>();
  const { stationId, mode } = match.params;

  return (
    <AppFrame
      tabs={tabs}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push(`/stations/station-info`)}
      onChangeTab={(i) => {
        history.push(`/stations/station-info/${stationId}/${tabs[i].match}`);
      }}
      title={{ en: 'Station Information', 'zh-Hans': '车站信息' }}
      hideBottomNav
    >
      <div className='station-info-page'>
        {mode === 'timetable' ? (
          <StationTimetablePage stationId={stationId} />
        ) : null}
      </div>
    </AppFrame>
  );
}

export default connect(StationInfoPage);
