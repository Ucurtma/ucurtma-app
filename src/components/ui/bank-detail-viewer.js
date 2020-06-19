import React from 'react';
import { Box, Alert, AlertDescription, Heading, Text } from '@chakra-ui/core';

function BankDetailViewer({ data }) {
  const infos = [
    { title: 'Alıcı İsmi', value: 'Bilira Teknoloji A.Ş.' },
    { title: 'Banka Adı', value: data?.collectDonation?.bankName },
    { title: 'IBAN Numarası', value: data?.collectDonation?.iban },
    { title: 'Referans Kodu', value: data?.collectDonation?.referenceCode },
  ];
  return (
    <Box>
      <Alert status="success">
        <AlertDescription>
          Gönderdiğiniz destek için teşekkürler. Desteğinizin onaylanması için
          seçtiğiniz bankadan, aşağıda bilgileri verilen hesaba açıklamasına{' '}
          <strong>{data?.collectDonation?.referenceCode}</strong> yazarak
          desteklediğiniz kadar ücreti göndermeniz gerekmektedir.
        </AlertDescription>
      </Alert>
      <Box mt={4}>
        {infos.map((info, infoIndex) => (
          <Box mb={4} key={infoIndex.toString()}>
            <Heading size="sm">{info.title}</Heading>
            <Text>
              {info.value ||
                'Veriye ulaşılamadı, lütfen daha sonra tekrar deneyiniz.'}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default BankDetailViewer;
