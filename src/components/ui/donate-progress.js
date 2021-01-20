import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Progress, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { ReactComponent as CityColorful } from '../assets/city-colorful.svg';
import { ReactComponent as CityLines } from '../assets/city-lines.svg';
import ValueRenderer from './value-renderer';
import leftToRight from './animation-keyframes';
import { GET_ALL_CAMPAIGN_DETAILS } from '../../graphql/queries';
import Loader from './loader';

function DonateProgress() {
  const { data, error, loading } = useQuery(GET_ALL_CAMPAIGN_DETAILS);
  const [cityHeight, setCityHeight] = useState();
  const cityRef = useRef();

  const calculateSVGHeight = () => {
    const cityRefHeight = cityRef.current.clientHeight;
    setCityHeight(cityRefHeight);
  };

  useEffect(() => {
    if (!loading && !error) {
      calculateSVGHeight();

      window.addEventListener('resize', calculateSVGHeight);
    }
    return () => {
      window.removeEventListener('resize', calculateSVGHeight);
    };
  }, [loading, error]);

  const currentValue =
    (data?.allCampaignDetails.collectedAmount * 100) /
    data?.allCampaignDetails.targetAmount;

  return (
    <Box minH="238px">
      {!loading && !error && (
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
            animation={`${leftToRight(
              error ? 0 : currentValue
            )} 4s ease forwards`}
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
              value={currentValue}
              borderLeftRadius="97px"
              width="full"
            />
            <ValueRenderer
              pos="absolute"
              title="Toplanan Miktar"
              value={data?.allCampaignDetails.collectedAmount}
              left={{ base: 0, lg: `${currentValue - 1}%` }}
              transform={{ base: 'translate(0, 20%)', lg: 'translateX(-100%)' }}
              bottom={{ base: 'unset', lg: '5px' }}
              color={{ base: 'black', lg: 'white' }}
              width={{ base: 'unset', lg: 'fit-content' }}
            />
            <ValueRenderer
              pos="absolute"
              title="Hedeflenen Miktar"
              value={data?.allCampaignDetails.targetAmount}
              right={0}
              transform="translate(0, 20%)"
            />
          </Box>
        </Flex>
      )}
      {(loading || error) && (
        <Box
          m="0 auto"
          pos="relative"
          maxW="751px"
          px={4}
          height={`calc(${cityHeight || 229}px + 60px)`}
        >
          {loading && (
            <Loader
              pos="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
            />
          )}
          {error && (
            <Box
              pos="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              color="red.600"
            >
              <Text fontSize="48px">😢</Text>
              <Text fontWeight={600} mt={4}>
                Hedeflere erişirken bir sorun ile karşılaştık. Düzeltmeye
                çalışıyoruz.
              </Text>
            </Box>
          )}
          <Box as={CityLines} zIndex={1} width="100%" opacity={0.1} />
        </Box>
      )}
    </Box>
  );
}

export default DonateProgress;
