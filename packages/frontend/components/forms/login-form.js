import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import NextLink from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { Text, Box, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';
import { withApollo } from '../../utils/apollo';
import Button from '../ui/button';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short')
    .required('Password is required'),
});

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      expiryDate
    }
  }
`;

function LoginForm({ onSubmit, withTitle }) {
  const inputElements = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: '(ex. harry@potter.com)',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '(ex. #49sd2YXBKX%XZ)',
    },
  ];

  const [login] = useMutation(LOGIN);

  return (
    <>
      {withTitle && (
        <Text mb={4} fontSize="2xl">
          Log in
        </Text>
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (onSubmit) await onSubmit(values);
          await login({
            variables: { email: values.email, password: values.password },
          });
          // todo: redirect to somewhere.
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

            <Text textAlign="right" mb={2}>
              <NextLink href="/account/forgot-password">
                <Link textAlign="right" color="linkBlue">
                  Forgot password?
                </Link>
              </NextLink>
            </Text>

            <Button
              fullWidth
              buttonType="primary"
              type="submit"
              mt={2}
              isLoading={isSubmitting}
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Log in
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  withTitle: PropTypes.bool,
};

export default withApollo(LoginForm);
