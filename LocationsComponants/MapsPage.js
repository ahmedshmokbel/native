import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { ProviderPropType, Marker } from 'react-native-maps';
import { getLocationAsync } from '../constants/LocationData';
export default class MapsPage extends React.Component {

    state = {
        latitude: null,
        longitude: null,
        LATLNG: {
            latitude: null,
            longitude: null
        },
    }

    async componentDidMount() {

        // const { status } = await Permissions.askAsync(Permissions.LOCATION);
        // if (status !== 'granted') {
        //     const response = await Permissions.askAsync(Permissions.LOCATION);

        // }
        // navigator.geolocation.getCurrentPosition(
        //     ({ coords: { latitude, longitude } }) =>
        //         console.log("Client", latitude),
        //     this.setState({ LATLNG: { latitude, longitude }, latitude, longitude }),
        //     (error) => console.log('error', error)
        // )
        var newRegion = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,

        };
        // this.mapView.animateToRegion(newRegion, 5000);

        getLocationAsync().then(locations => {
            console.log("Maps", locations);


            this.setState({ LATLNG: { latitude: locations.latitude, longitude: locations.longitude }, latitude: locations.latitude, longitude: locations.longitude })


        }).catch(e => {
            console.log('Carch', e);

        })


    }


    render() {
        const { LATLNG, latitude, longitude } = this.state

        if (latitude) {
            return (
                <MapView provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation
                    zoomControlEnabled={true}
                    showCompass={true}
                    rotateEnabled={false}
                    followsUserLocation={true}
                    showsMyLocationButton


                    // ref={ref => { this.mapView = ref }}
                    fitToCoordinates
                    //  minZoomLevel={18}
                    onUserLocationChange={event =>

                        this.setState({ latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude })

                    }

                    style={{ flex: 1 }
                    }
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }}


                >
                    {/* <Button
                    onPress={() => {
                        this.handleSave();
                    }}
                    title="Save information"
                /> */}
                    <MapView.Circle
                        //    key={(this.state.currentLongitude + this.state.currentLongitude).toString()}
                        center={this.state.LATLNG}
                        radius={100}
                        strokeWidth={1}
                        //  
                        strokeColor={'#1a66ff'}
                        fillColor={'rgba(230,238,255,0.5)'}
                    //   onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                    />

                    <MapView.Marker

                        coordinate={{
                            latitude,
                            longitude,
                        }}

                        //onPress={() =>this.handleSave()}
                        title={"marker.title"}
                        description={"desss"}

                    />


                </MapView >

            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>We need to your Permissions</Text>
                </View>

            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
