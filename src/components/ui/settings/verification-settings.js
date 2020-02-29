import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Flex, Box, Text, Button } from '@chakra-ui/core';
import { CheckCircle, ArrowRight } from 'react-feather';
// import Link from 'next/link';

function VerificationSettings({ withTitle, isVerified }) {
  return (
    <>
      {withTitle && (
        <Heading mb={4} mt={8} size="sm" color="paragraph">
          Verification
        </Heading>
      )}
      <Flex alignItems="center">
        <Box
          flexShrink={0}
          as={CheckCircle}
          size="24px"
          color={isVerified ? 'linkBlue' : 'paragraph'}
        />
        <Text ml={4} color={isVerified ? 'linkBlue' : 'paragraph'}>
          {isVerified
            ? 'Verificated User'
            : 'You’re not a verified user at the moment. To create a campaign, you should become a verified user.'}
        </Text>
      </Flex>
      {/* <Link href="/account/my-account/verification"> */}
      {!isVerified && (
        <Button
          mt={2}
          ml={4}
          rightIcon={ArrowRight}
          variant="ghost"
          color="linkBlue"
        >
          Apply
        </Button>
      )}
      {/* </Link> */}
    </>
  );
}

VerificationSettings.defaultProps = {
  withTitle: true,
};

VerificationSettings.propTypes = {
  withTitle: PropTypes.bool,
  isVerified: PropTypes.bool,
};

export default VerificationSettings;
