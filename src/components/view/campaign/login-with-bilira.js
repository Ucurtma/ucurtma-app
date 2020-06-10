import React from 'react';
import {
  Box,
  Link,
  Text,
  Button,
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/core';

const LoginWithBiLira = ({ href, ...otherProps }) => {
  return (
    <>
      <Alert status="error" bg="gray.50" mb={4}>
        <AlertIcon color="gray.600" />
        <AlertDescription mr={2} color="gray.600">
          <Box as="p" mb={4}>
            Yapacağınız destekleri güvenli ve hızlı bir şekilde öğrencimize
            ulaştırabilmek için{' '}
            <Link href="https://www.bilira.co" isExternal color="blue.500">
              BiLira
            </Link>{' '}
            ile çalışıyoruz.
          </Box>
          <Box as="p">
            Aşağıdaki bağlantıyı kullanarak bu sayfayı terk etmeden hızlıca
            hesap oluşturabilir, varolan hesabınızla transferi yapacağınız banka
            hesabına kolayca ulaşabilirsiniz.
          </Box>
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
          <Image
            alt="Login with BiLira"
            src={`${process.env.PUBLIC_URL}/images/bilira-logo.svg`}
            w="80px"
          />
          <Text ml={2} fontWeight={400}>
            ile giriş yap
          </Text>
        </Button>
      </Link>
    </>
  );
};

export default LoginWithBiLira;
