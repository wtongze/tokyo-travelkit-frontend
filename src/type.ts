export interface Info {
  id: string;
  title: {
    en?: string;
    ja?: string;
  } | null;
}

export interface DepartureInformationItem {
  dcDate: string;
  dctValid?: string;
  id: string;
  operator: Info;
  airline?: Info;
  flightNumber: string[];
  flightStatus?: Info;
  flightInformationSummary?: object;
  flightInformationText?: object;
  scheduledDepartureTime?: string;
  estimatedDepartureTime?: string;
  actualDepartureTime?: string;
  departureAirport: Info;
  departureAirportTerminal?: Info;
  departureGate?: string;
  checkInCounter?: string[];
  destinationAirport?: Info;
  viaAirport?: Info[];
  aircraftType?: string;
}

export interface ArrivalInformationItem {
  dcDate: string;
  dctValid?: string;
  id: string;
  operator: Info;
  airline?: Info;
  flightNumber: string[];
  flightStatus?: Info;
  flightInformationSummary?: object;
  flightInformationText?: object;
  scheduledArrivalTime?: string;
  estimatedArrivalTime?: string;
  actualArrivalTime?: string;
  arrivalAirport: Info;
  arrivalAirportTerminal?: Info;
  arrivalGate?: string;
  baggageClaim?: string[];
  originAirport?: Info;
  viaAirport?: Info[];
  aircraftType?: string;
}