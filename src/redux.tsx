import { connect as connectRaw } from 'react-redux';
import { createStore, AnyAction, Reducer } from 'redux';

interface State {
  primaryLang: string;
  secondaryLang: string;
}

interface Action {
  type: string;
  lang: string;
}

const langReducer: Reducer<State, Action> = function (
  state = {
    primaryLang: 'en-US',
    secondaryLang: 'en',
  },
  action: AnyAction
) {
  switch (action.type) {
    case 'SET_PRIMARY':
      return {
        ...state,
        primaryLang: action.lang,
      };
    case 'SET_SECONDARY':
      return {
        ...state,
        secondaryLang: action.lang,
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

const mapDispatchToProps = (
  dispatch: (arg: {
    type: 'SET_PRIMARY' | 'SET_SECONDARY';
    lang: string;
  }) => void
) => {
  return {
    setPrimaryLang: (newLang: string) =>
      dispatch({ type: 'SET_PRIMARY', lang: newLang }),
    setSecondaryLang: (newLang: string) =>
      dispatch({ type: 'SET_SECONDARY', lang: newLang }),
  };
};

export const connect = connectRaw(mapStateToProps, mapDispatchToProps);
export interface ReduxProps {
  setPrimaryLang: (newLang: string) => void;
  setSecondaryLang: (newLang: string) => void;
  primaryLang: string;
  secondaryLang: string;
}
