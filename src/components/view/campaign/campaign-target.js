import React from 'react';
import { Box, Heading, Progress, Flex, Image } from '@chakra-ui/core';

function CampaignTarget({ target, current }) {
  const formula = (current * 100) / target;
  const progressHeight = '56px';
  return (
    <>
      <Heading size="sm" color="gray.500">
        Kampanya Hedefi
      </Heading>
      <Box pos="relative">
        <Progress
          mt={4}
          color="green"
          height={progressHeight}
          value={parseFloat(formula)}
          borderRadius="4px"
        />
        <Flex
          align="center"
          fontSize="1.2rem"
          fontWeight={500}
          textAlign={{ base: 'center', md: 'left' }}
          color="#1E284C"
          pos="absolute"
          right="8px"
          top="0"
          height={progressHeight}
        >
          <Image
            maxW="12px"
            width="full"
            height="full"
            src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
            mr={1}
          />
          {new Intl.NumberFormat('tr-TR').format(target)}
        </Flex>
      </Box>
    </>
  );
}

export default CampaignTarget;
