import React from 'react';
import Router from 'next/router';

/*
  this component is here because we should handle that
  if user looks for domain.com/account.
  user would see a blank page without this file.
  instead of showing blank page, we're redirecting user.
*/
class Account extends React.Component {
  componentDidMount() {
    // todo: redirect to profile page if user logged in.
    // todo: res.writeHead isn't working on next export at the moment. ps: https://github.com/zeit/next.js/issues/8953
    Router.push('/account/signup');
  }

  render() {
    return <></>;
  }
}

export default Account;
