import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Text, Icon, Flex, Box } from '@chakra-ui/core';

function Dropbox({ icon, type, onDrop, active, ...otherProps }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: file => onDrop(file, type),
  });

  return (
    <Box
      opacity={isDragActive ? '1' : '0.5'}
      as={Flex}
      width="full"
      height={{ base: '8rem', md: '10rem' }}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="blue.400"
      borderRadius="30px"
      justifyContent="center"
      cursor="pointer"
      _hover={{ opacity: '1' }}
      _focus={{ opacity: '1' }}
      {...otherProps}
      {...getRootProps()}
    >
      <input
        {...getInputProps({ multiple: true, accept: 'application/pdf' })}
      />

      <Flex
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
      >
        {icon && <Icon name={icon} fontSize="2.75rem" />}
        {type && (
          <Text color="blue.400" fontWeight={400}>
            {type}
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default Dropbox;
