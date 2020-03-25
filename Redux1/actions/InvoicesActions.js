import { CREATION_DATA, ADD_INVOICE, VIEW_ALL_INVOICES, ADD_INVOICE_ITEMS, REMOVE_FROM_ITEMS_INVOICE, GET_INVOICE_NUMBER, SIGNOUT_REQUEST, SET_ORDERS_API } from "../types";
import { SendInvoice, GetInvoiceNumber } from "../PostAPI";
import { Alert } from "react-native";
import { getLocalizedJsonName } from "../../constants/ConvertJsonName";
import { Toast } from "native-base";
import { GetOperationsApi } from "../API";





export const CreationDataAction = (date, location, partyId) => dispatch => {

    dispatch({ type: CREATION_DATA, Date: date, Location: location, PartyID: partyId });


}



// export const GetInvoiceNumberAction = (PartyCode, InvoiceNumber, token, userHeaderInfo) =>async  dispatch => {

//     const response = await GetInvoiceNumber(PartyCode, InvoiceNumber, token, userHeaderInfo);
//     //     // console.log("Post Invoice ", response)
//     //   //   if (response.success) {

//     obj = JSON.parse(response.result)

//     SSONum = obj[0].SSONum
//     //     // console.log("SSON Invoice ", obj[0].SSONum)

//     dispatch({ type: GET_INVOICE_NUMBER, InvoiceNo: SSONum });


//     //   dispatch({ type: ADD_INVOICE, payload: invoice, invoiceNumer: response.result });

//     //
//     return SSONum
//     //return false.result

// }




export const AddItemsToInvoice = (Cartitems) => dispatch => {


    // cart = (JSON.parse(JSON.stringify(Cartitems)))

    // // rr = []
    // InvoiceItems = cart.map(item => {

    //     packs = (item.Packs.filter(pack => {

    //         return pack.SelectedQuantity != 0
    //     }))

    //     return {
    //         PriceReference: item.PriceReference,

    //         promod: item.promod,
    //         OtherDis: item.OtherDis,
    //         cashd: item.cashd,
    //         wsd: item.wsd,
    //         NetPrice: item.NetPrice,
    //         TotalDeduction: item.TotalDeduction,
    //         TotalDiscount: item.TotalDiscount,
    //         TotalPrice: item.TotalPrice,
    //         TotalTax: item.TotalTax,


    //         BaseMeasureUnitId: item.BaseMeasureUnitId,

    //         ItemCode: item.ItemCode,
    //         ItemName: item.DisplayName,
    //         ItemSelectedDate: item.ItemSelectedDate,
    //         ItemSelectedLocation: item.ItemSelectedLocation,
    //         Packs: packs
    //     }
    //     //   InvoiceItems.push(item);

    // });




    //   console.log("Items List mapped: ", InvoiceItems)
    //  dispatch({ type: ADD_INVOICE_ITEMS, invoiceItems: InvoiceItems });


}



export const RemoveFromInvoiceItems = (ItemId) => dispatch => {

    dispatch({ type: REMOVE_FROM_ITEMS_INVOICE, ItemId: ItemId });


}


export const AddInvoice = (invoice, token, userHeaderInfo, navigate) => async dispatch => {
    dispatch({ type: ADD_INVOICE, payload: invoice });
    console.log("PrinEE", invoice);
    const responseJson = await SendInvoice(invoice, token, userHeaderInfo);

    if (responseJson.unAuthorizedRequest == false) {
        if (responseJson.success == true) {
            obj = JSON.parse(responseJson.result)
            //  console.log("Items List mapped")

            alert(getLocalizedJsonName(obj.Status[0].StatusMessage))
            //    dispatch({ type: ADD_INVOICE, payload: invoice });
        } else {
            alert(responseJson.error.message)

        }


    } else {

    //    dispatch({ type: SIGNOUT_REQUEST });
      //  navigate.navigate('login')
    }
}


export const GetInvoices = () => dispatch => {

    dispatch({ type: VIEW_ALL_INVOICES });

}






export const GetOperations = (token, userHeaderInfo) => async dispatch => {
    //dispatch({ type: GET_ALL_GROUPS_ITEMS });
    const response = await GetOperationsApi(token, userHeaderInfo);

    // console.log("Test: ", response)

    if (response.unAuthorizedRequest == false && response.success == true) {

        obj = JSON.parse(response.result)
        // console.log("Test: ", response)
        if (obj.Status[0].StatusCode == true) {



            //  console.log("SectorID: ", response.Items)
            try {


                // console.log("SectorID: ", obj.Items)
                //  respJson = obj.Orders.map((item, i) => {
                //         console.log('Test0',item.ImageUrl)

                // prs = JSON.parse(item.ItemsPrices)
                // pks = JSON.parse(item.ItemsPacks)


                // mainPackID = pks.find(x => x.MUId == item.BaseMeasureUnitId).Id

                // stock = pks.find(x => x.MUId == item.BaseMeasureUnitId).stockqty

                // mainPack = pks.find(x => x.MUId == item.BaseMeasureUnitId).Title



                // mainPackID = pks.find(x => x.stockqty != 0).MUId
                // console.log("Lenth: ", mainPackID)

                // stock = pks.find(x => x.MUId == mainPackID).stockqty

                // mainPack = pks.find(x => x.MUId == mainPackID).Title


                //  console.log("Lenth: ", pks)
                //  mainPack = getLocalizedJsonName(mainPack)

                //     return {
                //         ...item,
                //         Stock: parseFloat(stock).toFixed(2),
                //         ItemSelectedDate: '',
                //         MainPackID: mainPackID,
                //         ItemSelectedLocation: '',
                //         MainPack: mainPack,
                //         Packs: pks,
                //         ItemPricing: prs,
                //         SoldQuantity: 0.0,
                //         RemainStock: parseFloat(stock).toFixed(2),
                //         // AddCartColor: '#b40000',
                //         // MissingPricingColor: 'white',
                //         // MissingPricingSelection: 'auto', isFavorite: false, favoColor: '#b40000', favoName: 'favorite-border', isStepperView: false, isAddToCart: true

                //     }
                // });

                //       console.log("Items List mapped: ", obj)
                dispatch({ type: SET_ORDERS_API, Orders: obj.Orders, StatusCode: obj.Status[0].StatusCode });
            } catch (error) {

                console.log('Items Catch', error)
            }
        }


    }
    else {

        dispatch({ type: SIGNOUT_REQUEST });
        navigate.navigate('Auth')
    }

}















// export const AddItemsToInvoice = (Cartitems) => dispatch => {

//     itemPack = []
//     InvoiceItems = Cartitems.map((item) => {
//         item.Packs.map(element => {

//             if (element.SelectedQuantity != 0) {
//                 itemPack.push(element)
//             }

//         });

//         delete item.favoColor
//         delete item.favoName
//         delete item.isAddToCart
//         delete item.isFavorite
//         delete item.isStepperView

//         return { ...item, ItemPacks: itemPack }
//     })



//     InvoiceItems = InvoiceItems.map((item, i) => {

//         delete item.Packs

//         return { ...item, }
//     })

//     console.log("Items List mapped: ", InvoiceItems)
//     dispatch({ type: ADD_INVOICE_ITEMS, invoiceItems: InvoiceItems });


// } 




