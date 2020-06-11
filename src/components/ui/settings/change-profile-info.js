import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Heading, Box, Button, Textarea } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Input from '../input';
import { withApollo } from '../../../utils/apollo';

const profileInfoSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  country: Yup.string().min(2, 'Too Short').max(50, 'Too Long'),
  aboutYou: Yup.string().min(2, 'Too Short'),
});

const CHANGE_PROFILE_INFO = gql`
  mutation updateProfileInformation(
    $userId: Int!
    $fullname: String!
    $email: String!
    $country: String!
    $aboutYou: String!
  ) {
    updateProfileInformation(
      userId: $userId
      fullname: $name
      email: $email
      country: $country
      aboutYou: $aboutYou
    ) {
      fullname
    }
  }
`;

function ChangeProfileInfo({ withTitle }) {
  const [changeProfileInfo] = useMutation(CHANGE_PROFILE_INFO);
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="gray.600">
          General Profile Information
        </Heading>
      )}
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          country: '',
          aboutYou: '',
        }}
        validationSchema={profileInfoSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await changeProfileInfo({
            variables: {
              userId: Math.floor(Math.random() * 100), // todo: get userID from db when it is ready
              fullname: values.fullname,
              email: values.email,
              country: values.country,
              aboutYou: values.aboutYou,
            },
          });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Input label="Name" name="fullname" type="text" />
            <Input label="Email" name="email" type="email" />
            {/* todo: make a select component for country of residence */}
            <Input label="Country of Residence" name="country" type="text" />
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

export default withApollo(ChangeProfileInfo);
