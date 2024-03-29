import React, { lazy, Suspense, useMemo } from 'react';
import {
  Image,
  Box,
  List,
  ListItem,
  Link,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Container from './container';
import Loader from './loader';
import { useStore } from '../../context/global-state';

const CookiePolicy = lazy(() => import('../pages/legal/cookie-policy'));
const ClarificationText = lazy(() =>
  import('../pages/legal/clarification-text')
);
const ExplicitConsent = lazy(() => import('../pages/legal/explicit-consent'));

function Footer({ hideLegals = false }) {
  const { t } = useTranslation('footer');
  const { dispatch } = useStore();

  const setModalOpen = type => {
    let Content = <ClarificationText />;
    if (type === 'cookiePolicy') Content = <CookiePolicy />;
    if (type === 'explicit') Content = <ExplicitConsent />;

    dispatch({
      type: 'SET_MODAL',
      payload: {
        isOpen: true,
        otherProps: { size: '4xl' },
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
    <Box as="footer" py={12} w="full">
      <Container
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
        flexDir={{ base: 'column', lg: 'row' }}
        px="0"
      >
        <Image
          src={`${process.env.PUBLIC_URL}/images/logo-black.svg`}
          mx={{ base: 'auto', lg: 'unset' }}
          flexShrink="0"
        />
        {!hideLegals && (
          <Box
            mt={{ base: 4, lg: 0 }}
            mb={{ base: 4, lg: 0 }}
            w="full"
            d="flex"
            alignItems="center"
            justifyContent={{ base: 'center', lg: 'unset' }}
            alignSelf="center"
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
              <ListItem mr={{ base: 0, lg: 8 }}>
                <Button
                  variant="link"
                  onClick={() => setModalOpen('clarification')}
                  size="sm"
                >
                  {t('ClarificationText')}
                </Button>
              </ListItem>
              <ListItem mr={{ base: 0, lg: 8 }}>
                <Button
                  variant="link"
                  onClick={() => setModalOpen('explicit')}
                  size="sm"
                >
                  {t('ExplicitConsent')}
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  as="a"
                  href="mailto:iletisim@ucurtmaprojesi.com"
                  variant="link"
                  size="sm"
                >
                  {t('Contact')}
                </Button>
              </ListItem>
            </List>
          </Box>
        )}
        <List
          flexShrink="0"
          d="flex"
          justifyContent={{ base: 'center', lg: 'unset' }}
        >
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
                borderRadius="full"
              >
                <Image
                  src={link.icon}
                  w="16px"
                  htmlWidth="16px"
                  htmlHeight="16px"
                  loading="lazy"
                  alt={link.label}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default Footer;
