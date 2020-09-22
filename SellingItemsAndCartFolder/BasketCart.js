import React from "react";
import { StyleSheet, Alert, Text, Dimensions, Platform, TouchableOpacity, View, FlatList, Image, ActivityIndicator, TouchableHighlight } from "react-native";

import { Header, Button, } from "react-native-elements";

import BasketCardItem from "./BasketCardItem";

import { connect } from 'react-redux'
import { BasketStyle } from "../constants/AppStyles";
import { DecrementItem, IncrementItem, RemoveFromCart, AddToOrdersAction, AddOtherDiscount } from "../Redux1/actions/ItemsGroupsActions";
import { deserialization } from "../constants/ConvertJsonName";
import { AddItemsToInvoice, RemoveFromInvoiceItems, GetInvoiceNumberAction } from "../Redux1/actions/InvoicesActions";
import { rtlView } from "../constants/Layout";
import String from '../translation/Translate';
import { GetInvoiceNumber } from "../Redux1/PostAPI";
import { GET_INVOICE_NUMBER, SIGNOUT_REQUEST } from "../Redux1/types";
import { RolePermission, CheckConnectivity } from "../constants/constantsData";
import HeaderCustom from "../constants/HeaderCustom";


const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;


class BasketCart extends React.PureComponent {

    state = {
        TotalCartPrice: 0.0,
        NetCartPrice: 0.0,
        TotalCartDiscount: 0.0,
        TotalCartTax: 0.0,
        TotalCartDeduction: 0.0,
        cartItems: [],
        waiting: false,
        pressed: false
    }
    // console.log("Cart Items", this.props.cartItems)




    componentDidMount = () => {
        //  this.props.dispatch(GetInvoiceNumberAction(this.props.navigation.state.params.PartyID, this.props.InvoiceNumber, this.props.Token, this.props.userHeaderInfo))

        var BasketItems = this.props.items.filter(x => x.SoldQuantity !== 0)
        this.setState({ cartItems: BasketItems  })
        //   console.log("Basket",BasketItems[0].Packs)
        var TotalCartPrice = 0.0
        var NetCartPrice = 0.0
        var TotalCartDiscount = 0.0
        var TotalCartTax = 0.0
        var TotalCartDeduction = 0.0

        BasketItems.forEach(item => {


            TotalCartPrice = (((parseFloat(TotalCartPrice) + parseFloat(item.TotalPrice)) * 100) / 100).toFixed(2)
            NetCartPrice = (((parseFloat(NetCartPrice) + parseFloat(item.NetPrice)) * 100) / 100).toFixed(2)
            TotalCartDiscount = (((parseFloat(TotalCartDiscount) + parseFloat(item.TotalDiscount)) * 100) / 100).toFixed(2)
            TotalCartTax = (((parseFloat(TotalCartTax) + parseFloat(item.TotalTax)) * 100) / 100).toFixed(2)
            TotalCartDeduction = (((parseFloat(TotalCartDeduction) + parseFloat(item.TotalDeduction)) * 100) / 100).toFixed(2)
            //delete item.ItemPricing
            // delete item.Packs

        })

        this.setState({
            TotalCartPrice: TotalCartPrice,
            NetCartPrice: NetCartPrice,
            TotalCartDiscount: TotalCartDiscount,
            TotalCartTax: TotalCartTax,
            TotalCartDeduction: TotalCartDeduction
        })


        ///  console.log('innnnn', this.state.TotalCartPrice)
    }


