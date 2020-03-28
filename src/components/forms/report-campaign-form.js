import React, { useRef, useState } from 'react';
import { Box, Button, Alert, AlertIcon } from '@chakra-ui/core';
import Reaptcha from 'reaptcha';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';
import Textarea from '../ui/text-area';
import config from '../../config';

const reportCampaignSchema = Yup.object().shape({
  from: Yup.string().required('Bu alan zorunludur.'),
  contactMail: Yup.string()
    .email('Lütfen geçerli bir mail adresi giriniz.')
    .required('Bu alan zorunludur.'),
  reason: Yup.string().required('Lütfen şikayetinizi yazınız.'),
});

const REPORT_CAMPAIGN = gql`
  mutation ReportCampaign(
    $from: String!
    $contactMail: String!
    $reason: String!
    $campaignId: String!
  ) {
    reportCampaign(
      from: $from
      contactMail: $contactMail
      reason: $reason
      campaignId: $campaignId
    ) {
      reportId
    }
  }
`;

function ReportCampaignForm({ onSubmit, campaignId }) {
  const [reportCampaign, { loading, error, data }] = useMutation(
    REPORT_CAMPAIGN
  );
  const [verified, setVerified] = useState(false);
  const captcha = useRef(null);
  const inputElements = [
    {
      label: 'Ad soyad',
      name: 'from',
      placeholder: 'James Bond',
    },
    {
      label: 'Email',
      name: 'contactMail',
      type: 'email',
      placeholder: '(ex. james@bond.com)',
    },
    {
      component: Textarea,
      label: 'Şikayetiniz',
      name: 'reason',
    },
  ];

  return (
    <>
      <Formik
        initialValues={{ from: '', contactMail: '', reason: '' }}
        validationSchema={reportCampaignSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          reportCampaign({
            variables: {
              ...values,
              campaignId,
            },
            context: {
              headers: {
                captcha: verified,
              },
            },
          });
          if (onSubmit) onSubmit(values);
        }}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <Form>
            {inputElements.map((element, i) => {
              const Component = element.component ? element.component : Input;

              return (
                <Box mb={4} key={i.toString()}>
                  <Component
                    label={element.label}
                    name={element.name}
                    type={element.type}
                    placeholder={element.placeholder}
                  />
                </Box>
              );
            })}

            <Reaptcha
              ref={captcha}
              sitekey={config.recaptcha}
              onVerify={response => {
                setVerified(response);
                handleSubmit();
              }}
              size="invisible"
            />

            <Button
              type="button"
              width="100%"
              bg="primaryButton"
              fontWeight="regular"
              size="lg"
              mt={2}
              isLoading={loading}
              disabled={
                data ||
                isSubmitting ||
                loading ||
                Object.keys(errors).length > 0
              }
              onClick={() => captcha.current.execute()}
            >
              Şikayeti Gönder
            </Button>
          </Form>
        )}
      </Formik>
      {(data || error) && (
        <Alert mt={4} status={error ? 'error' : 'success'}>
          <AlertIcon />
          {error
            ? 'Bir hata oluştu, lütfen tekrar deneyiniz.'
            : 'Şikayetiniz başarıyla iletilmiştir. Teşekkürler.'}
        </Alert>
      )}
    </>
  );
}

export default ReportCampaignForm;
