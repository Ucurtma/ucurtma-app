import React from 'react';
import { Heading, Flex, Box, Divider, Button } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import Container from '../../ui/container';
import { GET_CAMPAIGNS } from '../../../graphql/queries';
import FeaturedCampaign from '../../ui/featured-campaign';

function FeaturedCampaigns() {
  const { t } = useTranslation(['howItWorks', 'titles']);
  const { loading, error, data } = useQuery(GET_CAMPAIGNS, {
    variables: { start: 0, end: 4 },
  });

  return (
    <Flex bg="#f6c851" py={16} id="featured-campaigns">
      <Container>
        <Box width="full" mb={12} textAlign="center" color="gray.50">
          <Heading size="xl">{t('titles:Campaigns')}</Heading>
          <Divider maxW={24} borderColor="gray.50" marginX="auto" mt={8} />
        </Box>
        <Flex
          px={{ base: 4, md: 0 }}
          wrap="wrap"
          justifyContent="space-between"
          w="full"
        >
          <FeaturedCampaign data={data} error={error} loading={loading} />
        </Flex>
        <Flex w="full" mt={16} justify="center">
          <Button
            as={Link}
            variant="solid"
            to="/campaigns"
            color="gray.700"
            bg="white"
            boxShadow="cardLight"
            minH={65}
            rightIcon={ChevronRight}
            // onClick={() => navigate(`/campaign/${campaign?.campaignId}`)}
          >
            Tüm kampanyaları görüntüle
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}

export default FeaturedCampaigns;
