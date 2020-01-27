import React from 'react';
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
      p={{ base: 4, md: 0 }}
      display="block"
      position="relative"
      zIndex={{ base: 'inherit', md: '2' }}
      {...otherProps}
    >
      <Flex justify={withLogo ? 'space-between' : 'flex-end'} align="center">
        {withLogo && (
          <Link href="/">
            <Image
              alt="Uçurtma Projesi"
              src={`${process.env.PUBLIC_URL}/images/logo-gray.svg`}
            />
          </Link>
        )}
        {!hideMenu && (
          <MenuItems
            alignItems="center"
            mt={4}
            display={{ base: 'none', md: 'flex' }}
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
