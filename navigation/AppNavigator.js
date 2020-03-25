import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigation';
import LoginScreen from '../LoginComponents/LoginScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
//import DeliveryNavigation from './DeliveryNavigation'


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AuthLoadingScreen,
    login: LoginScreen,
    Menu: DrawerNavigator,
 //   Delivery: DeliveryNavigation
  })
);

