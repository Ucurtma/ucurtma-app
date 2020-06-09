import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { PlusCircle } from 'react-feather';

function Goals({ goals }) {
  if (!goals) return null;

  return (
    <>
      <Heading as="h3" size="md">
        Vaatlerim
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
            <Box as={PlusCircle} mr={4} flexShrink="0" />
            {goal.description}
          </Flex>
        );
      })}
    </>
  );
}

export default Goals;
