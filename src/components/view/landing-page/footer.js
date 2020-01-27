import React from 'react';
import {
  Flex,
  Image,
  Grid,
  Box,
  List,
  ListItem,
  Heading,
  Link,
} from '@chakra-ui/core';
import Container from '../../ui/container';

function LandingFooter() {
  return (
    <Flex py={12} px={{ base: 4, md: 0 }} bg="gray.800" color="gray.100">
      <Container alignItems="flex-start" mt={0}>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '15% auto',
          }}
          width="full"
          columnGap={{ base: 8, md: 12 }}
          rowGap={{ base: 8 }}
        >
          <Image src={`${process.env.PUBLIC_URL}/images/logo-white.svg`} />
          <Box>
            <Heading size="xs" mb={8} textTransform="uppercase">
              Topluluğa Katıl
            </Heading>
            <List spacing={2}>
              <ListItem>
                <Link href="https://t.me/ucurtma_projesi">Telegram</Link>
              </ListItem>
              <ListItem>
                <Link href="https://twitter.com/ucurtmaprojesi">Twitter</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.instagram.com/ucurtma_projesi/">
                  Instagram
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://medium.com/ucurtma-projesi">Medium</Link>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Container>
    </Flex>
  );
}

export default LandingFooter;
