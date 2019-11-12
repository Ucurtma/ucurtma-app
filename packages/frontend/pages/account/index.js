import React, { useEffect } from 'react';
import Router from 'next/router';
import { getToken } from '../../utils/utils';

/*
  this component is here because we should handle that
  if user looks for domain.com/account.
  user would see a blank page without this file.
  instead of showing blank page, we're redirecting user.
*/
function Account() {
  useEffect(() => {
    // todo: res.writeHead isn't working on next export at the moment. ps: https://github.com/zeit/next.js/issues/8953
    const token = getToken();
    if (token) {
      Router.push('/account/my-account');
    } else {
      Router.push('/account/signup');
    }
  }, []);

  return <></>;
}

export default Account;
