import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'react-feather';
import styled from '@emotion/styled';
import {
  Icon,
  Flex,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  Image,
  Button,
  useToast,
  Box,
} from '@chakra-ui/core';
import Eth from 'ethjs';
import Container from './container';
import MenuItems from './menu-items';
import { WalletContext } from '../../App';

const Logo = styled(Icon)`
  height: auto;
`;

function MenuDrawer({ isOpen, onClose, items }) {
  return (
    <Drawer
      returnFocusOnClose={false}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Link to="/">
            <Logo name="logo" size={12} />
          </Link>
        </DrawerHeader>
        <DrawerBody>
          <MenuItems isDrawer items={items} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// todo: get loggedIn from token
function Header({ withLogo, menuItems, hideMenu = false, ...otherProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [walletLoading, setWalletLoading] = useState(false);
  const { state: walletState, dispatch } = useContext(WalletContext);
  const toast = useToast();

  React.useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.selectedAddress) {
        window.eth = new Eth(window.ethereum);

        dispatch({
          type: 'SET_WALLET',
          payload: window.ethereum.selectedAddress,
        });
      }

      window.ethereum.on('accountsChanged', accounts => {
        window.eth = new Eth(window.ethereum);

        dispatch({
          type: 'SET_WALLET',
          payload: accounts[0] || '',
        });
      });
    }
  }, [dispatch]);

  // eslint-disable-next-line consistent-return
  const checkForMetamask = async () => {
    setWalletLoading(true);
    if (window.ethereum) {
      // eslint-disable-next-line no-undef
      window.web3 = new Web3(window.ethereum);
      try {
        // request access
        const accounts = await window.ethereum.enable();
        window.eth = new Eth(window.ethereum);
        setWalletLoading(false);
        dispatch({
          type: 'SET_WALLET',
          payload: accounts[0],
        });
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
    ? { element: Box, props: { display: 'flex' } }
    : {
        element: Button,
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
            <WalletElement.element
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
            </WalletElement.element>
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
            color="paragraph"
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

Header.defaultProps = {
  loggedIn: false,
  withLogo: false,
};

Header.propTypes = {
  loggedIn: PropTypes.bool,
  withLogo: PropTypes.bool,
};

export default Header;
