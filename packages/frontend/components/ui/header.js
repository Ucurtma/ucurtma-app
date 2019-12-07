import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Bell } from 'react-feather';
import styled from '@emotion/styled';
import {
  Icon,
  Flex,
  useTheme,
  Avatar,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/core';
import Container from './container';
import MenuItems from './menu-items';
import NavButton from './nav-icon-button';

const Logo = styled(Icon)`
  height: auto;
`;

// todo: get loggedIn from token
function Header({ loggedIn, showNav }) {
  const [isMd, setIsMd] = useState(true);
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  function menuizer() {
    const windowWidth = window.innerWidth;
    const mdBreakpoint = parseInt(theme.breakpoints.md, 10);

    if (windowWidth > mdBreakpoint) {
      setIsMd(false);
    } else {
      setIsMd(true);
    }
  }

  useEffect(() => {
    menuizer();
    window.addEventListener('resize', () => menuizer());

    return () => {
      window.removeEventListener('resize', () => menuizer());
    };
  }, []);

  return (
    <Container mt={4} display="block">
      <Flex justify="space-between" align="center">
        <Link href="/">
          <a id="logo">
            <Logo name="logo" size="11rem" />
          </a>
        </Link>
        <Flex alignItems="center">
          {!isMd && <MenuItems showNav={showNav} loggedIn={loggedIn} />}
          {loggedIn && (
            <>
              <NavButton icon={Bell} label="Notifications" badge={1} />
              {/* todo: get user from state management */}
              {!isMd && (
                <Avatar
                  data-testid="avatar"
                  name="Ash Ketchum"
                  src="broken-link"
                  ml={6}
                />
              )}
            </>
          )}
          {/* add drawer or something else according to design */}
          {isMd && (
            <>
              <NavButton
                display={{ base: 'inline-flex', md: 'none' }}
                label="Menu"
                icon={Menu}
                wrapperProps={{ mr: 0 }}
                innerRef={btnRef}
                onClick={onOpen}
              />
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="full"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>
                    <Link href="/">
                      <a id="logo">
                        <Logo name="logo" size="11rem" />
                      </a>
                    </Link>
                  </DrawerHeader>
                  <DrawerBody>
                    <MenuItems showNav={showNav} loggedIn={loggedIn} isDrawer />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}

Header.defaultProps = {
  showNav: true,
  loggedIn: false,
};

Header.propTypes = {
  loggedIn: PropTypes.bool,
  showNav: PropTypes.bool,
};

export default Header;
