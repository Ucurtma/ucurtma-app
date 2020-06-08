import React, { Suspense, lazy } from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import {
  Heading,
  Box,
  Flex,
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  Icon,
  Button,
  Collapse,
  PseudoBox,
  Divider,
} from '@chakra-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { AlertCircle, Award } from 'react-feather';
import gql from 'graphql-tag';
import ReactMarkdown from 'react-markdown';
import Header from '../components/ui/header';
import Container from '../components/ui/container';
import { withApollo } from '../utils/apollo';
import LandingFooter from '../components/view/landing-page/footer';
import Loader from '../components/ui/loader';
import Documents from '../components/view/campaign/documents';
import CampaignHeader from '../components/view/campaign/campaign-header';
import Goals from '../components/view/campaign/goals';

const Timeline = lazy(() => import('../components/ui/timeline'));
const Donate = lazy(() => import('../components/view/campaign/donate'));
const ReportCampaignForm = lazy(() =>
  import('../components/forms/report-campaign-form')
);

const GET_CAMPAIGN = gql`
  query campaign($campaignId: String!) {
    campaign(campaignId: $campaignId) {
      campaignId
      ethereumAddress
      campaignTitle
      supporterCount
      totalFunds
      campaignText
      minimumAmount
      goals {
        description
      }
      documents {
        title
        link
        type
      }
      transactions {
        from
        amount
        when
        tokenName
        type
      }
      student {
        school
        name
        department
        profilePhoto
      }
      updates {
        date
        subItems {
          type
          content
        }
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
  const [donateActivated, setDonateActivated] = React.useState(false);
  const [reportCampaignView, setReportCampaignView] = React.useState(false);
  const { loading, error, data } = useQuery(GET_CAMPAIGN, {
    variables: { campaignId: id },
  });

  if (error || (data && data.campaign === null)) {
    return (
      <Flex flexDir="column" justify="space-between" height="full">
        <Header withLogo hideMenu />
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
        <Header withLogo hideMenu />
        <Container display="block">
          <Helmet>
            <title>
              {data && data.campaign && data.campaign.student
                ? `${data.campaign?.campaignTitle} - ${data.campaign?.student?.name} - Uçurtma Projesi`
                : 'Uçurtma Projesi'}
            </title>
          </Helmet>
          <CampaignHeader data={data} loading={loading} />
          <Divider my={4} display={{ base: 'none', md: 'block' }} />
          <Flex justify="space-between" align="center" mx={{ base: 4, lg: 0 }}>
            {loading ? (
              <Box flex={1}>
                <Skeleton height={72} />
              </Box>
            ) : (
              <>
                <Heading color="gray.700" fontSize={{ base: '2xl', lg: '3xl' }}>
                  {data.campaign?.campaignTitle}
                </Heading>
                <Box>
                  <PseudoBox
                    as={Button}
                    variant="solid"
                    bg="linkGreen"
                    h={{ base: 12, lg: 16 }}
                    width={{ base: 'auto', md: '416px' }}
                    flexShrink="0"
                    justifyContent="space-between"
                    boxShadow="0 0 2px rgba(124,124,124,0.16)"
                    onClick={() => {
                      setContent('donate');
                      setDonateActivated(true);
                    }}
                    _hover={{ bg: 'green.100' }}
                  >
                    Destek Ol
                    <Icon as={Award} size="28px" />
                  </PseudoBox>
                </Box>
              </>
            )}
          </Flex>
          <Box px={{ base: 4, lg: 0 }}>
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
                      fontSize="15px"
                    >
                      <ReactMarkdown
                        renderers={{
                          ...ChakraUIRenderer(),
                          paragraph: props => {
                            const { children } = props;
                            return <Text mb={4}>{children}</Text>;
                          },
                        }}
                        source={data.campaign?.campaignText}
                        escapeHtml={false}
                      />
                      {data.campaign?.documents && (
                        <Box>
                          <Documents documents={data.campaign?.documents} />
                        </Box>
                      )}
                      {data.campaign?.goals && (
                        <Box mt={5}>
                          <Goals goals={data.campaign?.goals} />
                        </Box>
                      )}
                    </Box>
                    {data.campaign?.updates.length ? (
                      <Box
                        bg="gray.50"
                        borderRadius="4px"
                        p={4}
                        w="full"
                        height="full"
                        maxW={{ base: '100%' }}
                        ml={{ base: 0, lg: 8 }}
                        mt={{ base: 4, lg: 0 }}
                      >
                        <Heading size="sm" color="gray.500">
                          Kampanya Gelişmeleri
                        </Heading>
                        <Suspense fallback={<Loader />}>
                          <Timeline
                            items={data.campaign?.updates}
                            transactions={data.campaign?.transactions}
                          />
                        </Suspense>
                      </Box>
                    ) : (
                      ''
                    )}
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
                    <Suspense fallback={<Loader />}>
                      <Collapse
                        maxW="600px"
                        ml="auto"
                        isOpen={reportCampaignView}
                      >
                        {reportCampaignView && (
                          <ReportCampaignForm campaignId={id} />
                        )}
                      </Collapse>
                    </Suspense>
                  </Flex>
                </Box>
                {(content === 'donate' || donateActivated) && (
                  <Suspense fallback={<Loader />}>
                    <Box display={content === 'donate' ? 'block' : 'none'}>
                      <Donate
                        minimumAmount={data.campaign?.minimumAmount}
                        redirectError={location.state?.redirectError}
                        ethereumAddress={data.campaign?.ethereumAddress}
                        onBack={() => setContent('markdown')}
                      />
                    </Box>
                  </Suspense>
                )}
              </>
            )}
          </Box>
        </Container>
      </Box>
      <LandingFooter />
    </Flex>
  );
}

export default withApollo(Campaign);
