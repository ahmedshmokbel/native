import React from 'react';
import { Platform, StyleSheet, Alert, Text, TextInput, TouchableOpacity, View, FlatList, } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { Badge, Icon, withBadge, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
 
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { getLocalizedJsonName } from '../constants/ConvertJsonName';
import { PartyUrl } from '../Redux1/Url';
import String from '../translation/Translate'
import { rtlView } from '../constants/Layout';

 
 const Language = (props) => {
   
 
    return ( 
                <Menu>

                    <MenuTrigger style={styles.trigger}>
                        <Ionicons color="#b40000" size={35} name='md-more' />
                    </MenuTrigger>

                    <MenuOptions>
                        <MenuOption
                            onSelect={() => props.navigation.navigate('LocationOnMaps')}// {SectorName:getLocalizedJsonName(props.SectorName),LatLong:props.i[0].GPSLocation,Name:getLocalizedJsonName(props.JsonName)})}
                        > 
                            <Text style={[rtlView()],{ fontSize: 17,}}>{String.Maps}</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => props.navigation.navigate('UpdateClient', { PartyCode: props })} >
                        <Text style={{ fontSize: 17 }}>{String.ViewInfo}</Text>
                        </MenuOption>
                        {/* <MenuOption onSelect={() => alert(`Delete`)} >
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                    </MenuOptions>
                </Menu>
         
    );
}
const styles = StyleSheet.create({

    topLinks: {
        paddingVertical: 10,
        backgroundColor: "#f9f9f9",
        // marginBottom: 10,
        paddingHorizontal: 10,
        width: '95%',
        marginLeft: "2.5%",
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    container: {
        flexDirection: 'row',


    },
    imgView: {

        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: 50,

    },



    textContainer: {
        flexDirection: 'column',
        paddingLeft: '3%',

        textAlign: "right",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    profileText: {
        flexDirection: 'row',

    },
    profileText2: {

        flexDirection: 'row',


    },
    name: {
        fontSize: 16,
        paddingBottom: 2,
        paddingRight: 5,
        //color: '#b40000',
        textTransform: 'capitalize',
    },
    phone: {
        color: '#6a6a6a',

    },
    sectorName: {
        color: '#6a6a6a',
    },
    typeName: {
        color: '#6a6a6a',
    },
    trigger: {
         padding: 5,
        margin: 5,
    },
});
export default Language