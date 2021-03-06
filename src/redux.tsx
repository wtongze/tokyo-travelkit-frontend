import { connect as connectRaw } from 'react-redux';
import { createStore, Reducer } from 'redux';
import { RailwayItem, StationItem } from './type';

interface State {
  primaryLang: string;
  secondaryLang: string;
  stations: StationItem[];
  railways: RailwayItem[];
  stationsDcDate: Date;
  railwaysDcDate: Date;
}

interface Action {
  type: string;
  payload: any;
}

// Interface language
// const primaryLangMap = {
//   en: 'en',
//   'zh-CN': 'zh-Hans',
//   // zh: 'zh-Hant',
//   // ko: 'ko',
//   // jp: 'jp',
// };

// let primaryKey = navigator.languages.find((l) => l in primaryLangMap) || 'en';
// //@ts-ignore
// let primaryLang = primaryLangMap[primaryKey];

// // Fallback language
// const secondaryLangMap = {
//   en: 'en',
//   jp: 'jp',
// };

// let secondaryKey =
//   navigator.languages.find((l) => l in secondaryLangMap) || 'en';
// // @ts-ignore
// let secondaryLang = secondaryLangMap[secondaryKey];

const langReducer: Reducer<State, Action> = function (
  state = {
    primaryLang: 'en',
    secondaryLang: 'en',
    stations: [],
    railways: [],
    stationsDcDate: new Date(),
    railwaysDcDate: new Date(),
  },
  action: Action
) {
  switch (action.type) {
    case 'SET_PRIMARY':
      return {
        ...state,
        primaryLang: action.payload,
      };
    case 'SET_SECONDARY':
      return {
        ...state,
        secondaryLang: action.payload,
      };
    case 'SET_STATIONS':
      return {
        ...state,
        stations: [...action.payload],
        stationsDcDate: new Date(),
      };
    case 'SET_RAILWAYS':
      return {
        ...state,
        railways: [...action.payload],
        railwaysDcDate: new Date(),
      };
    default:
      return state;
  }
};

export const store = createStore(
  langReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const mapStateToProps = (state: State) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch: (arg: Action) => void) => {
  return {
    setPrimaryLang: (newLang: string) =>
      dispatch({ type: 'SET_PRIMARY', payload: newLang }),
    setSecondaryLang: (newLang: string) =>
      dispatch({ type: 'SET_SECONDARY', payload: newLang }),
    setStations: (stations: StationItem[]) => {
      dispatch({ type: 'SET_STATIONS', payload: stations });
    },
    setRailways: (railways: RailwayItem[]) => {
      dispatch({ type: 'SET_RAILWAYS', payload: railways });
    },
  };
};

export const connect = connectRaw(mapStateToProps, mapDispatchToProps);
export interface ReduxProps {
  setPrimaryLang: (newLang: string) => void;
  setSecondaryLang: (newLang: string) => void;
  setStations: (stations: StationItem[]) => void;
  setRailways: (railways: RailwayItem[]) => void;
  primaryLang: string;
  secondaryLang: string;
  stations: StationItem[];
  railways: RailwayItem[];
  stationsDcDate: Date;
  railwaysDcDate: Date;
}
