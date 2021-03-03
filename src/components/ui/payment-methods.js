import { Box, Button, Flex, Link } from '@chakra-ui/react';
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
import { ReactComponent as CreditCardWhite } from '../assets/coins/credit-card-white.svg';

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
      {
        type: t('options.fonzip'),
        slug: 'fonzip',
        icon: {
          dark: CreditCardWhite,
          light: CreditCardWhite,
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction={{ base: 'column', lg: 'row' }} flexWrap="wrap">
      {methods.map(method => {
        const isActive = activeMethod?.slug === method.slug;
        if (method.slug !== 'fonzip') {
          return (
            <Button
              key={method.slug}
              variant="solid"
              color={method.slug === 'fonzip' ? 'white' : 'black'}
              boxShadow="modern"
              py={3}
              px={5}
              h="unset"
              onClick={() => onSelect(method)}
              justifyContent={{ base: 'flex-start', lg: 'center' }}
              isActive={isActive}
              _active={{
                bg: method.slug === 'fonzip' ? 'blue.700' : 'green.400',
                color: 'white',
              }}
              mb={6}
              mr={2}
              colorScheme={method.slug === 'fonzip' ? 'blue' : 'white'}
            >
              <Box
                as={isActive ? method.icon.light : method.icon.dark}
                mr={4}
                flexShrink={0}
                w="27px"
                color="white"
              />
              {method.type}
            </Button>
          );
        }

        return (
          <Button
            as={Link}
            key={method.slug}
            variant="solid"
            color={method.slug === 'fonzip' ? 'white' : 'black'}
            boxShadow="modern"
            py={3}
            px={5}
            h="unset"
            justifyContent={{ base: 'flex-start', lg: 'center' }}
            mb={6}
            mr={2}
            colorScheme="orange"
            isExternal
            href="https://fonzip.com/lunadao/ucurtma"
            _hover={{
              textDecor: 'none',
            }}
          >
            <Box
              as={isActive ? method.icon.light : method.icon.dark}
              mr={4}
              flexShrink={0}
              w="27px"
              color="white"
            />
            {method.type}
          </Button>
        );
      })}
    </Flex>
  );
}

export default PaymentMethods;
