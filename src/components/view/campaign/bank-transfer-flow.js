import React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Image,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import gql from 'graphql-tag';
import Input from '../../ui/input';
import { getBiLiraToken, removeBiLiraToken } from '../../../utils/utils';
import LoginWithBiLira from './login-with-bilira';
import SelectBank from './select-bank';
import NumberInput from '../../ui/numeric-input';
import Agreements from '../../ui/agreements';

// todo: make different component for functions in this file.

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
  query biliraOAuthUrl($campaignId: String!) {
    biliraOAuthUrl(campaignId: $campaignId) {
      authorizationUri
    }
  }
`;

const COLLECT_DONATION = gql`
  mutation collectDonation(
    $campaignCode: String!
    $bankId: Int
    $email: String!
    $amount: Float!
  ) {
    collectDonation(
      campaignCode: $campaignCode
      bankId: $bankId
      email: $email
      amount: $amount
    ) {
      iban
      bankName
      referenceCode
    }
  }
`;

function createSchema(limit) {
  const donateSchema = Yup.object().shape({
    email: Yup.string()
      .required('Bu alan zorunludur.')
      .matches(/[^@]+@[^.]+\..+/, 'Geçerli bir email adresi girmelisiniz.'),
    amount: Yup.number()
      .min(
        limit || 100,
        `Girdiğiniz değer ${limit || 100} değerinden küçük olamaz`
      )
      .max(1500, `Girdiğiniz değer 1500'den büyük olamaz`)
      .typeError('Geçerli bir rakam giriniz.')
      .required('Bu alan zorunludur.'),
    consentToReceiveNews: Yup.boolean().oneOf(
      [true],
      'Şartları onaylamanız gerekmektedir.'
    ),
  });

  return donateSchema;
}

function BankTransferFlow({ minimumAmount }) {
  const params = useParams();
  const [currentBank, setCurrentBank] = React.useState(-1);
  const [tokenRemoved, setTokenRemoved] = React.useState(false);
  const [getOauthUrl, { data: oauthData }] = useLazyQuery(GET_OAUTH_URL, {
    variables: {
      campaignId: params.id,
    },
  });
  const [
    getBanks,
    { error: bankError, data: bankData, loading: bankLoading },
  ] = useLazyQuery(GET_BANKS, {
    context: {
      headers: {
        oauth2: getBiLiraToken(),
      },
    },
  });
  const [
    collectDonation,
    { data: donationData, loading: donationLoading },
  ] = useMutation(COLLECT_DONATION);

  React.useLayoutEffect(() => {
    const biLiraAuth = getBiLiraToken();
    if (biLiraAuth) {
      getBanks();
    } else {
      getOauthUrl();
    }
  }, [bankData, getBanks, getOauthUrl]);

  if (bankLoading) {
    return (
      <Box textAlign="center">
        <Skeleton count={4} />
      </Box>
    );
  }

  if (bankError) {
    bankError.graphQLErrors.forEach(error => {
      if (error.extensions.exception.statusCode === 401 && !tokenRemoved) {
        removeBiLiraToken();
        setTokenRemoved(true);
        getOauthUrl();
      }
    });

    return (
      <Box mt={2} mb={4}>
        <Alert status="error">
          <AlertIcon />
          Bir hata oluştu.
        </Alert>
        {oauthData && (
          <LoginWithBiLira
            mt={4}
            href={oauthData.biliraOAuthUrl.authorizationUri}
          />
        )}
      </Box>
    );
  }
  if (!getBiLiraToken() && oauthData) {
    return <LoginWithBiLira href={oauthData.biliraOAuthUrl.authorizationUri} />;
  }

  if (donationData) {
    const { bankName, iban, referenceCode } = donationData.collectDonation;
    return (
      <Box>
        <Alert status="success">
          <AlertDescription>
            Gönderdiğiniz destek için teşekkürler. Gönderdiğiniz desteğin
            onaylanması için{' '}
            <strong>
              {bankName} {iban}
            </strong>{' '}
            IBAN numarasına, Alıcı ismini <strong>Bilira Teknoloji A.Ş</strong>{' '}
            olarak belirtmek ve açıklamasına <strong>{referenceCode}</strong>{' '}
            yazarak desteklediğiniz kadar ücreti göndermeniz gerekmektedir.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box mt={2} mb={4}>
      {bankData && (
        <SelectBank
          bankData={bankData}
          onSelect={bankId => setCurrentBank(bankId)}
          selectedBank={currentBank}
        />
      )}
      {currentBank !== -1 && (
        <Formik
          initialValues={{
            email: '',
            amount: '',
            consentToReceiveNews: false,
          }}
          validationSchema={createSchema(minimumAmount)}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            collectDonation({
              variables: {
                campaignCode: params.id,
                bankId: parseInt(currentBank, 10),
                email: values.email,
                amount: parseFloat(values.amount),
              },
              context: {
                headers: {
                  oauth2: getBiLiraToken(),
                },
              },
            });
          }}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form data-private>
              <Box>
                <Input
                  label="E-Posta Adresi"
                  name="email"
                  type="email"
                  placeholder="Email adresinizi giriniz"
                />

                <NumberInput
                  label="Destek Miktarı"
                  name="amount"
                  type="number"
                  placeholder="Destek Miktarını giriniz"
                  addon={{
                    left: (
                      <Image
                        maxW="12px"
                        width="full"
                        height="full"
                        src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                        mr={1}
                      />
                    ),
                  }}
                />
              </Box>
              <Agreements />
              <Flex
                alignItems="center"
                mt={4}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Button
                  variant="outline"
                  color="linkBlue"
                  type="submit"
                  isLoading={isSubmitting || donationLoading}
                  disabled={isSubmitting || !dirty || !isValid}
                  width="full"
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
