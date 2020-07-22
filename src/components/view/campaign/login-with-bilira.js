import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  Box,
  Link,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/core';

const LoginWithBiLira = ({ href, ...otherProps }) => {
  const { t } = useTranslation('loginWithBiLira');
  return (
    <>
      <Alert status="error" bg="gray.50" mb={4}>
        <AlertIcon color="gray.600" />
        <AlertDescription mr={2} color="gray.600">
          <Box as="p" mb={4}>
            <Trans
              defaults="workingWithBiLira"
              t={t}
              components={{
                linkComp: (
                  <Link
                    href="https://www.bilira.co"
                    isExternal
                    color="blue.500"
                  />
                ),
              }}
            />
          </Box>
          <Box as="p">{t('redirectButton')}</Box>
        </AlertDescription>
      </Alert>
      <Link href={href}>
        <Button
          bg="#04144c"
          _hover={{ bg: '#020c2d' }}
          color="#fff"
          width="full"
          padding={3}
          height="auto"
          {...otherProps}
        >
          {t('loginWithBiLira')}
        </Button>
      </Link>
    </>
  );
};

export default LoginWithBiLira;
