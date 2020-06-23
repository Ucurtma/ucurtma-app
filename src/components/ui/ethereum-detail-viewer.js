import React from 'react';
import { Flex, Link, Box, Heading, Text } from '@chakra-ui/core';
import { QRCode } from 'react-qr-svg';

function EthereumDetailViewer({ data }) {
  return (
    <Flex align="center">
      <Link
        mr={4}
        isExternal
        href={`https://etherscan.io/address/${data.collectEthDonation.address}`}
      >
        <Box flexShrink="0">
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 200, padding: '1rem' }}
            value={`https://etherscan.io/address/${data.collectEthDonation.address}`}
          />
        </Box>
        {/* <Image
          flexShrink="0"
          src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${data.collectEthDonation.address}`}
        /> */}
      </Link>
      <Box>
        <Box mb={4}>
          <Heading size="sm">Ethereum Adresi:</Heading>
          <Text wordBreak="break-all">{data.collectEthDonation.address}</Text>
        </Box>
        <Box>
          <Heading size="sm">Göndereceğiniz Destek Miktarı:</Heading>
          <Text wordBreak="break-all">{data.collectEthDonation.amount}</Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default EthereumDetailViewer;
