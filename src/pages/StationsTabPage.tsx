import { useLocation } from 'react-router';
import RailwayInfoPage from './RailwayInfoPage';
import StationsInfoPage from './StationsInfoPage';

function StationsTabPage() {
  const location = useLocation();

  return location.pathname === '/stations/station-info' ? (
    <StationsInfoPage />
  ) : (
    <RailwayInfoPage />
  );
}

export default StationsTabPage;
