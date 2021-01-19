import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { ReactComponent as LeftKite } from '../../assets/left-kite.svg';
import { ReactComponent as RightKite } from '../../assets/right-kite.svg';
import Container from '../../ui/container';

function SplashScreen() {
  const { t } = useTranslation(['splashScreen', 'titles']);
  const navigate = useNavigate();

  return (
    <>
      <Container
        d="block"
        textAlign="center"
        px={4}
        maxW={{ lg: 528, xl: 728 }}
      >
        <Heading
          className="ucurtma-title"
          size="2xl"
          color="gray.900"
          textAlign="center"
        >
          {t('titles:What is Uçurtma')}
        </Heading>
        <Box mt={12} color="gray.800">
          <Text>{t('Purpose of Uçurtma')}</Text>
          <Text mt={5}>{t('Uçurtma is decentralized')}</Text>
        </Box>
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          justify="center"
          mt={12}
        >
          <Button
            as={RouterLink}
            to="/campaigns"
            size="lg"
            boxShadow="modern"
            bg="white"
            _hover={{ bg: 'gray.50' }}
            _active={{ bg: 'gray.50' }}
            mr={{ base: 0, lg: 16 }}
          >
            {t('showAllCampaigns')}
          </Button>
          <Button
            size="lg"
            boxShadow="modernOrange"
            bg="orange.500"
            color="gray.100"
            _hover={{ bg: 'orange.400', textDecor: 'none' }}
            _active={{ bg: 'orange.400' }}
            onClick={() => {
              navigate('/#donate-section');
              document
                .querySelector('#donate-section')
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Tüm Öğrencilere Destek Ol
          </Button>
        </Stack>
      </Container>
      <Box
        as={LeftKite}
        pos="absolute"
        zIndex={-1}
        top="222px"
        left={{ lg: '0', xl: '17px', xxl: '222px' }}
        d={{ base: 'none', lg: 'block' }}
      />
      <Box
        as={RightKite}
        pos="absolute"
        zIndex={-1}
        top="122px"
        right={{ lg: '0', xl: '17px', xxl: '222px' }}
        d={{ base: 'none', lg: 'block' }}
      />
    </>
  );
}

export default SplashScreen;
