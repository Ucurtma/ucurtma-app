import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/core';
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

export default MenuDrawer;
