import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Text, Icon, Flex } from '@chakra-ui/core';

function Dropbox({ icon, type, onDrop, active, ...otherProps }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: file => onDrop(file, type),
  });

  return (
    <Flex
      width="full"
      my={4}
      mx={8}
      height="10rem"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="#DEEDFF"
      borderRadius="30px"
      justifyContent="center"
      {...getRootProps()}
      {...otherProps}
    >
      <input {...getInputProps({ multiple: false })} />

      <Flex
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
      >
        {icon &&
          (!isDragActive ? (
            <Icon name={icon} fontSize="2.75rem" opacity="0.5" />
          ) : (
            <span>dropzone</span>
          ))}
        {type && <Text color="#57A4FF">{type}</Text>}
      </Flex>
    </Flex>
  );
}

Dropbox.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  type: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default Dropbox;
