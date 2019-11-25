import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Text, Icon, Flex, PseudoBox } from '@chakra-ui/core';

function Dropbox({ icon, type, onDrop, active, ...otherProps }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: file => onDrop(file, type),
  });

  return (
    <PseudoBox
      opacity={isDragActive ? '1' : '0.5'}
      as={Flex}
      width="full"
      my={4}
      mx={8}
      height="10rem"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="linkBlue"
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
          <Text color="linkBlue" fontWeight="500">
            {type}
          </Text>
        )}
      </Flex>
    </PseudoBox>
  );
}

Dropbox.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  type: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default Dropbox;
