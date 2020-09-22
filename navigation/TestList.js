
// import React from 'react';
// import { StyleSheet, I18nManager, Text, View, Platform, } from 'react-native';
// import { Header, Button, Card, List, ListItem, Badge, Icon, withBadge, ThemeProvider, SearchBar, Avatar, } from "react-native-elements";
// import { Image } from "react-native-expo-image-cache";

// import { ChangeLanguage } from '../Redux1/actions/SettingsActions';
// import { connect } from 'react-redux'
// import { getLocalizedJsonName } from '../constants/ConvertJsonName';
// import RNRestart from 'react-native-restart';
// import { Updates } from 'expo';
// import { Ionicons } from '@expo/vector-icons';

// import String from '../translation/Translate';
// import { DateDay } from '../constants/DateTime';
// import {
//     Menu,
//     MenuOptions,
//     MenuOption,
//     MenuTrigger,
// } from 'react-native-popup-menu';
// import { rtlView } from '../constants/Layout';
// import { RolePermission } from '../constants/constantsData';
// import NestedListView, { NestedRow } from 'react-native-nested-listview';
// import { CheckBox, Body } from 'native-base';
import  { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { 
   Image,
   SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
   NativeModules,
  Alert,
  Platform,
  Button,
  ActivityIndicator,
  Flatlist,
  Dimensions,
  TouchableOpacity
} from 'react-native';

// import {
//   CachedImage,
//   ImageCacheProvider,
//   ImageCacheManager,

// } from 'react-native-cached-image';


 
import React,{useState} from 'react';
 
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
// import RNZebraBluetoothPrinter from './node_modules/react-native-zebra-bluetooth-printer';
const zpl = "^XA^FX Top section with company logo, name and address.^CF0,60^FO50,50^GB100,100,100^FS^ FO75,75 ^ FR ^ GB100, 100, 100 ^ FS^ FO88, 88 ^ GB50, 50, 50 ^ FS ^XZ";
 

class TestList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      devices:[],
      loading:false,
      deviceType:'',
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  
 
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

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          filePath: response,

          fileUri: response.uri
        });
      }
    });
  }

  launchCamera = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        base64: false,
      },
    };
    ImagePicker.launchCamera(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', source);
        this.setState({
          filePath: response,
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

        this.setState({
          fileUri: response.uri
        });
      }
    });

  }





  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('../assets/cake.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../assets/Brownies.jpg')}
        style={styles.images}
      />
    }
  }



  render() {
     return (
      <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
          <View >
            <Text style={{
              fontSize:30,
             
            }}>Demo App</Text>
          </View>
        <View style={styles.body}>
          <Button
            title="enable BT"
            onPress={() => {
              NativeModules.RNZebraBluetoothPrinter.enableBluetooth().then(res => {
                
                console.log(res);
              });
            }}
          ></Button>
          <Button
          title="disable BT"
          onPress={()=>{
            NativeModules.RNZebraBluetoothPrinter.disableBluetooth().then(res=>{  
            console.log(res);
            });
          }}
          ></Button>
          </View>
        <View>
          <Button
          title="Paired devices"
            onPress={() => {
              this.setState({loading:true});
              NativeModules.RNZebraBluetoothPrinter.pairedDevices().then(res => {
                this.setState({devices:res}); 
                this.setState({deviceType:'paired'}); 
                //filter array for printers [class:1664]
                this.setState({loading:false});
              });
            }}
          ></Button>
          <View style={{padding:10}}></View>
          <Button
          title="Unpaired devices"
            onPress={() => {
              this.setState({loading:true});
                NativeModules.RNZebraBluetoothPrinter.scanDevices().then(res => {
                  console.log(res);
                  if(Platform.OS == 'ios') {
                    var found = JSON.parse(res.found);  //filter array for printers [class:1664]
                  }
                  else {
                    var devices = JSON.parse(res);
                    var found = devices.found;
                  }
                  this.setState({deviceType:''}); 

                  this.setState({devices:found}); 
                  //filter array for printers [class:1664]
                  this.setState({loading:false});
                 
                });
             
            }}
          ></Button>
        </View>
    
     {
       this.state.loading == true?<ActivityIndicator />:
       this.state.devices.map((device)=>
         
          <View style={{
            flexDirection:'row',
            padding:20,
            justifyContent:'center'
          }}>
              <View style={{
                flex:0.4
              }}>
                <Text>{device.name}</Text>
              </View>
              <View style={{
                flex:0.3
              }}>
              <Text>{device.address}</Text>
              </View>
              {device.type !='paired' &&
               <View>
                 <Button
                 title="connect"
                 onPress={()=>{                    console.log("res"); 

                   NativeModules.RNZebraBluetoothPrinter.connectDevice(device.address).then(res=>{
                    alert(res)});
                 }}></Button>
               </View>}
          </View>
       )}
    </ScrollView>
    </SafeAreaView> 



    //   <Fragment>
    //     <StatusBar barStyle="dark-content" />
    //     <SafeAreaView>
    //       <View style={styles.body}>
    //         <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick Images from Camera & Gallery</Text>
    //         <View style={styles.ImageSections}>
    //           <View>
    //             {this.renderFileData()}
    //             <Text style={{ textAlign: 'center' }}>Base 64 String</Text>
    //           </View>
    //           <View>
    //             {/* {this.renderFileUri()} */}
    //             {/* <ImageCacheProvider
    //    //           urlsToPreload={images}
    //               onPreloadComplete={() => console.log('hey there')}> */}

    //               {/* <CachedImage source={{ uri: 'https://i2-host.com/tutorials/ar/wp-content/uploads/2017/05/unnamed-2.png' }} /> */}

    //               {/* <CachedImage source={{ uri: images[1] }} />

    //               <CachedImage source={{ uri: images[2] }} /> */}

    //             {/* </ImageCacheProvider> */}
    //             <Text style={{ textAlign: 'center' }}>File Uri</Text>
    //           </View>
    //         </View>

    //         <View style={styles.btnParentSection}>
    //           <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
    //             <Text style={styles.btnText}>Choose File</Text>
    //           </TouchableOpacity>

    //           <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
    //             <Text style={styles.btnText}>Directly Launch Camera</Text>
    //           </TouchableOpacity>

    //           <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
    //             <Text style={styles.btnText}>Directly Launch Image Library</Text>
    //           </TouchableOpacity>
    //         </View>

    //       </View>
    //     </SafeAreaView>
    //   </Fragment>
    )



  }
  //     render() {
  //         const data = [{ title: 'Node 1', items: [{ title: 'Node 1.1' }, { title: 'Node 1.2' }] }]

  //         return (

  //             <View style={styles.container}>

  //                 <Header style={{ flexDirection: 'row' }}
  //                     placement="center"
  //                     leftComponent={
  //                         <Ionicons
  //                             onPress={() => this.props.navigation.openDrawer()}
  //                             name='md-menu'
  //                             size={25}
  //                             style={{ color: "#ffffff" }}
  //                         />
  //                     }

  //                     centerComponent={{
  //                         text: String.Settings,
  //                         style: { fontWeight: 'bold', color: "#ffffff", fontSize: 15 }
  //                     }}
  //                     containerStyle={{
  //                         height: 87,
  //                         backgroundColor: '#b40000',
  //                         shadowColor: "black",
  //                         shadowRadius: 5,
  //                         shadowOpacity: 0.1,
  //                         borderBottomColor: "grey",
  //                         paddingHorizontal: 20,
  //                         shadowOffset: {
  //                             height: 3,
  //                             width: 0
  //                         }
  //                     }}
  //                     //    leftContainerStyle={{ paddingLeft: 5 }}
  //                     rightContainerStyle={{}}
  //                     centerContainerStyle={{}}
  //                 />
  //                 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  //                     <NestedListView
  //                         data={this.props.items}
  //                         getChildrenName={(node) => 'Packs'}
  //                         //  onNodePressed={(node) => alert('')}
  //                         renderNode={(node, level) => (
  //                             <NestedRow style={styles.topLinks} level={level}>
  //                                 {level == 1 ?
  //                                     <View style={styles.container}>


  //                                         <View style={styles.imgView}>

  //                                             <Avatar size="large" icon={{ name: 'user', color: '#ffffff', type: 'font-awesome' }}
  //                                                 overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
  //                                                 rounded showEditButton style={styles.img} />


  //                                         </View>

  //                                         <View style={styles.textContainer} >

  //                                             <View style={styles.profileText}>

  //                                                 <Text style={styles.name} >{getLocalizedJsonName(node.DisplayName)}</Text>
  //                                                 <Text style={styles.name} >{node.ItemCode}</Text>
  //                                             </View>

  //                                         </View>

  //                                     </View>
  //                                     :
  //                                     <View>
  //                                         <CheckBox checked={false} color="green" />
  //                                         <Body>
  //                                             <Text>Finish list Screen</Text>
  //                                         </Body>
  //                                     </View>}
  //                             </NestedRow>
  //                         )}
  //                     />

  //                 </View>

  //             </View>
  //         );
  //     }
}


