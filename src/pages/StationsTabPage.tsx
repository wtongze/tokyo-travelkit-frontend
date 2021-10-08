import { useLocation } from 'react-router';
import StationsInfoPage from './StationsInfoPage';

function StationsTabPage() {
  const location = useLocation();

  return location.pathname === '/stations/station-info' ? (
    <StationsInfoPage />
  ) : (
    <div></div>
  );
}

export default StationsTabPage;
