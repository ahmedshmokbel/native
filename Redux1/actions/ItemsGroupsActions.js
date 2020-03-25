import {
    GET_ALL_GROUPS_ITEMS, GET_ALL_ITEMS_GROUPS_ERROR, GET_ALL_ITEMS_GROUPS_SUCCESS, ADD_TO_CART, FAVORITE_ITEM, SIGNOUT_REQUEST
    , INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_FROM_CART, REMOVE_ITEM, ADD_TO_ORDER, FILTER_GROUP, VIEW_ALL_GROUPS, VIEW_ALL_ITEMS, FILTER_BY_GROUP, PARTY_ITEMS, ADD_INVOICE, OTHER_PARTY_SELECTION, ITEMS_NO_PRICES, ADD_TO_CART_PENDDING, SEARCH_ITEM_CODE, ADD_OTHER_DISCOUNT, ORDER_GET_ALL_ITEMS, OTHER_ORDER_SELECTION

} from "../types";
import { GetItemsGroups } from "../API";
import { getLocalizedJsonName } from "../../constants/ConvertJsonName";
import { Alert } from "react-native";
import String from '../../translation/Translate'
import { DateDay } from "../../constants/DateTime";




export const NewPartySelectionAction = () => dispatch => {

    dispatch({ type: OTHER_PARTY_SELECTION });

}




// add items based on Customer selection 
export const PartyItemsAction = (MainItems, partyId, SectorId) => dispatch => {


    var PartyID = partyId
    var SectorID = SectorId

    NewPartyIt = MainItems.map((item, i) => {
        //  console.log('Null PRi',item.ItemPricing)
        if (item.ItemPricing.filter(x => x.sectorid == SectorID).length == 0) {
            console.log('NOOOOO')

            return {
                ...item,
                itemprice: String.NoPrice,
                Dicount: 0,
                PartyID: PartyID,
                MissingPricingColor: '#ebebeb',
                MissingPricingSelection: 'none',
                AddCartColor: '#a3a2a2',
                isFavorite: false, favoColor: '#b40000', favoName: 'favorite-border', isStepperView: false, isAddToCart: true
            }
        }
        else {

            PriceReference = item.ItemPricing.find(x => x.sectorid == SectorID).PriceReference
            wsd = item.ItemPricing.find(x => x.sectorid == SectorID).wsd
            cashd = item.ItemPricing.find(x => x.sectorid == SectorID).cashd
            promod = item.ItemPricing.find(x => x.sectorid == SectorID).promod
            otherd = item.ItemPricing.find(x => x.sectorid == SectorID).otherd
            price = item.ItemPricing.find(x => x.sectorid == SectorID).itemprice
            dicountpre = item.ItemPricing.find(x => x.sectorid == SectorID).deductionperc
            deduction = item.ItemPricing.find(x => x.sectorid == SectorID).deduction
            dicountPrice = parseFloat(parseFloat(price) - parseFloat(deduction)).toFixed(2);

            salesTax = item.ItemPricing.find(x => x.sectorid == SectorID).salestax
            taxPercent = item.ItemPricing.find(x => x.sectorid == SectorID).taxperc


            wsd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).wsd_percent
            cashd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).cashd_percent
            promod_percent = item.ItemPricing.find(x => x.sectorid == SectorID).promod_percent
            otherd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).otherd_percent

            convertToBaseRatio = item.ItemPricing.find(x => x.sectorid == SectorID).tobaseratio


            return {
                ...item,
                PriceReference: PriceReference,
                wsd_percent: wsd_percent,
                cashd_percent: cashd_percent,
                promod_percent: promod_percent,
                otherd_percent: otherd_percent,
                ConvertToBaseRatio: convertToBaseRatio,
                OtherDis: otherd,
                wsd: wsd,
                cashd: cashd,
                promod: promod,
                SalesTax: salesTax,
                TaxPercent: taxPercent,
                Deduction: deduction,
                PartyID: PartyID,
                itemprice: price,
                Dicount: dicountpre,
                DicountPrice: dicountPrice,
                TotalPrice: 0.0,
                NetPrice: 0.0,
                TotalDiscount: 0.0,
                TotalTax: 0.0,
                TotalDeduction: 0.0,

                AddCartColor: '#b40000',
                MissingPricingColor: 'white',
                MissingPricingSelection: 'auto', isFavorite: false, favoColor: '#b40000', favoName: 'favorite-border', isStepperView: false, isAddToCart: true
            }

        }
    });

    dispatch({ type: PARTY_ITEMS, ItemsList: NewPartyIt, SectorID: SectorId });

}




