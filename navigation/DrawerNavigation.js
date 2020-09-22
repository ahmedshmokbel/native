import React from 'react';
import { Dimensions, View, Platform, I18nManager } from 'react-native';
import {
    createAppContainer, createBottomTabNavigator, createDrawerNavigator,
    createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ContentComponent from '../navigation/ConetentContainer'
import ClientsPage from '../ClientsFolder/ClientsPage'
 import MapsPage from '../LocationsComponants/MapsPage'
// import LocationOnMaps from '../LocationsComponants/LocationOnMaps'
// import LocationPage from '../LocationsComponants/LocationsPage'
import CreateNewClient from '../ClientsFolder/CreateNewClient'
import ItemGroupsPage from '../SellingItemsAndCartFolder/ItemGroupsPage'
import BasketCart from '../SellingItemsAndCartFolder/BasketCart'

import { rtlView, rtlView2 } from '../constants/Layout';

import OrderInvoice from '../OrdersAndInvoices/OrderInvoice'


import String from '../translation/Translate';
import UpdateClient from '../ClientsFolder/UpdateClient';
import OperationsList from '../OrdersAndInvoices/OperationsList';
import InvoiceDetails from '../OrdersAndInvoices/Invoices/InvoiceDetails';
import TestList from './TestList';
import TestListS from './TestListS';
import { requestPermission } from '../constants/LocationData';


const WIDTH = Dimensions.get('window').width;

requestPermission()

const MapsPageStack = createStackNavigator({
    MapsPage: {
        screen: MapsPage,
        navigationOptions: ({ navigation }) => {

            return {
                headerTitle: String.Maps,
                headerTitleStyle: { color: 'white', textAlign: 'center' },
                headerStyle: { backgroundColor: '#b40000' },

                headerLeft: (<Ionicons
                    style={{ color: "#ffffff", paddingRight: 15, paddingLeft: 15 }}
                    onPress={() => navigation.openDrawer()}
                    name="md-menu"
                    size={30} />),
            };


        }
    }
})

const ClientStack = createStackNavigator({
    ClientsPage: {
        screen: ClientsPage,
        navigationOptions: ({ navigation }) => {

            return {
                header: null,

                AppSwitchNavigator: true,

                // headerTitle: String.Parties,
                // headerTitleStyle: { color: 'white', textAlign: 'center' },
                // headerStyle: { backgroundColor: '#b40000',paddingTop:50},

                // headerLeft: (<Ionicons
                //     style={{ color: "#ffffff", paddingRight: 15, paddingLeft: 15 }}
                //     onPress={() => navigation.openDrawer()}
                //     name="md-menu"
                //     size={30} />),
                // // headerRight: (<Ionicons
                // //     style={{ color: "#ffffff", paddingRight: 15 }}
                // //     onPress={() => navigation.navigate('NewClient')}
                // //     name="md-add-circle"
                // //     size={30}
                // // />)
            };

        }

    },

    Items: {
        screen: ItemGroupsPage,
        navigationOptions: ({ navigation }) => {

            return {
                header: null,

                AppSwitchNavigator: true,

            };


        },
    }, Basket: {
        screen: BasketCart,
        navigationOptions: ({ navigation }) => {

            return {
                header: null,

                AppSwitchNavigator: true,

            };


        },
    }

    // , LocationOnMaps: {
    //     screen: LocationOnMaps,
    //     navigationOptions: ({ navigation }) => {

    //         return {
    //             headerTitle: String.Maps,
    //             headerTitleStyle: { color: 'white' },
    //             headerStyle: { backgroundColor: '#b40000' },

    //             headerLeft: (<Ionicons color='white'
    //                 style={{ paddingLeft: 15 }}
    //                 onPress={() => navigation.goBack()}
    //                 name={rtlView().back}
    //                 size={32}

    //             />)
    //         };


    //     }
    // },
,
    UpdateClient: {
        screen: UpdateClient,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: String.PartyInfo,
                headerTitleStyle: { color: 'white' },
                headerStyle: { backgroundColor: '#b40000' },

                headerLeft: (<Ionicons color='white'
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                    onPress={() => navigation.goBack()}
                    name={rtlView().back}
                    size={25}

                />)
            }
        }
    }
    ,

    Invoices: {
        screen: OrderInvoice,
        navigationOptions: ({ navigation }) => {
            return {
                header: null,

                AppSwitchNavigator: true,

            };


        },


    }





})


ClientStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            if (route.routeName === "Invoices" || route.routeName === "Items" || route.routeName === "Basket") {
                tabBarVisible = false;
            } else {
                tabBarVisible = true;
            }
        });
    }

    return {
        tabBarVisible
    };
};



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





