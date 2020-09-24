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

function CampaignList({
  error,
  loading,
  data,
  hideTitle,
  customButton,
  wrapperProps,
  showId,
}) {
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

  if (data?.campaigns?.campaigns) {
    return data?.campaigns?.campaigns?.map(campaign => (
      <PseudoBox
        display="flex"
        border="1px solid"
        borderColor={campaign?.isActive ? 'gray.100' : 'red.100'}
        borderRadius="4px"
        backgroundColor="white"
        mb={4}
        p={4}
        flexDir={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        w="full"
        boxShadow="cardLight"
        _hover={{ boxShadow: 'cardLightHover' }}
        transition="0.2s ease all"
        key={campaign?.campaignId}
        {...wrapperProps}
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
      </PseudoBox>
    ));
  }
  return null;
}

export default CampaignList;
