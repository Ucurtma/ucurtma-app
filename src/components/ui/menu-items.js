import React from 'react';
import { Button, Stack } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

function MenuItems({ isDrawer, items, ...otherProps }) {
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

  const clickHandler = href => {
    const element = document.querySelector(href);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Stack direction="row" spacing={4} {...otherProps}>
        {items?.map((navItem, i) => (
          <Button
            as={Link}
            to={navItem.href}
            onClick={() =>
              navItem.href[0] === '#' && clickHandler(navItem.href)
            }
            key={i.toString()}
            color={navItem.color}
            variant={isDrawer ? 'link' : 'ghost'}
            size="sm"
            flexShrink={0}
            {...(isDrawer && drawerProps.button)}
            {...navItem.buttonProps}
          >
            {navItem.label}
          </Button>
        ))}
      </Stack>
    </>
  );
}

export default MenuItems;
