import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/layout';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_ALL_CAMPAIGN_DETAILS } from '../../graphql/queries';
import ValueRenderer from './value-renderer';
import { ReactComponent as Teddy } from '../assets/teddy.svg';

function DonateProgress() {
  const { t } = useTranslation('donate-section');
  const { data, error, loading } = useQuery(GET_ALL_CAMPAIGN_DETAILS);

  if (loading || error) {
    return null;
  }

  return (
    <SimpleGrid
      mb={{ base: '0', lg: '4' }}
      gap="8"
      columns={{ base: '1', lg: '2' }}
    >
      <Box>
        <ValueRenderer
          title={t('totalFund')}
          value={data?.allCampaignDetails.collectedAmount}
        />
        <ValueRenderer
          title={t('successfulCampaigns')}
          value={data?.allCampaignDetails.successfulCampaignsCount}
          withCurrency={false}
        />
      </Box>
      <Box d={{ base: 'none', lg: 'block' }} as={Teddy} />
    </SimpleGrid>
  );
}

export default DonateProgress;
