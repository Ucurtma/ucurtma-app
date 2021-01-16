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
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useQuery } from '@apollo/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';
import Card from './card';
import CampaignError from '../view/campaign/campaign-error';
import CardTargetInfo from './card-target-info';
import Loader from './loader';
import { GET_RANDOM_CAMPAIGNS } from '../../graphql/queries';
import Container from './container';
import Background from '../assets/new-background.svg';

SwiperCore.use([Navigation, Pagination]);
const DATA_COUNT = 5;

function FeaturedCampaign() {
  const { loading, error, data } = useQuery(GET_RANDOM_CAMPAIGNS, {
    variables: { count: DATA_COUNT, listHash: '' },
  });
  const [campaigns, setCampaigns] = useState([]);
  const { t } = useTranslation('featuredCampaign');
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (data) setCampaigns([...campaigns, ...data.randomCampaigns.campaigns]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <CampaignError />;
  }

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
      <Box overflow="hidden" mx={{ base: 0, sm: 4, lg: 12 }}>
        <Swiper
          spaceBetween={50}
          onSlideChange={swiper => setActiveCard(swiper.realIndex)}
          navigation={{ nextEl: '.swiper-next-el', prevEl: '.swiper-prev-el' }}
          pagination={{ el: '.swiper-pagination' }}
          style={{ position: 'unset' }}
          breakpoints={{
            0: { slidesPerView: 1 },
            645: { slidesPerView: 2 },
            1000: { slidesPerView: 3 },
          }}
        >
          <Box
            className="swiper-prev-el"
            visibility={activeCard === 0 && 'hidden'}
            left="1%"
            {...arrowProps}
          >
            <Box as={ChevronLeft} />
          </Box>
          <Box
            className="swiper-next-el"
            visibility={activeCard === DATA_COUNT - 1 && 'hidden'}
            right="1%"
            {...arrowProps}
          >
            <Box as={ChevronRight} />
          </Box>
          {campaigns.map(campaign => {
            const currentFund = parseInt(campaign?.totalFunds || 0, 10);
            const totalPercent =
              (currentFund * 100) / (campaign?.campaignTarget || 0);
            return (
              <SwiperSlide key={campaign.campaignId}>
                <Card
                  display="flex"
                  px={8}
                  py={4}
                  borderRadius="0.5rem"
                  w="full"
                  flexDir="column"
                  justifyContent="space-between"
                  mb={4}
                  boxShadow="modern"
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
                        minH="50px"
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
                        size="lg"
                        boxShadow="modernBlue"
                        bg="#0587FF"
                      >
                        {t('goToCampaign')}
                      </Button>
                    </Flex>
                  </Box>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
}

export default FeaturedCampaign;
