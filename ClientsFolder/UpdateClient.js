import React, { Component } from 'react';
import { Facebook, Linking } from 'expo';
import Dimensions from 'Dimensions';
import {
    Text, Button, TouchableOpacity, Animated,
    Easing, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Image, StyleSheet, ImageBackground, I18nManager, Platform
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Navigation from '../navigation/NavigationService'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconPass from 'react-native-vector-icons/MaterialCommunityIcons';
 
//import MapView, { ProviderPropType, Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { LoginPress, LookUpsAction } from '../Redux1/actions/LoginActions';
import * as axios from "axios";
import { rtlView } from '../constants/Layout';
import { UpdatePartyAction } from '../Redux1/actions/PartiesActions';
import { ItemsGroupStyle } from '../constants/AppStyles';
import Translate from '../translation/Translate';
//  import LocationOnMaps from '../LocationsComponants/LocationOnMaps';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import String from '../translation/Translate'


class UpdateClient extends React.Component {


    constructor(props) {
        super(props);

        var party = props.navigation.state.params.Party


      //  console.log("payload", party.DisplayName)

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);


        let latitude = 0.0043 //Number(lat)
        let longitude = 0.0034 //Number(lng)

        this.state = {
            isLoading: false,
            phone: party.Phone,
            email: party.Email,
            fax: party.Fax,
            PartyName: party.DisplayName,
            EmpName: false,
            EmpPass: false,
            EmpTenant: false
        };



    }

    handleSave() {
        const { phone, fax, email } = this.state;
        var CODE = this.props.navigation.state.params.Party.PartyCode

        this.props.dispatch(UpdatePartyAction(this.props.Token, this.props.userHeaderInfo, phone, fax, email, CODE,this.props.navigation));
        // const latitude = "31.176737";
        // const longitude = "29.895345";
        // const label = "d";

        // const url = Platform.select({
        //   ios: "maps:" + latitude + "," + longitude,
        //   android: "geo:" + latitude + "," + longitude 
        // });


        // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
        // var urla = scheme + '31.176737,29.895345'
        // Linking.openURL(urla);
    }


    render() {
        const { PartyName, fax, email } = this.state;

        if (this.props.navigation.state.params.Party.ImageGPSInfo!="") {


            var lat = this.props.navigation.state.params.Party.ImageGPSInfo.split(',')[0].trim();
            var lng = this.props.navigation.state.params.Party.ImageGPSInfo.split(',')[1].trim();


            latitude = Number(lat)
            longitude = Number(lng)
        }
        return (

            <Container style={{ flex: 1, padding: 25 }}>


                <Form>
                    <Item floatingLabel>
                        <Label>{String.Mobile}</Label>
                        <Input onChangeText={(phone) => this.setState({ phone })} value={this.state.phone}

                            leftIconContainerStyle={{ marginRight: 15 }}
                        />
                    </Item>
                    <Item floatingLabel last>
                        <Label>{String.TeleFax}</Label>
                        <Input onChangeText={(fax) => this.setState({ fax })} value={this.state.fax}

                            leftIconContainerStyle={{ marginRight: 15 }}
                        />
                    </Item>
                    <Item floatingLabel last>
                        <Label>{String.Email}</Label>
                        <Input onChangeText={(email) => this.setState({ email })} value={this.state.email}

                            leftIconContainerStyle={{ marginRight: 15 }} />
                    </Item>
                </Form>


                <Button
                    onPress={() => {
                        this.handleSave();
                    }}

                    color="#b40000"
                    title={String.UpdateInfo}
                />

{/* 
                <MapView provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation
                    zoomControlEnabled={true}
                    showCompass={true}
                    rotateEnabled={false}
                    followsUserLocation={true}
                    showsMyLocationButton

                    fitToCoordinates


                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }}>
                    <MapView.Circle
                        center={{
                            latitude,
                            longitude,
                        }}
                        radius={100}
                        strokeWidth={1}
                        strokeColor={'#1a66ff'}
                        fillColor={'rgba(230,238,255,0.5)'}

                    />


                    <MapView.Marker
                        coordinate={{
                            latitude,
                            longitude
                        }}
                        title={PartyName}

                    //    description={SectorName}

                    />


                </MapView > */}
            </Container>





        )
    }

}

const styles = StyleSheet.create({

    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 180 - 80,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#000',
        textAlign: I18nManager.isRTL ? 'right' : 'left',

    },
    inputWrapper: {
        flexDirection: 'row',
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 7,
    },
    inlineError: {
        //  position: 'absolute',
        // zIndex: 99,

        right: 50,
        top: 6,
        color: 'red'
    },
});



const mapStateToProps = state => ({
    Parties: state.parties.Parties,
    BpSectors: state.login.BpSectors,
    BpTypes: state.login.BpTypes,

    Tenent: state.login.tenant.id,
    Token: state.login.token,
    UserId: state.login.userHeaderInfo.userId,
    userHeaderInfo: state.login.userHeaderInfo,
    tenantProfile: state.login.tenantProfile,

})

export default connect(mapStateToProps)(UpdateClient)

