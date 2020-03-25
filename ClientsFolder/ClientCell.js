import React from 'react';
import { Platform, StyleSheet, Alert, Text, TextInput,Image, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Icon,  } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { getLocalizedJsonName } from '../constants/ConvertJsonName';
import { PartyUrl } from '../Redux1/Url';
// import { Image } from 'react-native-expo-image-cache';
import String from '../translation/Translate'
import { rtlView } from '../constants/Layout';


 // import { Avatar } from ' react-native-elements'


//const BadgedIcon = withBadge(10)(Icon)
class ClientCell extends React.PureComponent {

   // const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
    //  console.log(this.props.ImageUrl);
    render() {
        const uri = PartyUrl + this.props.ImageUrl

        return (

            <TouchableOpacity onPress={() => this.props.viewItemsGroup(this.props.PartyCode, this.props.BPSectorId,this.props.DisplayName)}>

                <View style={styles.topLinks}>
                    <View style={styles.container}>

                        <TouchableOpacity onPress={() => this.props.onTakePhoto(this.props.PartyCode)}>
                            <View style={styles.imgView}>
                                {this.props.ImageUrl == "" ?
                                    <Avatar size="large" icon={{ name: 'user', color: '#ffffff', type: 'font-awesome' }}
                                        overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
                                        rounded showEditButton style={styles.img} />
                                    :

                                    this.props.ImageUrl.startsWith('file') ?
                                        <Avatar size="large" icon={{ name: 'user', color: '#ffffff', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
                                            source={{ uri: this.props.ImageUrl }}
                                            rounded showEditButton style={styles.img} />
                                        :
                                        <View style={{ flexDirection: 'column', alignItems: "flex-end", position: 'relative' }}>
                                            <Image style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 30,
                                            }}  {...{ uri }} />
                                            <View style={{ top: 35, borderRadius: 20, shadowOpacity: 0.3, backgroundColor: '#97978D', position: 'absolute', justifyContent: "center", alignItems: "center", width: 25, height: 25 }}>
                                                <Icon name='mode-edit' size={20} iconStyle={{ textAlign: 'center', color: 'white' }} />
                                            </View>

                                        </View>
                                }


                            </View>
                        </TouchableOpacity>

                        <View style={styles.textContainer} >

                            <View style={styles.profileText}>

                                <Text style={styles.name} >{getLocalizedJsonName(this.props.DisplayName)} -</Text>
                                <Text style={styles.name} >{(this.props.PartyCode)}</Text>
                            </View>

                            <View style={styles.profileText2}>
                                {/* <Text style={styles.name} >{this.props.PHONE}</Text> */}
                                <Text style={styles.name}>{getLocalizedJsonName(this.props.SectorName)}-</Text>
                                <Text style={styles.nameType}>{getLocalizedJsonName(this.props.TypeName)}</Text>
                            </View>

                            <View style={styles.profileText}>

                                <Text style={styles.name} >{getLocalizedJsonName(this.props.GISName)}</Text>
                            </View>

                        </View>




                    </View>
                    <Menu>

                        <MenuTrigger style={styles.trigger}>
                            <Ionicons color="#b40000" size={35} name='md-more' />
                        </MenuTrigger>

                        <MenuOptions>
                            {/* <MenuOption
                                onSelect={() => this.props.navigation.navigate('LocationOnMaps', { LatLong: this.props.ImageGPSInfo })}// {SectorName:getLocalizedJsonName(this.props.SectorName),LatLong:this.props.i[0].GPSLocation,Name:getLocalizedJsonName(this.props.JsonName)})}
                            >
                                <Text style={[rtlView()], { fontSize: 17, }}>{String.Maps}</Text>
                            </MenuOption> */}
                            <MenuOption onSelect={() => this.props.navigation.navigate('UpdateClient', { Party: this.props })} >
                                <Text style={{ fontSize: 17 }}>{String.ViewInfo}</Text>
                            </MenuOption>
                            {/* <MenuOption onSelect={() => alert(`Delete`)} >
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                        </MenuOptions>
                    </Menu>
                </View>

            </TouchableOpacity>
        );
    }
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
    nameType: {
        fontSize: 15,
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
export default ClientCell