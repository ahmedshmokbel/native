// import React from 'react';
// import { Dimensions, View, Alert, Platform, TouchableOpacity, Text, I18nManager } from 'react-native';
// import {
//     createAppContainer, createBottomTabNavigator, createDrawerNavigator,
//     createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator
// } from 'react-navigation';
// import { Ionicons } from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { connect } from 'react-redux'

// import ContentComponent from '../navigation/ConetentContainer'
// import { Badge, Header } from 'react-native-elements';
// import ClientsPage from '../ClientsFolder/ClientsPage'
// import MapsPage from '../LocationsComponants/MapsPage'
// import LocationOnMaps from '../LocationsComponants/LocationOnMaps'
// import LocationPage from '../LocationsComponants/LocationsPage'
// import CreateNewClient from '../ClientsFolder/CreateNewClient'
// import ItemGroupsPage from '../SellingItemsAndCartFolder/ItemGroupsPage'
// import BasketCart from '../SellingItemsAndCartFolder/BasketCart'

// import { rtlView, rtlView2 } from '../constants/Layout';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
// //import DirectInvoice from '../OrdersAndInvoices/Invoices/DirectInvoice';
 
// import store from '../Redux1/store';
// import Settings from '../navigation/Settings'
// import { getLocalizedJsonName } from '../constants/ConvertJsonName';
// import String from '../translation/Translate';
// import UpdateClient from '../ClientsFolder/UpdateClient';
// import Print from '../Print/Home'
// import OperationsList from '../OrdersAndInvoices/OperationsList';
// import InvoiceDetails from '../OrdersAndInvoices/Invoices/InvoiceDetails';
// import OrderInvoice from '../OrdersAndInvoices/OrderInvoice';

// const WIDTH = Dimensions.get('window').width;




// const LocationStack = createStackNavigator({
//     LocationPage: {
//         screen: LocationPage,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 headerTitle: 'Location',
//                 headerLeft: (<Ionicons
//                     style={{ paddingLeft: 15 }}
//                     onPress={() => navigation.openDrawer()}
//                     name="md-menu"
//                     size={30}

//                 />)
//             };

//         }
//     }
// })






// const MapsPageStack = createStackNavigator({
//     MapsPage: {
//         screen: MapsPage,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 headerTitle: 'Map Pasge',
//                 headerLeft: (<Ionicons
//                     style={{ paddingLeft: 15 }}
//                     onPress={() => navigation.openDrawer()}
//                     name="md-menu"
//                     size={30}

//                 />)
//             };


//         }
//     }
// })



// const ClientStack = createStackNavigator({
//     ClientsPage: {
//         screen: ClientsPage,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 headerTitle: String.Parties,
//                 headerTitleStyle: { color: 'white', textAlign: 'center' },
//                 headerStyle: { backgroundColor: '#b40000' },

//                 headerLeft: (<Ionicons
//                     style={{ color: "#ffffff", paddingRight: 15, paddingLeft: 15 }}
//                     onPress={() => navigation.openDrawer()}
//                     name="md-menu"
//                     size={30} />),
//                 // headerRight: (<Ionicons
//                 //     style={{ color: "#ffffff", paddingRight: 15 }}
//                 //     onPress={() => navigation.navigate('NewClient')}
//                 //     name="md-add-circle"
//                 //     size={30}
//                 // />)
//             };

//         }

//     },

//     Items: {
//         screen: ItemGroupsPage,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 header: null,

//                 AppSwitchNavigator: true,

//             };


//         },
//     }, Basket: {
//         screen: BasketCart,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 header: null,

//                 AppSwitchNavigator: true,

//             };


//         },
//     }

//     , LocationOnMaps: {
//         screen: LocationOnMaps,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 headerTitle: 'Location',
//                 headerTitleStyle: { color: 'white' },
//                 headerStyle: { backgroundColor: '#b40000' },

//                 headerLeft: (<Ionicons color='white'
//                     style={{ paddingLeft: 15 }}
//                     onPress={() => navigation.goBack()}
//                     name={rtlView().back}
//                     size={32}

//                 />)
//             };


//         }
//     },


//     UpdateClient: {
//         screen: UpdateClient,
//         navigationOptions: ({ navigation }) => {
//             return {
//                 headerTitle: 'Update',
//                 headerTitleStyle: { color: 'white' },
//                 headerStyle: { backgroundColor: '#b40000' },

//                 headerLeft: (<Ionicons color='white'
//                     style={{ paddingLeft: 15 }}
//                     onPress={() => navigation.goBack()}
//                     name={rtlView().back}
//                     size={32}

//                 />)
//             }
//         }
//     },


//     Invoices: {
//         screen: OrderInvoice,
//         navigationOptions: ({ navigation }) => {
//             return {
//                 header: null,

//                 AppSwitchNavigator: true,

//             };


//         },


//     }





// })


// ClientStack.navigationOptions = ({ navigation }) => {
//     let tabBarVisible;
//     if (navigation.state.routes.length > 1) {
//         navigation.state.routes.map(route => {
//             if (route.routeName === "Invoices" || route.routeName === "Items" || route.routeName === "Basket") {
//                 tabBarVisible = false;
//             } else {
//                 tabBarVisible = true;
//             }
//         });
//     }

//     return {
//         tabBarVisible
//     };
// };



// const NewClientStack = createStackNavigator({
//     CreateNewClient: {
//         screen: CreateNewClient,
//         // navigationOptions: ({ navigation }) => {

