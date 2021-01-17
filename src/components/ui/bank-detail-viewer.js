import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Alert, AlertDescription, Heading, Text } from '@chakra-ui/react';

function BankDetailViewer({ data }) {
  const { t } = useTranslation('bankTransferFlow');
  const infos = [
    { title: t('result.recipient'), value: 'Bilira Teknoloji A.Ş.' },
    { title: t('result.bankName'), value: data?.collectDonation?.bankName },
    { title: t('result.iban'), value: data?.collectDonation?.iban },
    { title: t('result.ref'), value: data?.collectDonation?.referenceCode },
  ];
  return (
    <Box>
      <Alert status="success">
        <AlertDescription>
          {t('thanks', { value: data?.collectDonation?.referenceCode })}
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
