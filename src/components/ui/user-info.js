import React from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Heading, Text } from '@chakra-ui/core';

export function UserInfo({ name, withAvatar, avatarURL, reputation }) {
  return (
    <Box display="flex" alignItems="flex-end">
      {withAvatar && (
        <Avatar data-testid="avatar" size="lg" name={name} src={avatarURL} />
      )}
      <Box ml={6}>
        <Heading size="sm" color="paragraph">
          {name}
        </Heading>
        {reputation && <Text color="paragraph">{reputation}</Text>}
      </Box>
    </Box>
  );
}

export function UserInfoBadge({ icon, count, color, label }) {
  return (
    <Box display="flex" alignItems="flex-start">
      <Box
        as={icon}
        flexShrink="0"
        size="1.25rem"
        color={color || 'passiveParagraph.500'}
      />
      <Text
        fontSize="sm"
        ml={2}
        textAlign="justify"
        color={color || 'passiveParagraph.500'}
      >
        {count ? `${count} ${label}` : label}
      </Text>
    </Box>
  );
}

UserInfo.defaultProps = {
  withAvatar: false,
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  avatarURL: PropTypes.string,
  reputation: PropTypes.string,
  withAvatar: PropTypes.bool,
};

UserInfoBadge.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  count: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
};
