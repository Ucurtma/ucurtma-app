import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Progress } from '@chakra-ui/react';
import Container from './container';
import { ReactComponent as CityColorful } from '../assets/city-colorful.svg';
import { ReactComponent as CityLines } from '../assets/city-lines.svg';
import ValueRenderer from './value-renderer';
import leftToRight from './animation-keyframes';

function DonateProgress() {
  const [cityHeight, setCityHeight] = useState();
  const [currentAnimation, setCurrentAnimation] = useState(leftToRight);
  const cityRef = useRef();

  useEffect(() => {
    const cityRefHeight = cityRef.current.clientHeight;
    setCityHeight(cityRefHeight);
  }, []);

  return (
    <>
      <Container maxW={691 + 60} flexDir="column">
        <Flex pos="relative" height={`calc(${cityHeight || 229}px + 60px)`}>
          <Box
            pos="absolute"
            top="0"
            left="50%"
            transform="translateX(-50%)"
            as={CityLines}
            zIndex={1}
            width="100%"
          />
          <Box
            pos="absolute"
            top="0"
            left="50%"
            transform="translateX(-50%)"
            as={CityColorful}
            ref={cityRef}
            zIndex={1}
            clipPath="polygon(0 0, 30% 0%, 30% 100%, 0% 100%)"
            animation={`${currentAnimation} 4s ease forwards`}
            width="100%"
          />
          <Box
            width="full"
            alignSelf="flex-end"
            borderRightRadius="97px"
            overflow="hidden"
          >
            <Progress
              colorScheme="green"
              height={{ base: '45px', lg: '85px' }}
              value={48}
              borderLeftRadius="97px"
              width="full"
            />
            <ValueRenderer
              pos="absolute"
              title="Toplanan Miktar"
              value="57.402"
              left="48%"
              transform="translate(-100%, 20%)"
            />
            <ValueRenderer
              pos="absolute"
              title="Hedeflenen Miktar"
              value="57.402"
              right={0}
              transform="translate(0, 20%)"
            />
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default DonateProgress;
