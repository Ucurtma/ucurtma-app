import React from 'react';
import { Box, Heading, Progress, Flex, Text } from '@chakra-ui/react';
import { Clock } from 'react-feather';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function CampaignTarget({ target, current, endDate, type, isDeactivated }) {
  const { t } = useTranslation('campaignTarget');
  const isShortTerm = type === 'ShortTerm';
  let now;
  let end;

  if (endDate) {
    now = dayjs();
    end = dayjs.unix(endDate);
  }

  const formula = (current * 100) / target;
  const progressHeight = '56px';
  return (
    <>
      {target && (
        <>
          <Heading fontWeight={600} fontSize="sm" color="gray.700">
            {t('campaignTarget')}
          </Heading>
          <Box pos="relative">
            <Progress
              mt={4}
              colorScheme="green"
              height={progressHeight}
              value={parseFloat(formula)}
              borderRadius="4px"
            />
            {formula > 1 && (
              <Flex
                align="center"
                fontSize="1.2rem"
                fontWeight={600}
                textAlign={{ base: 'center', md: 'left' }}
                pos="absolute"
                left="8px"
                top="0"
                height={progressHeight}
                color={formula > 10 ? 'white' : '#1E284C'}
              >
                %{Math.floor(formula)}
              </Flex>
            )}
            <Flex
              align="center"
              fontSize="1.2rem"
              fontWeight={600}
              textAlign={{ base: 'center', md: 'left' }}
              color={formula > 70 ? 'white' : '#1E284C'}
              pos="absolute"
              right="8px"
              top="0"
              height={progressHeight}
            >
              {new Intl.NumberFormat('tr-TR').format(target)}{' '}
              <Text fontSize="sm" as="span" ml={1}>
                TRYB
              </Text>
            </Flex>
          </Box>
        </>
      )}
      {endDate && !isDeactivated && (
        <>
          <Heading
            fontSize="sm"
            fontWeight={600}
            color="gray.700"
            mt={target && 4}
          >
            {t(isShortTerm ? 'endDate' : 'firstDate')}
          </Heading>
          <Flex mt={4} alignItems="center">
            <Box as={Clock} color="gray.600" />
            <Flex ml={2} color="gray.600" alignItems="center">
              <Box fontWeight={600}>
                {dayjs.duration(end.diff(now)).humanize(true)}
              </Box>
              <Box borderLeft="1px solid" ml={4} pl={4} borderColor="gray.200">
                {end.format('DD.MM.YYYY')}
              </Box>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
}

export default CampaignTarget;
