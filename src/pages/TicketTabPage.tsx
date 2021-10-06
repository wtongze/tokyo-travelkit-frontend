import { useLocation } from 'react-router';
import TicketCalculatorPage from './TicketCalculatorPage';
import TravelPassPage from './TravelPassPage';

function TicketTabPage() {
  const location = useLocation();

  return location.pathname === '/ticket/travel-pass' ? (
    <TravelPassPage />
  ) : (
    <TicketCalculatorPage />
  );
}

export default TicketTabPage;
