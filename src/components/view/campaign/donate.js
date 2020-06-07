import React from 'react';
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
import EthereumFlow from './ethereum-flow';
import BankTransferFlow from './bank-transfer-flow';

const CustomRadio = React.forwardRef((props, ref) => {
  const { children, isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      color={isChecked ? 'linkBlue' : 'gray.400'}
      fontWeight={isChecked ? '700' : '400'}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      variant="unstyled"
      transition="0"
      _focus={{ outline: 'none' }}
      _hover={{ fontWeight: '700' }}
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
    <Flex transform="none" flexDir={{ base: 'column', md: 'row' }}>
      <Box w={{ base: '100%', lg: '30%' }}>
        <RadioButtonGroup
          defaultValue="bank-transfer"
          onChange={val => setDonateFlow(val)}
          display="flex"
          flexDir={{ base: 'row', md: 'column' }}
          isInline={{ base: true, md: false }}
          spacing={4}
        >
          <CustomRadio value="bank-transfer">Banka Havalesi</CustomRadio>
          {/* <CustomRadio value="ethereum-wallet">Ethereum Cüzdanı</CustomRadio> */}
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
          Geri Dön
        </Button>
      </Box>
      <Box
        w={{ base: '100%', lg: '70%' }}
        height="full"
        boxShadow="cardLight"
        padding={4}
      >
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
        {donateFlow === 'bank-transfer' && (
          <BankTransferFlow minimumAmount={minimumAmount} />
        )}
        {donateFlow === 'ethereum-wallet' && (
          <EthereumFlow ethereumAddress={ethereumAddress} />
        )}
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
        Geri Dön
      </Button>
    </Flex>
  );
}

export default Donate;