// export const SearchItemCode = (items) => dispatch => {

//     dispatch({ type: SEARCH_ITEM_CODE, search: items });

// }


export const AddToCartPendding = (item, index, location) => dispatch => {

    dispatch({ type: ADD_TO_CART_PENDDING, payload: item, index: index, Location: location });

}


// export const Favorite = (item, index) => dispatch => {

//     dispatch({ type: FAVORITE_ITEM, payload: item, index: index });

// }


export const IncrementItem = (ItemID, stepperIndex, item, SelectedQuantity) => dispatch => {


    //console.log('New Check', item[0].SoldQuantity)

    if (SelectedQuantity == 0 && item[0].SoldQuantity == 0 && item[0].Stock != 0) {

        dispatch({ type: ADD_TO_CART, payload: item, });
    }



    dispatch({ type: INCREMENT_ITEM, ItemId: ItemID, StepperIndex: stepperIndex });
}




export const DecrementItem = (ItemID, stepperIndex) => dispatch => {



    dispatch({ type: DECREMENT_ITEM, ItemId: ItemID, StepperIndex: stepperIndex });
}







export const AddOtherDiscount = (ItemID, discount) => dispatch => {



    dispatch({ type: ADD_OTHER_DISCOUNT, ItemId: ItemID, discount: discount });
}





export const RemoveFromCart = (item, ItemId, ) => dispatch => {

    dispatch({ type: REMOVE_FROM_CART, payload: item, ItemId: ItemId });


}




export const DeleteItem = (item, index, ) => dispatch => {

    dispatch({ type: REMOVE_ITEM, payload: item, index: index });


}




// //  7anfilter bel code hab3t hena el code w fl item reducer ha listen 3ala el type bet3 filterbygroup
// export const FilterByGroup = (item) => dispatch => {

//     ///  console.log('rrrr', Code)
//     dispatch({ type: FILTER_BY_GROUP, payload: item });

// }



// export const ViewAll = (item) => dispatch => {

//     //  console.log('View')
//     dispatch({ type: VIEW_ALL_ITEMS, payload: item });

// }



// filtering the groups
export const FilterGroups = (code) => dispatch => {

    ///  console.log('rrrr', Code)
    dispatch({ type: FILTER_GROUP, Code: code });

}



export const ViewMainGroup = () => dispatch => {

    //  console.log('View')
    dispatch({ type: VIEW_ALL_GROUPS });

}






export const SignOut = () => dispatch => {

    dispatch({ type: SIGNOUT_REQUEST });


}






export const NewOrderSelectionAction = (ssonum, sectorid) => dispatch => {

    dispatch({ type: OTHER_ORDER_SELECTION, SSONum: ssonum, SectorID: sectorid });

}




