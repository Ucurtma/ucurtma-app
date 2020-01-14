import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  Image,
  Icon,
  Link,
  Stack,
  Divider,
} from '@chakra-ui/core';
import { Linkedin, Twitter } from 'react-feather';
import Container from '../../ui/container';
import teamMembers from './team-members.json';

function OurTeam() {
  return (
    <Flex py={24} bg="gray.700" color="gray.100">
      <Container mt={0}>
        <Box width="full" mb={12} textAlign="center">
          <Heading size="xl">Ekibimiz</Heading>
          <Divider maxW={24} marginX="auto" mt={8} />
        </Box>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          width="full"
          columnGap={{ base: 8, md: 12 }}
          rowGap={{ base: 8 }}
        >
          {teamMembers.map(member => (
            <Box overflow="hidden" roundedTop="4px" px={10}>
              <Image src={member.image} width="full" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">{member.name}</Heading>
                <Text>{member.title}</Text>
                <Stack isInline spacing={2}>
                  <Link href={member.linkedIn}>
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href={member.twitter}>
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
