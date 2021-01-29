import React, { lazy, Suspense, useMemo } from 'react';
import {
  Image,
  Grid,
  Box,
  List,
  ListItem,
  Link,
  Flex,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import Loader from '../../ui/loader';
import { useStore } from '../../../context/global-state';

const CookiePolicy = lazy(() => import('../cookie-policy'));
const ClarificationText = lazy(() => import('../clarification-text'));

function Footer() {
  const { t } = useTranslation('footer');
  const { dispatch } = useStore();

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

  const socialMediaLinks = useMemo(() => {
    return [
      {
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg',
        label: 'Twitter',
        url: 'https://twitter.com/ucurtmaprojesi',
      },
      {
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/telegram.svg',
        label: 'Telegram',
        url: 'https://t.me/ucurtma_projesi',
      },
      {
        icon:
          'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/instagram.svg',
        label: 'Instagram',
        url: 'https://www.instagram.com/ucurtma_projesi/',
      },
      {
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/medium.svg',
        label: 'Medium',
        url: 'https://medium.com/ucurtma-projesi',
      },
    ];
  }, []);

  return (
    <Box as="footer" py={12} px={{ base: 4, md: 0 }}>
      <Container alignItems="flex-start" mt={0}>
        <Grid
          templateColumns={{
            base: 'inherit',
            md: '15% 1fr',
          }}
          width="full"
          columnGap={{ base: 8, md: 12 }}
          rowGap={{ base: 8 }}
          px={4}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/logo-black.svg`}
            mx={{ base: 'auto', lg: 'unset' }}
          />
          <Flex flexDir={{ base: 'column-reverse', lg: 'row' }}>
            <Box
              mt={{ base: 4, lg: 0 }}
              w="full"
              d="flex"
              alignItems="center"
              justifyContent={{ base: 'center', lg: 'unset' }}
            >
              <List
                d="inline-flex"
                justifyContent="center"
                w="full"
                ml={0}
                flexDir={{ base: 'column', lg: 'row' }}
                textAlign={{ base: 'center', lg: 'unset' }}
              >
                <ListItem mr={{ base: 0, lg: 8 }}>
                  <Button
                    variant="link"
                    onClick={() => setModalOpen('cookiePolicy')}
                    size="sm"
                  >
                    {t('CookiePolicy')}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    onClick={() => setModalOpen('clarification')}
                    size="sm"
                  >
                    {t('ClarificationText')}
                  </Button>
                </ListItem>
              </List>
            </Box>
            <Box>
              <List d="flex" justifyContent={{ base: 'center', lg: 'unset' }}>
                {socialMediaLinks.map(link => (
                  <ListItem mr={3} key={link.label} title={link.label}>
                    <Link
                      href={link.url}
                      isExternal
                      bg="transparent"
                      _hover={{ bg: 'gray.200' }}
                      _active={{ bg: 'gray.200' }}
                      d="block"
                      p={2}
                      borderRadius="11px"
                    >
                      <Image src={link.icon} w="24px" alt={link.label} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
