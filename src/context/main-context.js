import { createContext } from 'react';

export const MainContext = createContext();

export const mainState = {
  wallet: '',
  modal: { isOpen: false, overlay: true, closable: true, otherProps: {} },
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      localStorage.setItem('wallet', JSON.stringify(action.payload));
      return {
        ...state,
        wallet: action.payload,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: {
          ...mainState.modal,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
