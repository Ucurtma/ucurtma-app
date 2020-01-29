import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/core';

function BankTransferFlow({ ethereumAddress }) {
  return (
    <>
      <Box mt={2} mb={4}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription mr={2}>
            Bu kampanyaya şu anda sadece ethereum adresi üzerinden destek
            olabilirsiniz. Ekibimiz banka transferleri ile destek olabilmeniz
            için çalışmalarına devam etmektedir.
          </AlertDescription>
        </Alert>
      </Box>
    </>
  );
}

export default BankTransferFlow;
