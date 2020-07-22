import React from 'react';
import { Flex, Link, Box, Heading, Text } from '@chakra-ui/core';
import { QRCode } from 'react-qr-svg';
import { useTranslation } from 'react-i18next';

function EthereumDetailViewer({ data }) {
  const { t } = useTranslation('ethereumFlow');

  return (
    <Flex align="center">
      <Link mr={4} isExternal href={`https://etherscan.io/address/${data}`}>
        <Box flexShrink="0">
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 200, padding: '1rem' }}
            value={data}
          />
        </Box>
      </Link>
      <Box>
        <Box mb={4}>
          <Heading size="sm">{t('ethereumAddress')}</Heading>
          <Text wordBreak="break-all">{data}</Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default EthereumDetailViewer;
