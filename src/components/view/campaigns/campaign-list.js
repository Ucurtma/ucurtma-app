import React from 'react';
import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Button,
  Skeleton,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import CampaignError from '../campaign/campaign-error';
import Card from '../../ui/card';

function CampaignList({
  error,
  loading,
  data,
  hideTitle,
  customButton,
  showId,
}) {
  if (loading) {
    return (
      <>
        <Skeleton minH={331} width={294} />
        <Skeleton minH={331} width={294} />
        <Skeleton minH={331} width={294} />
        <Skeleton minH={331} width={294} />
      </>
    );
  }

  if (error) {
    return <CampaignError />;
  }

  return data.campaigns.map(campaign => {
    return (
      <Card
        key={campaign.campaignId}
        display="flex"
        px={8}
        py={4}
        borderRadius="0.5rem"
        w="full"
        maxW={{ base: 'full', sm: '48%', lg: '23%' }}
        minW="0"
        flexDir="column"
        justifyContent="space-between"
        mb={4}
      >
        <Flex mx={{ base: 4, lg: 0 }} alignItems="center">
          <Avatar
            size="lg"
            src={campaign?.student?.profilePhoto}
            name={campaign?.student?.name}
          />
          <Box ml={4} minW="0">
            {showId && <Text color="gray.500">{campaign?.campaignId}</Text>}
            <Link to={`/campaign/${campaign?.campaignId}`}>
              <Heading display="inline-block" size="sm" color="gray.600">
                {campaign?.student?.name}
              </Heading>
            </Link>
            <Text color="gray.500" isTruncated>
              {campaign?.student?.school}
              {campaign?.student?.department !== '-' &&
                ` / ${campaign?.student?.department}`}
            </Text>
            {!hideTitle && (
              <Heading mt={2} size="sm">
                {campaign?.campaignTitle}
              </Heading>
            )}
          </Box>
        </Flex>
        <Box>
          {customButton ? (
            customButton(campaign)
          ) : (
            <Button
              as={Link}
              to={`/campaign/${campaign?.campaignId}`}
              variant="outline"
              color="linkBlue.400"
              width="full"
              mt={4}
              size="sm"
            >
              Kampanyaya Git
            </Button>
          )}
        </Box>
      </Card>
    );
  });
}

export default CampaignList;