const InvoicesStack = createStackNavigator({
    OperationsList: {
        screen: OperationsList,
        navigationOptions: ({ navigation }) => {

            // return {
            //     headerTitle: String.Invoices,
            //     headerTitleStyle: { color: 'white' },
            //     headerStyle: { backgroundColor: '#b40000' },

            //     headerLeft: (<Ionicons
            //         style={{ color: "#ffffff", paddingLeft: 15, paddingRight: 15 }}
            //         onPress={() => navigation.openDrawer()}
            //         name="md-menu"
            //         size={25} />),
            // };
            return {
                header: null,

                AppSwitchNavigator: true,

            };


        }
    },
    InvoiceDetails: {
        screen: InvoiceDetails,
        navigationOptions: ({ navigation }) => {

            return {
                header: null,

                AppSwitchNavigator: true,

            };


        },
    },
    OrderDetails: {
        screen: ItemGroupsPage,
        navigationOptions: ({ navigation }) => {

            return {
                header: null,

                AppSwitchNavigator: true,

            };


        }
    },
})



const BottonTabNavigator2 = createBottomTabNavigator({
    Client: {
        screen: ClientStack,
        navigationOptions: ({ navigation, navigationOptions }) => ({

            tabBarLabel: String.Parties,
            tabBarIcon: (tintColor) =>
                <View>
                    <Ionicons

                        // onPress={this.props.Refresh}
                        color={tintColor}
                        name={Platform.OS === "ios" ? "ios-contacts" : "md-contacts"}
                        size={24} />
                    {/* <Badge
                        status="error" value='3'
                        containerStyle={{ position: 'absolute', top: -1, right: -12 }}
                    /> */}
                </View>


        })
    },


    // Location: {
    //     screen: LocationStack,
    //     navigationOptions: ({ navigation, navigationOptions }) => ({
    //         tabBarLabel: 'Location',
    //         tabBarIcon: ({ tintColor }) => (
    //             <View>
    //                 <Icon
    //                     // onPress={this.props.Refresh}
    //                     color={tintColor}
    //                     name="location-arrow"
    //                     size={24} />
    //                 {/* <Badge
    //                     status="error" value='3'
    //                     containerStyle={{ position: 'absolute', top: -1, right: -12 }}
    //                 /> */}
    //             </View>

    //         )
    //     })
    // },

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
    navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];

        return {
            header: null,
            //   headerTitle: routeName,
            AppSwitchNavigator: true,




        };
    }, tabBarOptions: ClientsPage
    // {
    //     activeTintColor: '#b40000',
    //     tabStyle: { paddingTop: 5 },

    // },

})



const BottonTabNavigator = createBottomTabNavigator(
    {
        Client: {
            screen: ClientStack,
            navigationOptions: ({ navigation, navigationOptions }) => ({

                tabBarLabel: String.Parties,


            })
        }, 
        Maps: {
            screen: MapsPageStack,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: String.Maps,


            })
        },
        // KK: {
        //     screen: TestList,
        //     navigationOptions: ({ navigation, navigationOptions }) => ({
        //         tabBarLabel: String.Parties,


        //     })
        // },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;

                let iconName;
                if (routeName === 'Client') {
                    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    iconName = Platform.OS === "ios" ? "ios-contacts" : "md-contacts"

                } else if (routeName === 'Maps') {
                    iconName = "md-map";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={24} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            //  activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            activeTintColor: '#b40000',
            tabStyle: { paddingTop: 5 },
        },
    }
);


// const StacButtonTabs = createStackNavigator({

//     TabNavigator: BottonTabNavigator

// })



//console.log('ppp', I18nManager.isRTL)

const DrawerNavigator = createDrawerNavigator(

    {
        Home: {
            screen: BottonTabNavigator,
            navigationOptions: ({ navigation }) => ({

                drawerLabel: String.Home,// getLocalizedJsonName(Home),//"Clients",
                drawerIcon: () => <Ionicons name='md-home' size={32} />
            })
        },
        OperationsList: {
            screen: InvoicesStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: String.Invoices,
                drawerIcon: () => <Icon name='file-document' size={32} />
            })
        },
        // Settings: {
        //     screen: Settings,
        //     navigationOptions: ({ navigation }) => ({
        //         drawerLabel: String.Settings,// getLocalizedJsonName(Settings),
        //         drawerIcon: () => <Ionicons name='md-settings' color='#000' size={32} />
        //     })
        // },


    },
    {
        initialRouteName: 'Home',
        drawerWidth: WIDTH * 0.80,
        drawerPosition: I18nManager.isRTL ? 'right' : 'left',

        drawerBackgroundColor: 'transparent',
        contentComponent: props => (<ContentComponent  {...props} />),

        contentOptions: {
            activeTintColor: '#b40000',

            inactiveTintColor: 'black',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
                marginLeft: 10,
            },
        }

    }, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "gray"
        }
    }
}
)



// const AppSwitchNavigator = createSwitchNavigator({


//    // Auth: AuthLoadingScreen,
//    // login: LoginScreen,

//   //  Menu: DrawerNavigator,
//     NewClient: NewClientStack,
//     Location: MapsPageStack,
//     // Basket: BasketCart,
//    // Items: ItemGroupsPage,
//     DirectInvoice: DirectInvoice,

//     Orders: OrdersListPage,
//     AddMoreItem: MoreOderItemPage,
//     OrderBasket: OrderBasketCartPage,
//     // ViewLocation: ViewLocationStack
//     // clientInfo: UpdateClient

//     //  Animal:OrmSqlite
// });







export default (DrawerNavigator);

