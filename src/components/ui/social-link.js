import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Button, Text } from '@chakra-ui/core';

function SocialLink({ icon, label, isConnected, onAction }) {
  return (
    <Flex
      justifyContent="space-between"
      border="1px solid"
      borderColor="#ebebeb"
      px={4}
      py={1}
      mt={4}
    >
      <Box display="flex" alignItems="center">
        <Box as={icon} color="paragraph" size="24px" />
        <Text color="paragraph" ml={4}>
          {label}
        </Text>
      </Box>
      <Button
        variant="ghost"
        onClick={() => onAction && onAction(label)}
        color={isConnected ? 'danger' : 'linkBlue'}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </Flex>
  );
}

SocialLink.defaultProps = {
  isConnected: false,
};

SocialLink.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
  onAction: PropTypes.func,
};

export default SocialLink;
