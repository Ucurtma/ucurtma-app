import React from 'react';
import { Box, Heading, Progress, Flex, Image, Divider } from '@chakra-ui/core';
import { Clock } from 'react-feather';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale('tr');

function CampaignTarget({ target, current, endDate }) {
  let now;
  let end;

  if (endDate) {
    now = moment(new Date());
    end = moment.unix(endDate);
  }

  const formula = (current * 100) / target;
  const progressHeight = '56px';
  return (
    <>
      {target && (
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
            {formula > 1 && (
              <Flex
                align="center"
                fontSize="1.2rem"
                fontWeight={700}
                textAlign={{ base: 'center', md: 'left' }}
                color="#1E284C"
                pos="absolute"
                left="8px"
                top="0"
                height={progressHeight}
              >
                %{formula}
              </Flex>
            )}
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
      )}
      {endDate && (
        <>
          <Heading size="sm" color="gray.500" mt={target && 4}>
            {target ? 'Bitiş Tarihi' : 'İlk Ödeme Tarihi'}
          </Heading>
          <Flex mt={2}>
            <Box as={Clock} color="gray.600" />
            <Flex ml={2} color="gray.600">
              <strong>{moment.duration(end.diff(now)).humanize(true)}</strong>
              <Divider orientation="vertical" />
              {end.format('DD.MM.YYYY')}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
}

export default CampaignTarget;
