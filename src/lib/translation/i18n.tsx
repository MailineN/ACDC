import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Remove resources from here
    fallbackLng: 'en-IE',

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },

    debug: process.env.NODE_ENV === 'development',
  });

export default i18next;
