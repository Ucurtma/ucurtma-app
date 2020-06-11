import React from 'react';
import { Box, Heading, Text, ButtonGroup, Button } from '@chakra-ui/core';
import Celebrating from '../illustrations/celebrating';

function VerificationSuccess() {
  return (
    <>
      <Box maxW="250px" mb={4}>
        <Celebrating />
      </Box>
      <Heading size="sm" mb={4}>
        Thank you for application!
      </Heading>
      <Text color="gray.600" mb={4}>
        Now, Its our turn. Our team and automated systems will look your
        documents. After everything is OK, they will verify your account.
      </Text>
      <Text color="gray.600" mb={4}>
        We will send you an email after your account verified. If you want to
        continue now, you can create &quot;draft campaign.&quot;
      </Text>
      <ButtonGroup alignSelf="flex-end">
        {/* <Link href="/"> */}
        <Button mr={4} variant="ghost" color="danger" type="submit">
          Go to Homepage
        </Button>
        {/* </Link> */}
        {/* <Link href="/campaigns/start-campaign"> */}
        <Button variant="outline" color="linkBlue" type="submit">
          Start a Draft Campaign
        </Button>
        {/* </Link> */}
      </ButtonGroup>
    </>
  );
}

export default VerificationSuccess;
