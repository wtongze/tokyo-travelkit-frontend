import axios from 'axios';

const endpoint =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.231:4000'
    : 'https://api.travelkit.tokyo';

interface Info {
  id: string;
  title: {
    en?: string;
    ja?: string;
  } | null;
}

interface DepartureInformationItem {
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

interface ArrivalInformationItem {
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

async function getDepartureInformation(
  airport: string,
  terminal?: string
): Promise<DepartureInformationItem[]> {
  const response = await axios.get<any[]>(
    `${endpoint}/flight/departure-information/${airport}`,
    {
      params: terminal
        ? {
            terminal,
          }
        : undefined,
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

async function getArrivalInformation(
  airport: string,
  terminal?: string
): Promise<ArrivalInformationItem[]> {
  const response = await axios.get<any[]>(
    `${endpoint}/flight/arrival-information/${airport}`,
    {
      params: terminal
        ? {
            terminal,
          }
        : undefined,
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

export const API = {
  getDepartureInformation,
  getArrivalInformation,
};
