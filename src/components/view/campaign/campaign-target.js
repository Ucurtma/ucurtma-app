import React from 'react';
import { Box, Heading, Progress, Flex, Image } from '@chakra-ui/core';

function CampaignTarget() {
  return (
    <>
      <Heading size="sm" color="gray.500">
        Kampanya Hedefi
      </Heading>
      <Box pos="relative">
        <Progress mt={4} color="green" height="32px" value={20} />
        <Flex
          align="center"
          fontSize="1.2rem"
          fontWeight={500}
          textAlign={{ base: 'center', md: 'left' }}
          color="#1E284C"
          pos="absolute"
          right="8px"
          top="1px"
        >
          <Image
            maxW="12px"
            width="full"
            height="full"
            src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
            mr={1}
          />
          258.147
        </Flex>
      </Box>
    </>
  );
}

export default CampaignTarget;
