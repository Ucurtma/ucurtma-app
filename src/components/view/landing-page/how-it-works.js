import React from 'react';
import {
  Heading,
  Grid,
  Flex,
  Text,
  Box,
  Divider,
  Image,
} from '@chakra-ui/core';
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
    <Flex bg="gray.50" py={24} id="how-it-works">
      <Container mt={0}>
        <Box width="full" mb={12} textAlign="center" color="gray.700">
          <Heading size="xl">{t('titles:How it works')}</Heading>
          <Text mt={4}>{t('Three Steps')}</Text>
          <Divider maxW={24} borderColor="gray.700" marginX="auto" mt={8} />
        </Box>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '50% auto',
            lg: '40% auto',
            xl: 'repeat(3, 1fr)',
          }}
          width="full"
          gap={{ base: 8, md: 20 }}
        >
          {cards.map(card => (
            <Flex
              as={Card}
              key={card.title}
              px={8}
              py={6}
              borderRadius="0.5rem"
              alignItems="center"
              flexDir="column"
            >
              <Image src={card.icon} maxW={32} mb={8} />
              <Heading size="lg">{card.title}</Heading>
              <Text textAlign="center" mt={6} color="gray.600">
                {card.text}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Container>
    </Flex>
  );
}

export default HowItWorks;
