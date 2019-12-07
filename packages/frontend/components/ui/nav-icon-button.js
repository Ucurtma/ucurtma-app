import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Badge, Box } from '@chakra-ui/core';

function NavButton({
  icon,
  label,
  badge,
  children,
  wrapperProps,
  innerRef,
  ...otherProps
}) {
  return (
    <Box ref={innerRef} position="relative" ml={4} {...wrapperProps}>
      <IconButton
        aria-label={label}
        icon={icon}
        fontSize="22px"
        variant="ghost"
        color="paragraph"
        {...otherProps}
      />
      {badge && (
        <Badge
          borderRadius="100%"
          position="absolute"
          fontSize="0.8em"
          right="0"
          top="-4px"
          backgroundColor="danger"
          width="24px"
          height="24px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          border="3px solid"
          borderColor="bodyBg"
        >
          {badge}
        </Badge>
      )}
      {children}
    </Box>
  );
}

NavButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func])
    .isRequired,
  label: PropTypes.string.isRequired,
  badge: PropTypes.number,
  wrapperProps: PropTypes.object,
  children: PropTypes.node,
  innerRef: PropTypes.object,
};

export default NavButton;
