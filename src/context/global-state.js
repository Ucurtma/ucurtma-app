import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext({});

const initialState = {
  wallet: '',
  chainId: '',
  modal: { isOpen: false, overlay: true, closable: true, otherProps: {} },
};

const reducer = (state, action) => {
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
          ...initialState.modal,
          ...action.payload,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
