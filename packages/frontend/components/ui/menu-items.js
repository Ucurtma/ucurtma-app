import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Button } from '@chakra-ui/core';
import Link from 'next/link';

function MenuItems({ isDrawer, items }) {
  const defaultItems = [
    {
      href: '/',
      label: 'Nedir?',
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

  const mappedItems = items || defaultItems;

  return (
    <Flex {...(isDrawer && drawerProps.wrapper)}>
      {mappedItems.map(
        (navItem, i) =>
          (navItem.condition || navItem.condition === undefined) && (
            <Link href={navItem.href} key={i.toString()}>
              <Button
                ml={isDrawer ? 0 : 4}
                color={navItem.color}
                variant={isDrawer ? 'link' : 'ghost'}
                {...(isDrawer && drawerProps.button)}
                {...navItem.buttonProps}
              >
                {navItem.label}
              </Button>
            </Link>
          )
      )}
    </Flex>
  );
}

MenuItems.propTypes = {
  isDrawer: PropTypes.bool,
};

export default MenuItems;
