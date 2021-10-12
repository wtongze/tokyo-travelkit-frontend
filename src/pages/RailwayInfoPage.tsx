import { useHistory, useRouteMatch } from 'react-router';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import AppFrame from '../components/AppFrame';
import RailwayStationOrderPage from './RailwayStationOrderPage';

const tabs = [
  {
    label: {
      en: 'Station Order',
      'zh-Hans': '站点顺序',
    },
    match: 'station-order',
  },
];

function RailwayInfoPage() {
  const history = useHistory();
  const match = useRouteMatch<{
    railwayId: string;
  }>();
  const { railwayId } = match.params;

  return (
    <AppFrame
      tabs={tabs}
      prevIcon={<ChevronLeftIcon />}
      onPrev={() => history.push(`/stations/railway-info`)}
      onChangeTab={(i) => {
        history.push(`/stations/railway-info/${railwayId}/${tabs[i].match}`);
      }}
      title={{ en: 'Railway Information', 'zh-Hans': '线路信息' }}
      hideBottomNav
    >
      <div className='railway-info-page'>
        <RailwayStationOrderPage railwayId={railwayId} />
      </div>
    </AppFrame>
  );
}

export default RailwayInfoPage;
