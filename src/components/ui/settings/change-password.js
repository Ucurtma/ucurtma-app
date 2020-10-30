import React from 'react';
import * as Yup from 'yup';
import { Heading, Box, SimpleGrid, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { gql, useMutation } from '@apollo/client';
import Input from '../input';

const passwordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Too Short')
    .required('Password is required'),
  newPassword: Yup.string()
    .notOneOf(
      [Yup.ref('currentPassword'), null],
      'Password is same with old one'
    )
    .min(6, 'Too Short')
    .required('Password is required'),
  repeatNewPassword: Yup.string()
    .notOneOf(
      [Yup.ref('currentPassword'), null],
      'Password is same with old one'
    )
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .min(6, 'Too Short')
    .required('Required'),
});

const CHANGE_PASSWORD = gql`
  mutation updatePassword(
    $email: String!
    $currentPassword: String!
    $newPassword: String!
    $repeatNewPassword: String!
  ) {
    updatePassword(
      email: $email
      currentPassword: $currentPassword
      newPassword: $newPassword
      repeatNewPassword: $repeatNewPassword
    ) {
      token
      expiryDate
    }
  }
`;

function ChangePassword({ withTitle }) {
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="gray.600">
          Password
        </Heading>
      )}
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        }}
        validationSchema={passwordChangeSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await changePassword({
            variables: {
              email: Math.floor(Math.random() * 100), // todo: get email from db when it is ready
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
              repeatNewPassword: values.repeatNewPassword,
            },
          });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Box mb={4}>
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
              />
            </Box>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 0, lg: 16 }}
            >
              <Input label="Password" name="newPassword" type="password" />
              <Input
                label="Password Confirmation"
                name="repeatNewPassword"
                type="password"
              />
            </SimpleGrid>
            <Box textAlign="right">
              <Button
                variant="outline"
                color="blue.400"
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

export default ChangePassword;
