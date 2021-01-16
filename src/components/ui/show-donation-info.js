import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { CheckCircle, Copy } from 'react-feather';
import copy from 'copy-to-clipboard';

function ShowDonationInfo({ bankName, iban, refCode, amount }) {
  const [copiedValue, setCopiedValue] = useState();
  const showValues = useMemo(() => {
    return [
      {
        title: 'Alıcı İsmi',
        value: 'Bilira Teknoloji A.Ş.',
      },
      {
        title: 'Banka Adı',
        value: bankName,
      },
      {
        title: 'IBAN',
        value: iban,
      },
      {
        title: 'Referans Kodu',
        value: refCode,
      },
      {
        title: 'Göndereceğiniz Miktar',
        value: `${amount} TL`,
      },
    ];
  }, [amount, bankName, iban, refCode]);

  return (
    <Box>
      <Alert alignItems="flex-start" borderRadius="11px" variant="solid" mb={4}>
        <Box as={CheckCircle} flexShrink={0} mr={4} />
        <Box>
          <AlertTitle mb={2}>Desteğiniz başarıyla oluşturulmuştur.</AlertTitle>
          <AlertDescription>
            <Text>
              Gönderdiğiniz destek için teşekkürler. Desteğinizin onaylanması
              için aşağıda bilgileri yer alan <strong>{bankName}</strong>{' '}
              hesabına, açıklamasına <strong>{refCode}</strong> yazarak{' '}
              <strong>{amount} TL</strong> göndermeniz gerekmektedir.
            </Text>
          </AlertDescription>
        </Box>
      </Alert>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacingX={6} spacingY={4}>
        {showValues.map(item => (
          <Box key={item.title} w="full">
            <Heading size="sm" as="h4" mb={2}>
              {item.title}
            </Heading>
            <Flex align="center">
              <Box
                borderRadius="11px"
                boxShadow="0px 0px 13px rgba(196, 196, 196, 0.45);"
                px={5}
                py={4}
                mr={2}
                w="full"
              >
                <Text>{item.value}</Text>
              </Box>
              <IconButton
                variant="ghost"
                aria-label="Kopyala"
                onClick={() => {
                  setCopiedValue(item.value);
                  copy(item.value);
                }}
                icon={
                  <Box
                    as={copiedValue === item.value ? CheckCircle : Copy}
                    w="16px"
                    h="16px"
                  />
                }
                onBlur={() => setCopiedValue()}
                size="sm"
              />
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ShowDonationInfo;
