import React, { useContext } from 'react';
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
  const { state: contextState, dispatch } = useContext(WalletContext);
  const toast = useToast();

  // eslint-disable-next-line consistent-return
  const checkForMetamask = async () => {
    if (window.ethereum) {
      // eslint-disable-next-line no-undef
      const web3 = new Web3(window.ethereum);
      try {
        // request access
        const accounts = await window.ethereum.enable();
        if (accounts.length > 0) {
          dispatch({
            type: 'SET_WALLET',
            payload: accounts[0],
          });
        }
        return web3;
      } catch (err) {
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
            <Button
              borderRadius="full"
              border="3px solid"
              borderColor="gray.300"
              variant="solid"
              bg="transparent"
              py={6}
              color="gray.400"
              onClick={() => !contextState.wallet && checkForMetamask()}
              justifyContent="flex-start"
            >
              <Box
                as="span"
                maxW={contextState.wallet && '153px'}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {contextState.wallet || 'Cüzdanını Bağla'}
              </Box>
            </Button>
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
