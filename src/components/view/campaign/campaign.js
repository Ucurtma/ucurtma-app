import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import Skeleton from 'react-loading-skeleton';
import { Box, Flex, Divider } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from '../../ui/container';
import Loader from '../../ui/loader';
import CampaignHeader from './campaign-header';
import CampaignFooter from './campaign-footer';
import CampaignContent from './campaign-content';
import { GET_CAMPAIGN } from '../../../graphql/queries';

const Donate = lazy(() => import('./donate'));
const CampaignError = lazy(() => import('./campaign-error'));

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

      <Flex flexDir="column" justify="space-between">
        <Container display="block">
          <CampaignHeader
            data={data}
            loading={loading}
            onClickDonate={() => {
              ReactGA.event({
                category: 'Campaign',
                action: 'Clicked Donate Button',
              });
              setContent('donate');
              setDonateActivated(true);
            }}
          />

          {loading ? (
            <Skeleton count={12} />
          ) : (
            <>
              <Box mt={4} display={content === 'markdown' ? 'block' : 'none'}>
                <CampaignContent data={data} />
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
          <Divider mt={8} />
          {data && data.campaign && (
            <CampaignFooter
              campaignId={id}
              title={data.campaign?.campaignTitle}
              studentName={data.campaign?.student?.name}
            />
          )}
        </Container>
      </Flex>
    </>
  );
}

export default Campaign;
