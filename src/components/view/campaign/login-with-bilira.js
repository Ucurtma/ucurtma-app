import React from 'react';
import { Box, Link, Text, Button, Image } from '@chakra-ui/core';

const LoginWithBiLira = ({ href, ...otherProps }) => {
  return (
    <>
      <Box
        mb={4}
        p={4}
        bg="gray.100"
        border="1px solid"
        borderColor="gray.300"
        color="gray.600"
      >
        <Box as="p" mb={4}>
          Yapacağınız destekleri güvenli ve hızlı bir şekilde öğrencimize
          ulaştırabilmek için{' '}
          <Link href="https://www.bilira.co" isExternal color="blue.500">
            BiLira
          </Link>{' '}
          ile çalışıyoruz.
        </Box>
        <Box as="p">
          Aşağıdaki bağlantıyı kullanarak bu sayfayı terk etmeden hızlıca hesap
          oluşturabilir, varolan hesabınızla transferi yapacağınız banka
          hesabına kolayca ulaşabilirsiniz.
        </Box>
      </Box>
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
