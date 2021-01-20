import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

function CampaignSupportInfo({ title, value, hasCurrency }) {
  return (
    <>
      <Heading as="h4" fontSize="sm" fontWeight={600} color="gray.400">
        {title}
      </Heading>
      <Text fontSize="2xl" fontWeight={400}>
        {value}
        {hasCurrency && (
          <Text ml={1} fontSize="sm" as="span">
            TRYB
          </Text>
        )}
      </Text>
    </>
  );
}

export default CampaignSupportInfo;
