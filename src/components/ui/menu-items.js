import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Globe } from 'react-feather';
import { useTranslation } from 'react-i18next';

function MenuItems({ isDrawer, items, ...otherProps }) {
  const { i18n } = useTranslation();

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
    <Flex {...(isDrawer && drawerProps.wrapper)} {...otherProps}>
      {items &&
        items.map(
          (navItem, i) =>
            (navItem.condition || navItem.condition === undefined) && (
              <Link
                to={navItem.href}
                onClick={() =>
                  navItem.href[0] === '#' && clickHandler(navItem.href)
                }
                key={i.toString()}
              >
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
      {/* todo: delete menu and menu button from here. we should find better place for change language button */}
      <Menu>
        <MenuButton
          as={Button}
          ml={isDrawer ? 0 : 4}
          variant={isDrawer ? 'link' : 'ghost'}
          {...(isDrawer && drawerProps.button)}
        >
          <Icon as={Globe} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => i18n.changeLanguage('tr-TR')}>
            Türkçe
          </MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage('en-US')}>
            English
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

MenuItems.propTypes = {
  isDrawer: PropTypes.bool,
};

export default MenuItems;