//         //     const state = store.getState();
//         //     let currentLang = state.settings.Lang
//         //     if (currentLang == 'ar') {
//         //         return {
//         //             headerTitle: 'New Client',

//         //             headerRight: (<Ionicons
//         //                 style={{ paddingRight: 15 }}
//         //                 onPress={() => navigation.navigate('Menu')}
//         //                 name={rtlView().back}
//         //                 size={32}

//         //             />)
//         //         };
//         //     }
//         //     else {
//         //         return {
//         //             headerTitle: 'New Client',

//         //             headerLeft: (<Ionicons
//         //                 style={{ paddingLeft: 15 }}
//         //                 onPress={() => navigation.navigate('Menu')}
//         //                 name={rtlView().back}                        size={32}

//         //             />)
//         //         };
//         //    }

//         //}
//     }
// })








// const InvoicesStack = createStackNavigator({
//     OperationsList: {
//         screen: OperationsList,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 headerTitle: String.Invoices,
//                 headerTitleStyle: { color: 'white' },
//                 headerStyle: { backgroundColor: '#b40000' },

//                 headerLeft: (<Ionicons
//                     style={{ color: "#ffffff", paddingLeft: 15 }}
//                     onPress={() => navigation.openDrawer()}
//                     name="md-menu"
//                     size={30} />),
//             };


//         }
//     },
//     InvoiceDetails: {
//         screen: InvoiceDetails,
//         navigationOptions: ({ navigation }) => {

//             return {
//                 header: null,

//                 AppSwitchNavigator: true,

//             };


//         },
//     }
// })






// const BottonTabNavigator = createBottomTabNavigator({
//     OperationsList: {
//         screen: InvoicesStack,
//         navigationOptions: ({ navigation, navigationOptions }) => ({

//             tabBarLabel: String.Invoices,
//             tabBarIcon: ({ tintColor }) => (
//                 <View>
//                     <Icon                      
//                        // onPress={this.props.Refresh}
//                         color={tintColor}
//                         name='file-document'
//                         size={24} />
//                     {/* <Badge
//                         status="error" value='3'
//                         containerStyle={{ position: 'absolute', top: -1, right: -12 }}
//                     /> */}
//                 </View>

//             )
//         })
//     },


//     // Location: {
//     //     screen: LocationStack,
//     //     navigationOptions: ({ navigation, navigationOptions }) => ({
//     //         tabBarLabel: 'Location',
//     //         tabBarIcon: ({ tintColor }) => (
//     //             <View>
//     //                 <Icon
//     //                     // onPress={this.props.Refresh}
//     //                     color={tintColor}
//     //                     name="location-arrow"
//     //                     size={24} />
//     //                 {/* <Badge
//     //                     status="error" value='3'
//     //                     containerStyle={{ position: 'absolute', top: -1, right: -12 }}
//     //                 /> */}
//     //             </View>

//     //         )
//     //     })
//     // },

//     Maps: {
//         screen: MapsPageStack,
//         navigationOptions: ({ navigation, navigationOptions }) => ({
//             tabBarLabel: String.Maps,
//             tabBarIcon: ({ tintColor }) => (
//                 <View>
//                     <Ionicons

//                         // onPress={this.props.Refresh}
//                         color={tintColor}
//                         name="md-map"
//                         size={24} />
//                     {/* <Badge
//                         status="error" value='3'
//                         containerStyle={{ position: 'absolute', top: -1, right: -12 }}
//                     /> */}
//                 </View>

//             )
//         })
//     },
// }, {
//     navigationOptions: ({ navigation }) => {
//         const { routeName } = navigation.state.routes[navigation.state.index];

//         return {
//             header: null,
//             //   headerTitle: routeName,
//             AppSwitchNavigator: true,




//         };
//     }, tabBarOptions: {
//         activeTintColor: '#b40000',
//         tabStyle: { paddingTop: 5 },

//     },

// })



// const StacButtonTabs = createStackNavigator({

//     TabNavigator: BottonTabNavigator

// })



// //console.log('ppp', I18nManager.isRTL)

// const DeliveryNavigator = createDrawerNavigator(

//     {
//         Home: {
//             screen: StacButtonTabs,
//             navigationOptions: ({ navigation }) => ({

//                 drawerLabel: String.Home,// getLocalizedJsonName(Home),//"Clients",
//                 drawerIcon: () => <Ionicons name='md-home' size={32} />
//             })
//         },

//         Settings: {
//             screen: Settings,
//             navigationOptions: ({ navigation }) => ({
//                 drawerLabel: String.Settings,// getLocalizedJsonName(Settings),
//                 drawerIcon: () => <Ionicons name='md-settings' color='#000' size={32} />
//             })
//         },


//     },
//     {
//         initialRouteName: 'Home',
//         drawerWidth: WIDTH * 0.80,
//         drawerPosition: I18nManager.isRTL ? 'right' : 'left',

//         drawerBackgroundColor: 'transparent',
//         contentComponent: props => (<ContentComponent  {...props} />),

//         contentOptions: {
//             activeTintColor: '#b40000',

//             inactiveTintColor: 'black',
//             inactiveBackgroundColor: 'transparent',
//             labelStyle: {
//                 fontSize: 15,
//                 marginLeft: 10,
//             },
//         }

//     }, {
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: "gray"
//         }
//     }
// }
// )


// export default (DeliveryNavigator);

