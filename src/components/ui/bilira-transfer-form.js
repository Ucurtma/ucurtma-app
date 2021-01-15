import { useMutation } from '@apollo/client';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { COLLECT_DONATION } from '../../graphql/mutations';
import SelectBank from '../view/campaign/select-bank';
import Agreements from './agreements';
import Input from './input';
import NumberInput from './numeric-input';

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

function BiLiraTransferForm({ bankData }) {
  const { t } = useTranslation('bankTransferFlow');
  const [currentBank, setCurrentBank] = useState();
  const [
    collectDonation,
    { error: donationError, loading: donationLoading },
  ] = useMutation(COLLECT_DONATION, { onError: err => err });

  return (
    <>
      <SelectBank
        bankData={bankData}
        onSelect={bankId => setCurrentBank(bankId)}
        selectedBank={currentBank}
      />
      {currentBank && (
        <Formik
          initialValues={{
            email: '',
            amount: '',
            consentToReceiveNews: false,
            consentToUserAgreement: false,
          }}
          validationSchema={createSchema(100, t)}
          onSubmit={async values => {
            collectDonation({
              variables: {
                campaignCode: 'campaign-all',
                bankId: parseInt(currentBank, 10),
                email: values.email,
                amount: parseFloat(values.amount),
              },
              context: {
                headers: {
                  oauth2: `${localStorage.getItem('blAuth')}`,
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
                  // isLoading={isSubmitting || donationLoading}
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
      {donationLoading && <p>loading</p>}
      {donationError && <p>error</p>}
    </>
  );
}

export default BiLiraTransferForm;
