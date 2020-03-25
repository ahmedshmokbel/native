import {
    FAVORITE_ITEM,
    SIGNOUT_REQUEST,
    INCREMENT_ITEM,
    DECREMENT_ITEM,

    FILTER_BY_GROUP,
    VIEW_ALL_ITEMS,
    GET_ALL_GROUPS_ITEMS,
    GET_ALL_ITEMS_GROUPS_SUCCESS,
    GET_ALL_ITEMS_GROUPS_ERROR,
    FILTER_GROUP, VIEW_ALL_GROUPS,
    PARTY_ITEMS, ADD_INVOICE,
    CREATION_DATA, OTHER_PARTY_SELECTION, ITEMS_NO_PRICES, ADD_TO_CART_PENDDING,
    SEARCH_ITEM_CODE,
    ADD_OTHER_DISCOUNT,
    ORDER_GET_ALL_ITEMS
} from '../types';
import { DateTimeCustom } from '../../constants/DateTime';
import { Alert } from 'react-native';

const initialState = {
    OrderSelectedItems: [],
    OrdermainItems: [],
    BackUpOrderitems: [],
    OrderallItems: [],
    Orderfiltered: [],
    OrdersearchItem: [],
    SectorID: 0,

    Condition: 'Items',


    mainItems: [],
    items: [],
    // allItems: [],
    // filtered: [],
    // searchItem: [],
    Groups: [],
    LevelNo: 1,
    filteredGroup: [],
    GroupsMain: [],
    SubGroup: [],
    spinnerVisible: true,
    hasErrors: false,
    errorMessage: "",
    PartyID: 0,
    BackUpItems: [],
    ReduxStock: 0.0,
    Status: true,
    StatusMessage: '',

    TotalPrice: 0.0,
    TotalDiscount: 0.0,
    NetPrice: 0.0,
    TotalDeduction: 0.0,
    TotalTax: 0.0,
    OtherDis: 0.0
};
const ItemGroupsReducer = (state = initialState, action) => {

    ////console.log(action)
    switch (action.type) {

        case GET_ALL_GROUPS_ITEMS:
            return {
                ...state,
                hasErrors: false,
                spinnerVisible: true
            };


        case GET_ALL_ITEMS_GROUPS_SUCCESS:

            ///console.log("ReducerGroup",action.MainGroup,)
            return {
                ...state,
                hasErrors: false,
                spinnerVisible: false,
                mainItems: action.ItemsList,
                BackUpItems: JSON.parse(JSON.stringify(action.ItemsList)),
                // allItems: action.ItemsList,
                Groups: action.MainGroup,
                GroupsMain: action.MainGroup,
                SubGroup: SubGroup,
                Status: action.StatusCode,
            };
        case GET_ALL_ITEMS_GROUPS_ERROR:
            return {
                ...state,
                hasErrors: true,
                spinnerVisible: false,

            };


        case ITEMS_NO_PRICES:
            return {
                ...state,
                hasErrors: false,
                Status: action.StatusCode,
                StatusMessage: action.StatusMessage
            };


        case PARTY_ITEMS:

            {

                var editedState = [...action.ItemsList]



            }
            return {
                ...state,
                //    Groups: action.MainGroup,
                //  GroupsMain: action.MainGroup,
                //     SubGroup: SubGroup,
                items: action.ItemsList,
                allItems: action.ItemsList,
                SectorID: action.SectorID

                //BackUpItems: JSON.parse(JSON.stringify(action.ItemsList))

            };



        // case SEARCH_ITEM_CODE:
        //     {
        //         state.searchItem
        //         state.searchItem = action.search
        //         //  console.log('payload', state.filtered)
        //         //    state.items = vv
        //         state.items = state.searchItem
        //     }
        //     return {
        //         ...state
        //     }



        case ADD_TO_CART_PENDDING:
            {
                var editedState = [...state.items]

                let editedStateIndex = editedState[action.index]
                editedStateIndex.isAddToCart = false
                editedStateIndex.isStepperView = true

                state.items = editedState

                //    console.log('Add To Cart Item', editedStateIndex)
                return {
                    ...state
                };
            }



        case INCREMENT_ITEM:
            {
                var editedState = [...state.items]

                var ItemId = action.ItemId
                var StepId = action.StepperIndex

                let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));



                let SelectedItem = editedState[ItemIndex]
                //  console.log('item reducer index', SelectedItem.OtherDis)

                let StepIndex = SelectedItem.Packs.findIndex((obj => obj.Id == StepId));

                var stepperItemCount = SelectedItem.Packs[StepIndex].SelectedQuantity
                if (SelectedItem.Stock != 0.0) {// check from begining if the stock  not equal 0


                    if (SelectedItem.Stock - SelectedItem.SoldQuantity - (SelectedItem.Packs[StepIndex].ConvRatio) >= 0) {

                        SelectedItem.ItemSelectedDate = DateTimeCustom()

                        SelectedItem.Packs[StepIndex].SelectedQuantity += 1

                        SelectedItem.SoldQuantity += (SelectedItem.Packs[StepIndex].ConvRatio)
                        state.ReduxStock = SelectedItem.RemainStock = SelectedItem.Stock - SelectedItem.SoldQuantity

                    //    console.log('Stock', SelectedItem.RemainStock)

                        SelectedItem.Packs[StepIndex].wsd_percent = (SelectedItem.wsd_percent)
                        SelectedItem.Packs[StepIndex].cashd_percent = (SelectedItem.cashd_percent)
                        SelectedItem.Packs[StepIndex].promod_percent = (SelectedItem.promod_percent)
                        SelectedItem.Packs[StepIndex].otherd_percent = (SelectedItem.otherd_percent)
                        SelectedItem.Packs[StepIndex].deductionperc = (SelectedItem.Dicount)
                        SelectedItem.Packs[StepIndex].taxperc = (SelectedItem.TaxPercent)


                        SelectedItem.Packs[StepIndex].Price = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.itemprice) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)

                        SelectedItem.Packs[StepIndex].wsd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.wsd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio).toFixed(2)
                        SelectedItem.Packs[StepIndex].cashd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.cashd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
                        SelectedItem.Packs[StepIndex].promod = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.promod) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
                        SelectedItem.Packs[StepIndex].otherd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.OtherDis) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)


                        SelectedItem.Packs[StepIndex].deduction = parseFloat(SelectedItem.Packs[StepIndex].wsd + SelectedItem.Packs[StepIndex].cashd + SelectedItem.Packs[StepIndex].promod + SelectedItem.Packs[StepIndex].otherd)

                        SelectedItem.Packs[StepIndex].salestax = parseFloat((SelectedItem.Packs[StepIndex].Price - SelectedItem.Packs[StepIndex].deduction) * (SelectedItem.Packs[StepIndex].taxperc / 100))


                        SelectedItem.Packs[StepIndex].Discountedprice = parseFloat(parseFloat(SelectedItem.Packs[StepIndex].Price) - parseFloat(SelectedItem.Packs[StepIndex].deduction)).toFixed(2);
                        SelectedItem.Packs[StepIndex].netprice = parseFloat(parseFloat(SelectedItem.Packs[StepIndex].Discountedprice) + parseFloat(SelectedItem.Packs[StepIndex].salestax)).toFixed(2);

                        //console.log('Pr',  SelectedItem.Packs[StepIndex].Price)



                        SelectedItem.TotalPrice = 0.0
                        SelectedItem.TotalDiscount = 0.0
                        SelectedItem.NetPrice = 0.0
                        SelectedItem.TotalDeduction = 0.0
                        SelectedItem.TotalTax = 0.0
                        SelectedItem.Packs.forEach(element => {

                            //   console.log('PAck IncremnetPrice', parseFloat(element.Price))

                            SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice) + parseFloat(element.Price)
                            SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount) + parseFloat(element.Discountedprice)
                            SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice) + parseFloat(element.netprice)

                            SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction) + parseFloat(element.deduction)
                            SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)

                            //   console.log('PAck Total', SelectedItem.TotalDeduction)


                        });

                        SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice).toFixed(2)
                        SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount).toFixed(2)
                        SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice).toFixed(2)
                        SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction).toFixed(2)
                        SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax).toFixed(2)




                    } else {
                        Alert.alert("Item", 'No More Stock')
                    }

                } else {
                    Alert.alert("ALL Item", 'Out of stock')
                }



                //   console.log('Increment ITem', SelectedItem)


                state.items = editedState

            }
            return {
                ...state
            }


        case DECREMENT_ITEM:
            {
                var editedState = [...state.items]


                var ItemId = action.ItemId
                var StepId = action.StepperIndex

                let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));
                let SelectedItem = editedState[ItemIndex]
                //   console.log('reducer Index', SelectedItem)
                let StepIndex = SelectedItem.Packs.findIndex((obj => obj.Id == StepId));

                //    console.log('item reducer index', StepIndex)
                var stepperItemCount = SelectedItem.Packs[StepIndex].SelectedQuantity


                // console.log('item index', ItemIndex)
                if (stepperItemCount > 0) {

                    SelectedItem.SoldQuantity -= (SelectedItem.Packs[StepIndex].ConvRatio)
                    stepperItemCount = SelectedItem.Packs[StepIndex].SelectedQuantity -= 1
                    state.ReduxStock = SelectedItem.RemainStock = (SelectedItem.Stock) - (SelectedItem.SoldQuantity)



                    SelectedItem.Packs[StepIndex].wsd_percent = (SelectedItem.wsd_percent)
                    SelectedItem.Packs[StepIndex].cashd_percent = (SelectedItem.cashd_percent)
                    SelectedItem.Packs[StepIndex].promod_percent = (SelectedItem.promod_percent)
                    SelectedItem.Packs[StepIndex].otherd_percent = (SelectedItem.otherd_percent)
                    SelectedItem.Packs[StepIndex].deductionperc = (SelectedItem.Dicount)
                    SelectedItem.Packs[StepIndex].taxperc = (SelectedItem.TaxPercent)

                    SelectedItem.Packs[StepIndex].Price = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.itemprice) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)

                    SelectedItem.Packs[StepIndex].wsd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.wsd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio).toFixed(2)
                    SelectedItem.Packs[StepIndex].cashd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.cashd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
                    SelectedItem.Packs[StepIndex].promod = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.promod) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
                    SelectedItem.Packs[StepIndex].otherd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.OtherDis) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)


                    SelectedItem.Packs[StepIndex].deduction = parseFloat(SelectedItem.Packs[StepIndex].wsd + SelectedItem.Packs[StepIndex].cashd + SelectedItem.Packs[StepIndex].promod + SelectedItem.Packs[StepIndex].otherd)

                    SelectedItem.Packs[StepIndex].salestax = parseFloat((SelectedItem.Packs[StepIndex].Price - SelectedItem.Packs[StepIndex].deduction) * (SelectedItem.Packs[StepIndex].taxperc / 100))


                    SelectedItem.Packs[StepIndex].Discountedprice = parseFloat(parseFloat(SelectedItem.Packs[StepIndex].Price) - parseFloat(SelectedItem.Packs[StepIndex].deduction)).toFixed(2);
                    SelectedItem.Packs[StepIndex].netprice = parseFloat(parseFloat(SelectedItem.Packs[StepIndex].Discountedprice) + parseFloat(SelectedItem.Packs[StepIndex].salestax)).toFixed(2);




                    SelectedItem.TotalPrice = 0.0
                    SelectedItem.TotalDiscount = 0.0
                    SelectedItem.NetPrice = 0.0
                    SelectedItem.TotalDeduction = 0.0
                    SelectedItem.TotalTax = 0.0
                    SelectedItem.Packs.forEach(element => {

                        //   console.log('PAck IncremnetPrice', parseFloat(element.Price))

                        SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice) + parseFloat(element.Price)
                        SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount) + parseFloat(element.Discountedprice)
                        SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice) + parseFloat(element.netprice)

                        SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction) + parseFloat(element.deduction)
                        SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)

                        //    console.log('PAck Total', SelectedItem.TotalPrice)


                    });


                    TotalPrice = SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice).toFixed(2)
                    TotalDiscount = SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount).toFixed(2)
                    NetPrice = SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice).toFixed(2)
                    TotalDeduction = SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction).toFixed(2)
                    TotalTax = SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax).toFixed(2)



                    // if (StepIndex === 0) {
                    if (SelectedItem.RemainStock == SelectedItem.Stock) {

                        SelectedItem.isAddToCart = true
                        SelectedItem.isStepperView = false
                        SelectedItem.TotalPrice = 0.0
                        SelectedItem.TotalDiscount = 0.0
                        SelectedItem.NetPrice = 0.0
                        state.ReduxStock = SelectedItem.RemainStock = SelectedItem.Stock

                        for (let i = 0; i < SelectedItem.Packs.length; i++) {
                            SelectedItem.Packs[i].SelectedQuantity = 0;
                            SelectedItem.Packs[StepIndex].Price = 0.0
                            SelectedItem.Packs[StepIndex].wsd = 0.0
                            SelectedItem.Packs[StepIndex].cashd = 0.0
                            SelectedItem.Packs[StepIndex].promod = 0.0
                            SelectedItem.Packs[StepIndex].otherd = 0.0
                            SelectedItem.Packs[StepIndex].deduction = 0.0
                            SelectedItem.Packs[StepIndex].salestax = 0.0
                            SelectedItem.Packs[StepIndex].wsd_percent = 0.0
                            SelectedItem.Packs[StepIndex].cashd_percent = 0.0
                            SelectedItem.Packs[StepIndex].promod_percent = 0.0
                            SelectedItem.Packs[StepIndex].otherd_percent = 0.0
                            SelectedItem.Packs[StepIndex].deductionperc = 0.0
                            SelectedItem.Packs[StepIndex].taxperc = 0.0
                            SelectedItem.Packs[StepIndex].Discountedprice = 0.0
                            SelectedItem.Packs[StepIndex].netprice = 0.0

                        }
                    }
                    //   }
                }
                else {
                    if (stepperItemCount == 0 && SelectedItem.SoldQuantity == 0) {
                        SelectedItem.isAddToCart = true
                        SelectedItem.isStepperView = false
                    }
                }
                state.items = editedState

            }
            return {
                ...state

            }


        case ADD_OTHER_DISCOUNT:
            {

                var editedState = [...state.items]
                var OtherDis = action.discount
                state.OtherDis = action.discount
                var ItemId = action.ItemId

                let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));

                let SelectedItem = editedState[ItemIndex]
                SelectedItem.OtherDis = action.discount
                SelectedItem.TotalDiscount = 0.0
                SelectedItem.NetPrice = 0.0
                SelectedItem.TotalDeduction = 0.0
                SelectedItem.TotalTax = 0.0

                SelectedItem.Packs.forEach((element, StepIndex) => {

                    element.Price = parseFloat((element.SelectedQuantity) * (SelectedItem.itemprice) * (element.ConvRatio) / SelectedItem.ConvertToBaseRatio)

                    element.otherd = parseFloat((OtherDis) * (element.Price) / (SelectedItem.TotalPrice)).toFixed(2)


                    element.deduction = parseFloat(parseFloat(element.promod) + parseFloat(element.otherd) + parseFloat(element.wsd) + parseFloat(element.cashd)).toFixed(2)

                    console.log('PAck Total', element.deduction)

                    element.salestax = parseFloat((element.Price - element.deduction) * (SelectedItem.Packs[StepIndex].taxperc / 100)).toFixed(2)


                    element.Discountedprice = parseFloat(parseFloat(element.Price) - parseFloat(element.deduction)).toFixed(2)
                    element.netprice = parseFloat(parseFloat(element.Discountedprice) + parseFloat(element.salestax)).toFixed(2)


                    // SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)



                    SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount) + parseFloat(element.Discountedprice)
                    SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice) + parseFloat(element.netprice)

                    SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction) + parseFloat(element.deduction)
                    SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)

                });

                // SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount - OtherDis).toFixed(2)
                // SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice - OtherDis).toFixed(2)


                SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice).toFixed(2)
                SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount).toFixed(2)
                SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice).toFixed(2)
                SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction).toFixed(2)
                SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax).toFixed(2)
                state.items = editedState

            }
            return {
                ...state
            }



        // case FILTER_BY_GROUP:    // filtering the items based on its group
        //     {
        //         //         var editedState = [...state.items]

        //         //         var filterCode = action.Code
        //         // //console.log('reducer', filterCode)

        //         //         state.filtered = [];
        //         //         vv= editedState.filter(editedState => (editedState.Code).startsWith(filterCode))
        //         //    state.items = action.payload
        //         state.filtered
        //         state.filtered = action.payload
        //         //  console.log('payload', state.filtered)
        //         //    state.items = vv
        //         state.items = state.filtered
        //     }
        //     return {
        //         ...state
        //     }




        // case VIEW_ALL_ITEMS:

        //     {
        //         //   state.filtered = [];
        //         var editedState = [...state.allItems]
        //         //  // console.log('View', state.items)


        //         state.items = editedState

        //     }
        //     return {
        //         ...state
        //     }



        case CREATION_DATA:

            return {
                ...state,
                PartyID: action.PartyID,

            }




        case FILTER_GROUP: // filter Group based on SubGroup

            {
                var editedState = [...state.SubGroup]

                let filteredList = editedState.filter(i => (i.code).startsWith(action.Code))

                //    state.items = vv
                state.Groups = filteredList
                if (filteredList) {
                    state.LevelNo = 2

                } else {
                    state.LevelNo = filteredList[0].levelno
                }
            }
            return {
                ...state

            }




        case VIEW_ALL_GROUPS:

            {
                //   console.log('View', state.GroupsMain)
                //   state.filtered = [];
                var editedState = [...state.GroupsMain]

                state.LevelNo = 1

                state.Groups = editedState

            }
            return {
                ...state
            }


        case OTHER_PARTY_SELECTION:  // the backupitem array is the main items to rest the selection  after choosing new party

            {
                //   var otherPartyItems = [...state.BackUpItems]
                state.mainItems = JSON.parse(JSON.stringify(state.BackUpItems))

            }
            return {
                ...state,

            }




        case ADD_INVOICE:// to rest all the selection after printing the invoice

            return {
                ...state,
                //    Groups: action.MainGroup,
                //  GroupsMain: action.MainGroup,
                //     SubGroup: SubGroup,
                items: action.ItemsList,
                allItems: action.ItemsList,
                PartyID: 0
            }





        case FAVORITE_ITEM:
            {
                var editedState = [...state.items]



                let editedStateIndex = editedState[action.index]

                editedStateIndex.isFavorite = !editedStateIndex.isFavorite

                if (editedStateIndex.isFavorite) {

                    editedStateIndex.favoColor = 'red'
                    editedStateIndex.favoName = 'favorite'

                }
                else {
                    editedStateIndex.favoColor = 'black'
                    editedStateIndex.favoName = 'favorite-border'


                }
                state.items = editedState

                return {
                    ...state
                }
            }




        case ORDER_GET_ALL_ITEMS:
            return {
                ...state,
                items: JSON.parse(JSON.stringify(action.ItemsList)),
                PartyID: action.PartyCode
            }




        case SIGNOUT_REQUEST:
            return initialState





        default:
            return state;
    }
};

export default ItemGroupsReducer;
