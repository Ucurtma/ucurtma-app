import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  Box,
  Button,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { AlertCircle } from 'react-feather';
import { useLazyQuery } from '@apollo/client';
import { GET_OAUTH_URL, GET_BANKS } from '../../graphql/queries';
import BiLiraTransferForm from './bilira-transfer-form';

function LandingBiLiraFlow() {
  const [donationCollected, setDonationCollected] = useState(false);
  const [getBiliraURL, { data, loading }] = useLazyQuery(GET_OAUTH_URL, {
    variables: {
      campaignId: 'donate-all',
      returnUrl: 'https://destek.ucurtmaprojesi.com/auth/callback',
    },
  });

  const [
    getBanks,
    { error: bankError, data: bankData, loading: bankLoading },
  ] = useLazyQuery(GET_BANKS, {
    context: {
      headers: {
        oauth2: localStorage.getItem('blAuth'),
      },
    },
  });

  useEffect(() => {
    if (localStorage.getItem('blAuth')) {
      getBanks();
    } else {
      getBiliraURL();
    }
  }, [getBanks, getBiliraURL]);

  return (
    <>
      {!donationCollected && (
        <Alert
          alignItems="flex-start"
          borderRadius="11px"
          bg="gray.800"
          color="white"
        >
          <Box as={AlertCircle} flexShrink={0} mr={2} />
          <AlertDescription>
            <Text as="p">
              Yapacağınız destekleri güvenli ve hızlı bir şekilde öğrencimize
              ulaştırabilmek için BiLira ile çalışıyoruz.
            </Text>
            <Text as="p" mt={4}>
              Aşağıdaki butonu kullanarak hızlıca hesap oluşturabilir, varolan
              hesabınızla transferi yapacağınız banka hesabına kolayca
              ulaşabilirsiniz.
            </Text>
          </AlertDescription>
        </Alert>
      )}
      {!donationCollected && (
        <Box mt={4}>
          {loading && <Skeleton h="40px" w="full" borderRadius="11px" />}
          {data && (
            <Button
              as={Link}
              href={data.biliraOAuthUrl.authorizationUri}
              w="full"
              boxShadow="modern"
              colorScheme="orange"
            >
              BiLira ile giriş yap
            </Button>
          )}
        </Box>
      )}
      <Box>
        {bankLoading && <Skeleton h="40px" w="full" borderRadius="11px" />}
        {bankError && <Box>error</Box>}
        {bankData && (
          <Box mt={donationCollected ? 0 : 2}>
            <BiLiraTransferForm
              bankData={bankData}
              onCollectDonation={() => setDonationCollected(true)}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default LandingBiLiraFlow;
