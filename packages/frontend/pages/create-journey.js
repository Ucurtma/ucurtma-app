import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import CreateJourneyContent from '../components/student-journey/create-journey-content';

/*
  TODO / DISCUSS: i had create reducers folder and make all files related with context before this one.
  but, after little thought about it; i decided that it doesn't make sense.
  nextjs project structure doesn't looks like CRA apps. we have pages folder in next.js.
  so, why we shouldn't use it? actually, i don't know is it a problem or not.
  we can discuss it later.
*/

const initialState = { activeStep: 3 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'setActiveStep':
      return { ...state, activeStep: action.step };
    default:
      throw Error('I guess there is no type for create journey provider');
  }
};

function CreateJourneyProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CreateJourneyCtx.Provider value={[state, dispatch]}>
      {children}
    </CreateJourneyCtx.Provider>
  );
}

function CreateJourney() {
  return (
    <CreateJourneyProvider>
      <CreateJourneyContent />
    </CreateJourneyProvider>
  );
}

export const CreateJourneyCtx = createContext([initialState]);
export default CreateJourney;

CreateJourneyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
