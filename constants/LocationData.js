
import React, { Fragment, Component } from 'react';


import RNSettings from 'react-native-settings';

import RNLocation from 'react-native-location';
import moment from 'moment';
import { Linking } from 'react-native';



export const requestPermission = () => {
    // RNLocation.configure({
    //     distanceFilter: 0.5, // Meters
    //     desiredAccuracy: {
    //         ios: "best",
    //         android: "balancedPowerAccuracy"
    //     },
    //     // Android only
    //     androidProvider: "auto",
    //     interval: 5000, // Milliseconds
    //     fastestInterval: 10000, // Milliseconds
    //     maxWaitTime: 5000, // Milliseconds
    //     // iOS Only
    //     activityType: "other",
    //     allowsBackgroundLocationUpdates: false,
    //     headingFilter: 1, // Degrees
    //     headingOrientation: "portrait",
    //     pausesLocationUpdatesAutomatically: false,
    //     showsBackgroundLocationIndicator: false,
    // }).catch(e => {
    //     alert('Please enable location services')
    // })


    RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
            detail: "fine",
            rationale: {
                title: "Location permission",
                message: "We use your location to locate Customers",
                buttonPositive: "OK",
                buttonNegative: "Cancel"
            }
        }
    }).then(granted => {
        if (granted) {
            getLocationSettings();
            // alert('location granted', granted)

        }
        else {
            alert('location denid')
        }
    });


}


export const getLocationSettings = () => {
    return new Promise(function (resolve, reject) {

        RNSettings.getSetting(RNSettings.LOCATION_SETTING)
            .then(result => {

                //  console.log("LOCATION_SETTING In");

                if (result === RNSettings.ENABLED) {
                    //  console.log("LOCATION_SETTING true");
                    resolve(true)
                } else {
                    //    console.log("LOCATION_SETTING false");

                    openLocationSetting().then((value) => {
                        //       console.log('1st then, openlocation(): ' + value)
                        resolve(value)

                        //      console.log("LOCATION_SETTING Out");

                    })

                }

            });
    }).then((value) => {
        if (value) {
            getLocationAsync().then((locations) => {
                //   console.log("Change", locations);

            }).catch(e => {
                console.log('Carch', e);

            })
        } else {

        }
        //    console.log('2nd then, getSettings(): ' + value);
    });



}








const openLocationSetting = () => {
    return new Promise((resolve, reject) => {

        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        }
        //    console.log("openLocationSetting in");

        RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
            result => {
                if (result === RNSettings.ENABLED) {
                    //    this.setState({ locationOn: true });
                    //  getLocationAsync()
                    resolve(true);

                } else {
                    //  this.setState({ locationOn: false });

                    resolve(false);
                }
            },
        )
    });

};



export const getLocationAsync = () => {
    requestPermission()
    return new Promise((resolve, reject) => {

        //   //  getLocationSettings()
        RNLocation.subscribeToLocationUpdates(
            locations => {
            //    console.log("Update", locations);

                resolve(locations[0])
            }
        );

        //  RNLocation.configure({ distanceFilter: 500 });

        // console.log("ChangingRe", latestLocation);


        // RNLocation.getLatestLocation({ timeout: 6000 }).then(latestLocation => {
        //    // console.log("Change", latestLocation);
        //     // return latestLocation
        //     resolve(latestLocation)

        // })
    });


}


const openAirplaneSetting = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:')

    }
    RNSettings.openSetting(RNSettings.ACTION_AIRPLANE_MODE_SETTINGS).then(
        result => {
            if (result === RNSettings.ENABLED) {
                this.setState({ airplaneOn: true });
            } else {
                this.setState({ airplaneOn: false });
            }
        },
    );
};

const getAirPlaneSetting = () => {
    if (Platform.OS === 'android') {
        RNSettings.getSetting(RNSettings.AIRPLANE_MODE_SETTING).then(result => {
            if (result === RNSettings.ENABLED) {
                this.setState({ airplaneOn: true });
            } else {
                this.setState({ airplaneOn: false });
            }
        });
    }

}

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
