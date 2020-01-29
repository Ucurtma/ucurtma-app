import React from 'react';
import {
  Flex,
  Link,
  Image,
  Box,
  Text,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/core';

function EthereumFlow({ ethereumAddress }) {
  return (
    <>
      <Box mt={2} mb={4}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription mr={2}>
            Bu kampanya sadece BiLira token'ı kabul etmektedir. Bu kontrata
            göndereceğiniz diğer token'lar geri döndürülemez biçimde
            kaybetmenize neden olacaktır.
          </AlertDescription>
        </Alert>
      </Box>
      <Flex align="center">
        <Link
          mr={4}
          isExternal
          href={`https://etherscan.io/address/${ethereumAddress}`}
        >
          <Image
            flexShrink="0"
            src={`https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=${ethereumAddress}`}
          />
        </Link>
        <Box>
          <Heading size="sm">Ethereum Adresi:</Heading>{' '}
          <Text wordBreak="break-all">{ethereumAddress}</Text>
        </Box>
      </Flex>
    </>
  );
}

export default EthereumFlow;
