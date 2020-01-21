import React from 'react';
import { Heading, Grid, Box, Button, Icon } from '@chakra-ui/core';
import { Award } from 'react-feather';
import Header from '../components/ui/header';
import Container from '../components/ui/container';

function Campaign() {
  return (
    <Box backgroundColor="red">
      <Header mt={8} withLogo />
      <Container>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '60% auto',
          }}
          width="full"
          columnGap={12}
          rowGap={4}
        >
          <Heading>Derslerimde daha başarılı olmak için buradayım.</Heading>
          <Button
            variant="solid"
            mt={8}
            bg="gray.100"
            h={16}
            w="100%"
            flexShrink="0"
            justifyContent="space-between"
            boxShadow="0 0 12px rgba(124, 124, 124, 0.16)"
          >
            Öğrenciye Bağış Yap
            <Icon as={Award} size="28px" mr={2} />
          </Button>
        </Grid>
      </Container>
    </Box>
  );
}

export default Campaign;
