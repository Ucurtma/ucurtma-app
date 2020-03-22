import React from 'react';
import { Button, RadioButtonGroup, Box, Flex } from '@chakra-ui/core';
import EthereumFlow from './ethereum-flow';
import BankTransferFlow from './bank-transfer-flow';

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      color={isChecked ? 'linkBlue' : 'gray.400'}
      fontWeight={isChecked ? '700' : '400'}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      variant="unstyled"
      {...rest}
    />
  );
});

function Donate({ ethereumAddress }) {
  const [donateFlow, setDonateFlow] = React.useState('bank-transfer');

  return (
    <Flex transform="none">
      <RadioButtonGroup
        defaultValue="bank-transfer"
        onChange={val => setDonateFlow(val)}
        display="flex"
        flexDir="column"
      >
        <CustomRadio value="bank-transfer">Banka Havalesi</CustomRadio>
        <CustomRadio value="ethereum-wallet">Ethereum Cüzdanı</CustomRadio>
      </RadioButtonGroup>
      {donateFlow === 'ethereum-wallet' && (
        <EthereumFlow ethereumAddress={ethereumAddress} />
      )}
      {donateFlow === 'bank-transfer' && <BankTransferFlow />}
    </Flex>
  );
}

export default Donate;
