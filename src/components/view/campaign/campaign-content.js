import React, { Suspense, lazy } from 'react';
import { Flex, Box, Text, Heading, Link } from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import Documents from './documents';
import Goals from './goals';
import Loader from '../../ui/loader';

const CampaignTarget = lazy(() => import('./campaign-target'));
const Timeline = lazy(() => import('../../ui/timeline'));

function CampaignContent({ data }) {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }}>
      <Box
        w="full"
        flexShrink="0"
        maxW={{ base: '100%', lg: '65%' }}
        fontSize="15px"
        fontWeight={500}
      >
        <ReactMarkdown
          renderers={{
            ...ChakraUIRenderer(),
            paragraph: props => {
              const { children } = props;
              return <Text mb={4}>{children}</Text>;
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
          <Box
            bg="gray.50"
            borderRadius="4px"
            p={4}
            maxW={{ base: '100%' }}
            ml={{ base: 0, lg: 8 }}
            mt={{ base: 4, lg: 0 }}
            mb={8}
          >
            <Suspense fallback={<Loader />}>
              <CampaignTarget
                target={data.campaign.campaignTarget}
                current={parseFloat(data.campaign.totalFunds)}
                endDate={1598795919}
              />
            </Suspense>
          </Box>
        )}

        {data.campaign?.updates?.length > 0 && (
          <Box
            bg="gray.50"
            borderRadius="4px"
            p={4}
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
        )}
      </Box>
    </Flex>
  );
}

export default CampaignContent;
