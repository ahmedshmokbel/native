
import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Linking,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNSettings from 'react-native-settings';

import RNLocation from 'react-native-location';
import moment from 'moment';
import { requestPermission, getLocationSettings, _startUpdatingLocation } from '../constants/LocationData';
const repoUrl = "https://github.com/timfpark/react-native-location";

export default class TestList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      location: null,
      locationOn: false, airplaneOn: false, captioningOn: false
    };
  }



  async  requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        alert("You can use the location");
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }
async  componentDidMount() {


    // this.requestLocationPermission()
    // RNLocation.configure({
    //   distanceFilter: 0.5, // Meters
    //   desiredAccuracy: {
    //     ios: "best",
    //     android: "balancedPowerAccuracy"
    //   },
    //   // Android only
    //   androidProvider: "auto",
    //   interval: 5000, // Milliseconds
    //   fastestInterval: 10000, // Milliseconds
    //   maxWaitTime: 5000, // Milliseconds
    //   // iOS Only
    //   activityType: "other",
    //   allowsBackgroundLocationUpdates: false,
    //   headingFilter: 1, // Degrees
    //   headingOrientation: "portrait",
    //   pausesLocationUpdatesAutomatically: false,
    //   showsBackgroundLocationIndicator: false,
    // })


    // RNLocation.requestPermission({
    //   ios: "whenInUse",
    //   android: {
    //     detail: "fine",
    //     rationale: {
    //       title: "Location permission",
    //       message: "We use your location to demo the library",
    //       buttonPositive: "OK",
    //       buttonNegative: "Cancel"
    //     }
    //   }
    // }).then(granted => {
    //   if (granted) {
    //  //   this._startUpdatingLocation();
    //   }
    // });
  //  _startUpdatingLocation()
    console.log("LocarionDataaa",await getLocationSettings());




  }




  getLocationSetting() {

    RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
      if (result === RNSettings.ENABLED) {
        //    this.setState({ locationOn: true });
        return
      } else {
        //  this.setState({ locationOn: false });
        this.openLocationSetting()
      }
    });

  }


  openLocationSetting = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Not supported!',
        'Not supported on IOS just yet. Stay tuned ~_~',
      );
      return;
    }
    RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
      result => {
        if (result === RNSettings.ENABLED) {
          //   this.setState({ locationOn: true });
        } else {
          //  this.setState({ locationOn: false });
          return
        }
      },
    );
  };


  openAirplaneSetting = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Not supported!',
        'Not supported on IOS just yet. Stay tuned ~_~',
      );
      return;
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

  getAirPlaneSetting() {
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






  _startUpdatingLocation = async () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        //    console.log("Update", locations);

        this.setState({ location: locations[0] });
      }
    );


    console.log("Updatess", this.state.location);

    RNLocation.configure({ distanceFilter: 500 });
    var latestLocation = await RNLocation.getLatestLocation({ timeout: 60000 })
    // .then(latestLocation => {
    //   console.log("Change", latestLocation);
    // })
    console.log("ChangingRe", latestLocation);




    this.getLocationSettings()



  }

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };

  _openRepoUrl = () => {
    Linking.openURL(repoUrl).catch(err =>
      console.error("An error occurred", err)
    );
  }


  render() {
    const { location } = this.state;
    return (
      <ScrollView style={styles.container}>

        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={styles.title}>react-native-location</Text>
          <TouchableOpacity
            onPress={() => this._openRepoUrl()}
            underlayColor="#CCC"
            activeOpacity={0.8}
          >
            <Text style={styles.repoLink}>{repoUrl}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={this._startUpdatingLocation}
            style={[styles.button, { backgroundColor: "#126312" }]}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._stopUpdatingLocation}
            style={[styles.button, { backgroundColor: "#881717" }]}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>

        {location && (
          <React.Fragment>
            <View style={styles.row}>
              <View style={[styles.detailBox, styles.third]}>
                <Text style={styles.valueTitle}>Course</Text>
                <Text style={[styles.detail, styles.largeDetail]}>
                  {location.course}
                </Text>
              </View>

              <View style={[styles.detailBox, styles.third]}>
                <Text style={styles.valueTitle}>Speed</Text>
                <Text style={[styles.detail, styles.largeDetail]}>
                  {location.speed}
                </Text>
              </View>

              <View style={[styles.detailBox, styles.third]}>
                <Text style={styles.valueTitle}>Altitude</Text>
                <Text style={[styles.detail, styles.largeDetail]}>
                  {location.altitude}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.row}>
                <View style={[styles.detailBox, styles.half]}>
                  <Text style={styles.valueTitle}>Latitude</Text>
                  <Text style={styles.detail}>{location.latitude}</Text>
                </View>

                <View style={[styles.detailBox, styles.half]}>
                  <Text style={styles.valueTitle}>Longitude</Text>
                  <Text style={styles.detail}>{location.longitude}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.detailBox, styles.half]}>
                  <Text style={styles.valueTitle}>Accuracy</Text>
                  <Text style={styles.detail}>{location.accuracy}</Text>
                </View>

                <View style={[styles.detailBox, styles.half]}>
                  <Text style={styles.valueTitle}>Altitude Accuracy</Text>
                  <Text style={styles.detail}>
                    {location.altitudeAccuracy}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.detailBox, styles.half]}>
                  <Text style={styles.valueTitle}>Timestamp</Text>
                  <Text style={styles.detail}>{location.timestamp}</Text>
                </View>

                <View style={[styles.detailBox, styles.half]}>
                  <Text style={styles.valueTitle}>Date / Time</Text>
                  <Text style={styles.detail}>
                    {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.detailBox, styles.full]}>
                  <Text style={styles.json}>{JSON.stringify(location)}</Text>
                </View>
              </View>
            </View>
          </React.Fragment>
        )}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  innerContainer: {
    marginVertical: 30
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  repoLink: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#0000CC",
    textDecorationLine: "underline"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5
  },
  detailBox: {
    padding: 15,
    justifyContent: "center"
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  valueTitle: {
    fontFamily: "Futura",
    fontSize: 12
  },
  detail: {
    fontSize: 15,
    fontWeight: "bold"
  },
  largeDetail: {
    fontSize: 20
  },
  json: {
    fontSize: 12,
    fontFamily: "Courier",
    textAlign: "center",
    fontWeight: "bold"
  },
  full: {
    width: "100%"
  },
  half: {
    width: "50%"
  },
  third: {
    width: "33%"
  }
});