import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  Icon,
  Link,
  Stack,
  Divider,
} from '@chakra-ui/core';
import { Linkedin, Twitter } from 'react-feather';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import teamMembers from './team-members.json';

function OurTeam() {
  const { t } = useTranslation(['ourTeam', 'titles']);
  return (
    <Flex id="our-team" py={24} bg="gray.700" color="gray.100">
      <Container mt={0}>
        <Box width="full" mb={12} textAlign="center">
          <Heading size="xl">{t('titles:Our Team')}</Heading>
          <Divider maxW={24} marginX="auto" mt={8} />
        </Box>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          margin="0 auto"
          columnGap={8}
          rowGap={8}
          p={4}
        >
          {teamMembers.map((member, i) => (
            <Box overflow="hidden" roundedTop="4px" key={i.toString()}>
              <Box
                backgroundImage={`url(${process.env.PUBLIC_URL}/images/team/${member.image})`}
                backgroundSize="cover"
                pt="100%"
              />
              <Box p={4} bg="gray.900">
                <Heading
                  size={{ base: 'sm', md: 'xs' }}
                  whiteSpace={{ base: 'unset', md: 'nowrap' }}
                >
                  {member.name}
                </Heading>
                <Text
                  fontSize="14px"
                  whiteSpace={{ base: 'unset', md: 'nowrap' }}
                  overflow={{ base: 'unset', md: 'hidden' }}
                  textOverflow={{ base: 'unset', md: 'ellipsis' }}
                >
                  {t(member.title)}
                </Text>
                <Stack isInline spacing={2}>
                  <Link href={member.linkedIn} isExternal>
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href={member.twitter} isExternal>
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Flex>
  );
}

export default OurTeam;
