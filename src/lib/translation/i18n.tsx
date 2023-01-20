import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(Backend) // Registering the back-end plugin
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Remove resources from here
    fallbackLng: 'en',

    ns: ['common', 'home', 'header', 'dataCollectionForm'],

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },

    debug: process.env.NODE_ENV === 'development',
  });

export default i18next;
