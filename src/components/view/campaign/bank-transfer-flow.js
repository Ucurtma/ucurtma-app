import React, { useEffect } from 'react';
import * as Yup from 'yup';
import {
  Box,
  Flex,
  Button,
  Alert,
  AlertIcon,
  Image,
  Skeleton,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Input from '../../ui/input';
import { getBiLiraToken, removeBiLiraToken } from '../../../utils/utils';
import LoginWithBiLira from './login-with-bilira';
import SelectBank from './select-bank';
import NumberInput from '../../ui/numeric-input';
import Agreements from '../../ui/agreements';
import BankDetailViewer from '../../ui/bank-detail-viewer';
import { GET_OAUTH_URL } from '../../../graphql/queries';
import CampaignError from './campaign-error';
import { COLLECT_DONATION } from '../../../graphql/mutations';

const GET_BANKS = gql`
  {
    systemBankAccounts {
      id
      name
      iban
    }
  }
`;

function createSchema(limit, t) {
  const donateSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('validation.required'))
      .email(t('validation.email')),
    amount: Yup.number()
      .min(limit || 100, t('validation.limit', { limit: limit || 100 }))
      .max(1500, t('validation.maxLimit', { limit: 1500 }))
      .typeError(t('validation.notNumber'))
      .required(t('validation.required')),
    consentToReceiveNews: Yup.boolean().oneOf([true], t('validation.consent')),
    consentToUserAgreement: Yup.boolean().oneOf(
      [true],
      t('validation.consent')
    ),
  });

  return donateSchema;
}

function BankTransferFlow({ minimumAmount, onSuccessDonate }) {
  const { t } = useTranslation('bankTransferFlow');
  const params = useParams();
  const [currentBank, setCurrentBank] = React.useState(-1);
  const [tokenRemoved, setTokenRemoved] = React.useState(false);
  const [getOauthUrl, { data: oauthData }] = useLazyQuery(GET_OAUTH_URL, {
    variables: {
      campaignId:
        params['*'] === 'campaign/donate-all' ? 'donate-all' : params.id,
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
    { data: donationData, error: donationError, loading: donationLoading },
  ] = useMutation(COLLECT_DONATION);

  React.useLayoutEffect(() => {
    const biLiraAuth = getBiLiraToken();
    if (biLiraAuth) {
      getBanks();
    } else {
      getOauthUrl();
    }
  }, [bankData, getBanks, getOauthUrl]);

  useEffect(() => {
    if (donationData) {
      if (onSuccessDonate) onSuccessDonate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationData]);

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
        <Alert mb={4} status="error">
          <AlertIcon />
          {t('error')}
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
    return <BankDetailViewer data={donationData} />;
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
            consentToUserAgreement: false,
          }}
          validationSchema={createSchema(minimumAmount, t)}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            collectDonation({
              variables: {
                campaignCode:
                  params['*'] === 'campaign/donate-all'
                    ? 'campaign-all'
                    : params.id,
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
                  label={t('inputs.email.label')}
                  name="email"
                  type="email"
                  placeholder={t('inputs.email.placeholder')}
                />

                <NumberInput
                  label={t('inputs.amount.label')}
                  name="amount"
                  type="number"
                  placeholder={t('inputs.amount.placeholder')}
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
              <Agreements
                kvkkName="consentToReceiveNews"
                agreementName="consentToUserAgreement"
              />
              <Flex
                alignItems="center"
                mt={4}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Button
                  variant="outline"
                  color="blue.400"
                  type="submit"
                  isLoading={isSubmitting || donationLoading}
                  disabled={isSubmitting || !dirty || !isValid}
                  width="full"
                >
                  {t('inputs.submit')}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
      {donationError && <CampaignError />}
    </Box>
  );
}

export default BankTransferFlow;
