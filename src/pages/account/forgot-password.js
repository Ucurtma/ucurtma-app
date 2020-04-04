import React from 'react';
import { Link } from '@chakra-ui/core';
import NextLink from 'react-router-dom';
import Header from '../../components/ui/header';
import Container from '../../components/ui/container';
import AccountFormTemplate from '../../components/ui/templates/account-form-template';
import ForgotPasswordForm from '../../components/forms/forgot-password-form';
import MyPassword from '../../components/illustrations/my-password';

function ForgotPassword() {
  return (
    <>
      <Header />
      <Container>
        <AccountFormTemplate
          form={<ForgotPasswordForm withTitle />}
          illustration={<MyPassword />}
        >
          Did you remember?
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

export default ForgotPassword;
