import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import EthereumDetailViewer from '../ethereum-detail-viewer';

function EthereumFlow({ address }) {
  const { t } = useTranslation('ethereumFlow');

  return (
    <>
      <Alert
        status="error"
        variant="solid"
        mt="6"
        mb="4"
        maxW="container.md"
        borderRadius="md"
      >
        <AlertIcon />
        <Box>
          <AlertTitle fontWeight="600">{t('onlyBiLira')}</AlertTitle>
          <AlertDescription>{t('onlyBiLiraDesc')}</AlertDescription>
        </Box>
      </Alert>
      <EthereumDetailViewer data={address} />
    </>
  );
}

export default EthereumFlow;