// const mapStateToProps = state => ({

//     Tenent: state.login.tenant.id,
//     Token: state.login.token,
//     UserId: state.login.userHeaderInfo.userId,
//     lng: state.settings.Lang,
//     userPermissions: state.login.userPermissions,
//     items: state.itemGroups.items,
//     AllItems: state.itemGroups.allItems,
// })

export default (TestList);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

// const styles = StyleSheet.create({

//     topLinks: {

//         backgroundColor: "#f9f9f9",
//         // marginBottom: 10,
//         width: '95%',
//         marginLeft: "2.5%",
//         borderRadius: 15,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 10,
//         ...Platform.select({
//             ios: {
//                 shadowColor: "#000",
//                 shadowOffset: {
//                     width: 0,
//                     height: 2,
//                 },
//                 shadowOpacity: 0.23,
//                 shadowRadius: 2.62,
//             },
//             android: {
//                 elevation: 3,
//             },
//         }),
//     },
//     container: {
//         flexDirection: 'row',


//     },
//     imgView: {

//         alignItems: 'flex-end',
//         justifyContent: 'flex-end',
//         marginRight: 10,
//     },
//     img: {
//         height: 60,
//         width: 60,
//         borderRadius: 50,

//     },



//     textContainer: {
//         flexDirection: 'column',
//         paddingLeft: '3%',

//         textAlign: "right",
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',

//     },
//     profileText: {
//         flexDirection: 'row',

//     },
//     profileText2: {

//         flexDirection: 'row',


//     },
//     name: {
//         fontSize: 16,
//         paddingBottom: 2,
//         paddingRight: 5,
//         //color: '#b40000',
//         textTransform: 'capitalize',
//     },
//     phone: {
//         color: '#6a6a6a',

//     },
//     sectorName: {
//         color: '#6a6a6a',
//     },
//     typeName: {
//         color: '#6a6a6a',
//     },
//     trigger: {
//         padding: 5,
//         margin: 5,
//     },
// });