import React from 'react';
import { Heading, Flex, Button } from '@chakra-ui/react';

function Documents({ documents }) {
  if (!documents) return null;

  return (
    <>
      <Heading as="h3" size="md">
        Dökümanlar
      </Heading>
      <Flex mt={4} flexWrap="wrap">
        {documents?.map((document, documentIndex) => {
          return (
            <Button
              key={documentIndex.toString()}
              as="a"
              href={document.link}
              target="_blank"
              rel="noopener noreferrer"
              mr={3}
              bg="blue.700"
              color="white"
              fontWeight={400}
              flexShrink="0"
              mb={{ base: 2, md: 0 }}
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.600' }}
            >
              {document.title}
            </Button>
          );
        })}
      </Flex>
    </>
  );
}

export default Documents;
