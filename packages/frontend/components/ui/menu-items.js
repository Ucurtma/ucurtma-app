import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';
import { Flex, Button } from '@chakra-ui/core';
import Link from 'next/link';
import NavButton from './nav-icon-button';

function MenuItems({ showNav, loggedIn, isDrawer }) {
  const navItems = [
    {
      color: 'paragraph',
      href: '/',
      label: 'Explore',
    },
    {
      color: 'linkBlue',
      href: '/',
      label: 'Start a campaign',
      condition: loggedIn,
    },
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
  ];

  const drawerProps = {
    wrapper: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    button: {
      justifyContent: 'flex-start',
      width: 'full',
      p: '1rem 0',
      borderRadius: 0,
      borderBottom: '2px solid',
      borderBottomColor: 'bodyBg',
    },
  };

  if (showNav) {
    return (
      <Flex {...(isDrawer && drawerProps.wrapper)}>
        {navItems.map(
          (navItem, i) =>
            (navItem.condition || navItem.condition === undefined) && (
              <Link href={navItem.href} key={i.toString()}>
                <Button
                  ml={isDrawer ? 0 : 4}
                  color={navItem.color}
                  variant={isDrawer ? 'link' : 'ghost'}
                  border
                  {...(isDrawer && drawerProps.button)}
                >
                  {navItem.label}
                </Button>
              </Link>
            )
        )}
        {!isDrawer && <NavButton icon={Search} label="Search" />}
      </Flex>
    );
  }
  return null;
}

MenuItems.propTypes = {
  loggedIn: PropTypes.bool,
  showNav: PropTypes.bool,
  isDrawer: PropTypes.bool,
};

export default MenuItems;
