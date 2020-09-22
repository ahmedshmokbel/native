// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Button } from 'react-native-elements';
// import { createAppContainer, createStackNavigator } from 'react-navigation'

// import { Container, Left, Icon, Header, Content } from 'native-base';
// import { Ionicons } from '@expo/vector-icons';
// import * as Permissions from 'expo-permissions';
// import Location from 'expo-location'
// import { Camera } from 'expo-camera';
// import MapView, { ProviderPropType, Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// const GOOGLE_MAPS_APIKEY = 'AIzaSyDaulFBobHuZPWOyKxfUQVLI3cUUtTyl5Q';

// const LocationOnMaps = (props) => {
//     // var PartyName = props.navigation.state.params.Name
//     // var SectorName = props.navigation.state.params.SectorName

//     if (props.navigation.state.params.LatLong != "") {


//         var lat = props.navigation.state.params.LatLong.split(',')[0].trim();
//         var lng = props.navigation.state.params.LatLong.split(',')[1].trim();


//         latitude = Number(lat)
//         longitude = Number(lng)
//     }
//     // let latitude = Number(lat)
//     // let longitude = Number(lng)

//     const dest = { latitude: -37.836037, longitude: 145.036730 };

//     const waypoint = [
//         { address: '123 Fake St, Test', latitude: -37.861738, longitude: 145.002500 },
//         { address: '321 Real St, Test', latitude: -37.806694, longitude: 145.010026 },
//         { address: '432 Fake St, Test', latitude: -37.834924, longitude: 145.123425 },
//         { address: '543 Real St, Test', latitude: -37.853932, longitude: 145.012434 }
//     ];



//     console.log(latitude + "  " + longitude)
//     return (



//         <MapView provider={MapView.PROVIDER_GOOGLE}
//             showsUserLocation
//             zoomControlEnabled={true}
//             showCompass={true}
//             rotateEnabled={false}
//             followsUserLocation={true}
//             showsMyLocationButton

//             fitToCoordinates


//             style={{ flex: 1 }
//             }
//             initialRegion={{
//                 latitude,
//                 longitude,
//                 latitudeDelta: 0.0043,
//                 longitudeDelta: 0.0034
//             }}


//         >
//             {waypoint.map(function (item, i) {
//                 return <MapView.Marker
//                     key={i}
//                     coordinate={item}
//                 />
//             })}


//             {/* <MapViewDirections
//                 origin={{ latitude, longitude }}
//                 waypoints={waypoint}
//                 destination={dest}
//                 apikey={GOOGLE_MAPS_APIKEY}
//                 strokeWidth={3}
//                 strokeColor="hotpink"
//                 optimizeWaypoints={true}
//                 onStart={(params) => {
//                     console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//                 }}
//             /> */}



//             <MapView.Circle
//                 center={{
//                     latitude,
//                     longitude,
//                 }}
//                 radius={100}
//                 strokeWidth={1}
//                 strokeColor={'#1a66ff'}
//                 fillColor={'rgba(230,238,255,0.5)'}

//             />


//             <MapView.Marker

//                 coordinate={{
//                     latitude,
//                     longitude,
//                 }}
//             // title={PartyName}

//             // description={SectorName}

//             />


//         </MapView >

//     );


// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
// export default LocationOnMaps