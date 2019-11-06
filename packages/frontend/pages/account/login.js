import React from 'react';
import { Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import Header from '../../components/header';
import LoginForm from '../../components/forms/login-form';
import Container from '../../components/ui/container';
import AccountFormTemplate from '../../components/ui/templates/account-form-template';
import YouArePopular from '../../components/illustrations/you-are-popular';

function Login() {
  return (
    <>
      <Header />
      <Container>
        <AccountFormTemplate
          form={<LoginForm withTitle />}
          illustration={<YouArePopular />}
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
