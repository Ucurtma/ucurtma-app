import { SimpleGrid, SkeletonText } from '@chakra-ui/react';
import React from 'react';
import Card from './card';

function FeaturedCampaignLoader() {
  const cardProps = {
    d: 'flex',
    flexDir: 'column',
    px: 8,
    py: 4,
    borderRadius: '0.5rem',
    w: 'full',
    justifyContent: 'center',
    mb: 4,
    boxShadow: 'modern',
    alignItems: 'center',
    minH: '456px',
  };

  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={12}>
      <Card sx={cardProps}>
        <SkeletonText w="100%" />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
      </Card>
      <Card sx={cardProps}>
        <SkeletonText w="100%" />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
      </Card>
      <Card sx={cardProps}>
        <SkeletonText w="100%" />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
        <SkeletonText w="100%" mt={4} />
      </Card>
    </SimpleGrid>
  );
}

export default FeaturedCampaignLoader;
