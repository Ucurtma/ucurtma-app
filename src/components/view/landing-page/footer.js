import React, { lazy, Suspense, useContext } from 'react';
import {
  Image,
  Grid,
  Box,
  List,
  ListItem,
  Heading,
  Link,
  Flex,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import { MainContext } from '../../../context/main-context';
import Loader from '../../ui/loader';

const CookiePolicy = lazy(() => import('../cookie-policy'));
const ClarificationText = lazy(() => import('../clarification-text'));

function Footer() {
  const { t } = useTranslation('footer');
  const { dispatch } = useContext(MainContext);

  const setModalOpen = type => {
    let Content = <ClarificationText />;
    if (type === 'cookiePolicy') Content = <CookiePolicy />;

    dispatch({
      type: 'SET_MODAL',
      payload: {
        isOpen: true,
        otherProps: { size: '2xl' },
        content: (
          <>
            <Suspense fallback={<Loader />}>
              <ModalBody p={{ base: 4, md: 12 }}>{Content}</ModalBody>
            </Suspense>
          </>
        ),
      },
    });
  };

  return (
    <Box as="footer" py={12} px={{ base: 4, md: 0 }}>
      <Container alignItems="flex-start" mt={0}>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '15% 1fr 13%',
          }}
          width="full"
          columnGap={{ base: 8, md: 12 }}
          rowGap={{ base: 8 }}
          px={4}
        >
          <Image src={`${process.env.PUBLIC_URL}/images/logo-black.svg`} />
          <Flex flexDir={{ base: 'column', lg: 'row' }}>
            <Box>
              <Heading
                size="xs"
                mb={8}
                fontWeight={600}
                textTransform="uppercase"
              >
                {t('Join to Community')}
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
            <Box mt={{ base: 4, lg: 0 }} w="full">
              <List
                d="inline-flex"
                justifyContent="center"
                w="full"
                ml={0}
                flexDir={{ base: 'column', lg: 'row' }}
              >
                <ListItem mr={8}>
                  <Button
                    variant="link"
                    onClick={() => setModalOpen('cookiePolicy')}
                  >
                    {t('CookiePolicy')}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    onClick={() => setModalOpen('clarification')}
                  >
                    {t('ClarificationText')}
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
