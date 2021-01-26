import { Box, Button, Stack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BiLira } from '../assets/coins/bilira.svg';
import { ReactComponent as Ethereum } from '../assets/coins/ethereum.svg';
import { ReactComponent as Bitcoin } from '../assets/coins/bitcoin.svg';
import { ReactComponent as BankTransfer } from '../assets/coins/bank-transfer.svg';
import { ReactComponent as BiLiraWhite } from '../assets/coins/bilira-white.svg';
import { ReactComponent as EthereumWhite } from '../assets/coins/ethereum-white.svg';
import { ReactComponent as BitcoinWhite } from '../assets/coins/bitcoin-white.svg';
import { ReactComponent as BankTransferWhite } from '../assets/coins/bank-transfer-white.svg';

function PaymentMethods({ onSelect, activeMethod }) {
  const { t } = useTranslation('donate-section');

  const methods = useMemo(() => {
    return [
      {
        type: t('options.bilira'),
        slug: 'bilira',
        icon: {
          dark: BiLira,
          light: BiLiraWhite,
        },
      },
      {
        type: t('options.ethereum'),
        slug: 'ethereum',
        icon: {
          dark: Ethereum,
          light: EthereumWhite,
        },
      },
      {
        type: t('options.bitcoin'),
        slug: 'bitcoin',
        icon: {
          dark: Bitcoin,
          light: BitcoinWhite,
        },
      },
      {
        type: t('options.bank'),
        slug: 'para-transferi',
        icon: {
          dark: BankTransfer,
          light: BankTransferWhite,
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing={4}>
      {methods.map(method => {
        const isActive = activeMethod?.slug === method.slug;
        return (
          <Button
            key={method.slug}
            variant="solid"
            bg="white"
            boxShadow="modern"
            py={3}
            px={5}
            h="unset"
            onClick={() => onSelect(method)}
            justifyContent={{ base: 'flex-start', lg: 'center' }}
            isActive={isActive}
            _active={{
              bg: 'green.400',
              color: 'white',
            }}
          >
            <Box as={isActive ? method.icon.light : method.icon.dark} mr={4} />
            {method.type}
          </Button>
        );
      })}
    </Stack>
  );
}

export default PaymentMethods;
