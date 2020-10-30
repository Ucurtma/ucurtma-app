import React from 'react';
import { Heading, Flex, Button } from '@chakra-ui/core';
import { Linkedin } from 'react-feather';

function Documents({ documents }) {
  if (!documents) return null;

  return (
    <>
      <Heading as="h3" size="md">
        Dökümanlar
      </Heading>
      <Flex mt={4} flexWrap="wrap">
        {documents?.map((document, documentIndex) => {
          let icon;
          if (document.type === 'linkedin-profile') icon = Linkedin;

          return (
            <Button
              key={documentIndex.toString()}
              as="a"
              href={document.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              mr={3}
              color="blue.400"
              fontWeight={400}
              colorScheme="blue"
              flexShrink="0"
              mb={{ base: 2, md: 0 }}
              leftIcon={icon}
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
