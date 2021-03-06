import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './tr-TR.json';
import en from './en-US.json';

const resources = { en, tr };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'tr',
    fallbackLng: 'tr',
    // keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
      // eslint-disable-next-line no-unused-vars
      format(value, format, lng) {
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      },
    },
  });

export default i18n;
