import React, { Suspense, lazy } from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import { Heading, Box, Flex, Text, Divider } from '@chakra-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
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
import CampaignFooter from '../components/view/campaign/campaign-footer';

const Timeline = lazy(() => import('../components/ui/timeline'));
const Donate = lazy(() => import('../components/view/campaign/donate'));
const CampaignError = lazy(() =>
  import('../components/view/campaign/campaign-error')
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
  const { loading, error, data } = useQuery(GET_CAMPAIGN, {
    variables: { campaignId: id },
  });

  if (error || (data && data.campaign === null)) return <CampaignError />;

  return (
    <>
      <Helmet>
        <title>
          {data && data.campaign && data.campaign.student
            ? `${data.campaign?.campaignTitle} - ${data.campaign?.student?.name} - Uçurtma Projesi`
            : 'Uçurtma Projesi'}
        </title>
      </Helmet>

      <Flex flexDir="column" justify="space-between" height="full">
        <Container display="block">
          <Header withLogo hideMenu />

          <CampaignHeader
            data={data}
            loading={loading}
            onClickDonate={() => {
              setContent('donate');
              setDonateActivated(true);
            }}
          />

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
                  <Divider />
                  <CampaignFooter campaignId={id} />
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
        <LandingFooter />
      </Flex>
    </>
  );
}

export default withApollo(Campaign);