export const GetItemsPerOrderAction = (MainItemsApi, SelectedItems, SectorID, PartyID) => dispatch => {

    MainItems = JSON.parse(JSON.stringify(MainItemsApi))

    // console.log("Catch Item Groups", SelectedItems)
    OrderItems = MainItems.map(item => {

        PriceReference = item.ItemPricing.find(x => x.sectorid == SectorID).PriceReference
        wsd = item.ItemPricing.find(x => x.sectorid == SectorID).wsd
        cashd = item.ItemPricing.find(x => x.sectorid == SectorID).cashd
        promod = item.ItemPricing.find(x => x.sectorid == SectorID).promod
        otherd = item.ItemPricing.find(x => x.sectorid == SectorID).otherd
        price = item.ItemPricing.find(x => x.sectorid == SectorID).itemprice
        dicountpre = item.ItemPricing.find(x => x.sectorid == SectorID).deductionperc
        deduction = item.ItemPricing.find(x => x.sectorid == SectorID).deduction
        dicountPrice = parseFloat(parseFloat(price) - parseFloat(deduction)).toFixed(2);

        salesTax = item.ItemPricing.find(x => x.sectorid == SectorID).salestax
        taxPercent = item.ItemPricing.find(x => x.sectorid == SectorID).taxperc


        wsd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).wsd_percent
        cashd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).cashd_percent
        promod_percent = item.ItemPricing.find(x => x.sectorid == SectorID).promod_percent
        otherd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).otherd_percent

        convertToBaseRatio = item.ItemPricing.find(x => x.sectorid == SectorID).tobaseratio
        //console.log("OrderID", price)
        var Orderelement = SelectedItems.find(x => x.Id == item.Id)
        // console.log(Orderelement)
        if (Orderelement !== undefined) {
            item.Packs = Orderelement.Packs
            console.log("Found")
            item.AddCartColor = Orderelement.AddCartColor
            item.MissingPricingColor = Orderelement.MissingPricingColor
            item.MissingPricingSelection = Orderelement.MissingPricingSelection
            item.isStepperView = Orderelement.isStepperView
            item.isAddToCart = Orderelement.isAddToCart
            item.RemainStock = Orderelement.RemainStock
            item.SoldQuantity = Orderelement.SoldQuantity
            item.Stock = Orderelement.Stock

            item.PriceReference = Orderelement.PriceReference
            item.wsd_percent = Orderelement.wsd_percent
            item.cashd_percent = Orderelement.cashd_percent
            item.promod_percent = Orderelement.promod_percent
            item.otherd_percent = Orderelement.otherd_percent
            item.ConvertToBaseRatio = Orderelement.ConvertToBaseRatio
            item.OtherDis = Orderelement.OtherDis
            item.wsd = Orderelement.wsd
            item.cashd = Orderelement.cashd
            item.promod = Orderelement.promod
            item.SalesTax = Orderelement.SalesTax
            item.TaxPercent = Orderelement.TaxPercent
            item.Deduction = Orderelement.Deduction
            item.PartyID = Orderelement.PartyID
            item.itemprice = Orderelement.itemprice
            item.Dicount = Orderelement.Dicount
            item.DicountPrice = Orderelement.DicountPrice
            item.TotalPrice = Orderelement.TotalPrice
            item.NetPrice = Orderelement.NetPrice
            item.TotalDiscount = Orderelement.TotalDiscount
            item.TotalTax = Orderelement.TotalTax
            item.TotalDeduction = Orderelement.TotalDeduction
            //  console.log('NEEE', item.TotalDiscount + "   " + Orderelement.NetPrice)

        } else {
            item.AddCartColor = '#b40000'
            item.MissingPricingColor = 'white'
            item.MissingPricingSelection = 'auto'
            item.isStepperView = false
            item.isAddToCart = true
            item.PriceReference = PriceReference
            item.wsd_percent = wsd_percent
            item.cashd_percent = cashd_percent
            item.promod_percent = promod_percent
            item.otherd_percent = otherd_percent
            item.ConvertToBaseRatio = convertToBaseRatio
            item.OtherDis = otherd
            item.wsd = wsd
            item.cashd = cashd
            item.promod = promod
            item.SalesTax = salesTax
            item.TaxPercent = taxPercent
            item.Deduction = deduction
            item.PartyID = PartyID
            item.itemprice = price
            item.Dicount = dicountpre
            item.DicountPrice = dicountPrice
            item.TotalPrice = 0.0
            item.NetPrice = 0.0
            item.TotalDiscount = 0.0
            item.TotalTax = 0.0
            item.TotalDeduction = 0.0
            console.log("NOT")
        }


        return {
            ...item,


        }
    });

    //  console.log('Compare', OrderItems)
    dispatch({ type: ORDER_GET_ALL_ITEMS, ItemsList: OrderItems, PartyCode: PartyID });


}







