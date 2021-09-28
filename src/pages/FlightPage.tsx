import React from 'react';
import { useRouteMatch } from 'react-router';
import FlightStatusPage from './FlightStatusPage';

function FlightPage() {
  const match = useRouteMatch<{ mode: 'status' | 'schedule' }>();
  const mode = match.params.mode;
  return (mode === 'status' ? <FlightStatusPage /> : <h1>{mode}</h1>)
}

export default FlightPage;
