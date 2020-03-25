import React from 'react';
import {AsyncStorage, Text } from 'react-native';
//import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
 
import en from '../translation/en'
import ar from '../translation/ar'

const   STORAGE_KEY='@APP:languageCode'
const languageDetector = {
    init: Function.prototype,
    type: 'languageDetector',
    async: true, // flags below detection to be async
    detect: async (callback) => {
        const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
        const lng = (savedDataJSON) ? savedDataJSON: null;
        const selectLanguage = lng || locale;
        console.log('detect - selectLanguage:', selectLanguage);
        callback(selectLanguage);
    },
    cacheUserLanguage: () => {}
};

i18n
    .use(languageDetector)
    .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    resources: { en, ar},

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

  //   cache: {
     //  enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    }
  });


export default i18n;