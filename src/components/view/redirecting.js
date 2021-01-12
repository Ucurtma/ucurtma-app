import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'query-string';
import { backendUrl } from '../../config';

const Redirecting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const urlData = parse(location.search);
    if (urlData.code) {
      fetch(`${backendUrl}/oauth/callback?code=${urlData.code}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('blAuth', data.token);
          navigate(`/campaign/${urlData.state}`, {
            state: { redirected: true },
          });
        });
    } else if (urlData.state) {
      navigate(`/campaign/${urlData.state}`, {
        state: {
          redirected: true,
          redirectError: true,
        },
      });
    } else {
      navigate('/');
    }
  }, [location, navigate]);

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
