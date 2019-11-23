import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Text, Box, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';
import Button from '../ui/button';
import { withApollo } from '../../utils/apollo';

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  fullname: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(6, 'Too Short')
    .required('Required'),
});

const SIGNUP = gql`
  mutation Register(
    $fullname: String!
    $email: String!
    $password: String!
    $repeatPassword: String!
  ) {
    register(
      fullname: $name
      email: $email
      password: $password
      repeatPassword: $repeatPassword
    ) {
      token
      expiryDate
    }
  }
`;

function SignupForm({ onSubmit, withTitle }) {
  const inputElements = [
    {
      label: 'Name',
      name: 'fullname',
      type: 'text',
      placeholder: '(ex. Harry Potter)',
    },
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
    {
      label: 'Password Confirmation',
      name: 'passwordConfirmation',
      type: 'password',
      placeholder: '(ex. #49sd2YXBKX%XZ)',
    },
  ];

  const [signup] = useMutation(SIGNUP);

  return (
    <>
      {withTitle && (
        <Text mb={4} fontSize="2xl">
          Sign up
        </Text>
      )}
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (onSubmit) await onSubmit(values);
          await signup({
            variables: {
              fullname: values.fullname,
              email: values.email,
              password: values.password,
              repeatPassword: values.passwordConfirmation,
            },
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
            <Button
              fullWidth
              buttonType="primary"
              type="submit"
              mt={2}
              isLoading={isSubmitting}
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              Create Account
            </Button>
            <Text mt={4}>
              By signing up, you agree to our
              <Link ml={1} color="linkBlue" href="#">
                terms of use,
              </Link>
              <Link ml={1} color="linkBlue" href="#">
                privacy policy,
              </Link>
              and
              <Link ml={1} color="linkBlue" href="#">
                cookie policy.
              </Link>
            </Text>
          </Form>
        )}
      </Formik>
    </>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func,
  withTitle: PropTypes.bool,
};

export default withApollo(SignupForm);
