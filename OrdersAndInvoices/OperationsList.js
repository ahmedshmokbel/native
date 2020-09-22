import React, { useEffect } from 'react';
import { StyleSheet, Alert, TouchableOpacity, View, FlatList, Image, I18nManager, ActivityIndicator } from 'react-native';

import { Card, } from 'react-native-elements';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import String from "../translation/Translate";
import { connect } from 'react-redux'
import { rtlView } from '../constants/Layout';
import { getLocalizedJsonName, getLocalizedJsonInvoice } from '../constants/ConvertJsonName';
import { GetInvoices, GetOperations, AddFailedInvoices } from '../Redux1/actions/InvoicesActions';
import { DateTimeCustomAR } from '../constants/DateTime';
import { GetItemsPerOrderAction, NewOrderSelectionAction, GetItemsPerOrderActionAPI } from '../Redux1/actions/ItemsGroupsActions';
import HeaderCustom from '../constants/HeaderCustom';
class InvoicesList extends React.PureComponent {


    state = {
        activePage: 1,
        Invoices: [],
        isSync: false
    }



    componentDidMount = () => {
        this.props.dispatch(GetInvoices());
        //  this.props.dispatch(GetOperations(this.props.Token, this.props.userHeaderInfo));
        //      this.setState({ Invoices: this.props.Invoices })


    

    }





    ResendFailedInvoices = () => {

        var Invoices = this.props.Invoices.filter(x => x.InvoiceState == false)

        this.props.dispatch(AddFailedInvoices(Invoices, this.props.Token, this.props.userHeaderInfo, this.props.navigation))
 




    }




    _OnPress = (rowData) => {

        if (rowData.Status == "Order") {
            if (this.props.SSONum == rowData.SSONum) {


                SelectionOrder = this.props.OrderSelectedItems.find(t => t.SSONum == rowData.SSONum).Items
                //  console.log("same",SelectionOrder)
            } else {


                this.props.dispatch(NewOrderSelectionAction(rowData.SSONum, rowData.SectorID))
                SelectionOrder = this.props.OrderSelectedItems.find(t => t.SSONum == rowData.SSONum).Items

                //  console.log("NOT SAME",SelectionOrder)
            }

            // console.log("result", rowData)

            this.props.dispatch(GetItemsPerOrderAction(this.props.MainItems, SelectionOrder, rowData.SectorID, rowData.PartyCode))

            this.props.navigation.navigate('OrderDetails', { rowData: rowData, Condition: 'Order' })

        } else {
            this.props.navigation.navigate('InvoiceDetails', { rowData: rowData, Condition: 'Order' })

        }
        //console.log(rowData)



        //   console.log("SS", this.props.SSONum)

    }




    _OnPressOR = (rowData) => {


        if (this.props.SSONum == rowData.SSONum) {
            console.log("==")

            SelectionOrder = this.props.Orders.find(t => t.SSONum == rowData.SSONum).Items
            console.log("same", SelectionOrder)
        } else {

            console.log("!=")
            SelectionOrder = this.props.Orders.find(t => t.SSONum == rowData.SSONum).Items

            console.log("NOT SAME", SelectionOrder)
        }

        // console.log("result", rowData)

        this.props.dispatch(GetItemsPerOrderActionAPI(this.props.MainItems, SelectionOrder, 2, rowData.GCUCode))

        this.props.navigation.navigate('OrderDetails', { rowData: rowData, Condition: 'Order' })


        //console.log(rowData)



        //   console.log("SS", this.props.SSONum)

    }


    _selectedSegment = (activePage) => {

        this.setState({ activePage })

        var Invoices = this.props.Invoices.filter(x => x.InvoiceState == false)

        if (Invoices.length > 0) {
            this.setState({ isSync: true })
        } else {
            this.setState({ isSync: false })
        }


        //   var Invoices = []
        if (activePage === 1) {
            this.setState({ Invoices: this.props.Invoices })
        }
        else {
            var Invoices = this.props.Invoices.filter(x => x.InvoiceState == false)
            this.setState({ Invoices: Invoices })

        }
    }

