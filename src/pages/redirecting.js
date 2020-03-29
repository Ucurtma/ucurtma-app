import React from 'react';
import { Box, Image } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import config from '../config';

const Redirecting = () => {
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const urlData = parse(location.search);
    if (urlData.code) {
      fetch(`${config.backendUrl}/oauth/callback?code=${urlData.code}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('blAuth', data.token);
          history.push(`/campaign/${urlData.state}`, [{ redirected: true }]);
        });
    }
  }, [location, history]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      height="100vh"
      textAlign="left"
    >
      <Box>
        <Image
          alt="Uçurtma Projesi"
          src={`${process.env.PUBLIC_URL}/images/logo-gray.svg`}
          mb={8}
        />
        We&#39;re redirecting you to campaign page...
      </Box>
    </Box>
  );
};

export default Redirecting;
