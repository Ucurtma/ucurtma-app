import React from 'react';
import { Box, Avatar, Heading, Text } from '@chakra-ui/core';

export function UserInfo({ name, withAvatar, avatarURL, reputation }) {
  return (
    <Box display="flex" alignItems="flex-end">
      {withAvatar && (
        <Avatar data-testid="avatar" size="lg" name={name} src={avatarURL} />
      )}
      <Box ml={6}>
        <Heading size="sm" color="gray.600">
          {name}
        </Heading>
        {reputation && <Text color="gray.600">{reputation}</Text>}
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
        color={color || 'gray.400'}
      />
      <Text
        fontSize="sm"
        ml={2}
        textAlign="justify"
        color={color || 'gray.400'}
      >
        {count ? `${count} ${label}` : label}
      </Text>
    </Box>
  );
}

UserInfo.defaultProps = {
  withAvatar: false,
};
