import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './intl/tr-TR.json';
import en from './intl/en-US.json';

const resources = { en, tr };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'tr',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
