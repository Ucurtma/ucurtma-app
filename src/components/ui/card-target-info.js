import React from 'react';
import { Flex, Image, Box } from '@chakra-ui/core';

function CardTargetInfo({ title, price, percent }) {
  return (
    <Flex
      justifyContent="flex-end"
      alignItems="center"
      color="gray.400"
      fontSize="14px"
      mb={2}
    >
      {title}

      {price && (
        <>
          <Image
            maxW="8px"
            width="full"
            height="full"
            src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
            mx={1}
          />
          <strong>{new Intl.NumberFormat('tr-TR').format(price)}</strong>
        </>
      )}
      {percent && (
        <Box as="strong" ml={1}>
          %{Math.floor(percent)}
        </Box>
      )}
    </Flex>
  );
}

export default CardTargetInfo;
