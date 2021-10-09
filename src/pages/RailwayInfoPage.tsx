import { useHistory, useRouteMatch } from 'react-router';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import AppFrame from '../components/AppFrame';
import RailwayStationOrderPage from './RailwayStationOrderPage';
import { ReduxProps, connect } from '../redux';

const tabs = [
  {
    label: 'Station Order',
    match: 'station-order',
  },
];

function RailwayInfoPage(props: ReduxProps) {
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
      title={'Railway Information'}
      hideBottomNav
    >
      <div className='railway-info-page'>
        <RailwayStationOrderPage railwayId={railwayId} />
      </div>
    </AppFrame>
  );
}

export default connect(RailwayInfoPage);
