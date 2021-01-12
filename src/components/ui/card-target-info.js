import React from 'react';
import { Image, Box, Text } from '@chakra-ui/react';

function CardTargetInfo({ title, price, percent, value, ...otherProps }) {
  return (
    <Box {...otherProps}>
      <Text fontSize="sm" color="gray.600">
        {title}
      </Text>
      {price && (
        <Text color="gray.800" fontWeight={600}>
          <Image
            maxW="8px"
            width="full"
            height="full"
            src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
            mx={1}
            display="inline"
          />
          {new Intl.NumberFormat('tr-TR').format(price)}
        </Text>
      )}
      {(percent || percent === 0) && (
        <Text color="gray.800" fontWeight={600} ml={1}>
          %{Math.floor(percent)}
        </Text>
      )}
      {value && (
        <Text color="gray.800" fontWeight={600} ml={1}>
          {value}
        </Text>
      )}
    </Box>
  );
}

export default CardTargetInfo;
