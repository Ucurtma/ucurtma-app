import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Heading, Box, Button, Textarea } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import Input from '../input';

const profileInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  countryOfResidence: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long'),
  aboutYou: Yup.string().min(2, 'Too Short'),
});

function ChangeProfileInfo({ withTitle }) {
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="paragraph">
          General Profile Information
        </Heading>
      )}
      <Formik
        initialValues={{
          name: '',
          email: '',
          countryOfResidence: '',
          aboutYou: '',
        }}
        validationSchema={profileInfoSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          // todo: change profile information.
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Input label="Name" name="name" type="text" />
            <Input label="Email" name="email" type="email" />
            {/* todo: make a select component for country of residence */}
            <Input
              label="Country of Residence"
              name="countryOfResidence"
              type="text"
            />
            <Input
              as={Textarea}
              label="About You"
              name="aboutYou"
              type="textarea"
            />

            <Box textAlign="right" mt={4}>
              <Button
                variant="outline"
                color="linkBlue"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Update Info
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

ChangeProfileInfo.defaultProps = {
  withTitle: true,
};

ChangeProfileInfo.propTypes = {
  withTitle: PropTypes.bool,
};

export default ChangeProfileInfo;
