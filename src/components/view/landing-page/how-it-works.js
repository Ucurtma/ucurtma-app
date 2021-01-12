import React from 'react';
import { Heading, Grid, Text, Box, Divider, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import Card from '../../ui/card';

function HowItWorks() {
  const { t } = useTranslation(['howItWorks', 'titles']);
  const cards = [
    {
      icon: `${process.env.PUBLIC_URL}/images/icons/research.svg`,
      title: t('Examine'),
      text: t('Examine_details'),
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/icons/donate.svg`,
      title: t('Support'),
      text: t('Support_details'),
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/icons/follow.svg`,
      title: t('Follow'),
      text: t('Follow_details'),
    },
  ];

  return (
    <Container
      bg="gray.800"
      pt={16}
      color="white"
      borderTopRadius={{ base: 22, lg: 139 }}
      px={4}
    >
      <Box width="full" textAlign="center">
        <Heading size="xl">{t('titles:How it works')}</Heading>
        <Text mt={4}>{t('Three Steps')}</Text>
        <Divider maxW={24} borderColor="gray.700" marginX="auto" mt={8} />
      </Box>
      <Grid
        templateColumns={{
          base: 'inherit',
          md: 'repeat(3, 1fr)',
        }}
        width="full"
        px={{ base: 2, lg: 8 }}
        gap={{ base: 8, lg: 20 }}
        mt="-6rem"
      >
        {cards.map(card => (
          <Box
            as={Card}
            display="flex"
            key={card.title}
            px={8}
            py={6}
            borderRadius="51px"
            alignItems="center"
            flexDir="column"
            _last={{ justifyContent: 'center' }}
            pos="relative"
            top={24}
            bg="gray.900"
            border="0"
          >
            <Image src={card.icon} maxW={32} mb={8} />
            <Heading fontSize="1.5rem" fontWeight={600}>
              {card.title}
            </Heading>
            <Text textAlign="center" mt={4}>
              {card.text}
            </Text>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}

export default HowItWorks;
