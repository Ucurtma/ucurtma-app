import { Box, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Card from '../../ui/card';

function PostContent() {
  const { t } = useTranslation('manager');
  return (
    <Card paddingType="default">
      <Helmet>
        <title>{`${t('PostContent.title')} - Uçurtma Projesi`}</title>
      </Helmet>
      <Heading mb={4} size="sm" color="gray.600">
        {t('PostContent.title')}
      </Heading>
      <Box mt={4}>
        <Formik
          initialValues={{}}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {() => <Form>Hello World</Form>}
        </Formik>
      </Box>
    </Card>
  );
}

export default PostContent;
