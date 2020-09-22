import React from "react";
import { StyleSheet, Alert, Text, Dimensions, ActivityIndicator, Platform, TouchableOpacity, View, FlatList, Image, AppState } from "react-native";

import { Header, Button, Card, List, ListItem, Badge, Icon, withBadge, ThemeProvider, SearchBar } from "react-native-elements";

//import * as Permissions from 'expo-permissions';

import Iconback from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import CardFun from "./CardFun";
import { connect } from 'react-redux'
import { ItemsGroupStyle } from "../constants/AppStyles";
import { rtlView } from "../constants/Layout";
import { GetPartiesAction } from "../Redux1/actions/PartiesActions";
import { getLocalizedJsonName } from "../constants/ConvertJsonName";
import String, { Items } from "../translation/Translate";
import { IncrementItem, DecrementItem, RemoveFromCart, FilterByGroup, ViewAll, FilterGroups, ViewMainGroup, PartyItemsAction, AddToCartPendding, SearchItemCode } from "../Redux1/actions/ItemsGroupsActions";
import NetInfo, { NetInfoSubscription, NetInfoState } from '@react-native-community/netinfo';

import HeaderCustom from "../constants/HeaderCustom";
import { getLocationAsync } from "../constants/LocationData";
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;



class ItemGroupsPage extends React.PureComponent {

    state = {
        WrongData: false,
        location: {},
        search: '',
        isSearch: false,
        iconName: 'search',
        cartCount: 0,
        items: [],

    }


    // componentWillMount = () => {
    //     var BasketItems = this.props.items.filter(x => x.SoldQuantity != 0)
    //     console.log('len', BasketItems.length)
    //     this.setState({ cartCount: BasketItems.length })
    // }

    componentDidMount = async () => {
        // getLocationAsync().then((locations) => {
        //     console.log("Client", locations);

        //     if (this._isMounted) {

        //         this.setState({
        //             location: locations.latitude + ',' + locations.longitude
        //         });
        //     }

        // }).catch(e => {
        //     console.log('Carch', e);

        // })
        //////////////////////
        //  console.log('hghgh', this.props.MainGroups)
        //   console.log('Redux', this.props.items[0])
        // const { status } = await Permissions.askAsync(Permissions.LOCATION);
        // if (status !== 'granted') {
        //     const response = await Permissions.askAsync(Permissions.LOCATION);

        // }
        // else {
        //     location = await getLocationAsync()

        //     this.setState({
        //         location: location
        //     });
        // }
        // var BasketItems = this.props.items.filter(x => x.SoldQuantity != 0)
        // console.log('len', BasketItems.length)
        // this.setState({ cartCount: BasketItems.length })


        this.setState({ items: this.props.items })
    }



    SelectedGroup = (Groupitem) => {



        this.props.dispatch(FilterGroups(Groupitem.code))


        let editedState = [...this.props.items]

        let filteredList = editedState.filter(i => (i.Code).startsWith(Groupitem.code))
        this.setState({ items: filteredList })
        //   this.props.dispatch(FilterByGroup(filteredList))
        // console.log('Filter',filteredList)
        //  Alert.alert(item);

    }

    ViewAllItems = () => {

        this.props.dispatch(ViewMainGroup())
        this.setState({ items: this.props.items })

        // this.props.dispatch(ViewAll())
    }

    _onFavo = (dataFromChild) => {
        var editedState = [...this.props.items]


        let filteredIndex = editedState.findIndex((obj => obj.Id == dataFromChild));


        let editedStateIndex = editedState[filteredIndex]

        this.props.dispatch(Favorite(editedStateIndex, filteredIndex))
    };



    Basket = () => {


        this.props.navigation.navigate("Basket", { PartyID: this.props.navigation.state.params.PartyID, PartyName: this.props.navigation.state.params.PartyName, })
    }


    AddToCard = (dataFromChild) => {
        var editedState = [...this.props.items]

        let filteredIndex = editedState.findIndex((obj => obj.Id == dataFromChild));

        var selectedItem = editedState.filter(t => t.Id == dataFromChild)

        this.props.dispatch(AddToCartPendding(selectedItem, filteredIndex))//this.state.location))
    //    this.setState({ items: editedState }) !!!!!
    }




