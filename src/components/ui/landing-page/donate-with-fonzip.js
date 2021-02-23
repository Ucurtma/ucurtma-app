import { Box, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Checkbox from '../checkbox';
import Input from '../input';
import NumberInput from '../numeric-input';

const DonateWithFonzipSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Bu alan zorunludur.')
    .typeError('Geçerli bir rakam giriniz.'),
  email: Yup.string()
    .email('Lütfen geçerli bir mail adresi giriniz.')
    .required('Bu alan zorunludur.'),
  cardholder_name: Yup.string().required('Bu alan zorunludur.'),
});

function DonateWithFonzip() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation('donate-with-fonzip');
  const toast = useToast();

  const startFonzipProcess = values => {
    window.fz.bagis({
      api_key: process.env.FONZIP_API_KEY,
      amount: values.amount || 100,
      recurring: values.recurring,
      campaign: process.env.FONZIP_CAMPAIGN,
      referring: false,
      cardholder_name: values.cardholder_name,
      email: values.email,
      news_via_phone: false,
      news_via_sms: false,
      news_via_email: true,
      amount_visible: true,
      success: () => {
        toast({
          title: t('success.title'),
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
      error: () => {
        toast({
          title: t('error.title'),
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
      close: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <Box>
      <Helmet>
        <meta name="Referrer" content="origin" />
        <script
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
          crossOrigin="anonymous"
          async
        />
        <script
          type="text/javascript"
          src="https://s.fonzip.com/js/fonzip.loader.js"
          async
        />
      </Helmet>
      <Formik
        initialValues={{
          amount: 100,
          recurring: false,
          cardholder_name: '',
          email: '',
        }}
        validationSchema={DonateWithFonzipSchema}
        onSubmit={values => {
          setIsProcessing(true);
          startFonzipProcess(values);
        }}
      >
        {({ dirty, isValid }) => (
          <Form>
            <Input name="cardholder_name" label={t('cardholder_name')} />
            <Input type="email" name="email" label={t('email')} />
            <NumberInput
              label={t('amount')}
              name="amount"
              type="number"
              addon={{ left: 'TL' }}
            />
            <Checkbox name="recurring">{t('recurring')}</Checkbox>
            <Button
              type="submit"
              isDisabled={!isValid || !dirty}
              isLoading={isProcessing}
              w="full"
              colorScheme="blue"
            >
              {t('submit')}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default DonateWithFonzip;
