import React from 'react';
import { Heading, Text } from '@chakra-ui/core';
import { Facebook, Instagram, Twitter } from 'react-feather';
import SocialLink from '../social-link';

function SocialLinkSettings({ withTitle }) {
  return (
    <>
      {withTitle && (
        <>
          <Heading my={4} size="sm" color="gray.600">
            Social Links
          </Heading>
          <Text color="gray.600">
            Display your social media links on your profile
          </Text>
        </>
      )}
      <SocialLink icon={Facebook} label="Facebook" />
      <SocialLink icon={Instagram} label="Instagram" isConnected />
      <SocialLink icon={Twitter} label="Twitter" />
    </>
  );
}

SocialLinkSettings.defaultProps = {
  withTitle: true,
};

export default SocialLinkSettings;
