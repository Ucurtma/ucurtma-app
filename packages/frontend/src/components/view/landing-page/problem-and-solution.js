import React from 'react';
import { Shield, Droplet, CloudLightning } from 'react-feather';
import { Box, Flex, Heading, Text, Grid, Image, Icon } from '@chakra-ui/core';
import Container from '../../ui/container';

function ProblemSolution() {
  return (
    <Flex
      id="problem-solution"
      py={24}
      px={{ base: 4, md: 0 }}
      bg="gray.700"
      color="gray.100"
    >
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
            <Heading size="xl">Blokzinciri ile yeni nesil bir çözüm</Heading>
            <Text mt={4}>
              Uçurtma, Ethereum ağı üzerinde geliştirilen akıllı kontratlarla
              öğrencilere bu ağ üzerinde tanımlı istedikleri kripto paralarla
              burs toplayıp, her ay belirledikleri miktarda bursu banka
              hesaplarına ekstra bir ücret ödemeden ulaştırabilmelerine olanak
              sağlar. Böylece burslarının kontrolü kendi ellerinde olurken,
              destekçiler de bu sürece dahil olarak şeffaf bir şekilde
              öğrencinin durumunu platform üzerinden takip edebilir.
            </Text>
            <Box textAlign="left" mt={4}>
              <Flex>
                <Box
                  width={{ base: '100%', md: '50%' }}
                  pr={{ base: 4, md: 0 }}
                >
                  <Flex alignItems="center" my={4}>
                    <Icon size="36px" as={Shield} mr={4} />
                    <Heading size="sm">Güvenli</Heading>
                  </Flex>
                  Tüm işlemler öğrencilere ait dijital cüzdanlarındaki eliptik
                  eğri yöntemiyle şifrelenmiş dijital imzalarıyla gerçekleşir.
                </Box>
                <Box width={{ base: '100%', md: '50%' }}>
                  <Flex alignItems="center" my={4}>
                    <Icon size="36px" as={Droplet} mr={4} />
                    <Heading size="sm">Şeffaf</Heading>
                  </Flex>
                  Para transferlerinin tamamı şeffaf bir şekilde
                  görüntülenebilir ve destekçiler destek oldukları öğrencinin
                  başarılarını platform üzerinden takip edebilirler.
                </Box>
              </Flex>
              <Box mt={8}>
                <Flex alignItems="center" my={4}>
                  <Icon size="36px" as={CloudLightning} mr={4} />
                  <Heading size="sm">Hızlı</Heading>
                </Flex>
                Öğrenci kampanyalarının tamamlanmasının ardından başka hiçbir
                işleme gerek duymadan bursları öğrencilere zamanında hızlı bir
                şekilde ödenir. Aradaki insan faktörü tamamen ortadan kalktığı
                için öğrenciler asla mağdur kalmaz.
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Flex>
  );
}

export default ProblemSolution;
