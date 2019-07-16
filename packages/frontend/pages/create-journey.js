import React from 'react';
import CreateJourneyContent from '../components/student-journey/create-journey-content';
import CreateJourneyProvider from '../context/create-journey-context';

function CreateJourney() {
  return (
    <CreateJourneyProvider>
      <CreateJourneyContent />
    </CreateJourneyProvider>
  );
}

export default CreateJourney;
