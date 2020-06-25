import React, { Suspense } from 'react';
import {
  Button,
  RadioButtonGroup,
  Box,
  Flex,
  Icon,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/core';
import { ArrowLeft } from 'react-feather';
import ReactGA from 'react-ga';
import BankTransferFlow from './bank-transfer-flow';
import Loader from '../../ui/loader';

const EthereumFlow = React.lazy(() => import('./ethereum-flow'));

const CustomRadio = React.forwardRef((props, ref) => {
  const { children, isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      color={isChecked ? 'linkBlue.400' : 'gray.400'}
      fontWeight={isChecked ? '700' : '400'}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      variant="unstyled"
      _focus={{ outline: 'none' }}
      _hover={{ fontWeight: '700' }}
      justifyContent={{ base: 'center', md: 'flex-start' }}
      px={{ md: 0 }}
      {...rest}
    >
      {children}
    </Button>
  );
});

function Donate({ ethereumAddress, redirectError, minimumAmount, onBack }) {
  const [donateFlow, setDonateFlow] = React.useState('bank-transfer');
  const [errorExist, setErrorExist] = React.useState(false);

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
        <RadioButtonGroup
          defaultValue="bank-transfer"
          onChange={val => {
            ReactGA.event({
              category: 'Donate',
              action:
                val === 'bank-transfer'
                  ? 'Selected Bank Transfer'
                  : 'Selected Ethereum Wallet',
              label: 'Selecting Payment Method',
            });
            setDonateFlow(val);
          }}
          display="flex"
          flexDir={{ base: 'row', md: 'column' }}
          isInline={{ base: true, md: false }}
          spacing={4}
          mb={{ base: 4, md: 0 }}
        >
          <CustomRadio width="full" value="bank-transfer">
            Banka Havalesi
          </CustomRadio>
          <CustomRadio width="full" value="ethereum-wallet">
            Ethereum Cüzdanı
          </CustomRadio>
        </RadioButtonGroup>
        <Button
          mt={4}
          display={{ base: 'none', md: 'block' }}
          onClick={onBack}
          bg="red.200"
          color="white"
          _hover={{ bg: 'red.400' }}
        >
          <Icon as={ArrowLeft} mr={4} />
          Kampanyaya Dön
        </Button>
      </Box>
      <Box w="full" height="full" boxShadow="cardLight" padding={4}>
        {errorExist && (
          <Alert status="error">
            <AlertIcon />
            BiLira ile iletişim kurulurken bir sorun yaşandı. Lütfen daha sonra
            tekrar deneyiniz.
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
            <BankTransferFlow minimumAmount={minimumAmount} />
          )}
          {donateFlow === 'ethereum-wallet' && (
            <EthereumFlow ethereumAddress={ethereumAddress} />
          )}
        </Suspense>
      </Box>
      <Button
        mt={4}
        display={{ base: 'block', md: 'none' }}
        onClick={onBack}
        bg="red.200"
        color="white"
        _hover={{ bg: 'red.400' }}
      >
        <Icon as={ArrowLeft} mr={4} />
        Kampanyaya Dön
      </Button>
    </Flex>
  );
}

export default Donate;
