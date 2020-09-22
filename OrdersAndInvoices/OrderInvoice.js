import React from "react";
import { ScrollView, Dimensions, Platform, View, AppState, Text, NativeModules } from "react-native";


// import * as Permissions from 'expo-permissions';

import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux'
import { ItemsGroupStyle } from "../constants/AppStyles";
import { rtlView } from "../constants/Layout";
import { AddInvoice, } from "../Redux1/actions/InvoicesActions";
import { DateDay, DateTimeCustom } from "../constants/DateTime";
import { getLocationAsync } from "../constants/LocationData";
import String from '../translation/Translate';
import { InvoiceHtml, InvoiceZPL } from "./html/htmlfile";
import HeaderCustom from "../constants/HeaderCustom";
import RNPrint from 'react-native-print';
import { CheckConnectivity } from "../constants/constantsData";

const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

let ZPL
let html
class OrderInvoice extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            loading: false,
            deviceType: '',

            location: null,
            errorMessage: '',
            isLocationModalVisible: false,
            appState: AppState.currentState,
            Invoice: [],
            MobileRef: 0
        }


        //var MobileRef = editedStateIndex.MobileRefNo
        //   console.log(this.state.MobileRef)
        var BasketItems = props.items.filter(x => x.SoldQuantity !== 0)


        html = InvoiceHtml(props.PrinterType, props.navigation.state.params, props.tenantProfile,
            BasketItems, props.InvoiceNumber, this.props.PriceWords, props.CreationDate, DateDay(), this.props.userHeaderInfo, this.props.UserName)


        ZPL = InvoiceZPL(props.navigation.state.params, props.tenantProfile, BasketItems, props.InvoiceNumber, props.CreationDate, DateDay())

   //     console.log("ZPL Zebra", ZPL);
        // console.log('addddd',props.PrinterAddress);




    }

    ApiItemsInvoice = () => {

        var BasketItems = this.props.items.filter(x => x.SoldQuantity !== 0)

        InvoiceItems = BasketItems.map(item => {

            packs = (item.Packs.filter(pack => {

                return pack.SelectedQuantity != 0
            }))

            return {
                Id: item.Id,
                PriceReference: item.PriceReference,
                promod: item.promod,
                OtherDis: item.OtherDis,
                cashd: item.cashd,
                wsd: item.wsd,
                NetPrice: item.NetPrice,
                TotalDeduction: item.TotalDeduction,
                TotalDiscount: item.TotalDiscount,
                TotalPrice: item.TotalPrice,
                TotalTax: item.TotalTax,
                BaseMeasureUnitId: item.BaseMeasureUnitId,
                ItemCode: item.ItemCode,
                ItemName: item.DisplayName,
                ItemSelectedDate: item.ItemSelectedDate,
                ItemSelectedLocation: item.ItemSelectedLocation,
                RemainStock: item.RemainStock,


                Packs: packs
            }
            //   InvoiceItems.push(item);

        });


        return InvoiceItems
    }



    _3InchPrinter = () => {
        CheckConnectivity().then(connected => {

            if (connected.isConnected && connected.isInternetReachable) {


                try {

                    //  console.log('PrintErr', this.state.location)
                    var editedState = [...this.state.Invoice]
                    let editedStateIndex = editedState[0]
                    editedStateIndex.InvoicePrintDate = DateTimeCustom()
                    editedStateIndex.InvoicePrintLocation = this.state.location
                    this.setState({ Invoice: editedState })


                    //  alert('3invh')

                    this.props.dispatch(AddInvoice(this.state.Invoice, this.props.Token, this.props.userHeaderInfo, this.props.navigation))



                    RNZebraBluetoothPrinter.print(this.props.PrinterAddress, ZPL).then((res) => {
                      //  console.log("ZEBRA", res);


                    }).catch(error=>{
                        alret("Zebra", error);
                    })
                    this.props.navigation.navigate('Auth')
                } catch (error) {
                    console.log('PrintErr', error)

                }


            }
            else {
                alert(String.NoInternet)
            }

        })
    }



    _A4Printer = async () => {
        CheckConnectivity().then(connected => {

            if (connected.isConnected && connected.isInternetReachable) {

                try {
                    //   console.log('PrintErr', this.state.location.latitude)
                    var editedState = [...this.state.Invoice]
                    let editedStateIndex = editedState[0]
                    editedStateIndex.InvoicePrintDate = DateTimeCustom()
                    editedStateIndex.InvoicePrintLocation = this.state.location
                    this.setState({ Invoice: editedState })



                    this.props.dispatch(AddInvoice(this.state.Invoice, this.props.Token, this.props.userHeaderInfo, this.props.navigation))


                    RNPrint.print({
                        html:
                            html,
                    })

                    this.props.navigation.navigate('Auth')
                } catch (error) {
                    console.log('PrintErr', error)

                }


            }
            else {
                alert(String.NoInternet)
            }

        })

    }



    componentDidMount = () => {



        getLocationAsync().then((locations) => {
            //    console.log("incoiceLocation", locations);


            this.setState({
                location: locations.latitude + ',' + locations.longitude

            })

        }).catch(e => {
            console.log('Carch', e);

        })
        var PartyCode = this.props.navigation.state.params.PartyID
        let PartyName = this.props.navigation.state.params.PartyName
        let Status = this.props.navigation.state.params.Status
        let SectorId = this.props.SectorID
        // CartItems = []
        // if (Status === 'Invoice') {

        //     CartItems = this.ApiItemsInvoice()
        // } else {

        //     CartItems = this.props.items.filter(x => x.SoldQuantity !== 0)
        // }

        try {

            var invoice = [{
                ID: PartyCode,
                MobileRefNo: DateDay(),
                PartyCode: PartyCode,
                TotalInvoicePrice: this.props.navigation.state.params.TotalCartPrice,
                PartyName: PartyName,
                TaxFile: this.props.tenantProfile.tenantTaxFile,
                TaxCard: this.props.tenantProfile.tenantTaxCard,
                TenantRegFile: this.props.tenantProfile.tenantRegFile,
                Items: this.ApiItemsInvoice(),
                InvoiceCreationLocation: this.props.CreationLocation,
                InvoiceCreationDate: this.props.CreationDate,
                InvoicePrintLocation: '',
                InvoicePrintDate: '',
                Status: Status,
                SSONum: this.props.InvoiceNumber,
                ArabicPrice: this.props.PriceWords,
                SectorID: SectorId,
                TotalInvoiceTax: this.props.navigation.state.params.TotalCartTax,
                TotalInvoiceDeduction: this.props.navigation.state.params.TotalCartDeduction,
                TotalInvoiceNet: this.props.navigation.state.params.NetCartPrice,
                InvoiceState: false
            }]
            this.setState({ Invoice: invoice, MobileRef: DateDay() })

            //  console.log('Loc', invoice)
        }
        catch (error) {

            console.log('Error', error)

        }


    }



    render() {

        return (
            <View style={[rtlView(), ItemsGroupStyle.container]}>
                <HeaderCustom
                    isRight={true}
                    leftNavigation={() => this.props.navigation.goBack()}
                    leftname={rtlView().back}

                    title={String.Invoice}
                    leftsize={40}
                    rightname={Platform.OS === "ios" ? "ios-print" : "md-print"}
                    rightsize={35}
                    rightNavigation={() => this.props.PrinterType == '3INCH' ? this._3InchPrinter() : this._A4Printer()}
                />

                <ScrollView horizontal={false} >

                    {this.props.PrinterType === '3INCH' ?
                        <HTML html={html} />
                        // <WebView javaScriptEnabled={true}
                        //     domStorageEnabled={true}
                        //     source={{ html: this.html }}
                        //     style={{ width: 300, height: 'auto', }} />
                        :
                        <WebView javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ html: html }}
                            style={{ marginHorizontal: 10, width: width, height: height, }} />
                    }
                </ScrollView>
            </View>
        );
    }
}





const mapStateToProps = state => ({

    items: state.itemGroups.items,
    InvoiceItems: state.invoices.InvoiceItems,
    Parties: state.parties.Parties,
    MaxId: state.invoices.maxID,

    userHeaderInfo: state.login.userHeaderInfo,
    tenantProfile: state.login.tenantProfile,
    UserName: state.login.username,


    CreationLocation: state.invoices.CreationLocation,
    CreationDate: state.invoices.CreationDate,
    InvoiceNumber: state.invoices.InvoiceNumber,

    Tenent: state.login.tenant.id,
    Token: state.login.token,
    SectorID: state.itemGroups.SectorID,
    PrinterType: state.settings.PrinterSize,
    PrinterAddress: state.settings.Address,

    PriceWords: state.invoices.PriceWords

})






export default connect(mapStateToProps)(OrderInvoice);

