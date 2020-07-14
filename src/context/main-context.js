import { createContext } from 'react';

export const MainContext = createContext();

export const mainState = {
  wallet: '',
  chainId: '',
  modal: { isOpen: false, overlay: true, closable: true, otherProps: {} },
  topNav: { show: true },
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      localStorage.setItem('wallet', JSON.stringify(action.payload));
      return {
        ...state,
        wallet: action.payload.wallet,
        chainId: action.payload.chainId,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: {
          ...mainState.modal,
          ...action.payload,
        },
      };
    case 'SHOW_TOPNAV':
      return {
        ...state,
        topNav: { show: action.payload },
      };
    default:
      return state;
  }
};
