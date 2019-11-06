import React from 'react';
import { Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import SignupForm from '../../components/forms/signup-form';
import WaitingForYou from '../../components/illustrations/waiting-for-you';
import Header from '../../components/header';
import Container from '../../components/ui/container';
import AccountFormTemplate from '../../components/ui/templates/account-form-template';

function Signup() {
  return (
    <>
      <Header />
      <Container>
        <AccountFormTemplate
          form={<SignupForm withTitle />}
          illustration={<WaitingForYou />}
        >
          Have an account?
          <NextLink href="/account/login">
            <Link ml={1} color="linkBlue">
              Log in.
            </Link>
          </NextLink>
        </AccountFormTemplate>
      </Container>
    </>
  );
}

export default Signup;
