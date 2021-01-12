import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import PaymentMethods from './payment-methods';

function LandingPayment() {
  const [selectedMethod, setSelectedMethod] = useState();

  return (
    <div>
      <Box mt={7}>
        <PaymentMethods
          activeMethod={selectedMethod}
          onSelect={method => setSelectedMethod(method)}
        />
      </Box>
      {selectedMethod && (
        <Box
          mt={6}
          px={5}
          py={6}
          boxShadow="0px 0px 13px rgba(196, 196, 196, 0.45)"
        >
          {selectedMethod.slug === 'bilira' && <p>bi lira</p>}
          {selectedMethod.slug === 'ethereum' && <p>ethereum</p>}
          {selectedMethod.slug === 'bitcoin' && <p>bitcoin</p>}
          {selectedMethod.slug === 'para-transferi' && <p>para-transferi</p>}
        </Box>
      )}
    </div>
  );
}

export default LandingPayment;
