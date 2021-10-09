import { useLocation } from 'react-router';
import RailwaysInfoPage from './RailwaysInfoPage';
import StationsInfoPage from './StationsInfoPage';

function StationsTabPage() {
  const location = useLocation();

  return location.pathname === '/stations/station-info' ? (
    <StationsInfoPage />
  ) : (
    <RailwaysInfoPage />
  );
}

export default StationsTabPage;
