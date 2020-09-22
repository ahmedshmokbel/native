import React from "react";
import { StyleSheet, Alert, Text, Dimensions, Platform, TouchableOpacity, View, FlatList, Image } from "react-native";


import { ScrollView } from "react-native-gesture-handler";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';

import { connect } from 'react-redux'
import { BasketStyle, ItemsGroupStyle } from "../../constants/AppStyles";
import { getLocalizedJsonInvoice } from "../../constants/ConvertJsonName";
import { rtlView } from "../../constants/Layout";
import String from '../../translation/Translate';
import HeaderCustom from "../../constants/HeaderCustom";
import { OperationHtml } from "../html/htmlfile";

const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

class InvoiceDetails extends React.PureComponent {

    constructor(props) {
        super(props);

        //  console.log('PRoprs', props.Invoices)

        InvoiceData = props.navigation.state.params.rowData

        // console.log('PRoprs', InvoiceData.SSONum)

        // html = OperationHtml(props.PrinterType,
        //     InvoiceData,
        //     props.tenantProfile,
        //     this.props.userHeaderInfo,
        //     this.props.UserName)

      
    }




    createPDF = async () => {
        //  Alert.alert('PDF Generated');

        InvoiceData = this.props.navigation.state.params.rowData

        // console.log('PRoprs', InvoiceData.SSONum)
        PartyName = getLocalizedJsonInvoice(InvoiceData.PartyName)

        if (InvoiceData.Status === 'Invoice') {
            Status = 'فاتورة'
        } else {
            Status = 'طلب'

        }

        await Print.printAsync({
            html: html,
            //   html: bytes,

            base64: false,

        }).catch(function (error) {
            // handle error
            console.log("Print Catch error", error);
        })


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
                    rightsize={30}
                    rightNavigation={() => this.createPDF()}
                />

                <ScrollView >
                    {this.props.PrinterType === '3INCH' ?
                        <HTML html={html} />
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

    //cartItems: state.cart.items,
    InvoiceItems: state.invoices.InvoiceItems,
    Parties: state.parties.Parties,
    Invoices: state.invoices.Invoices,
    UserId: state.login.userHeaderInfo.userId,
    tenantProfile: state.login.tenantProfile,
    userHeaderInfo: state.login.userHeaderInfo,
    UserName: state.login.username,

    SectorID: state.itemGroups.SectorID,
    PrinterType: state.settings.PrinterSize,
    PriceWords: state.invoices.PriceWords
})






export default connect(mapStateToProps)(InvoiceDetails);

