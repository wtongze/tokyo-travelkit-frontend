export interface Info {
  id: string;
  title: MultiLangObject | null;
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

export interface MultiLangObject {
  ja?: string;
  en?: string;
  ko?: string;
  'ja-Hrkt'?: string;
  'zh-Hans'?: string;
  'zh-Hant'?: string;
}

export interface StationItem {
  id: string;
  dcDate: string;
  stationCode?: string;
  title?: MultiLangObject;
  railway: string;
  railwayTitle?: MultiLangObject;
  operator: string;
  operatorTitle?: MultiLangObject;
  hasStationIcon?: boolean;
}

export interface RailwayFareInfo {
  id: string;
  dcDate: string;
  operatorTitle?: MultiLangObject;
  fromStationTitle?: MultiLangObject;
  toStationTitle?: MultiLangObject;
  ticketFare: number;
  icCardFare?: number;
  childTicketFare?: number;
  childIcCardFare?: number;
  viaStation?: {
    id: string;
    stationTitle?: MultiLangObject;
  }[];
  viaRailway?: {
    id: string;
    railwayTitle?: MultiLangObject;
  }[];
  ticketType?: string;
  paymentMethod?: string[];
}

export interface StationInfo {
  id: string;
  title?: MultiLangObject;
  operatorTitle?: MultiLangObject;
  railwayTitle?: MultiLangObject;
  connectingRailway?: {
    id: string;
    railwayTitle?: MultiLangObject;
  }[];
  connectingStation?: {
    id?: string;
    stationTitle?: MultiLangObject;
  }[];
  stationTimetable?: {
    id: string;
    calendar?: string;
    calendarTitle?: MultiLangObject;
    railDirection?: string;
    railDirectionTitle?: MultiLangObject;
  }[];
}

export interface StationTimetableObjectItem {
  arrivalTime?: string;
  departureTime?: string;
  originStation?: { id: string; stationTitle?: MultiLangObject }[];
  destinationStation?: { id: string; stationTitle?: MultiLangObject }[];
  viaStation?: { id: string; stationTitle?: MultiLangObject }[];
  viaRailway?: { id: string; railwayTitle?: MultiLangObject }[];
  train?: string;
  trainNumber?: string;
  trainTypeTitle?: MultiLangObject;
  trainName?: MultiLangObject[];
  trainOwner?: MultiLangObject;
  isLast?: boolean;
  isOrigin?: boolean;
  platformNumber?: string;
  carCompositions?: number;
  note?: MultiLangObject;
}

export interface StationTimetableItem {
  id: string;
  operatorTitle?: MultiLangObject;
  railwayTitle?: MultiLangObject;
  stationTitle?: MultiLangObject;
  railDirectionTitle?: MultiLangObject;
  calendarTitle?: MultiLangObject;
  stationTimetableObject?: StationTimetableObjectItem[];
  note?: MultiLangObject;
}

export interface RailwayItem {
  id: string;
  dcDate: string;
  title?: MultiLangObject;
  kana?: string;
  operator: string;
  operatorTitle?: MultiLangObject;
  lineCode?: string;
  color?: string;
  hasStationOrder?: boolean;
}

export interface RailwayInfo {
  id: string;
  title?: MultiLangObject;
  kana?: string;
  operatorTitle?: MultiLangObject;
  lineCode?: string;
  color?: string;
  ascendingRailDirectionTitle?: MultiLangObject;
  descendingRailDirectionTitle?: MultiLangObject;
  stationOrder: {
    station: string;
    title?: MultiLangObject;
    index: number;
  }[];
}

interface RouteStartTransfer {
  type: 'START_TRANSFER';
  fromTime: string;
  from: string;
}

interface RouteTrain {
  type: 'TRAIN';
  fromTime: string;
  from: string;
  toTime: string;
  to: string;
  trainTimetable: TrainTimetableItem;
  via: { railwayId: string; stops: string[] }[];
}

interface RouteTransfer {
  type: 'TRANSFER';
}

interface RouteEndTransfer {
  type: 'END_TRANSFER';
  toTime: string;
  to: string;
}

export interface DirectionRoute {
  from: string;
  fromTime: string;
  to: string;
  toTime: string;
  time: number;
  searchTime: number;
  directions: (
    | RouteStartTransfer
    | RouteTrain
    | RouteTransfer
    | RouteEndTransfer
  )[];
}

export interface TrainTimetableItem {
  id: string;
  operatorTitle?: MultiLangObject;
  railway: string;
  railwayTitle?: MultiLangObject;
  railDirectionTitle?: MultiLangObject;
  trainNumber?: string;
  trainTypeTitle?: MultiLangObject;
  trainName?: MultiLangObject[];
  trainOwnerTitle?: MultiLangObject;
  originStation?: string[];
  destinationStation?: string[];
  viaStation?: string[];
  viaRailway?: string[];
}
