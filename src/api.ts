import axios from 'axios';
import {
  DepartureInformationItem,
  ArrivalInformationItem,
  RailwayFareInfo,
  StationItem,
  StationInfo,
  StationTimetableItem,
  RailwayItem,
} from './type';

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

async function getStations(): Promise<StationItem[] | undefined> {
  const response = await axios.get<StationItem[]>(
    `${endpoint}/common/stations`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

function getStationIconPath(id: string): string {
  return `${endpoint}/station/icon/${id}`;
}

async function getRailwayFareInformation(
  from: string,
  to: string
): Promise<RailwayFareInfo[] | undefined> {
  const response = await axios.get<RailwayFareInfo[]>(
    `${endpoint}/railway/fare/${from}/${to}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

async function getStationInfo(
  stationId: string
): Promise<StationInfo | undefined> {
  const response = await axios.get<StationInfo>(
    `${endpoint}/station/info/${stationId}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

async function getStationTimetable(
  timetableId: string
): Promise<StationTimetableItem | undefined> {
  const response = await axios.get<StationInfo>(
    `${endpoint}/station/timetable/${timetableId}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
}

async function getRailways(): Promise<RailwayItem[] | undefined> {
  const response = await axios.get<RailwayItem[]>(
    `${endpoint}/common/railways`
  );
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
  getStationIconPath,
  getRailwayFareInformation,
  getStationInfo,
  getStationTimetable,
  getRailways,
};
