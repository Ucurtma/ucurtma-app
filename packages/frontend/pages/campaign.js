import React from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import {
  Heading,
  Grid,
  Box,
  Button,
  Icon,
  Avatar,
  Flex,
  Text,
} from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown';
import { Award } from 'react-feather';
import Header from '../components/ui/header';
import Container from '../components/ui/container';

function Campaign() {
  const [markdown, setMarkdown] = React.useState();

  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/emn178/markdown/master/README.md')
      .then(response => {
        return response.text();
      })
      .then(text => {
        setMarkdown(text);
      });
  }, []);

  return (
    <Box backgroundColor="red">
      <Header mt={8} withLogo />
      <Container>
        <Flex
          my={10}
          justifyContent="space-between"
          alignItems="center"
          width="full"
        >
          <Flex alignItems="flex-end" flexShrink="0">
            <Avatar
              size="lg"
              src="https://www.ucurtmaprojesi.com/mustafa-turhan.jpg"
            />
            <Box ml={4}>
              <Heading size="sm" color="gray.600">
                Mustafa Turhan
              </Heading>
              <Text color="gray.500">Bilgisayar Mühendisliği</Text>
            </Box>
          </Flex>
          <Flex>
            <Box borderRight="1px solid" borderColor="gray.300" pr={6}>
              <Heading size="sm" color="gray.400">
                Destekçi Sayısı
              </Heading>
              <Text fontSize="1.5rem" fontWeight={500}>
                436
              </Text>
            </Box>
            <Box pl={6}>
              <Heading size="sm" color="gray.400">
                Toplam Burs
              </Heading>
              <Text fontSize="1.5rem" fontWeight={500} color="linkBlue">
                ₺280.520
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '62% auto',
          }}
          width="full"
          columnGap={12}
          rowGap={4}
        >
          <Heading color="gray.700">
            Derslerimde daha başarılı olmak için buradayım.
          </Heading>
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
            Destek Ol
            <Icon as={Award} size="28px" mr={2} />
          </Button>
        </Grid>
      </Container>
      <Container display="block">
        <ReactMarkdown
          renderers={ChakraUIRenderer()}
          source={markdown}
          escapeHtml={false}
        />
      </Container>
    </Box>
  );
}

export default Campaign;
