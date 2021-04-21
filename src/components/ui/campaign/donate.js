import React, { Suspense } from 'react';
import {
  Button,
  Box,
  Flex,
  Icon,
  Alert,
  AlertIcon,
  CloseButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'react-feather';
import ReactGA from 'react-ga';
import BankTransferFlow from './bank-transfer-flow';
import Loader from '../loader';

const EthereumFlow = React.lazy(() => import('./ethereum-flow'));

const menuItems = ['ethereum-wallet'];

function Donate({ ethereumAddress, redirectError, minimumAmount, onBack }) {
  const { t } = useTranslation('donate');
  const [donateFlow, setDonateFlow] = React.useState(menuItems[0]);
  const [errorExist, setErrorExist] = React.useState(false);
  const [isDonateSuccess, setIsDonateSuccess] = React.useState(false);

  React.useEffect(() => {
    if (redirectError) {
      setErrorExist(true);
    }
  }, [redirectError]);

  return (
    <Flex
      transform="none"
      flexDir={{ base: 'column', md: 'row' }}
      mt={4}
      w="full"
    >
      <Box w="full" maxW={{ base: '100%', md: '276px' }}>
        {onBack && (
          <Button
            mt={4}
            display={{ base: 'none', md: 'block' }}
            onClick={onBack}
            bg="red.500"
            color="white"
            _hover={{ bg: 'red.700' }}
          >
            <Icon as={ArrowLeft} mr={4} />
            {t('backToCampaign')}
          </Button>
        )}
      </Box>
      <Box w="full" height="full" boxShadow="cardLight" padding={4}>
        {!isDonateSuccess && (
          <Box mb={4}>
            <Text fontWeight={600} mb={4}>
              Ödeme yöntemi seçiniz
            </Text>
            <HStack spacing={4} mb={{ base: 4, md: 0 }}>
              {menuItems.map(menuItem => (
                <Button
                  key={menuItem}
                  isActive={donateFlow === menuItem}
                  bg="gray.300"
                  color="gray.700"
                  _active={{
                    fontWeight: 600,
                    bg: 'gray.700',
                    color: 'gray.100',
                  }}
                  fontWeight={400}
                  _focus={{ outline: 'none' }}
                  onClick={() => {
                    setDonateFlow(menuItem);
                    ReactGA.event({
                      category: 'Donate',
                      action:
                        menuItem === 'bank-transfer'
                          ? 'Selected Bank Transfer'
                          : 'Selected Ethereum Wallet',
                      label: 'Selecting Payment Method',
                    });
                  }}
                >
                  {t(`options.${menuItem}`)}
                </Button>
              ))}
            </HStack>
          </Box>
        )}
        {errorExist && (
          <Alert status="error">
            <AlertIcon />
            {t('biLiraError')}
            <CloseButton
              onClick={() => setErrorExist(false)}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        )}
        <Suspense fallback={<Loader />}>
          {donateFlow === 'bank-transfer' && (
            <BankTransferFlow
              minimumAmount={minimumAmount}
              onSuccessDonate={() => setIsDonateSuccess(true)}
            />
          )}
          {donateFlow === 'ethereum-wallet' && (
            <EthereumFlow ethereumAddress={ethereumAddress} />
          )}
        </Suspense>
      </Box>
      {onBack && (
        <Button
          mt={4}
          display={{ base: 'block', md: 'none' }}
          onClick={onBack}
          bg="red.700"
          color="white"
          _hover={{ bg: 'red.900' }}
        >
          <Icon as={ArrowLeft} mr={4} />
          {t('backToCampaign')}
        </Button>
      )}
    </Flex>
  );
}

export default Donate;
