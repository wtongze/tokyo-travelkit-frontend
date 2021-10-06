import axios from 'axios';
import { DepartureInformationItem, ArrivalInformationItem } from './type';

const endpoint =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.231:4000'
    : 'https://api.travelkit.tokyo';

async function getDepartureInformation(
  airport: string,
  terminal?: string
): Promise<DepartureInformationItem[]> {
  const response = await axios.get<DepartureInformationItem[]>(
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

async function getDepartureFlightInformation(
  flightId: string
): Promise<DepartureInformationItem | undefined> {
  const response = await axios.get<DepartureInformationItem>(
    `${endpoint}/flight/departure-flight-information/${flightId}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

async function getArrivalInformation(
  airport: string,
  terminal?: string
): Promise<ArrivalInformationItem[]> {
  const response = await axios.get<ArrivalInformationItem[]>(
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

async function getArrivalFlightInformation(
  flightId: string
): Promise<ArrivalInformationItem | undefined> {
  const response = await axios.get<ArrivalInformationItem>(
    `${endpoint}/flight/arrival-flight-information/${flightId}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

async function getStations(): Promise<any[] | undefined> {
  const response = await axios.get<any[]>(`${endpoint}/common/stations`);
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

export const API = {
  getDepartureInformation,
  getDepartureFlightInformation,
  getArrivalInformation,
  getArrivalFlightInformation,
  getStations,
};
