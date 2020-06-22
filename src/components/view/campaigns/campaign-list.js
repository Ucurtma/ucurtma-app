import React from 'react';
import {
  PseudoBox,
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

function CampaignList({ error, loading, data }) {
  if (loading) {
    return (
      <>
        <Skeleton h={110} />
        <Skeleton mt={4} h={110} />
      </>
    );
  }

  if (error) {
    return <CampaignError />;
  }

  return data.campaigns.map(campaign => {
    return (
      <PseudoBox
        display="flex"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="4px"
        mb={4}
        p={4}
        flexDir={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        w="full"
        boxShadow="cardLight"
        _hover={{ boxShadow: 'cardLightHover' }}
        transition="0.2s ease all"
        key={campaign?.campaignId}
      >
        <Flex mx={{ base: 4, lg: 0 }} alignItems="center">
          <Avatar
            size="lg"
            src={campaign?.student?.profilePhoto}
            name={campaign?.student?.name}
          />
          <Box ml={4} minW="0">
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
            <Heading mt={2} size="sm">
              {campaign?.campaignTitle}
            </Heading>
          </Box>
        </Flex>
        <Box>
          <Button
            as={Link}
            to={`/campaign/${campaign?.campaignId}`}
            variant="outline"
            color="linkBlue"
            width="full"
            mt={4}
          >
            Kampanyaya Git
          </Button>
        </Box>
      </PseudoBox>
    );
  });
}

export default CampaignList;
