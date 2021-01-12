import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import EthereumDetailViewer from '../../ui/ethereum-detail-viewer';

function EthereumFlow({ ethereumAddress }) {
  const { t } = useTranslation('ethereumFlow');

  return (
    <>
      <Alert status="warning" bg="yellow.400" mt={2} mb={4}>
        <AlertIcon color="black" />
        <AlertDescription color="black">{t('onlyBiLira')}</AlertDescription>
      </Alert>
      <EthereumDetailViewer data={ethereumAddress} />
    </>
  );
}

export default EthereumFlow;