    _OnValueIncrease = (StepperId, ItemId, SelectedQuantity) => {
        var editedState = [...this.props.items]
        console.log('count', SelectedQuantity)

        var selectedItem = editedState.filter(t => t.Id == ItemId)


        this.props.dispatch(IncrementItem(ItemId, StepperId, selectedItem, SelectedQuantity))
      
       // this.setState({ items: editedState })!!!!

    };


    _OnValueDecrease = (StepperId, ItemId) => {
        //   console.log('StepID', StepperId+"\t"+"Item ID"+ItemId)
        //   console.log('count', ItemId)

        this.props.dispatch(DecrementItem(ItemId, StepperId))

        var editedState = [...this.props.items]


        let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));

        //console.log('item',ItemIndex+"\t"+ItemId)
        let SelectedItem = editedState[ItemIndex]
        let StepIndex = SelectedItem.Packs.findIndex((obj => obj.Id == StepperId));


        if (SelectedItem.RemainStock == SelectedItem.Stock) {

            this.props.dispatch(RemoveFromCart(SelectedItem, ItemId))

        } 
    //    this.setState({ items: editedState })  !!!!

    };



    ViewSearch = () => {

        this.setState({ isSearch: !this.state.isSearch, iconName: this.state.isSearch == true ? 'search' : 'dashboard' })

    }



    clear = () => {
     
        this.setState({ items: this.props.items ,search:''})

    };


    searchFilterFunction = text => {

        this.setState({
            search: text
        });

        let editedState = [...this.props.items]
        const newData = editedState.filter(item => {

            const ItemCode = `${item.ItemCode}`


            const textData = text.toUpperCase();
            return ItemCode.includes(textData)  // this will return true if our itemData contains the textData
        });

        //     this.props.dispatch(SearchItemCode(newData))
      //  console.log('search items ',this.props.AllItems);
        
        this.setState({ items: newData })


    };

    renderItem = ({ item, index }) => {
        return (
            <View key={item.Id}>
                <CardFun
                    clean={this.clean}
                    onFavorite={this._onFavo}
                    removeCart={this._onRemoveFromCart}
                    addCart={this.AddToCard}
                    lang='ar'
                    index={index}
                    OnValueIncrease={this._OnValueIncrease}
                    OnValueDecrease={this._OnValueDecrease}
                    initialNumToRender={200}
                    navigation={this.props.navigation}
                    {...item}
                />
            </View>
        );
    };


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    render() {
        const { search, } = this.state;
        var BasketItems = 0
        //  console.log('OOO',this.props.items)
        if (this.props.items != undefined) {
            BasketItems = this.props.items.filter(x => x.SoldQuantity != 0)

        }


        if (this.props.navigation.state.params.Condition == "Order") {
            //   console.log('OOO')
            //   itemList = this.props.Orderitems
            Title = getLocalizedJsonName(this.props.navigation.state.params.rowData.PartyName) + " #" + this.props.navigation.state.params.rowData.SSONum
        } else {

            //   console.log('ttttt')
            //          itemList = this.props.items
            Title = getLocalizedJsonName(this.props.navigation.state.params.PartyName)
        }

                        
         

        return (
            <View style={[rtlView(), ItemsGroupStyle.container]}>

                <HeaderCustom
                    isRight={true}
                    leftNavigation={() => this.props.navigation.goBack()}
                    leftname={rtlView().back}
                    title={Title}
                    leftsize={40}
                    rightname="md-cart"
                    rightsize={36}
                    rightNavigation={() => this.Basket()}
                    length={BasketItems.length}
                />

                <View style={{
                    width: '100%', flexDirection: 'row', backgroundColor: '#b40000', justifyContent: "space-between",
                    paddingHorizontal: 10
                }}>


                    {this.state.isSearch == true ?
                        <View style={{ flexDirection: 'row', width: '90%', }}>

                            <SearchBar lightTheme inputContainerStyle={{backgroundColor:'white'}} 
                                containerStyle={{ width: '100%', backgroundColor: "#b40000", borderBottomWidth: 0, borderTopWidth: 0 }}
                                inputStyle={ItemsGroupStyle.InputSearch}

                                onChangeText={(text) => this.searchFilterFunction(text)}
                                onClear={(text) => this.clear()}
                                placeholder={String.Search}
                                value={search}
                            />
                        </View>
                        :


                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:12}}>


                            {this.props.LevelNo != 1
                                ?
                                <TouchableOpacity onPress={() => this.ViewAllItems()} style={{ justifyContent: 'center' }} >
                                    <Iconback name='backburger' size={30} style={{ color: "white" }} />
                                </TouchableOpacity>
                                :

                                <TouchableOpacity onPress={() => this.ViewAllItems()} style={{ justifyContent: 'center' }} >
                                    <Iconback name='home' size={30} style={{ color: "white" }} />
                                </TouchableOpacity>
                            }
                            <FlatList contentContainerStyle={{ alignItems: 'center', flexDirection: 'row' }}
                                horizontal

                                data={this.props.MainGroups}

                                renderItem={({ item: rowData }) => (
                                    <TouchableOpacity onPress={() => this.SelectedGroup(rowData)}>
                                        <View style={{  borderRadius: 20 , marginHorizontal:5,backgroundColor:"#fff",paddingHorizontal:15,paddingVertical:5}}>
                                            <Text>{getLocalizedJsonName(rowData.displayname)}</Text>
                                        </View>
                                    </TouchableOpacity>)}
                                keyExtractor={i => i.row_number.toString()}
                                // refreshing={isRefreshing}
                                onRefresh={this.handleRefresh}
                                extraData={this.state}
                                onEndThreshold={0}

                            />
                        </View>

                    }

                    <TouchableOpacity onPress={() => this.ViewSearch()} style={{ justifyContent: 'center', alignItems: 'flex-start' }} >
                        <SearchIcon name={this.state.iconName} size={30} style={{ color: "white" }} />
                    </TouchableOpacity>
                </View>

                {this.props.visible &&
                    <View style={[ItemsGroupStyle.container, ItemsGroupStyle.horizontal]}>
                        <ActivityIndicator size="large" color="#b40000" />
                    </View>

                }
                {!this.props.visible &&


                    <FlatList 
                        data={this.state.items}
                        //    data={this.state.posts}
                        numColumns={2}
                        maxToRenderPerBatch={10}
                        renderItem={this.renderItem}
                        keyExtractor={i => i.Id}
                        // refreshing={isRefreshing}
                        onRefresh={this.handleRefresh}
                        //extraData={this.props.items}
                        onEndThreshold={0}
                    //StyleSheet={{alignItems:'center'}}
                    />

                }
            </View>

        );
    }
}



const mapStateToProps = state => ({
    MainGroups: state.itemGroups.Groups,
 //   MainItems: state.itemGroups.mainItems,
    items: state.itemGroups.items,
//    AllItems: state.itemGroups.allItems,
    visible: state.itemGroups.spinnerVisible,
    showErrorMessage: state.itemGroups.hasErrors,
    errorMessage: state.itemGroups.errorMessage,
    Tenent: state.login.tenant.id,
    Token: state.login.token,
    UserId: state.login.userHeaderInfo.userId,

    orgUnitId: state.login.userHeaderInfo.orgUnitId,
    InvoiceNumber: state.invoices.InvoiceNumber,

    BpSectors: state.login.BpSectors,
    LevelNo: state.itemGroups.LevelNo,
    businessRefId: state.login.userHeaderInfo.businessRefId,
    roleId: state.login.userHeaderInfo.roleId,
    sec_StoreCode: state.login.userHeaderInfo.sec_StoreCode,
    sec_SalesPersonCode: state.login.userHeaderInfo.sec_SalesPersonCode,



    Condition: state.itemGroups.Condition

})



export default connect(mapStateToProps)(ItemGroupsPage);
