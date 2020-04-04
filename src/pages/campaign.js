import React from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import Helmet from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import {
  Heading,
  Box,
  Avatar,
  Flex,
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  Icon,
  Button,
  Collapse,
  Image,
  PseudoBox,
} from '@chakra-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { AlertCircle, Award } from 'react-feather';
import gql from 'graphql-tag';
import ReactMarkdown from 'react-markdown';
import Header from '../components/ui/header';
import Container from '../components/ui/container';
import { withApollo } from '../utils/apollo';
import Donate from '../components/view/campaign/donate';
import LandingFooter from '../components/view/landing-page/footer';
import ReportCampaignForm from '../components/forms/report-campaign-form';
import Timeline from '../components/ui/timeline';

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
  const location = useLocation();
  const { id } = useParams();
  const [content, setContent] = React.useState(
    location.state?.redirected ? 'donate' : 'markdown'
  );
  const [reportCampaignView, setReportCampaignView] = React.useState(false);
  const { loading, error, data } = useQuery(GET_CAMPAIGN, {
    variables: { campaignId: id },
  });
  if (error || (data && data.campaign === null)) {
    return (
      <Flex flexDir="column" justify="space-between" height="full">
        <Header mt={8} withLogo hideMenu />
        <Container display="block" h="full" p="2rem 0">
          <Alert
            w="full"
            h="full"
            bg="gray.50"
            color="gray.400"
            justifyContent="center"
            flexDir="column"
          >
            <Icon as={AlertCircle} fontSize="4rem" color="gray.300" mb={4} />
            <AlertTitle mr={2}>Bir sorun oluştu.</AlertTitle>
            <AlertDescription textAlign="center">
              Biz bu sorunu düzeltmek için çalışırken, lütfen daha sonra tekrar
              deneyin.
            </AlertDescription>
          </Alert>
        </Container>
        <LandingFooter />
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" justify="space-between" height="full">
      <Box>
        <Header mt={8} withLogo hideMenu />
        <Container display="block">
          <Helmet>
            <title>
              {data
                ? `${data.campaign?.campaignTitle} - ${data.campaign?.student.name} - Uçurtma Projesi`
                : 'Uçurtma Projesi'}
            </title>
          </Helmet>
          <Flex
            my={{ base: 2, md: 10 }}
            justifyContent="space-between"
            alignItems="center"
            width="full"
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Flex mx={{ base: 4, lg: 0 }} alignItems="flex-end" flexShrink="0">
              {loading ? (
                <Skeleton width={72} height={72} circle />
              ) : (
                <Avatar
                  size="lg"
                  src={data.campaign?.student.profilePhoto}
                  name={data.campaign?.student.name}
                />
              )}
              <Box ml={4}>
                <Heading size="sm" color="gray.600">
                  {loading ? (
                    <Skeleton width={200} />
                  ) : (
                    data.campaign?.student.name
                  )}
                </Heading>
                <Text color="gray.500">
                  {loading ? (
                    <Skeleton width={260} />
                  ) : (
                    <>
                      {data.campaign?.student.school} /{' '}
                      {data.campaign?.student.department}
                    </>
                  )}
                </Text>
              </Box>
            </Flex>
            <Flex
              width={{ base: 'full', md: 'unset' }}
              justify={{ base: 'space-around', md: 'inherit' }}
              mt={{ base: 8, md: 0 }}
              borderY={{ base: '1px solid', md: 0 }}
              borderColor="gray.300"
              borderTopColor="gray.300"
              p={{ base: 4, lg: 0 }}
              bg={{ base: 'gray.100', md: 'inherit' }}
            >
              <Box pr={6} borderRight={{ md: '1px solid #CBD5E0' }}>
                <Heading size="sm" color="gray.400">
                  {loading ? <Skeleton width={140} /> : 'Destekçi Sayısı'}
                </Heading>
                <Text
                  fontSize="1.5rem"
                  textAlign={{ base: 'center', md: 'left' }}
                  fontWeight={500}
                >
                  {loading ? (
                    <Skeleton width={70} />
                  ) : (
                    data.campaign?.supporterCount
                  )}
                </Text>
              </Box>
              <Box pl={6}>
                <Heading size="sm" color="gray.400">
                  {loading ? <Skeleton width={140} /> : 'Toplam Destek'}
                </Heading>
                <Box
                  fontSize="1.5rem"
                  fontWeight={500}
                  textAlign={{ base: 'center', md: 'left' }}
                  color="#1E284C"
                >
                  {loading ? (
                    <Skeleton width={70} />
                  ) : (
                    <Flex align="center">
                      <Image
                        maxW="14px"
                        width="full"
                        height="full"
                        src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                        mr={1}
                      />
                      {data.campaign?.totalFunds}
                    </Flex>
                  )}
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Flex justify="space-between" align="center" mx={{ base: 4, lg: 0 }}>
            {loading ? (
              <Box flex={1}>
                <Skeleton height={72} />
              </Box>
            ) : (
              <>
                <Heading color="gray.700" fontSize={{ base: '2xl', lg: '4xl' }}>
                  {data.campaign?.campaignTitle}
                </Heading>
                <Box>
                  <PseudoBox
                    as={Button}
                    variant="solid"
                    bg="linkGreen"
                    h={{ base: 12, lg: 16 }}
                    width={{ base: 'auto', md: '368px' }}
                    flexShrink="0"
                    justifyContent="space-between"
                    boxShadow="0 0 2px rgba(124,124,124,0.16)"
                    onClick={() => setContent('donate')}
                    zIndex={2000}
                    _hover={{ bg: 'green.100' }}
                  >
                    Destek Ol
                    <Icon as={Award} size="28px" />
                  </PseudoBox>
                </Box>
              </>
            )}
          </Flex>
          <Container
            px={{ base: 4, lg: 0 }}
            pt={{ space: 4 }}
            pb={{ space: 4 }}
            display="block"
          >
            {loading ? (
              <Skeleton count={12} />
            ) : (
              <>
                <Box mt={4} display={content === 'markdown' ? 'block' : 'none'}>
                  <Flex flexDir={{ base: 'column', lg: 'row' }}>
                    <Box
                      w="full"
                      flexShrink="0"
                      maxW={{ base: '100%', lg: '65%' }}
                    >
                      <ReactMarkdown
                        renderers={ChakraUIRenderer()}
                        source={data.campaign?.campaignText}
                        escapeHtml={false}
                      />
                    </Box>
                    <Box
                      bg="gray.50"
                      borderRadius="4px"
                      p={4}
                      w="full"
                      height="full"
                      maxW={{ base: '100%', lg: '35%' }}
                      ml={{ base: 0, lg: 16 }}
                      mt={{ base: 4, lg: 0 }}
                    >
                      <Heading size="sm" color="gray.500">
                        Kampanya Gelişmeleri
                      </Heading>
                      <Timeline />
                    </Box>
                  </Flex>
                  <Flex mb={8} flexDir="column">
                    <Button
                      variant="ghost"
                      color="red.300"
                      ml="auto"
                      onClick={() => setReportCampaignView(!reportCampaignView)}
                    >
                      Şikayet Oluştur
                    </Button>
                    <Collapse
                      maxW="600px"
                      ml="auto"
                      isOpen={reportCampaignView}
                    >
                      <ReportCampaignForm campaignId={id} />
                    </Collapse>
                  </Flex>
                </Box>
                <Box display={content === 'donate' ? 'block' : 'none'}>
                  <Donate
                    ethereumAddress={data.campaign?.ethereumAddress}
                    onBack={() => setContent('markdown')}
                  />
                </Box>
              </>
            )}
          </Container>
        </Container>
      </Box>
      <LandingFooter />
    </Flex>
  );
}

export default withApollo(Campaign);
