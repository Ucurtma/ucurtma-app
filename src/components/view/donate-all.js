import React from 'react';
import Container from '../ui/container';
import Donate from './campaign/donate';

function DonateAll() {
  return (
    <Container flexDir="column" px={{ base: 4, lg: 0 }}>
      <Donate
      // minimumAmount={data.campaign?.minimumAmount}
      // redirectError={location.state?.redirectError}
      // ethereumAddress={data.campaign?.ethereumAddress}
      // onBack={() => setContent('markdown')}
      />
    </Container>
  );
}

export default DonateAll;
