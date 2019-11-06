import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Button, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Password is required'),
});

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
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          if (onSubmit) onSubmit(values);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            {inputElements.map(element => (
              <Box mb={4}>
                <Input
                  label={element.label}
                  name={element.name}
                  type={element.label}
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  withTitle: PropTypes.bool,
};

export default LoginForm;