export const AddToOrdersAction = (ItemOrder, SSOnum, SectorId) => dispatch => {


    respJson = [{ Id: DateDay(), Items: ItemOrder, SSONum: SSOnum, SectorID: SectorId }]
    // respJson = fooo.map((item, i) => {

    //     //   mainPack = pks.find(x => x.MUId == item.BaseMeasureUnitId).Title
    //     console.log("ccc: ",item)
    //     return {
    //         ...item,
    //         SSONum: SSOnum,
    //         SectorID: SectorId,
    //         Items: ItemOrder
    //     }
    // });


    //console.log("Test: ", respJson)

    dispatch({
        type: ADD_TO_ORDER, ItemsList: respJson, SSONum: SSOnum, SectorID: SectorId,
    });


}







export const GetItemsGroupsAction = (token, userHeaderInfo, ) => async dispatch => {
    dispatch({ type: GET_ALL_GROUPS_ITEMS });


    const response = await GetItemsGroups(token, userHeaderInfo);


    if (response.unAuthorizedRequest == false) {

        if (response.success) {

            obj = JSON.parse(response.result)
            //  console.log("Test: ", obj)
            if (obj.Status[0].StatusCode == true) {

                MainGroup = []
                SubGroup = []
                obj.ItemGroups.forEach(element => {
                    // 
                    if (element.levelno == 1) {
                        MainGroup.push(element)
                    } else {
                        SubGroup.push(element)
                    }
                });

                //  console.log("SectorID: ", response.Items)
                try {


                    // console.log("SectorID: ", obj.Items)
                    respJson = obj.Items.map((item, i) => {
                        //         console.log('Test0',item.ImageUrl)

                        prs = JSON.parse(item.ItemsPrices)
                        pks = JSON.parse(item.ItemsPacks)


                        mainPackID = pks.find(x => x.MUId == item.BaseMeasureUnitId).Id

                        stock = pks.find(x => x.MUId == item.BaseMeasureUnitId).stockqty

                        mainPack = pks.find(x => x.MUId == item.BaseMeasureUnitId).Title



                        // mainPackID = pks.find(x => x.stockqty != 0).MUId
                        //         console.log("Lenth: ", pks)

                        // stock = pks.find(x => x.MUId == mainPackID).stockqty

                        // mainPack = pks.find(x => x.MUId == mainPackID).Title


                        //  console.log("Lenth: ", pks)
                        //  mainPack = getLocalizedJsonName(mainPack)


                        delete item.ItemsPacks
                        delete item.ItemsPrices

                        return {
                            ...item,
                            Stock: parseFloat(stock).toFixed(2),
                            ItemSelectedDate: '',
                            MainPackID: mainPackID,
                            ItemSelectedLocation: '',
                            MainPack: mainPack,
                            Packs: pks,
                            ItemPricing: prs,
                            SoldQuantity: 0.0,
                            RemainStock: parseFloat(stock).toFixed(2),
                            // AddCartColor: '#b40000',
                            // MissingPricingColor: 'white',
                            // MissingPricingSelection: 'auto', isFavorite: false, favoColor: '#b40000', favoName: 'favorite-border', isStepperView: false, isAddToCart: true

                        }
                    });

                    //      console.log("Items List mapped: ", respJson)
                    dispatch({ type: GET_ALL_ITEMS_GROUPS_SUCCESS, ItemsList: respJson, MainGroup: MainGroup, SubGroup: SubGroup, StatusCode: obj.Status[0].StatusCode });
                } catch (error) {

                    console.log('Items Catch', error)
                }
            } else {
                dispatch({ type: ITEMS_NO_PRICES, StatusMessage: obj.Status[0].StatusMessage, StatusCode: obj.Status[0].StatusCode });
                // Alert.alert('AA', 'a', 'ok')

            }
        }
    }
    else {

        //   dispatch({ type: SIGNOUT_REQUEST });
        // navigate.navigate('Auth')
    }
}










