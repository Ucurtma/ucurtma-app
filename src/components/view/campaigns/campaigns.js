import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Heading } from '@chakra-ui/core';
import Container from '../../ui/container';
import { GET_CAMPAIGNS } from '../../../graphql/queries';
import CampaignList from './campaign-list';

function Campaigns() {
  const { loading, error, data } = useQuery(GET_CAMPAIGNS);

  return (
    <Container
      maxW={{
        base: 'full',
        md: 'containers.md',
      }}
      flexDir="column"
      px={{ base: 4, lg: 0 }}
    >
      <Heading my={4} size="md">
        Tüm kampanyalar
      </Heading>
      <CampaignList error={error} data={data} loading={loading} />
    </Container>
  );
}

export default Campaigns;
