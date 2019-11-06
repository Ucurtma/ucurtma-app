import React from 'react';
import Router from 'next/router';

/*
  this component is here because we should handle that
  if user looks for domain.com/account.
  user would see a blank page without this file.
  instead of showing blank page, we're redirecting user.
*/
class Account extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      // todo: user should redirect to profile page if logged in to system.
      res.writeHead(302, {
        Location: '/account/signup',
      });
      res.end();
    } else {
      Router.push('/account/signup');
    }
    return {};
  }
}

export default Account;
