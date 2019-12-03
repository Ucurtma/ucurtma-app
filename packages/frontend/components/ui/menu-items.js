import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';
import { Flex, Button } from '@chakra-ui/core';
import Link from 'next/link';
import NavButton from './nav-icon-button';

function MenuItems({ showNav, loggedIn }) {
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
      {
        color: 'paragraph',
        href: '/account/login',
        label: 'Log in',
        condition: !loggedIn,
      },
      {
        color: 'linkBlue',
        href: '/account/signup',
        label: 'Start a campaign',
        condition: !loggedIn,
      },
    ],
  };

  return (
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
      </Flex>
    </Flex>
  );
}

MenuItems.propTypes = {
  loggedIn: PropTypes.bool,
  showNav: PropTypes.bool,
};

export default MenuItems;
