import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { IconButton, Badge } from '@chakra-ui/core';

const Wrapper = styled.div`
  position: relative;
  margin-right: 2rem;
`;

function NavButton({ icon, label, badge, children }) {
  return (
    <Wrapper>
      <IconButton
        aria-label={label}
        icon={icon}
        fontSize="22px"
        variant="ghost"
        color="paragraph"
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
    </Wrapper>
  );
}

NavButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func])
    .isRequired,
  label: PropTypes.string.isRequired,
  badge: PropTypes.number,
  children: PropTypes.node,
};

export default NavButton;
