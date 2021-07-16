import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import React from 'react';
import { CheckCircle, Copy } from 'react-feather';
import { QRCode } from 'react-qr-svg';
import { ReactComponent as Avax } from '../assets/coins/avax.svg';

function PaymentMethodViewer({ alert, value, method }) {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Box>
      <Alert
        variant="solid"
        status={alert.status || 'error'}
        borderRadius="11px"
        width="unset"
        display="inline-flex"
      >
        <AlertIcon />
        <Box>
          <AlertTitle fontWeight={600}>{alert.title}</AlertTitle>
          <AlertDescription>{alert.desc}</AlertDescription>
        </Box>
      </Alert>
      <Flex direction={{ base: 'column', lg: 'row' }} align="center" mt={4}>
        <Box width="200px" pr={6} mr={2} mt={{ base: 4, lg: 0 }}>
          <QRCode bgColor="#FFFFFF" fgColor="#000000" level="Q" value={value} />
        </Box>
        <Box mt={{ base: 4, lg: 0 }} maxW="full">
          {method === 'bilira' && (
            <Box
              as={Avax}
              w="full"
              maxW="200"
              h="42"
              mb="4"
              mx={{ base: 'auto', lg: '0' }}
            />
          )}
          <Heading size="sm" as="h4" mb={2}>
            Göndereceğiniz adres
          </Heading>
          <Flex align="center">
            <Box
              borderRadius="11px"
              boxShadow="0px 0px 13px rgba(196, 196, 196, 0.45);"
              px={5}
              py={4}
              mr={2}
            >
              <Text wordBreak="break-all">{value}</Text>
            </Box>
            <IconButton
              variant="ghost"
              aria-label="Kopyala"
              icon={
                <Box as={hasCopied ? CheckCircle : Copy} w="16px" h="16px" />
              }
              onClick={onCopy}
              size="sm"
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default PaymentMethodViewer;
