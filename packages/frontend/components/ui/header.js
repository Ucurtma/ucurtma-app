import React from 'react';
import Link from 'next/link';
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
} from '@chakra-ui/core';
import Container from './container';
import MenuItems from './menu-items';

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
          <Link href="/">
            <a id="logo">
              <Logo name="logo" size={12} />
            </a>
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
function Header({ withLogo, menuItems }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let menuProps;
  if (!withLogo) {
    menuProps = {
      position: 'absolute',
      right: 0,
      top: 0,
    };
  }

  return (
    <Container
      mt={0}
      display={{ base: 'block', md: 'none' }}
      position="relative"
      zIndex={{ base: 'inherit', md: '2' }}
    >
      <Flex justify={withLogo ? 'space-between' : 'flex-end'} align="center">
        {withLogo && (
          <Link href="/">
            <a id="logo">
              <Logo name="logo" size="11rem" />
            </a>
          </Link>
        )}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          {...menuProps}
        >
          <MenuItems items={menuItems} />
        </Flex>
      </Flex>
      <IconButton
        aria-label="Navigation"
        icon={Menu}
        display={{ base: 'inline-flex', md: 'none' }}
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
