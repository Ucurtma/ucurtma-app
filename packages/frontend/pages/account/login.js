import React from 'react';
import { Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import WaitingForYou from '../../components/illustrations/waiting-for-you';
import Header from '../../components/header';
import LoginForm from '../../components/forms/login-form';
import Container from '../../components/ui/container';
import AccountFormTemplate from '../../components/ui/templates/account-form-template';

function Login() {
  return (
    <>
      <Header />
      <Container>
        <AccountFormTemplate
          form={<LoginForm withTitle />}
          illustration={<WaitingForYou />}
        >
          Don&apos;t have an account?
          <NextLink href="/account/signup">
            <Link ml={1} color="linkBlue">
              Sign up.
            </Link>
          </NextLink>
        </AccountFormTemplate>
      </Container>
    </>
  );
}

export default Login;
