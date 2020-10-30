import React from 'react';
import { Shield, Droplet, CloudLightning } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Heading, Text, Grid, Image, Icon } from '@chakra-ui/core';
import Container from '../../ui/container';

function ProblemSolution() {
  const { t } = useTranslation('problemAndSolution');
  return (
    <Flex
      id="problem-solution"
      py={24}
      px={{ base: 4, lg: 0 }}
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
          <Image
            alignSelf="center"
            src={`${process.env.PUBLIC_URL}/images/icons/teamwork.png`}
          />
          <Box width="full">
            <Heading size="xl">{t('New solution with blockchain')}</Heading>
            <Text mt={4}>{t('What was the problem')}</Text>
            <Box textAlign="left" mt={4}>
              <Flex flexDir={{ base: 'column', lg: 'row' }}>
                <Box
                  width={{ base: '100%', lg: '50%' }}
                  pr={{ base: 4, md: 6 }}
                >
                  <Flex alignItems="center" my={4}>
                    <Icon boxSize="36px" as={Shield} mr={4} />
                    <Heading size="sm">{t('Safe')}</Heading>
                  </Flex>
                  {t('Safe_details')}
                </Box>
                <Box width={{ base: '100%', lg: '50%' }}>
                  <Flex alignItems="center" my={4}>
                    <Icon boxSize="36px" as={Droplet} mr={4} />
                    <Heading size="sm">{t('Transparent')}</Heading>
                  </Flex>
                  {t('Transparent_details')}
                </Box>
              </Flex>
              <Box mt={8}>
                <Flex alignItems="center" my={4}>
                  <Icon boxSize="36px" as={CloudLightning} mr={4} />
                  <Heading size="sm">{t('Fast')}</Heading>
                </Flex>
                {t('Fast_details')}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Flex>
  );
}

export default ProblemSolution;
