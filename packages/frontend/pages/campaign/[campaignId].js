import React from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import Head from 'next/head';
import {
  Heading,
  Grid,
  Box,
  Button,
  Icon,
  Avatar,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ReactMarkdown from 'react-markdown';
import { Award } from 'react-feather';
import Header from '../../components/ui/header';
import Container from '../../components/ui/container';
import { withApollo } from '../../utils/apollo';
import Loader from '../../components/ui/loader';

const GET_CAMPAIGN = gql`
  query campaign($campaignId: String!) {
    campaign(campaignId: $campaignId) {
      campaignId
      ethereumAddress
      campaignTitle
      supporterCount
      totalFunds
      campaignText
      student {
        school
        name
        department
        profilePhoto
      }
    }
  }
`;

function Campaign() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CAMPAIGN, {
    variables: { campaignId: router.query.campaignId },
  });

  return (
    <Box backgroundColor="red">
      <Head>
        <title>Kampanya | Uçurtma Projesi</title>
      </Head>
      <Header mx={4} mt={8} withLogo hideMenu />
      <Container>
        {loading && <Loader />}
        {!loading && (error || !data?.campaign) && (
          <Alert w="full" status="error" mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Bir sorun oluştu.</AlertTitle>
            <AlertDescription>
              Lütfen daha sonra tekrar deneyin.
            </AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
        {!loading && !error && data.campaign && (
          <>
            <Head>
              <title>
                Uçurtma Projesi - {data.campaign.student.name} -{' '}
                {data.campaign.campaignTitle}
              </title>
            </Head>
            <Flex
              my={10}
              justifyContent="space-between"
              alignItems="center"
              width="full"
              flexDir={{ base: 'column', md: 'row' }}
            >
              <Flex alignItems="flex-end" flexShrink="0">
                <Avatar
                  size="lg"
                  src={data.campaign.student.profilePhoto}
                  name={data.campaign.student.name}
                />
                <Box ml={4}>
                  <Heading size="sm" color="gray.600">
                    {data.campaign.student.name}
                  </Heading>
                  <Text color="gray.500">
                    {data.campaign.student.school} /{' '}
                    {data.campaign.student.department}
                  </Text>
                </Box>
              </Flex>
              <Flex mt={{ base: 8, md: 0 }}>
                <Box borderRight="1px solid" borderColor="gray.300" pr={6}>
                  <Heading size="sm" color="gray.400">
                    Destekçi Sayısı
                  </Heading>
                  <Text
                    fontSize="1.5rem"
                    textAlign={{ base: 'center', md: 'left' }}
                    fontWeight={500}
                  >
                    {data.campaign.supporterCount}
                  </Text>
                </Box>
                <Box pl={6}>
                  <Heading size="sm" color="gray.400">
                    Toplam Burs
                  </Heading>
                  <Text
                    fontSize="1.5rem"
                    fontWeight={500}
                    textAlign={{ base: 'center', md: 'left' }}
                    color="linkBlue"
                  >
                    ₺{data.campaign.totalFunds}
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Grid
              templateColumns={{
                base: 'inherit',
                md: '62% auto',
              }}
              width="full"
              columnGap={12}
              rowGap={4}
              alignItems="center"
              px={{ base: 4, md: 0 }}
              gridAutoFlow={{ base: 'column', md: 'inherit' }}
            >
              <Heading color="gray.700">{data.campaign.campaignTitle}</Heading>
              <Button
                variant="solid"
                bg="gray.100"
                h={16}
                w="100%"
                flexShrink="0"
                justifyContent="space-between"
                boxShadow="0 0 12px rgba(124, 124, 124, 0.16)"
              >
                Destek Ol
                <Icon as={Award} size="28px" mr={2} />
              </Button>
            </Grid>
            <Container
              px={{ base: 4, md: 0 }}
              mt={{ base: 4, md: 0 }}
              display="block"
            >
              <ReactMarkdown
                renderers={ChakraUIRenderer()}
                source={data.campaign.campaignText}
                escapeHtml={false}
              />
            </Container>
          </>
        )}
      </Container>
    </Box>
  );
}

export default withApollo(Campaign);
