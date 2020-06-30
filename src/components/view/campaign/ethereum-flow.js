import React from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/core';
import EthereumDetailViewer from '../../ui/ethereum-detail-viewer';

function EthereumFlow({ ethereumAddress }) {
  return (
    <>
      <Alert status="warning" bg="yellow.400" mt={2} mb={4}>
        <AlertIcon color="white" />
        <AlertDescription color="white">
          Bu kampanya sadece BiLira token&apos;ı kabul etmektedir. Bu kontrata
          göndereceğiniz diğer token&apos;lar geri döndürülemez biçimde
          kaybetmenize neden olacaktır.
        </AlertDescription>
      </Alert>
      <EthereumDetailViewer data={ethereumAddress} />
    </>
  );
}

export default EthereumFlow;
