import React from 'react';
import { Heading, Grid, Flex, Icon, Text } from '@chakra-ui/core';
import { ZoomIn, Gift, Bell } from 'react-feather';
import Container from '../../ui/container';
import Card from '../../ui/card';

function HowItWorks() {
  const cards = [
    {
      icon: ZoomIn,
      title: 'İncele',
      text: 'Öğrenci kampanyalarını incele, sana en doğru geleni bul.',
    },
    {
      icon: Gift,
      title: 'Destek Ol',
      text:
        'Bağış Yap butonuna tıkla, referans kodunu al. Yönergeleri uygula, destek ol.',
    },
    {
      icon: Bell,
      title: 'Takip Et',
      text: 'Destek olduğun öğrencinin gelişimini, başarımını takip et.',
    },
  ];

  return (
    <Container>
      <Heading color="gray.600" size="lg" mb="2rem" mx="auto">
        Nasıl Çalışıyor?
      </Heading>
      <Grid
        templateColumns={{
          base: 'inherit',
          md: '50% auto',
          lg: '40% auto',
          xl: 'repeat(3, 1fr)',
        }}
        width="full"
        gap="28px"
      >
        {cards.map(card => (
          <Card
            key={card.title}
            px="2rem"
            py="1.5rem"
            borderRadius="0.5rem"
            boxShadow="0 0 36px rgba(0, 0, 0, 0.1)"
          >
            <Flex alignItems="flex-end" color="gray.700">
              <Icon color="blue.300" size="34px" as={card.icon} />
              <Heading ml="1.25rem" size="md">
                {card.title}
              </Heading>
            </Flex>
            <Text mt="1.5rem" color="gray.600">
              {card.text}
            </Text>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default HowItWorks;
