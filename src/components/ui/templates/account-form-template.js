import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/core';
import Card from '../card';

function AccountFormTemplate({ form, illustration, children }) {
  return (
    <Flex
      justify="center"
      align="center"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Card>
        <Box py={8} px={10}>
          {form}
        </Box>
        {children && (
          <Box>
            <Flex align="center" pl={10} height="5rem" background="#FBFBFB">
              <Box>{children}</Box>
            </Flex>
          </Box>
        )}
      </Card>
      {illustration && (
        <Box w="100%" pl={{ lg: 12, sm: 0 }} mt={{ lg: 0, sm: 4 }}>
          {illustration}
        </Box>
      )}
    </Flex>
  );
}

AccountFormTemplate.propTypes = {
  form: PropTypes.node.isRequired,
  illustration: PropTypes.node,
  children: PropTypes.node,
};

export default AccountFormTemplate;
