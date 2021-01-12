import React, { useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Image,
  Button,
  useToast,
  Box,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import Web3 from 'web3'; // todo: move web3 to another component because we shouldn't import web3 every time when header renders.
import { useTranslation, Trans } from 'react-i18next';
import Container from './container';
import MenuItems from './menu-items';
import { MainContext } from '../../context/main-context';
import { SupportButton } from '../view/landing-page/landing-page';

function Header({ menuItems, isManager = false }) {
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
                        const localStorageKey = 'signedToken';
                        token = window.btoa(
                          `${msg}::${window.ethereum.selectedAddress}`
                        );
                        localStorage.setItem(localStorageKey, token);

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

      window.addEventListener('storage', e => {
        const signedToken = localStorage.getItem('signedToken');
        if (signedToken && e.key === 'signedToken') {
          localStorage.removeItem('signedToken');
          signToken([window.ethereum.selectedAddress]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager, signToken]);

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

  const WalletElement = walletState.wallet
    ? { Element: Box, props: { display: 'flex' } }
    : {
        Element: Button,
        props: {
          variant: 'solid',
          bg: 'transparent',
          isLoading: walletLoading,
        },
      };

  return (
    <Box
      zIndex={2}
      position="fixed"
      top="0"
      width="full"
      bg="white"
      transition="0.2s ease all"
      px={{ base: 4, lg: 0 }}
      py={{ base: 2, lg: 0 }}
      boxShadow="modern"
    >
      <Container
        py={{ base: 1, lg: 4 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display={{ base: 'flex', lg: 'block' }}
          w={{ base: 'full', lg: 'unset' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/">
            <Image
              alt="Uçurtma Projesi"
              src={`${process.env.PUBLIC_URL}/images/logo-black.svg`}
            />
          </Link>
          <SupportButton display={{ lg: 'none', base: 'flex' }} size="sm" />
        </Box>
        <Flex mt={2} py={1} overflowY="auto">
          {isManager && (
            <WalletElement.Element
              {...WalletElement.props}
              color="gray.800"
              fontSize="sm"
              onClick={() => !walletState.wallet && checkForMetamask()}
              justifyContent={walletLoading ? 'center' : 'flex-start'}
            >
              <Text
                as="span"
                maxW={walletState.wallet && '153px'}
                isTruncated
                alignSelf="center"
              >
                {walletState.wallet || 'Cüzdanını Bağla'}
              </Text>
            </WalletElement.Element>
          )}
          <MenuItems alignItems="center" items={menuItems} />
          <SupportButton display={{ base: 'none', lg: 'flex' }} />
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
