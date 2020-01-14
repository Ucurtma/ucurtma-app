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
} from '@chakra-ui/core';
import { Linkedin, Twitter } from 'react-feather';
import Container from '../../ui/container';

function OurTeam() {
  return (
    <Flex py={16} bg="gray.700" color="gray.100">
      <Container mt={0}>
        <Flex>
          <Box maxW={{ md: '400px' }} mb={12} mr={8}>
            <Heading size="xl">Ekibimiz</Heading>
            <Text mt={4}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              vero vel quos in deleniti voluptatem esse quod! Consectetur
              pariatur nemo quaerat magni illum qui voluptatem nihil aliquid ex?
              Minus, nihil!
            </Text>
          </Box>
          <Grid
            templateColumns={{
              base: 'inherit',
              md: '50% auto',
              lg: '40% auto',
              xl: 'repeat(3, 1fr)',
            }}
            width="full"
            columnGap={{ base: 8, md: 12 }}
            rowGap={{ base: 8 }}
          >
            <Box overflow="hidden" roundedTop="3px">
              <Image src="/team5.jpg" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">Mert Susur</Heading>
                <Text>Founder</Text>
                <Stack isInline spacing={2}>
                  <Link href="#">
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href="#">
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
            <Box overflow="hidden" roundedTop="3px">
              <Image src="/team5.jpg" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">Mert Susur</Heading>
                <Text>Founder</Text>
                <Stack isInline spacing={2}>
                  <Link href="#">
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href="#">
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
            <Box overflow="hidden" roundedTop="3px">
              <Image src="/team5.jpg" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">Mert Susur</Heading>
                <Text>Founder</Text>
                <Stack isInline spacing={2}>
                  <Link href="#">
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href="#">
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
            <Box overflow="hidden" roundedTop="3px">
              <Image src="/team5.jpg" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">Mert Susur</Heading>
                <Text>Founder</Text>
                <Stack isInline spacing={2}>
                  <Link href="#">
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href="#">
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
            <Box overflow="hidden" roundedTop="3px">
              <Image src="/team5.jpg" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">Mert Susur</Heading>
                <Text>Founder</Text>
                <Stack isInline spacing={2}>
                  <Link href="#">
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href="#">
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
            <Box overflow="hidden" roundedTop="3px">
              <Image src="/team5.jpg" />
              <Box p={4} bg="gray.900">
                <Heading size="sm">Mert Susur</Heading>
                <Text>Founder</Text>
                <Stack isInline spacing={2}>
                  <Link href="#">
                    <Icon as={Linkedin} fill="#fff" />
                  </Link>
                  <Link href="#">
                    <Icon as={Twitter} fill="#fff" />
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Flex>
      </Container>
    </Flex>
  );
}

export default OurTeam;
