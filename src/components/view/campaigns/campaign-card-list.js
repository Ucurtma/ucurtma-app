import React from 'react';
import {
  Skeleton,
  Box,
  Heading,
  Flex,
  Avatar,
  Text,
  Button,
  Tooltip,
  Progress,
  PseudoBox,
} from '@chakra-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CampaignError from '../campaign/campaign-error';
import Card from '../../ui/card';
import CardTargetInfo from '../../ui/card-target-info';

function CampaignCardList({ loading, data, error }) {
  const navigate = useNavigate();
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
            maxW={maxW}
            minW="0"
            flexDir="column"
            justifyContent="space-between"
            mb={4}
          >
            <Box>
              <Flex flexDir="column" alignItems="center">
                <Avatar
                  size="lg"
                  src={campaign?.student?.profilePhoto}
                  name={campaign?.student?.name}
                />
                <PseudoBox
                  as="h3"
                  mt={4}
                  color="gray.600"
                  textAlign="center"
                  _hover={{ textDecoration: 'underline' }}
                  fontWeight={600}
                >
                  <Link to={`/campaign/${campaign?.campaignId}`}>
                    {campaign?.student?.name}
                  </Link>
                </PseudoBox>
                <Text color="gray.500" textAlign="center">
                  {campaign?.student?.school}
                </Text>
                <Tooltip
                  label={campaign?.campaignTitle}
                  textAlign="center"
                  p={4}
                >
                  <Heading
                    as="h4"
                    size="sm"
                    textAlign="center"
                    my={4}
                    width="full"
                    minW={0}
                    display="-webkit-box"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    css={{
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {campaign?.campaignTitle}
                  </Heading>
                </Tooltip>
                <Box w="full" mt={2}>
                  <Flex justifyContent="space-between">
                    <CardTargetInfo
                      title={t('totalFund')}
                      percent={totalPercent}
                    />

                    <CardTargetInfo
                      title={t('target')}
                      price={campaign?.campaignTarget}
                    />
                  </Flex>

                  <Progress
                    color="green"
                    height="12px"
                    value={totalPercent}
                    borderRadius="4px"
                  />
                  <Flex mt={2} alignItems="center">
                    <Box
                      fontSize="14px"
                      textAlign="center"
                      color="gray.400"
                      w="full"
                      h={63}
                    >
                      <Trans
                        defaults={currentFund < 1 ? 'noFund' : 'donate'}
                        t={t}
                        values={{ count: campaign?.supporterCount }}
                        components={{
                          campaignButton: (
                            <Button
                              variant="link"
                              onClick={() =>
                                navigate(`/campaign/${campaign?.campaignId}`, {
                                  state: { redirected: true },
                                })
                              }
                              verticalAlign="inherit"
                              fontSize="14px"
                              color="gray.400"
                            >
                              buraya tıkla.
                            </Button>
                          ),
                        }}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Button
                  as={Link}
                  to={`/campaign/${campaign?.campaignId}`}
                  variant="outline"
                  variantColor="linkBlue"
                  mt={4}
                  size="sm"
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
