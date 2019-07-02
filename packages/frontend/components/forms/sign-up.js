import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';
import Button from '../ui/button';
import Paragraph from '../ui/paragraph';

// TODO: implement reCAPTCHA to here.

const signupScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

function Signup() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}
      validationSchema={signupScheme}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            errors={touched.name && errors.name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            errors={touched.email && errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={values.password}
            errors={touched.password && errors.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            label="Confirm Password"
            value={values.passwordConfirmation}
            errors={touched.passwordConfirmation && errors.passwordConfirmation}
            onChange={handleChange}
          />
          {/* TODO: add checkbox here after pr comes. */}
          <div className="flex mt-6">
            <Paragraph>
              Already have an account?{' '}
              <Button
                textColor="#66E5B8"
                className="py-0 px-0 sm:py-0 sm:px-0"
                type="flat"
              >
                Log in
              </Button>
            </Paragraph>
            <Button
              type="custom"
              textColor="#FFF"
              color="#66E5B8"
              isSubmit
              disabled={isSubmitting}
              className="w-full sm:w-auto ml-auto"
            >
              SIGN UP
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Signup;
