import React from 'react';
import { Text, Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';

const reportCampaignSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

function ReportCampaignForm({ onSubmit, withTitle }) {
  const inputElements = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: '(ex. harry@potter.com)',
    },
  ];

  return (
    <>
      {withTitle && (
        <Text mb={4} fontSize="2xl">
          Forgot Password
        </Text>
      )}
      <Formik
        initialValues={{ email: '' }}
        validationSchema={reportCampaignSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          if (onSubmit) onSubmit(values);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            {inputElements.map((element, i) => (
              <Box mb={4} key={i.toString()}>
                <Input
                  label={element.label}
                  name={element.name}
                  type={element.type}
                  placeholder={element.placeholder}
                />
              </Box>
            ))}

            <Button
              width="100%"
              bg="primaryButton"
              fontWeight="regular"
              type="submit"
              size="lg"
              mt={2}
              isLoading={isSubmitting}
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ReportCampaignForm;
