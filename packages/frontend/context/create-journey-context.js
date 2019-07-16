import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = { activeStep: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'setActiveStep':
      return { ...state, activeStep: action.step };
    default:
      throw Error('I guess there is no type for create journey provider');
  }
};

export default function CreateJourneyProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CreateJourneyCtx.Provider value={[state, dispatch]}>
      {children}
    </CreateJourneyCtx.Provider>
  );
}

export const CreateJourneyCtx = createContext([initialState]);

CreateJourneyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
