import React, { lazy, Suspense, useContext, useState } from 'react';
import {
  Image,
  Grid,
  Box,
  List,
  ListItem,
  Heading,
  Link,
  Select,
  Flex,
  ModalBody,
  Button,
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import { MainContext } from '../../../context/main-context';
import Loader from '../../ui/loader';

const CookiePolicy = lazy(() => import('../cookie-policy'));
const ClarificationText = lazy(() => import('../clarification-text'));

function Footer() {
  const { t, i18n } = useTranslation('footer');
  const { dispatch } = useContext(MainContext);
  const [langValue, setLangValue] = useState(
    localStorage.getItem('lang') ||
      localStorage.getItem('i18nextLng') ||
      'tr-TR'
  );

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
    <Box as="footer" py={12} px={{ base: 4, md: 0 }} bg="gray.800">
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
          <Image src={`${process.env.PUBLIC_URL}/images/logo-white.svg`} />
          <Flex color="gray.100" flexDir={{ base: 'column', lg: 'row' }}>
            <Box>
              <Heading size="xs" mb={8} textTransform="uppercase">
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
                spacing={2}
                ml={0}
                flexDir={{ base: 'column', lg: 'row' }}
              >
                <ListItem mr={8}>
                  <Button
                    variant="link"
                    onClick={() => setModalOpen('cookiePolicy')}
                  >
                    Çerez Politikası
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    onClick={() => setModalOpen('clarification')}
                  >
                    Aydınlatma Metni
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Flex>
          <Box>
            <Heading
              color="gray.100"
              size="xs"
              mb={8}
              textTransform="uppercase"
              w="full"
            >
              {t('Change Language')}
            </Heading>
            <List spacing={2}>
              <ListItem>
                <Select
                  bg="transparent"
                  variant="outline"
                  color="gray.100"
                  fontWeight={700}
                  size="sm"
                  onChange={e => {
                    i18n.changeLanguage(e.currentTarget.value);
                    localStorage.setItem('lang', e.currentTarget.value);
                    setLangValue(e.currentTarget.value);
                  }}
                  value={langValue}
                >
                  <Box as="option" value="tr" color="gray.800">
                    Turkish
                  </Box>
                  <Box as="option" value="en" color="gray.800">
                    English
                  </Box>
                </Select>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
