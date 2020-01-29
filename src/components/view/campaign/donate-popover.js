import React from 'react';
import {
  Popover,
  PopoverTrigger,
  Button,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  RadioButtonGroup,
  PopoverBody,
  ModalOverlay,
} from '@chakra-ui/core';
import { Award } from 'react-feather';
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
      variant="ghost"
      {...rest}
    />
  );
});

function DonatePopover({ ethereumAddress }) {
  const [donateFlow, setDonateFlow] = React.useState('ethereum-wallet');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      isOpen={isOpen}
      placement="bottom-end"
      usePortal
      closeOnBlur={false}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button
          variant="solid"
          bg="gray.100"
          h={16}
          width={{ base: 'auto', md: '368px' }}
          flexShrink="0"
          justifyContent="space-between"
          boxShadow="0 0 12px rgba(124, 124, 124, 0.16)"
          onClick={() => setIsOpen(true)}
          zIndex={2000}
        >
          Destek Ol
          <Icon as={Award} size="28px" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        zIndex={2000}
        minW={{ base: 'auto', md: '600px' }}
        transform="none"
        _focus={{ boxShadow: 0 }}
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <RadioButtonGroup
            defaultValue="ethereum-wallet"
            onChange={val => setDonateFlow(val)}
            isInline
          >
            <CustomRadio value="ethereum-wallet">Ethereum Cüzdanı</CustomRadio>
            <CustomRadio value="bank-transfer">Banka Havalesi</CustomRadio>
          </RadioButtonGroup>
        </PopoverHeader>
        <PopoverBody>
          {donateFlow === 'ethereum-wallet' && (
            <EthereumFlow ethereumAddress={ethereumAddress} />
          )}
          {donateFlow === 'bank-transfer' && (
            <BankTransferFlow ethereumAddress={ethereumAddress} />
          )}
        </PopoverBody>
      </PopoverContent>
      {isOpen && <ModalOverlay onClick={() => setIsOpen(false)} />}
    </Popover>
  );
}

export default DonatePopover;
