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
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useLazyQuery } from '@apollo/react-hooks';
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

const donateSchema = Yup.object().shape({
  email: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/[^@]+@[^.]+\..+/, 'Geçerli bir email adresi girmelisiniz.'),
  amount: Yup.number()
    .typeError('Geçerli bir rakam giriniz.')
    .required('Bu alan zorunludur.'),
});

function BankTransferFlow() {
  const [currentBank, setCurrentBank] = React.useState(-1);

  const [getBanks, { error, data, loading }] = useLazyQuery(GET_BANKS, {
    context: {
      headers: {
        oauth2: getBiLiraToken(),
      },
    },
  });

  React.useLayoutEffect(() => {
    const biLiraAuth = getBiLiraToken();
    if (biLiraAuth) {
      getBanks();
    }
  }, [data, getBanks]);

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
      <Box mt={2} mb={4}>
        BiLira tokenı bulunamadı. Giriş için yönlendiriliyorsun..
      </Box>
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
