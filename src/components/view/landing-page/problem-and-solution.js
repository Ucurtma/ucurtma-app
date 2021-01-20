import React from 'react';
import { Shield, Droplet, CloudLightning } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Heading, Text, Grid, Image, Icon } from '@chakra-ui/react';
import MobileMockupTR from '../../assets/mobile-mockup-tr.svg';
import MobileMockupEN from '../../assets/mobile-mockup-en.svg';
import Container from '../../ui/container';

function ProblemSolution() {
  const { t, i18n } = useTranslation('problemAndSolution');
  const currentLanguage = i18n.language;

  return (
    <Container mt={0}>
      <Grid
        templateColumns={{
          base: 'inherit',
          md: '50% auto',
          lg: '68% 1fr',
        }}
        width="full"
        columnGap={{ base: 8, md: 12 }}
        rowGap={{ base: 8 }}
      >
        <Flex justify="center" flexDir="column" width="full">
          <Heading size="xl">{t('New solution with blockchain')}</Heading>
          <Text mt={4}>{t('What was the problem')}</Text>
          <Box textAlign="left" mt={4}>
            <Flex flexDir={{ base: 'column', lg: 'row' }}>
              <Box width={{ base: '100%', lg: '40%' }} pr={{ base: 4, md: 6 }}>
                <Flex alignItems="center" my={4}>
                  <Icon boxSize="36px" as={Shield} mr={4} />
                  <Heading size="sm">{t('Safe')}</Heading>
                </Flex>
                {t('Safe_details')}
              </Box>
              <Box width={{ base: '100%', lg: '60%' }}>
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
        </Flex>
        <Flex justify="center">
          <Image
            alignSelf="center"
            src={currentLanguage === 'en' ? MobileMockupEN : MobileMockupTR}
            style={{
              filter: 'drop-shadow(0 0 0.75rem rgba(0,0, 0, 0.08))',
            }}
          />
        </Flex>
      </Grid>
    </Container>
  );
}

export default ProblemSolution;