    _SendToOrder = () => {
        try {

            CheckConnectivity().then(connected => {

                if (connected.isConnected && connected.isInternetReachable) {
                    GetInvoiceNumber(this.props.navigation.state.params.PartyID, this.props.InvoiceNumber, this.props.Token, this.props.userHeaderInfo, this.state.NetCartPrice)
                        .then(result => {
                            //   console.log("dddppp",result)

                            //    console.log('props', this.props.InvoiceNumber)
                            //  console.log('SECT', this.props.SectorID)
                            if (this.props.InvoiceNumber == 0) {
                                console.log('True')
                                SSONum = result.SSONum
                            } else {
                                console.log('False')
                                SSONum = this.props.InvoiceNumber
                            }
                            console.log(SSONum)

                            this.props.dispatch({ type: GET_INVOICE_NUMBER, InvoiceNo: result.SSONum, PriceWords: result.PriceWords });

                            {
                                // this.props.dispatch(AddItemsToInvoice(this.props.cartItems))
                                var BasketItems = this.props.items.filter(x => x.SoldQuantity !== 0)
                                this.props.dispatch(AddToOrdersAction(BasketItems, SSONum, this.props.SectorID))
                            }
                            this.props.navigation.navigate("Invoices", {
                                Status: 'Order',
                                TotalCartPrice: this.state.TotalCartPrice,
                                NetCartPrice: this.state.NetCartPrice,
                                TotalCartDiscount: this.state.TotalCartDiscount,
                                TotalCartTax: this.state.TotalCartTax,
                                TotalCartDeduction: this.state.TotalCartDeduction,
                                PartyID: this.props.navigation.state.params.PartyID,
                                PartyName: this.props.navigation.state.params.PartyName,
                                SectorID: this.props.SectorID
                            })

                            // this.props.dispatch(AddToOrders(this.props.cartItems))
                            // this.props.navigation.navigate("Orders")
                        })
                }
                else {
                    alert(String.NoInternet)
                }

            }).catch(e => {

            })
        } catch (error) {
            console.log('Catch Send order', error)
        }
    };

    _OnInvoice = () => {
        this.setState({ waiting: true, pressed: true })

        CheckConnectivity().then(connected => {

            if (connected.isConnected && connected.isInternetReachable) {
                GetInvoiceNumber(this.props.navigation.state.params.PartyID, this.props.InvoiceNumber, this.props.Token, this.props.userHeaderInfo, this.state.NetCartPrice).then(
                    result => {
                        alert(result.SSONum)
                        this.setState({ waiting: false, pressed: false })
                        this.props.dispatch({ type: GET_INVOICE_NUMBER, InvoiceNo: result.SSONum, PriceWords: result.PriceWords });


                        //   this.props.dispatch(AddItemsToInvoice(this.props.cartItems))
                        this.props.navigation.navigate("Invoices", {
                            Status: 'Invoice',
                            TotalCartPrice: this.state.TotalCartPrice,
                            NetCartPrice: this.state.NetCartPrice,
                            TotalCartDiscount: this.state.TotalCartDiscount,
                            TotalCartTax: this.state.TotalCartTax,
                            TotalCartDeduction: this.state.TotalCartDeduction,
                            PartyID: this.props.navigation.state.params.PartyID, PartyName: this.props.navigation.state.params.PartyName
                        })

                    }
                )

            }
            else {
                alert(String.NoInternet)
            }

        }).catch(e => {

        })



    };




    checkRequest() {
        this.props.dispatch({ type: SIGNOUT_REQUEST });
        this.props.navigation.navigate('login')
    }


    _OnValueIncrease = (StepperId, ItemId, SelectedQuantity) => {
        var editedState = [...this.props.items]
        //   console.log('count', SelectedQuantity)

        var selectedItem = editedState.filter(t => t.Id == ItemId)


        this.props.dispatch(IncrementItem(ItemId, StepperId, selectedItem, SelectedQuantity))
        var BasketItems = this.props.items.filter(x => x.SoldQuantity !== 0)
        this.setState({ cartItems: BasketItems })
    };

