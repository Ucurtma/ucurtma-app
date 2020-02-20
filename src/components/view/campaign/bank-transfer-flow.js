import React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Checkbox,
  Flex,
  Button,
  Alert,
  AlertIcon,
  Image,
  Stack,
  Link,
  Text,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import Input from '../../ui/input';
import Loader from '../../ui/loader';
import { getBiLiraToken } from '../../../utils/utils';

const GET_BANKS = gql`
  {
    systemBankAccounts {
      id
      name
      iban
    }
  }
`;

const GET_OAUTH_URL = gql`
  {
    biliraOAuthUrl {
      authorizationUri
    }
  }
`;

const donateSchema = Yup.object().shape({
  email: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/[^@]+@[^.]+\..+/, 'Geçerli bir email adresi girmelisiniz.'),
  amount: Yup.number()
    .typeError('Geçerli bir rakam giriniz.')
    .required('Bu alan zorunludur.'),
});

function BankTransferFlow() {
  const params = useParams();
  const [currentBank, setCurrentBank] = React.useState(-1);
  const [getOauthUrl, oauthResponse] = useLazyQuery(GET_OAUTH_URL);
  const [getBanks, { error, data, loading }] = useLazyQuery(GET_BANKS, {
    context: {
      headers: {
        oauth2: getBiLiraToken(),
      },
    },
  });

  console.log(params);

  React.useLayoutEffect(() => {
    const biLiraAuth = getBiLiraToken();
    if (biLiraAuth) {
      getBanks();
    } else {
      getOauthUrl();
    }
  }, [data, getBanks, getOauthUrl]);

  if (loading)
    return (
      <Box textAlign="center">
        <Loader />
      </Box>
    );
  if (error) {
    return (
      <Box mt={2} mb={4}>
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request.
        </Alert>
      </Box>
    );
  }

  // todo: make redirect after biLira oauth is done.
  if (!getBiLiraToken()) {
    return (
      <Link href={oauthResponse.data?.biliraOAuthUrl.authorizationUri}>
        <Button bg="#04144c" _hover={{ bg: '#020c2d' }} color="#fff">
          <Image
            alt="Login with BiLira"
            src={`${process.env.PUBLIC_URL}/images/bilira-logo.svg`}
            w="80px"
          />
          <Text ml={2} fontWeight={400}>
            ile giriş yap
          </Text>
        </Button>
      </Link>
    );
  }

  return (
    <Box mt={2} mb={4}>
      {data && (
        <Stack isInline mb={4}>
          {data.systemBankAccounts.map(bankAccount => (
            <Button
              key={bankAccount.id}
              variant="ghost"
              border="1px solid"
              borderColor="gray.100"
              onClick={() => setCurrentBank(bankAccount.id)}
              bg={currentBank === bankAccount.id ? 'gray.100' : 'transparent'}
            >
              <Image
                alt={bankAccount.name}
                src={`${process.env.PUBLIC_URL}/images/banks/${bankAccount.id}.png`}
              />
            </Button>
          ))}
        </Stack>
      )}
      {currentBank !== -1 && (
        <Formik
          initialValues={{
            email: '',
            amount: '',
            consentToReceiveNews: false,
          }}
          validationSchema={donateSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Box>
                <Input label="E-Posta Adresi" name="email" type="email" />
                <Input label="Destek Miktarı" name="amount" />
              </Box>
              <Checkbox name="consentToReceiveNews">
                Uçurtma ekibinin benimle iletişime geçmesine ve verilerimi
                güvenli bir şekilde saklamasına izin veriyorum.
              </Checkbox>
              <Flex
                alignItems="center"
                mt={4}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Button
                  variant="outline"
                  color="linkBlue"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  width={{ base: '100%', md: 'auto' }}
                >
                  Gönder
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
}

export default BankTransferFlow;
