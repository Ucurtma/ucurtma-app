import React from 'react';
import { Text, Box, Button, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

function SignupForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Box mb="1rem">
            <Input
              label="Name"
              name="name"
              placeholder="(ex. Mustafa Turhan)"
            />
          </Box>
          <Box mb="1rem">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="(ex. mail@mail.com)"
            />
          </Box>
          <Box mb="1rem">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="(ex. #49sd2YXBKX%XZ)"
            />
          </Box>
          <Box mb="1rem">
            <Input
              label="Password Confirmation"
              type="password"
              name="passwordConfirmation"
              placeholder="(ex. #49sd2YXBKX%XZ)"
            />
          </Box>
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
            By signing up, you agree to our{' '}
            <Link color="linkBlue" href="#">
              terms of use
            </Link>
            ,{' '}
            <Link color="linkBlue" href="#">
              privacy policy
            </Link>
            , and{' '}
            <Link color="linkBlue" href="#">
              cookie policy
            </Link>
            .
          </Text>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
