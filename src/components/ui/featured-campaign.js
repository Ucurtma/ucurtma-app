import React from 'react';
import {
  Skeleton,
  Box,
  Heading,
  Flex,
  Avatar,
  Text,
  Divider,
  Button,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import Card from './card';
import CampaignError from '../view/campaign/campaign-error';

function FeaturedCampaign({ loading, data, error }) {
  if (loading) {
    return (
      <>
        <Skeleton minH={176} />
        <Skeleton minH={176} />
      </>
    );
  }

  if (error) {
    return <CampaignError />;
  }

  return data.campaigns.map(campaign => {
    return (
      <Card
        display="flex"
        px={8}
        py={6}
        borderRadius="0.5rem"
        w="full"
        minW="0"
        key={campaign.campaignId}
        flexDir="column"
        justifyContent="space-between"
      >
        <Box>
          <Heading size="lg" textAlign={{ base: 'center', md: 'left' }}>
            {campaign?.campaignTitle}
          </Heading>
        </Box>
        <Box>
          <Divider my={4} />
          <Flex
            flexDir={{ base: 'column', xl: 'row' }}
            mb={4}
            mx={{ base: 4, lg: 0 }}
          >
            <Flex
              flexDir={{ base: 'column', md: 'row' }}
              w="full"
              alignItems="center"
              minW="0"
            >
              <Avatar
                size="lg"
                src={campaign?.student?.profilePhoto}
                name={campaign?.student?.name}
              />
              <Box minW="0" ml={4}>
                <Heading
                  size="sm"
                  color="gray.600"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  {campaign?.student?.name}
                </Heading>
                <Text
                  color="gray.500"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  {campaign?.student?.school}
                  {campaign?.student?.department !== '-' &&
                    ` / ${campaign?.student?.department}`}
                </Text>
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
          </Flex>
        </Box>
      </Card>
    );
  });
}

export default FeaturedCampaign;
