import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Search, Bell } from 'react-feather';
import styled from '@emotion/styled';
import { Icon, Flex, Avatar, Button } from '@chakra-ui/core';
import Container from './ui/container';
import NavButton from './ui/nav-icon-button';

const Logo = styled(Icon)`
  height: auto;
`;

// todo: get loggedIn from token
function Header({ loggedIn, showNav }) {
  const navItems = {
    left: [
      { color: 'paragraph', href: '/', label: 'Explore' },
      {
        color: 'linkBlue',
        href: '/',
        label: 'Start a campaign',
        condition: loggedIn,
      },
    ],
    right: [
      { color: 'paragraph', href: '/account/login', label: 'Log in' },
      { color: 'linkBlue', href: '/account/signup', label: 'Start a campaign' },
    ],
  };
  return (
    <Container mt={4} display="block">
      <Flex justify="space-between" align="center">
        <Link href="/">
          <a id="logo">
            <Logo name="logo" size="11rem" />
          </a>
        </Link>
        <Flex width="100%" justify="space-between" align="center">
          {showNav && (
            <Flex ml={12}>
              {navItems.left.map(
                (navItem, i) =>
                  (navItem.condition || navItem.condition === undefined) && (
                    <Link href={navItem.href} key={i.toString()}>
                      <Button ml={4} color={navItem.color} variant="ghost">
                        {navItem.label}
                      </Button>
                    </Link>
                  )
              )}
            </Flex>
          )}
          <Flex align="center">
            <NavButton icon={Search} label="Search" />
            {navItems.right.map(
              (navItem, i) =>
                (navItem.condition || navItem.condition === undefined) && (
                  <Link href={navItem.href} key={i.toString()}>
                    <Button ml={4} color={navItem.color} variant="ghost">
                      {navItem.label}
                    </Button>
                  </Link>
                )
            )}
            {loggedIn && (
              <>
                <NavButton icon={Bell} label="Notifications" badge={1} />
                {/* todo: get user from state management */}
                <Avatar name="Ash Ketchum" src="broken-link" />
              </>
            )}
          </Flex>
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
