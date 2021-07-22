import React from 'react';
import { Button, Box, Flex, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'react-feather';
import EthereumFlow from './ethereum-flow';

function Donate({ ethereumAddress, avalancheAddress, onBack }) {
  const { t } = useTranslation('donate');

  return (
    <Flex
      transform="none"
      flexDir={{ base: 'column', md: 'row' }}
      mt="4"
      w="full"
    >
      <Box w="full" height="full" borderRadius="md">
        <Box mb={4}>
          {onBack && (
            <Button
              display={{ base: 'none', md: 'block' }}
              onClick={onBack}
              variant="ghost"
              colorScheme="blackAlpha"
            >
              <Icon as={ArrowLeft} mr={4} />
              {t('backToCampaign')}
            </Button>
          )}
        </Box>
        <EthereumFlow address={avalancheAddress || ethereumAddress} />
      </Box>
      {onBack && (
        <Button
          display={{ base: 'block', md: 'none' }}
          onClick={onBack}
          variant="ghost"
          colorScheme="blackAlpha"
        >
          <Icon as={ArrowLeft} mr={4} />
          {t('backToCampaign')}
        </Button>
      )}
    </Flex>
  );
}

export default Donate;
