import React from 'react';

import {Provider} from 'react-redux';
import {Navigation} from './src/navigation/navigation';
import {store} from './src/redux';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './src/i18n/en.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
