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
import Container from '../../ui/container';
import Card from '../../ui/card';

function HowItWorks() {
  const cards = [
    {
      icon: '/icons/research.svg',
      title: 'İncele',
      text: 'Öğrenci kampanyalarını incele, sana en uygun olanı bul.',
    },
    {
      icon: 'icons/donate.svg',
      title: 'Destek Ol',
      text:
        'Bağış Yap butonuna tıkla, referans kodunu al. Yönergeleri uygula, destek ol.',
    },
    {
      icon: 'icons/follow.svg',
      title: 'Takip Et',
      text: 'Destek olduğun öğrencinin gelişim ve başarımlarını takip et.',
    },
  ];

  return (
    <Flex bg="gray.50" py={24}>
      <Container mt={0}>
        <Box width="full" mb={12} textAlign="center" color="gray.700">
          <Heading size="xl">Nasıl Çalışır?</Heading>
          <Text mt={4}>
            Bağışçı, burs talebi oluşturan öğrencileri inceleyebilir, destek
            olmak istediği öğrenciye kolaylıkla bağışta bulunabilir ve destek
            olduğu öğrencinin gelişimini takip edebilir.
          </Text>
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
