import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { GET_CORPORATE_SPONSORS } from '../../../graphql/queries';
import Container from '../../ui/container';

function SponsorList() {
  const { data, loading, error } = useQuery(GET_CORPORATE_SPONSORS);

  const types = useMemo(
    () => [
      { type: 'GOLD', label: 'Altın Sponsorlar', color: '#BF8F00' },
      { type: 'SILVER', label: 'Gümüş Sponsorlar', color: '#BEC2CB' },
      { type: 'BRONZE', label: 'Bronz Sponsorlar', color: '#742200' },
    ],
    []
  );

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  const renderSponsors = type => {
    const filteredSponsors = data.corporateSponsors.filter(
      sponsor => sponsor.type === type
    );

    return filteredSponsors.map(sponsor => {
      return (
        <Flex
          bg="white"
          key={sponsor.name}
          boxShadow="modern"
          px={4}
          py={2}
          align="center"
          borderRadius="11px"
        >
          <Image
            src={sponsor.image}
            h="50px"
            p={sponsor.name === 'ICRYPEX' && 3}
          />
          <Box>
            <Text fontWeight={600} fontSize="lg">
              {sponsor.name}
            </Text>
          </Box>
        </Flex>
      );
    });
  };

  return (
    <Container flexDir="column" py={16} borderRadius={{ base: 22, lg: 139 }}>
      <Box w="full" textAlign="center">
        <Heading as="h2" fontSize="xl">
          Sponsorlarımız
        </Heading>
        <Text maxW={770} mt={8} mx="auto">
          Dünyayı daha renkli bir yere dönüştürmemiz için bizden desteğini
          esirgemeyen sponsorlarımıza çok teşekkür ederiz.
        </Text>
      </Box>
      <Stack mt={8} spacing={4} mx="auto" direction="column">
        {types.map(type => {
          const sponsorTypeLength = data.corporateSponsors.filter(
            sponsor => sponsor.type === type.type
          ).length;

          if (!sponsorTypeLength) return null;

          return (
            <Box key={type.type} textAlign="center" mb={4}>
              <Text color={type.color} fontWeight={600} mb={4}>
                {type.label}
              </Text>
              <Stack
                direction={{ base: 'column', lg: 'row' }}
                spacing={4}
                justify="center"
              >
                {renderSponsors(type.type)}
              </Stack>
            </Box>
          );
        })}
      </Stack>
      <Flex
        p={4}
        border="1px"
        borderColor="gray.300"
        borderRadius="11px"
        direction="column"
        textAlign="center"
        maxW={480}
        mx="auto"
        mt={12}
      >
        Dünyayı daha renkli bir yer haline getirebilmemiz için sen de
        sponsorlarımız arasına katıl.
        <Button
          boxShadow="modernBlue"
          bg="blue.500"
          color="gray.100"
          _hover={{ bg: 'blue.400', textDecor: 'none' }}
          _active={{ bg: 'blue.400' }}
          mt={4}
        >
          Sponsor Ol
        </Button>
      </Flex>
    </Container>
  );
}

export default SponsorList;
