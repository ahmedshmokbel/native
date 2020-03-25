import React from 'react';
import { Platform, Alert, TouchableOpacity, View, Text, Dimensions, StyleSheet, I18nManager } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Button } from 'react-native-elements';
import { DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { SignOut } from "../Redux1/actions/LoginActions";
import { connect } from 'react-redux'
import { rtlView } from '../constants/Layout';
import { ChangeIMG } from '../Redux1/actions/LoginActions';
import { ComponentStyles } from '../constants/AppStyles';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
import { LogOut } from '../Redux1/API';
import { getLocalizedJsonName } from '../constants/ConvertJsonName';
import Translate, { Logout } from '../translation/Translate';
const WIDTH = Dimensions.get('window').width
const Height = Dimensions.get('window').height

import { ChangeLanguage, PrinterSettings } from '../Redux1/actions/SettingsActions';
import { Accordion } from 'native-base';
//import NestedListView, {NestedRow} from 'react-native-nested-listview'

import ImagePicker from 'react-native-image-picker';

const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },

];
 
class ConetentContainer extends React.Component {


    state = {
        filepath: {
            data: '',
            uri: ''
        },
        fileData: '',
        fileUri: ''
    }






    chooseImage = () => {
        let options = {
          title: 'Select Image',
          
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        
        } else {
          const source = { uri: response.uri };
  
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // alert(JSON.stringify(response));s
          console.log('response', JSON.stringify(response));
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.uri
          });
        }
      });
    }




    launchCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
      }
    
      launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
      }
    
    




    ArabicLang = () => {
        this.props.dispatch(ChangeLanguage("ar", true))
        I18nManager.forceRTL(true);
        Translate.setLanguage('ar')
        I18nManager.allowRTL(true);
        //      Updates.reload()


    }

    EnglishLang = () => {
        this.props.dispatch(ChangeLanguage("en", false))
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);

        Translate.setLanguage('en')
        //     Updates.reload()
        //  this.props.navigation.navigate("Auth")

    }



    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                paddingHorizontal: 15,

            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name='md-settings' color='#000' size={32} />
                    <Text style={{ fontSize: 15, marginLeft: 23, fontWeight: 'bold' }}>
                        {Translate.Settings}
                    </Text>
                </View>

                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </View>
        );
    }


    _PrinterrenderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',

            }}>


                <Text style={{ paddingVertical: 10, alignItems: 'flex-start', fontWeight: 'bold' }}>
                    {Translate.PrinterSettings}
                </Text>
            </View>


        );
    }


    // _renderContent(item) {
    //     console.log(item)

    //     return (

    //         <View style={[rtlView(), { flex: 1, flexDirection: 'column', paddingHorizontal: 60 }]}>

    //             <TouchableOpacity onPress={() => this.EnglishLang}>
    //                 <Text style={{ paddingVertical: 10 }}>English</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity onPress={() => {
    //                 this.props.dispatch(ChangeLanguage("ar", true))
    //                 I18nManager.forceRTL(true);
    //                 Translate.setLanguage('ar')
    //                 I18nManager.allowRTL(true);
    //                 Updates.reload()

    //             }}>
    //                 <Text style={{ paddingVertical: 10 }}>العربيه</Text>
    //             </TouchableOpacity >

    //         </View >
    //     );
    // }


    // PickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //     });

    //     //  console.log(result);

    //     if (!result.cancelled) {
    //         //  this.setState({ image: result.uri });
    //     }
    // };


    // CheckCamPermission = async () => {

    //     const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

    //     if (permission.status !== 'granted') {
    //         const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    //         if (newPermission.status === 'granted') {
    //             //its granted.
    //         }
    //         if (status !== 'granted') {
    //             alert('Hey! You heve not enabled selected permissions');
    //         }
    //     }




    // };


    // _TakeImage = async () => {
    //     this.CheckCamPermission
    //     await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    //     let result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true, quality: 0,
    //         aspect: [4, 3],
    //         base64: true,
    //     });



    //     if (!result.cancelled) {

    //         console.log(result.base64)
    //         this.props.dispatch(ChangeIMG(result.uri))
    //     }
    // };


    logout = async () => {
        Alert.alert(
            Translate.Logout,
            Translate.LogOutMsg,
            [
                { text: Translate.Cancel, onPress: () => { return null } },
                {
                    text: Translate.Confirm, onPress: () => {

                        // const response =  LogOut(this.props.Token);

                        //    if (response.ok) 
                        {
                            this.props.dispatch(SignOut());
                            //AsyncStorage.clear();

                            this.props.navigation.navigate('Auth')
                        }


                    }
                },
            ],
            { cancelable: false }
        )
    }






    render() {

        return (
            <View style={[rtlView(), ComponentStyles.drawer]} activeOpacity={1}  >
                <View>
                    <View style={ComponentStyles.topLinks}>
                        <View style={ComponentStyles.profile}>
                            <View style={ComponentStyles.imgView}>
                                <TouchableOpacity >
                                    {this.props.ProfileImg == "" ?
                                        <Avatar size="large" icon={{ name: 'user', color: '#ffffff', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
                                            rounded showEditButton style={ComponentStyles.img} />
                                        :
                                        <Avatar size="large" icon={{ name: 'user', color: '#ffffff', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
                                            rounded showEditButton style={ComponentStyles.img} source={{ uri: `data:image/png;base64,${this.props.ProfileImg}` }} />
                                    }


                                </TouchableOpacity>

                            </View>
                            <View style={ComponentStyles.profileText}>
                                <Text style={ComponentStyles.name}>{getLocalizedJsonName(this.props.UserName)}</Text>

                                <Text style={ComponentStyles.tenant}>{getLocalizedJsonName(this.props.Tenent.name)}</Text>

                            </View>
                        </View>

                    </View>
                    <DrawerItems {...this.props} />

                    <Accordion
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        // renderContent={this._renderContent}


                        renderContent={({ item }) => (
                            <View style={[rtlView(), { flex: 1, flexDirection: 'column', paddingHorizontal: 60 }]}>

                                <TouchableOpacity onPress={() => this.EnglishLang()} style={{ paddingVertical: 10, alignItems: 'flex-start' }}>
                                    <Text >English</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.ArabicLang()} style={{ paddingVertical: 10, alignItems: 'flex-start' }}>
                                    <Text  >العربيه</Text>
                                </TouchableOpacity >

                                <Accordion
                                    dataArray={dataArray}
                                    animation={true}
                                    style={{}}
                                    expanded={true}
                                    renderHeader={this._PrinterrenderHeader}
                                    renderContent={({ item }) => (
                                        <View style={[rtlView(), { flex: 1, flexDirection: 'column', }]}>

                                            <TouchableOpacity onPress={() => {
                                                this.props.dispatch(PrinterSettings("3INCH"))
                                                this.props.navigation.goBack()
                                            }} style={{ paddingVertical: 10, alignItems: 'flex-start' }}>
                                                <Text  >3 Inch</Text>
                                            </TouchableOpacity >
                                            <TouchableOpacity onPress={() => {
                                                this.props.dispatch(PrinterSettings("A4"))
                                                this.props.navigation.goBack()
                                            }} style={{ paddingVertical: 10, alignItems: 'flex-start' }}>
                                                <Text  >A4</Text>
                                            </TouchableOpacity >
                                        </View >)}


                                />

                            </View >)}


                    />
                    <Button onPress={this.logout} buttonStyle={{ justifyContent: 'flex-start', backgroundColor: 'white' }}

                        icon={<Icon2 name="logout" style={{ marginHorizontal: 5 }}
                            size={30}
                            color='#000' />}
                        title={Translate.Logout} titleStyle={{ marginHorizontal: 23, fontWeight: 'bold', fontSize: 14, color: 'black' }}
                    />
                </View>


                {/* <View style={ComponentStyles.footer}>
                    <Text style={ComponentStyles.description}> Menu Tutorial</Text>
                    <Text style={ComponentStyles.version}>v1.0</Text>
                </View> */}

            </View>
        )
    }
}
const mapStateToProps = state => ({

    isLoggedIn: state.login.isLoggedIn,
    ProfileImg: state.login.Image,
    UserName: state.login.username,
    Tenent: state.login.tenant,
    Token: state.login.token,
    UserId: state.login.userHeaderInfo.userId,
    lng: state.settings.Lang,
    userPermissions: state.login.userPermissions
})
export default connect(mapStateToProps)(ConetentContainer);
