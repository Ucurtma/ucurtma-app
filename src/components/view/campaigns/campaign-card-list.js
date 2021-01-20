import React from 'react';
import {
  Skeleton,
  Box,
  Heading,
  Flex,
  Avatar,
  Text,
  Button,
  Progress,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CampaignError from '../campaign/campaign-error';
import Card from '../../ui/card';
import CardTargetInfo from '../../ui/card-target-info';

function CampaignCardList({ loading, data, error }) {
  const { t } = useTranslation('featuredCampaign');

  if (loading) {
    return (
      <>
        <Skeleton
          data-testid="loading-skeleton"
          minH={331}
          width={294}
          mb={4}
        />
        <Skeleton minH={331} width={294} mb={4} />
        <Skeleton minH={331} width={294} mb={4} />
        <Skeleton minH={331} width={294} mb={4} />
      </>
    );
  }

  if (error) {
    return <CampaignError />;
  }

  return data?.campaigns
    ? data.campaigns.campaigns.map(campaign => {
        const currentFund = parseInt(campaign?.totalFunds, 10);
        const totalPercent = (currentFund * 100) / campaign?.campaignTarget;
        let maxW = { base: 'full', sm: '48%', lg: '23%' };

        if (data.campaigns.campaigns.length === 3) {
          maxW = { base: 'full', sm: '48%', md: '32%' };
        } else if (data.campaigns.campaigns.length === 2) {
          maxW = { base: 'full', sm: '48%' };
        }

        return (
          <Card
            key={campaign.campaignId}
            display="flex"
            px={8}
            py={4}
            borderRadius="0.5rem"
            w="full"
            flexDir="column"
            justifyContent="space-between"
            mb={4}
            boxShadow="modern"
            maxW={maxW}
          >
            <Box>
              <Flex flexDir="column" alignItems="center">
                <Avatar
                  size="lg"
                  src={campaign?.student?.profilePhoto}
                  name={campaign?.student?.name}
                />
                <Box
                  as="h3"
                  mt={4}
                  color="gray.900"
                  textAlign="center"
                  _hover={{ textDecoration: 'underline' }}
                  fontWeight={600}
                >
                  <Link to={`/campaign/${campaign?.campaignId}`}>
                    {campaign?.student?.name}
                  </Link>
                </Box>
                <Text mt={1} color="gray.600" textAlign="center">
                  {campaign?.student?.school}
                </Text>
                <Heading
                  fontWeight={600}
                  as="h4"
                  size="sm"
                  textAlign="center"
                  mt={6}
                  mb={4}
                  minH="40px"
                  isTruncated
                  noOfLines={2}
                >
                  {campaign?.campaignTitle}
                </Heading>
                <Box w="full" mt={2}>
                  <Progress
                    colorScheme="green"
                    height="18px"
                    value={totalPercent}
                    borderRadius="4px"
                  />

                  <Flex justifyContent="space-between">
                    <CardTargetInfo
                      title={t('totalFund')}
                      percent={totalPercent}
                    />

                    <CardTargetInfo
                      title={t('target')}
                      price={campaign?.campaignTarget}
                      textAlign="right"
                    />
                  </Flex>

                  <CardTargetInfo
                    title={t('supporterCount')}
                    value={campaign?.supporterCount}
                    textAlign="center"
                    mt={2}
                  />
                </Box>
                <Button
                  as={Link}
                  to={`/campaign/${campaign?.campaignId}`}
                  variant="solid"
                  colorScheme="blue"
                  mt={3}
                  boxShadow="modernBlue"
                  bg="#0587FF"
                >
                  {t('goToCampaign')}
                </Button>
              </Flex>
            </Box>
          </Card>
        );
      })
    : null;
}

export default CampaignCardList;