    selectState = (activePage) => () => this.setState({ activePage })


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "90%",
                    ///backgroundColor: "#e1e1e1",
                    left: "5%"
                }}
            />
        );
    };


    renderItem = ({ item: rowData }) => {
        return (

            // <TouchableOpacity onPress={() => this._OnPress(rowData)}>
            <TouchableOpacity>
                <Card containerStyle={styles.item}  >

                    <View style={styles.dateView}>
                        <Text style={styles.dateText}>{(rowData.InvoicePrintDate)}</Text>
                        <Text style={styles.dateText}>{rowData.Status} #{rowData.SSONum}</Text>
                    </View>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between', flexDirection: 'row', }}>
                        <View >
                            <Text style={{ fontWeight: 'bold' }}>{getLocalizedJsonName(rowData.PartyName)}</Text>
                        </View>
                        {rowData.InvoiceState == false &&
                            <View style={{ justifyContent: 'flex-end', }}>
                                <Text style={{ fontWeight: 'bold' }}>{String.Failed}</Text>
                            </View>
                        }
                    </View>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', fontWeight: "bold" }}>
                        <Text style={{ fontWeight: "bold" }}>{(rowData.TotalInvoicePrice)} {String.LE}</Text>

                        <Text style={{ color: 'green', fontWeight: "bold" }}  >{String.Net} : {(rowData.TotalInvoiceNet)}{String.LE} </Text>
                    </View>
                </ Card>
            </TouchableOpacity>
        )
    };

    render() {
        var isSync
        var Invoices = this.props.Invoices.filter(x => x.InvoiceState == false).length
        if (Invoices > 0) {
            isSync = true
        } else {
            isSync = false

        }
        var Invoices = []
        if (this.state.activePage === 1) {
            Invoices = this.props.Invoices
        }
        else {
            Invoices = this.props.Invoices.filter(x => x.InvoiceState == false)


        }
        console.log('sync button', this.state.isSync);


        return (
            <View style={[rtlView()], { paddingBottom: 120 }}>

                <HeaderCustom
                    isRight={isSync}
                    leftNavigation={() => this.props.navigation.openDrawer()}
                    leftname="md-menu"
                    title={String.Invoices}
                    leftsize={33}
                    rightNavigation={() => this.ResendFailedInvoices()}
                    rightname="md-sync"
                    rightsize={40}
                />

                <Segment style={{ backgroundColor: "#b40000", paddingBottom: 20 }}>
                    <Button active={this.state.activePage === 1} first style={{ minWidth: 80, minHeight: 40, borderRadius: 5,}}
                        onPress={this.selectState(1)}>
                        <Text style={[(this.state.activePage == 1) ? { color: '#b40000' } : { color: "white" }, { justifyContent: "center", fontSize: 18, fontWeight: '800', alignContent: "center", }]}>{String.All}</Text>
                    </Button>
                    <Button active={this.state.activePage === 2} style={{ minWidth: 55, minHeight: 40,    borderRadius: 5,
         }}
                        onPress={this.selectState(2)}>
                        <Text style={[(this.state.activePage == 2) ? { color: '#b40000' } : { color: "white" }, { justifyContent: "center", fontSize: 18, fontWeight: '800', alignItems: "center", }]}>{String.Failed}</Text>
                    </Button>

                </Segment>

                {this.props.spinnerVisible &&
                    <View>
                        <ActivityIndicator size="large" color="#b40000" />
                    </View>

                }
                {this.props.Invoices.length == 0 ?
                    <View style={{ height: "95%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <Text style={{ justifyContent: 'center', alignContent: 'center', fontSize: 20, color: "grey" }}>{String.NoInvoices}</Text>
                    </View>
                    :
                    <FlatList
                        data={Invoices}

                        renderItem={this.renderItem}
                        keyExtractor={i => i.MobileRefNo}
                        //  refreshing={isRefreshing}
                        //  onRefresh={this.handleRefresh}
                        //    onEndReached={this.handleLoadMore}
                        onEndThreshold={0}
                        ItemSeparatorComponent={this.renderSeparator}

                    />
                }
            </View>


        );
    }
}




const mapStateToProps = state => ({
    Parties: state.parties.Parties,
    visible: state.parties.spinnerVisible,

    spinnerVisible: state.invoices.spinnerVisible,
    Invoices: state.invoices.Invoices,
    Orders: state.invoices.Orders,


    userHeaderInfo: state.login.userHeaderInfo,
    tenantProfile: state.login.tenantProfile,

    CreationLocation: state.invoices.CreationLocation,
    CreationDate: state.invoices.CreationDate,
    InvoiceNumber: state.invoices.InvoiceNumber,

    Tenent: state.login.tenant.id,
    Token: state.login.token,

    UserId: state.login.userHeaderInfo.userId,
    MainItems: state.itemGroups.mainItems,

    OrderSelectedItems: state.invoices.OrderSelectedItems,
    SSONum: state.invoices.InvoiceNumber,

})


export default connect(mapStateToProps)(InvoicesList);

export const styles = StyleSheet.create({

    item: {
        flex: 1,
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
        borderRadius: 3,
        borderColor: 'grey',
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 5,
        // justifyContent: 'space-between',
        // alignItems: "flex-start",
        //  marginHorizontal: 15,
        padding: 0
    },
    BigContainer: {
        flex: 1,
        justifyContent: 'flex-start'
        //  padding: 15
        ,
        backgroundColor: 'yellow'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        flexBasis: "100%",
        backgroundColor: 'green'

    },

    dateView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: "#b40000",
    },
    dateText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 3,
        fontSize: 14,
        textAlign: 'left',

    },
    stockContainder: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 3,
        backgroundColor: '#5ab6d6',
        alignItems: 'flex-start',


    },
    stockText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center'

    },
    nameCodeContainer: {
        padding: 3,
        top: 5,
        alignItems: 'flex-start',
        flexShrink: 1,
        marginBottom: 10
    },
    PriceView: {
        flex: 1,
        flexDirection: 'row',
        textAlign: "center",
        justifyContent: "space-between"

    }
    ,
    stepperLable: {
        alignItems: 'center',
        fontSize: 15
    }
});
