import React, { useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'react-feather';
import {
  Flex,
  useDisclosure,
  IconButton,
  Image,
  Button,
  useToast,
  Box,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@chakra-ui/core';
import Web3 from 'web3'; // todo: move web3 to another component because we shouldn't import web3 every time when header renders.
import { useTranslation, Trans } from 'react-i18next';
import Container from './container';
import MenuItems from './menu-items';
import { MainContext } from '../../context/main-context';
import MenuDrawer from './menu-drawer';

// todo: get loggedIn from token
function Header({
  menuItems,
  withLogo = false,
  hideMenu = false,
  isManager = false,
  ...otherProps
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [walletLoading, setWalletLoading] = useState(false);
  const { state: walletState, dispatch } = useContext(MainContext);
  const toast = useToast();
  const { t } = useTranslation(['header', 'global']);

  const signToken = useCallback(
    accounts => {
      let token;

      dispatch({
        type: 'SET_MODAL',
        payload: {
          isOpen: true,
          closable: false,
          content: (
            <>
              <ModalHeader>{t('header:signTokenModal')}</ModalHeader>
              <ModalBody>
                <Trans
                  i18nKey="header:signToken"
                  t={t}
                  values={{ address: accounts[0] }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    const message = `\x19Uçurtma kampanyası oluşturmak için ${window.ethereum.selectedAddress} adresinin bana ait olduğunu teyit ediyorum.\n`;
                    const hash = window.web3.utils.toHex(message);
                    window.web3.eth.personal
                      .sign(hash, window.ethereum.selectedAddress)
                      .then(msg => {
                        token = window.btoa(
                          `${msg}::${window.ethereum.selectedAddress}`
                        );
                        localStorage.setItem('signedToken', token);
                        dispatch({
                          type: 'SET_MODAL',
                          payload: { isOpen: false },
                        });
                      })
                      .catch(err => {
                        toast({
                          title:
                            err.code === 4001
                              ? t('header:deniedSignatureTitle')
                              : t('global:somethingWrong'),
                          description:
                            err.code === 4001
                              ? t('header:deniedSignatureDesc')
                              : t('global:errorWithCode', {
                                  code: err.code,
                                }),
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                          position: 'top-right',
                        });
                      });
                  }}
                  variant="ghost"
                >
                  {t('global:confirm')}
                </Button>
              </ModalFooter>
            </>
          ),
        },
      });

      return token;
    },
    [dispatch, t, toast]
  );

  React.useEffect(() => {
    if (window.ethereum && isManager) {
      if (window.ethereum.selectedAddress) {
        dispatch({
          type: 'SET_WALLET',
          payload: {
            wallet: window.ethereum.selectedAddress,
            chainId: window.ethereum.chainId,
          },
        });

        const signedToken = localStorage.getItem('signedToken');

        if (!signedToken) signToken([window.ethereum.selectedAddress]);
      }

      if (isManager) {
        window.ethereum.on('accountsChanged', accounts => {
          dispatch({
            type: 'SET_WALLET',
            payload: {
              wallet: window.ethereum.selectedAddress,
              chainId: window.ethereum.chainId,
            },
          });

          localStorage.removeItem('signedToken');

          if (window.ethereum.selectedAddress) {
            signToken(accounts);
          }
        });

        window.web3 = new Web3(window.ethereum);
      }
    }
  }, [dispatch, isManager, signToken]);

  // eslint-disable-next-line consistent-return
  const checkForMetamask = async () => {
    setWalletLoading(true);

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.enable();
        window.web3 = new Web3(window.ethereum);
        setWalletLoading(false);
        if (accounts[0]) {
          dispatch({
            type: 'SET_WALLET',
            payload: {
              wallet: accounts[0],
              chainId: window.ethereum.chainId,
            },
          });
          signToken(accounts);
        }
        return window.web3;
      } catch (err) {
        setWalletLoading(false);
        toast({
          title:
            err.code === 4001
              ? "MetaMask'tan izin alınamadı."
              : 'Bir hata oluştu.',
          description:
            err.code === 4001
              ? 'Cüzdan bağlama işlemini yapabilmek için MetaMask uygulamasından izin vermeniz gerekmektedir.'
              : `Hata kodu: ${err.code}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } else {
      setWalletLoading(false);

      toast({
        title:
          'Bu özelliği kullanabilmek için MetaMask eklentisini indirmelisiniz.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  let menuProps;

  if (!withLogo) {
    menuProps = { position: 'absolute', right: 0, top: 0 };
  }

  const WalletElement = walletState.wallet
    ? { Element: Box, props: { display: 'flex' } }
    : {
        Element: Button,
        props: {
          borderRadius: 'full',
          border: '3px solid',
          borderColor: 'gray.300',
          variant: 'solid',
          bg: 'transparent',
        },
      };

  return (
    <Container
      p={{ base: 4, lg: 0 }}
      display="block"
      position="relative"
      zIndex={{ base: 'inherit', md: '2' }}
      {...otherProps}
    >
      <Flex justify={withLogo ? 'space-between' : 'flex-end'} align="center">
        {withLogo && (
          <>
            <Link to="/">
              <Image
                alt="Uçurtma Projesi"
                src={`${process.env.PUBLIC_URL}/images/logo-gray.svg`}
              />
            </Link>
            {isManager && (
              <WalletElement.Element
                {...WalletElement.props}
                py={6}
                color="gray.400"
                onClick={() => !walletState.wallet && checkForMetamask()}
                justifyContent={walletLoading ? 'center' : 'flex-start'}
                isLoading={walletLoading}
              >
                <Box
                  as="span"
                  maxW={walletState.wallet && '153px'}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {walletState.wallet || 'Cüzdanını Bağla'}
                </Box>
              </WalletElement.Element>
            )}
          </>
        )}
        {!hideMenu && (
          <MenuItems
            alignItems="center"
            mt={4}
            display={{ base: 'none', lg: 'flex' }}
            items={menuItems}
            {...menuProps}
          />
        )}
      </Flex>
      {!hideMenu && (
        <>
          <IconButton
            aria-label="Navigation"
            icon={Menu}
            display={{ base: 'inline-flex', lg: 'none' }}
            color="gray.600"
            position="fixed"
            top={3}
            right={3}
            px={2}
            bg="white"
            boxShadow="cardLight"
            onClick={onOpen}
            zIndex="9"
          />
          <MenuDrawer items={menuItems} isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </Container>
  );
}

export default Header;