    _OnValueDecrease = (StepperId, ItemId) => {

        //     console.log('count', ItemId)

        this.props.dispatch(DecrementItem(ItemId, StepperId))


        var editedState = [...this.props.items]


        let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));
        //   console.log('basket',ItemIndex+"\t"+ItemId)
        let SelectedItem = editedState[ItemIndex]
        let StepIndex = (SelectedItem.Packs).findIndex((obj => obj.Id == StepperId));



        let stepCount = (SelectedItem.Packs[StepIndex]).SelectedQuantity

        if (SelectedItem.RemainStock == SelectedItem.Stock) {

            this.props.dispatch(RemoveFromCart(SelectedItem, ItemId))
            //   this.props.dispatch(RemoveFromInvoiceItems(ItemId))


        }
        var BasketItems = this.props.items.filter(x => x.SoldQuantity !== 0)
        this.setState({ cartItems: BasketItems })
    };




    _OnOtherDiscount = (ItemId, discount) => {

        this.props.dispatch(AddOtherDiscount(ItemId, discount))

        var BasketItems = this.props.items.filter(x => x.SoldQuantity !== 0)
        this.setState({ cartItems: BasketItems })
        //   console.log('other dis', BasketItems[0])

    }




    renderItem = ({ item }) => {
        return (
            <View key={item.Id}>
                <BasketCardItem
                    removeCart={this._onRemoveFromCart}
                    addCart={this.AddToCard}
                    OnOtherDiscount={this._OnOtherDiscount}
                    OnValueIncrease={this._OnValueIncrease}
                    OnValueDecrease={this._OnValueDecrease}
                    value={this.props.OtherDis}
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

                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    render() {

        return (

            <View style={BasketStyle.container}>
                <HeaderCustom
                    isRight={false}
                    leftNavigation={() => this.props.navigation.goBack()}
                    leftname={rtlView().back}
                    title={String.BasketCart}
                    leftsize={40}

                />
                {this.state.cartItems.length == 0 ?
                    <View style={{ height: "95%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <Text style={{ justifyContent: 'center', alignContent: 'center', fontSize: 20, color: "grey" }}>{String.NoCart}</Text>
                    </View>
                    :
                    <FlatList
                        data={this.state.cartItems}
                        //    data={this.state.posts}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.Id.toString()}
                        // refreshing={isRefreshing}
                        onRefresh={this.handleRefresh}
                        onEndThreshold={0}
                    />
                }
                <View style={{ marginTop: 6, paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
                    {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row', bottom: 5 }}>
                        <Text style={{ fontSize: 16, paddingRight: 10, fontWeight: 'bold', color: 'black', }}>{this.props.TotalPrice}{String.LE}</Text>
                        <Text style={{ fontSize: 16, paddingRight: 10, fontWeight: 'bold', color: 'green', }}>{String.Net} : {this.props.NetPrice}{String.LE}</Text>
                    </View> */}


                    {this.state.waiting == true &&
                        <View >
                            <ActivityIndicator size="large" color="#b40000" />
                        </View>

                    }


                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        {RolePermission("Pages.MobileSalesApp.invoices.invoice", this.props.userPermissions) &&
                           
                                <Button onPress={() => {
                                    this.setState({ waiting: true })
                                    this._OnInvoice()
                                }} buttonStyle={{ paddingHorizontal: 40, backgroundColor: 'white', borderWidth: 1, borderColor: '#b40000', borderStyle: 'solid', marginHorizontal: 10 }}
                                    titleStyle={{ color: '#b40000' }} disabled={this.state.pressed} title={String.Invoice} />
                         }
                        {RolePermission("Pages.MobileSalesApp.invoices.order", this.props.userPermissions) &&
                            <Button onPress={() => this._SendToOrder()} buttonStyle={{ paddingHorizontal: 40, backgroundColor: "#b40000", borderWidth: 1, borderColor: '#b40000', marginHorizontal: 10 }}
                                title={String.SendOrder} />
                        }
                    </View>

                </View>
            </View>
        );
    }
}




const mapStateToProps = state => ({

    //   cartItems: state.cart.items,
    items: state.itemGroups.items,
    SectorID: state.itemGroups.SectorID,
    userHeaderInfo: state.login.userHeaderInfo,
    tenantProfile: state.login.tenantProfile,

    InvoiceNumber: state.invoices.InvoiceNumber,
    Token: state.login.token,
    userPermissions: state.login.userPermissions,
    TotalPrice: state.itemGroups.TotalPrice,
    TotalDiscount: state.itemGroups.TotalDiscount,
    NetPrice: state.itemGroups.NetPrice,
    TotalDeduction: state.itemGroups.TotalDeduction,
    TotalTax: state.itemGroups.TotalTax,
    OtherDis: state.itemGroups.OtherDis,

    // SSONum: state.invoices.InvoiceNumber
})



export default connect(mapStateToProps)(BasketCart);

