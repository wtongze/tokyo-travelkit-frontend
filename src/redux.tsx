import { connect as connectRaw } from 'react-redux';
import { createStore, Reducer } from 'redux';
import { RailwayItem, StationItem } from './type';

interface State {
  primaryLang: string;
  secondaryLang: string;
  stations: StationItem[];
  railways: RailwayItem[];
}

interface Action {
  type: string;
  payload: any;
}

const langReducer: Reducer<State, Action> = function (
  state = {
    primaryLang: 'en-US',
    secondaryLang: 'en',
    stations: [],
    railways: [],
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
      };
    case 'SET_RAILWAYS':
      return {
        ...state,
        railways: [...action.payload],
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
}
