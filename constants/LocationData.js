// import React, { useState, } from "react";
// import * as IntentLauncherAndroid from 'expo-intent-launcher';
// import Modal from 'react-native-modal'
// import Constants from 'expo-constants'
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// import { Toast } from "native-base";
// import { Platform } from "react-native";




// export const getLocationAsync = async () => {
//     try {
//         let { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status !== 'granted') {
//             // this.setState({
//             //     errorMessage: 'Permission to access location was denied',
//             // });
//             openSettings()
//             return;
//         }

//         location = await Location.getCurrentPositionAsync({});
//         //  this.setState({ location });
//         //console.log("ddd", location.coords)

//     } catch (error) {

//         // let status = Location.getProviderStatusAsync({})
//         // if (!status.locationServicesEnabled) {
//         //     alert('You need to enable the Location')

//         //     //  this.setState({ isLocationModalVisible: true })
//         //     openSettings()
//         console.log("ddd", error)
//         //}
//     }
//     //console.log("ddd", location.coords)
//     return location.coords
// };


// const openSettings = () => {
//     if (Platform.OS == 'ios') {
//         Linking.openURL('app-settings:')
//     } else {
//         IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS)

//     }
//     // this.setState({ openSettings: false })
// }
