import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, useTheme, Text } from '@chakra-ui/core';

function SidebarItem({ active, icon, label, ...otherProps }) {
  const theme = useTheme();
  const activeProps = {
    color: 'title',
    boxShadow: `-4px 0 ${theme.colors.linkBlue}`,
  };

  return (
    <Button
      display="flex"
      justifyContent="flex-start"
      variant="ghost"
      borderRadius="0"
      color="passiveParagraph"
      fontWeight="400"
      mb={4}
      _hover={{ color: 'title' }}
      {...(active ? activeProps : undefined)}
      {...otherProps}
    >
      <Box as={icon} size="24px" />
      <Text ml={4}>{label}</Text>
    </Button>
  );
}

SidebarItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  label: PropTypes.string,
};

export default SidebarItem;
