import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

function SelectLanguage({ ...otherProps }) {
  const { i18n } = useTranslation();

  const languages = Object.keys(i18n.services.resourceStore.data);
  const currentLanguage = i18n.language;

  const getLanguage = lang => {
    switch (lang) {
      case 'tr':
        return {
          label: 'Turkish',
          key: 'TR',
          flag: '..',
        };
      case 'en':
        return {
          label: 'English',
          key: 'EN',
          flag: '..',
        };
      default:
        throw new Error('language-not-found');
    }
  };

  return (
    <Menu>
      <MenuButton ml={4} as={Button} variant="ghost" {...otherProps}>
        <Flex align="center">
          <Image
            src={`${process.env.PUBLIC_URL}/images/flags/${currentLanguage}.png`}
            h="24px"
            mr={2}
          />
          {getLanguage(currentLanguage).key}
        </Flex>
      </MenuButton>
      <MenuList>
        {languages.map(language => {
          return (
            <MenuItem
              isDisabled={language === currentLanguage}
              key={language}
              onClick={() => {
                localStorage.setItem('language', language);
                i18n.changeLanguage(language);
              }}
            >
              <Image
                src={`${process.env.PUBLIC_URL}/images/flags/${language}.png`}
                h="24px"
                mr={2}
              />
              {getLanguage(language).label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default SelectLanguage;
