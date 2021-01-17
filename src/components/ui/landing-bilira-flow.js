import React, { useState, useEffect } from 'react';
import {
  Alert,
  AlertDescription,
  Box,
  Button,
  Link,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AlertCircle } from 'react-feather';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_OAUTH_URL, GET_BANKS } from '../../graphql/queries';
import BiLiraTransferForm from './bilira-transfer-form';

const authQueryVariables = {
  campaignId: 'donate-all',
  returnUrl: 'https://destek.ucurtmaprojesi.com/auth/callback',
};

function LandingBiLiraFlow() {
  const [donationCollected, setDonationCollected] = useState(false);
  const toast = useToast();

  const [getAuthURL, { data: authData, loading: authLoading }] = useLazyQuery(
    GET_OAUTH_URL,
    {
      variables: authQueryVariables,
    }
  );

  const { data: bankData, loading: bankLoading } = useQuery(GET_BANKS, {
    context: { headers: { oauth2: localStorage.getItem('blAuth') } },
    skip: !localStorage.getItem('blAuth'),
    onError: error => {
      if (error.message.startsWith('401')) {
        localStorage.removeItem('blAuth');
        toast({
          status: 'error',
          title: 'Bir hata oluştu.',
          description:
            'BiLira hesabınıza bağlanamadık. Lütfen BiLira hesabınız ile giriş yapmayı tekrar deneyin.',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        getAuthURL();
      }
    },
  });

  useEffect(() => {
    if (!localStorage.getItem('blAuth')) {
      getAuthURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {authLoading && <Skeleton h="40px" w="full" borderRadius="11px" />}
          {authData && (
            <Button
              as={Link}
              href={authData.biliraOAuthUrl.authorizationUri}
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
