import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

function Goals({ goals }) {
  const { t } = useTranslation('campaignGoal');
  if (!goals) return null;

  return (
    <>
      <Heading as="h3" size="md">
        {t('title')}
      </Heading>
      {goals.map((goal, goalIndex) => {
        return (
          <Flex
            key={goalIndex.toString()}
            width="full"
            bg="yellow.100"
            border="1px solid"
            borderColor="yellow.300"
            borderRadius="3px"
            p={3}
            alignItems="center"
            my={4}
          >
            {goal.description}
          </Flex>
        );
      })}
    </>
  );
}

export default Goals;
