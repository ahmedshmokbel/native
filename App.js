/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';


import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux1/store'
import NavigationService from './navigation/NavigationService';
//import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export default class App extends React.PureComponent {




  render() {

    return (
 
        <Provider store={store}>

          <PersistGate loading={null} persistor={persistor}>

            {/* <MenuProvider > */}
              <AppNavigator ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }} />
            {/* </MenuProvider> */}
          </PersistGate>

        </Provider>
     );
  };
}

const styles = StyleSheet.create({
  
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

