import React, { Suspense, lazy } from 'react';
import { Flex, Box, Text, Link } from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import Documents from './documents';
import Goals from './goals';
import Loader from '../../ui/loader';
import CampaignContentBox from '../../ui/campaign-content-box';

const CampaignTarget = lazy(() => import('./campaign-target'));
const Timeline = lazy(() => import('../../ui/timeline'));

function CampaignContent({ data }) {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }}>
      <Box
        w="full"
        flexShrink="0"
        maxW={{ base: '100%', lg: '65%' }}
        fontWeight={400}
      >
        <ReactMarkdown
          renderers={{
            ...ChakraUIRenderer(),
            paragraph: props => {
              const { children } = props;
              return (
                <Text textAlign="justify" mb={8} lineHeight="26px">
                  {children}
                </Text>
              );
            },
            link: props => {
              const { children, href } = props;
              return (
                <Link color="blue.500" href={href} isExternal>
                  {children}
                </Link>
              );
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
      <Box w="full" height="full">
        {(data?.campaign?.campaignTarget || data?.campaign?.endDate) && (
          <CampaignContentBox>
            <Suspense fallback={<Loader />}>
              <CampaignTarget
                target={data?.campaign?.campaignTarget}
                current={parseFloat(data.campaign.totalFunds)}
                endDate={data?.campaign?.endDate}
                type={data?.campaign?.campaignType}
              />
            </Suspense>
          </CampaignContentBox>
        )}

        {data.campaign?.updates?.length > 0 && (
          <CampaignContentBox>
            <Suspense fallback={<Loader />}>
              <Timeline
                items={data.campaign?.updates}
                transactions={data.campaign?.transactions}
              />
            </Suspense>
          </CampaignContentBox>
        )}
      </Box>
    </Flex>
  );
}

export default CampaignContent;