export const GetItemsPerOrderActionAPI = (MainItemsApi, SelectedItems, SectorID, PartyID) => dispatch => {

    MainItems = JSON.parse(JSON.stringify(MainItemsApi))

    // console.log("Catch Item Groups", SelectedItems)
    OrderItems = MainItems.map(item => {

        PriceReference = item.ItemPricing.find(x => x.sectorid == SectorID).PriceReference
        wsd = item.ItemPricing.find(x => x.sectorid == SectorID).wsd
        cashd = item.ItemPricing.find(x => x.sectorid == SectorID).cashd
        promod = item.ItemPricing.find(x => x.sectorid == SectorID).promod
        otherd = item.ItemPricing.find(x => x.sectorid == SectorID).otherd
        price = item.ItemPricing.find(x => x.sectorid == SectorID).itemprice
        dicountpre = item.ItemPricing.find(x => x.sectorid == SectorID).deductionperc
        deduction = item.ItemPricing.find(x => x.sectorid == SectorID).deduction
        dicountPrice = parseFloat(parseFloat(price) - parseFloat(deduction)).toFixed(2);

        salesTax = item.ItemPricing.find(x => x.sectorid == SectorID).salestax
        taxPercent = item.ItemPricing.find(x => x.sectorid == SectorID).taxperc


        wsd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).wsd_percent
        cashd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).cashd_percent
        promod_percent = item.ItemPricing.find(x => x.sectorid == SectorID).promod_percent
        otherd_percent = item.ItemPricing.find(x => x.sectorid == SectorID).otherd_percent
        convertToBaseRatio = item.ItemPricing.find(x => x.sectorid == SectorID).tobaseratio
        //console.log("OrderID", price)

        var Orderelement = SelectedItems.find(x => x.ItemId == item.Id)

        // console.log(Orderelement)
        if (Orderelement !== undefined) {

            var Pack = item.Packs.map(pack => {

                //  var findPack = pack.find(x => x.MUId == Orderelement.SagoMuId)
                //otherd discount
                if (pack.MUId == Orderelement.SagoMuId) {

                    pack.ConvRatio = pack.ConvRatio
                    pack.Discountedprice = parseFloat(parseFloat(pack.Price) - parseFloat(pack.deduction)).toFixed(2);
                    pack.Id = pack.Id
                    pack.MUId = Orderelement.SagoMuId
                    pack.SelectedQuantity = Orderelement.Quantity
                    pack.Title = pack.Title
                    pack.cashd = parseFloat((Orderelement.Quantity) * (cashd) * (pack.ConvRatio) / item.ConvertToBaseRatio)
                    pack.cashd_percent = pack.cashd_percent
                    pack.deduction = parseFloat(pack.wsd + pack.cashd + pack.promod + pack.otherd).toFixed()
                    pack.deductionperc = pack.deductionperc
                    pack.netprice = parseFloat(parseFloat(pack.Discountedprice) + parseFloat(pack.salestax)).toFixed(2)
                    pack.otherd = parseFloat((Orderelement.Quantity) * (otherd) * (pack.ConvRatio) / SelectedItem.ConvertToBaseRatio)
                    pack.otherd_percent = pack.otherd_percent
                    pack.promod = parseFloat((Orderelement.Quantity) * (promod) * (pack.ConvRatio) / item.ConvertToBaseRatio)
                    pack.promod_percent = pack.promod_percent
                    pack.sBaseQty = pack.sBaseQty
                    pack.salestax = parseFloat((pack.Price - pack.deduction) * (pack.taxperc / 100)).toFixed()//Orderelement.SalesTax
                    pack.stockqty = pack.stockqty
                    pack.taxperc = pack.taxperc
                    pack.Price = parseFloat((Orderelement.Quantity) * (price) * (pack.ConvRatio) / item.ConvertToBaseRatio)//pack.unitprice
                    pack.wsd = parseFloat((Orderelement.Quantity) * (wsd) * (pack.ConvRatio) / item.ConvertToBaseRatio)
                    pack.wsd_percent = pack.wsd_percent

                    console.log("findpack", pack)

                } else {
                    console.log("findpack")

                }

                return {
                    ...pack
                }
            })
            item.Packs = Orderelement.Packs
            console.log("Found")
            item.AddCartColor = Orderelement.AddCartColor
            item.MissingPricingColor = Orderelement.MissingPricingColor
            item.MissingPricingSelection = Orderelement.MissingPricingSelection
            item.isStepperView = Orderelement.isStepperView
            item.isAddToCart = Orderelement.isAddToCart
            item.RemainStock = Orderelement.RemainStock
            item.SoldQuantity = Orderelement.SoldQuantity
            item.Stock = Orderelement.Stock

            item.PriceReference = Orderelement.PriceReference
            item.wsd_percent = Orderelement.wsd_percent
            item.cashd_percent = Orderelement.cashd_percent
            item.promod_percent = Orderelement.promod_percent
            item.otherd_percent = Orderelement.otherd_percent
            item.ConvertToBaseRatio = Orderelement.ConvertToBaseRatio
            item.OtherDis = Orderelement.OtherDis
            item.wsd = Orderelement.wsd
            item.cashd = Orderelement.cashd
            item.promod = Orderelement.promod
            item.SalesTax = Orderelement.SalesTax
            item.TaxPercent = Orderelement.TaxPercent
            item.Deduction = Orderelement.Deduction
            item.PartyID = Orderelement.PartyID
            item.itemprice = Orderelement.itemprice
            item.Dicount = Orderelement.Dicount
            item.DicountPrice = Orderelement.DicountPrice
            item.TotalPrice = Orderelement.TotalPrice
            item.NetPrice = Orderelement.NetPrice
            item.TotalDiscount = Orderelement.TotalDiscount
            item.TotalTax = Orderelement.TotalTax
            item.TotalDeduction = Orderelement.TotalDeduction
            //  console.log('NEEE', item.TotalDiscount + "   " + Orderelement.NetPrice)

        } else {
            item.AddCartColor = '#b40000'
            item.MissingPricingColor = 'white'
            item.MissingPricingSelection = 'auto'
            item.isStepperView = false
            item.isAddToCart = true
            item.PriceReference = PriceReference
            item.wsd_percent = wsd_percent
            item.cashd_percent = cashd_percent
            item.promod_percent = promod_percent
            item.otherd_percent = otherd_percent
            item.ConvertToBaseRatio = convertToBaseRatio
            item.OtherDis = otherd
            item.wsd = wsd
            item.cashd = cashd
            item.promod = promod
            item.SalesTax = salesTax
            item.TaxPercent = taxPercent
            item.Deduction = deduction
            item.PartyID = PartyID
            item.itemprice = price
            item.Dicount = dicountpre
            item.DicountPrice = dicountPrice
            item.TotalPrice = 0.0
            item.NetPrice = 0.0
            item.TotalDiscount = 0.0
            item.TotalTax = 0.0
            item.TotalDeduction = 0.0
            console.log("NOT")
        }


        return {
            ...item,


        }
    });

    //  console.log('Compare', OrderItems)
    dispatch({ type: ORDER_GET_ALL_ITEMS, ItemsList: OrderItems, PartyCode: PartyID });


}



