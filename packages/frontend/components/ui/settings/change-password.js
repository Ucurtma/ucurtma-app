import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Heading, Box, SimpleGrid, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import Input from '../input';

const passwordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Too Short')
    .required('Password is required'),
  password: Yup.string()
    .notOneOf([Yup.ref('oldPassword'), null], 'Password is same with old one')
    .min(6, 'Too Short')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .notOneOf([Yup.ref('oldPassword'), null], 'Password is same with old one')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(6, 'Too Short')
    .required('Required'),
});

function ChangePassword({ withTitle }) {
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="paragraph">
          Password
        </Heading>
      )}
      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={passwordChangeSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          // todo: change password.
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Box mb={4}>
              <Input label="Old Password" name="oldPassword" type="password" />
            </Box>
            <SimpleGrid
              columns={{
                base: 1,
                lg: 2,
              }}
              spacing={{
                base: 0,
                lg: 16,
              }}
            >
              <Input label="Password" name="password" type="password" />
              <Input
                label="Password Confirmation"
                name="passwordConfirmation"
                type="password"
              />
            </SimpleGrid>
            <Box textAlign="right">
              <Button
                variant="outline"
                color="linkBlue"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Update Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

ChangePassword.defaultProps = {
  withTitle: true,
};

ChangePassword.propTypes = {
  withTitle: PropTypes.bool,
};

export default ChangePassword;
