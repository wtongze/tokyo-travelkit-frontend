interface AirportInfo {
  label: string;
  value: string;
}

export const AIRPORT_INFO: {
  [airport: string]: AirportInfo;
} = {
  NRT: {
    label: 'Narita',
    value: 'NRT',
  },
  HND: {
    label: 'Tokyo Haneda',
    value: 'HND',
  },
};
