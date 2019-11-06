import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
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
              width="100%"
              bg="primaryButton"
              fontWeight="regular"
              type="submit"
              size="lg"
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

export default LoginForm;
