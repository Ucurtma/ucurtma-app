import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Flex,
  Avatar,
  Text,
  Button,
  Progress,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft } from 'react-feather';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Siema from 'siema';
import Card from './card';
import CampaignError from './campaign/campaign-error';
import CardTargetInfo from './card-target-info';
import { GET_RANDOM_CAMPAIGNS } from '../../graphql/queries';
import Container from './container';
import Background from '../assets/new-background.svg';
import FeaturedCampaignLoader from './featured-campaign-loader';

const DATA_COUNT = 5;

function FeaturedCampaign() {
  const [slideOn, setSlideOn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, error, data } = useQuery(GET_RANDOM_CAMPAIGNS, {
    variables: { count: DATA_COUNT, listHash: '' },
  });
  const { t } = useTranslation('featuredCampaign');

  useEffect(() => {
    if (data) {
      window.siema = new Siema({
        selector: '.siema',
        duration: 400,
        onInit: () => setSlideOn(true),
        onChange: () => setCurrentSlide(window.siema.currentSlide),
        perPage: {
          0: 1,
          645: 2,
          1000: 3,
        },
      });
    }
  }, [data]);

  const arrowProps = {
    pos: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    zIndex: 4,
    bg: 'white',
    borderRadius: '50%',
    w: '40px',
    h: '40px',
    cursor: 'pointer',
    d: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'lg',
  };

  return (
    <Container
      borderRadius={{ base: 22, lg: 139 }}
      bgImage={`url(${Background})`}
      bgSize="cover"
      minH="680px"
      d="flex"
      alignItems="center"
      px={4}
      width={{ base: '95%', lg: 'full' }}
      pos="relative"
    >
      <Box w="full" overflow="hidden" mx={{ base: 0, sm: 4, lg: 12 }}>
        {loading && <FeaturedCampaignLoader />}
        {error && <CampaignError />}
        {data && (
          <>
            {slideOn && (
              <>
                <Box
                  visibility={currentSlide === 0 && 'hidden'}
                  left="1%"
                  onClick={() => window.siema.prev()}
                  {...arrowProps}
                >
                  <Box as={ChevronLeft} />
                </Box>
                <Box
                  visibility={
                    currentSlide ===
                      data?.randomCampaigns?.campaigns.length - 3 && 'hidden'
                  }
                  onClick={() => window.siema.next()}
                  right="1%"
                  {...arrowProps}
                >
                  <Box as={ChevronRight} />
                </Box>
              </>
            )}
            <Box className="siema">
              {data?.randomCampaigns?.campaigns.map(campaign => {
                const currentFund = parseInt(campaign?.totalFunds || 0, 10);
                const totalPercent =
                  (currentFund * 100) / (campaign?.campaignTarget || 0);
                return (
                  <Box key={campaign.campaignId} mx={4}>
                    <Card
                      display="flex"
                      px={8}
                      py={4}
                      borderRadius="0.5rem"
                      w="full"
                      flexDir="column"
                      justifyContent="space-between"
                      boxShadow="modern"
                      alignItems="center"
                    >
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
                        h="40px"
                        maxW="full"
                        noOfLines={2}
                        isTruncated
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

                        <Flex mt={4} justifyContent="space-between">
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
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default FeaturedCampaign;
