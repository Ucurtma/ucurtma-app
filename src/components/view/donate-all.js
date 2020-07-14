import React, { useEffect, useContext } from 'react';
import { Heading, Box, Image, Flex, Divider } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../ui/container';
import Donate from './campaign/donate';
import { MainContext } from '../../context/main-context';

function DonateAllStep({ step, title, desc, isReverse }) {
  return (
    <Flex
      alignItems="center"
      flexDirection={{ lg: isReverse ? 'row-reverse' : 'row', base: 'column' }}
    >
      <Image src={`${process.env.PUBLIC_URL}/images/donate-all/0${step}.svg`} />
      <Box mx={{ lg: '52px', md: 0 }} my={{ lg: 0, base: 8 }}>
        <Heading as="p" size="sm">
          {`ADIM ${step}`}
        </Heading>
        <Heading size="lg" w="full" maxW="160px" my={3}>
          {title}
        </Heading>
        <Box as="p" w="full" maxW="840px" color="gray.500" mb={12}>
          {desc}
        </Box>
      </Box>
    </Flex>
  );
}

function DonateAll() {
  const location = useLocation();
  const { dispatch } = useContext(MainContext);
  const { t } = useTranslation('donateAll');
  const steps = [1, 2, 3];

  useEffect(() => {
    dispatch({ type: 'SHOW_TOPNAV', payload: false });
    return () => dispatch({ type: 'SHOW_TOPNAV', payload: true });
  }, [dispatch]);

  return (
    <Container flexDir="column" px={{ base: 4, lg: 0 }}>
      <Donate
        minimumAmount={100}
        redirectError={location.state?.redirectError}
        ethereumAddress="0x3365CfF5e0970fbB2cF744796901002d9987c0Dc"
      />
      <Divider my={8} />
      <Heading size="xl" w="full" maxW="480px" my={4}>
        Nasıl Çalışır?
      </Heading>
      <Heading size="lg" w="full" maxW="480px" my={4}>
        {t('heading')}
      </Heading>
      <Box as="p" w="full" maxW="840px" color="gray.500" mb={12}>
        {t('definition')}
      </Box>
      {steps.map(step => (
        <DonateAllStep
          key={step}
          step={step}
          title={t(`steps.${step}.title`)}
          desc={t(`steps.${step}.desc`)}
          isReverse={step % 2 === 0}
        />
      ))}
    </Container>
  );
}

export default DonateAll;
