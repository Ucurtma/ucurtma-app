import React from 'react';
import { Shield, Droplet, CloudLightning } from 'react-feather';
import { Box, Flex, Heading, Text, Grid, Image, Icon } from '@chakra-ui/core';
import Container from '../../ui/container';

function ProblemSolution() {
  return (
    <Flex py={24} px={{ base: 4, md: 0 }} bg="gray.700" color="gray.100">
      <Container mt={0}>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '50% auto',
            lg: '40% auto',
          }}
          width="full"
          columnGap={{ base: 8, md: 12 }}
          rowGap={{ base: 8 }}
        >
          <Image alignSelf="center" src="/icons/teamwork.svg" />
          <Box width="full">
            <Heading size="xl">Blockchain ile yeni nesil bir çözüm</Heading>
            <Text mt={4}>
              Bursveren ve öğrenci güvenilir, şeffaf ve otonom bir ortamda bir
              araya gelmeli. Uçurtma bunu sağlamak için blockchain teknolojisini
              kullanır.
            </Text>
            <Box textAlign="left" mt={4}>
              <Flex>
                <Box width={{ base: '100%', md: '50%' }}>
                  <Flex alignItems="center" my={4}>
                    <Icon size="36px" as={Shield} mr={4} />
                    <Heading size="sm">Güvenli</Heading>
                  </Flex>
                  Tüm işlemlerim kaydını değiştirilemez bir şekilde saklar.
                </Box>
                <Box width={{ base: '100%', md: '50%' }}>
                  <Flex alignItems="center" my={4}>
                    <Icon size="36px" as={Droplet} mr={4} />
                    <Heading size="sm">Şeffaf</Heading>
                  </Flex>
                  Para transferleri ve öğrencilerin seçimi şeffaflıkla
                  gerçekleşir.
                </Box>
              </Flex>
              <Box mt={8}>
                <Flex alignItems="center" my={4}>
                  <Icon size="36px" as={CloudLightning} mr={4} />
                  <Heading size="sm">Otonom</Heading>
                </Flex>
                Para transferi, bursveren-öğrenci eşleşmelerini ve süreç takip
                işlemlerini akıllı kontratlar sayesinde full otonom bir şekilde
                yapar.
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Flex>
  );
}

export default ProblemSolution;
