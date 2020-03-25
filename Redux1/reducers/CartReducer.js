// import { ADD_TO_CART, SIGNOUT_REQUEST, REMOVE_FROM_CART, INCREMENT_ITEM, DECREMENT_ITEM, ADD_INVOICE, OTHER_PARTY_SELECTION, ADD_OTHER_DISCOUNT, } from '../types';
// import { Alert } from 'react-native';

// const initialState = {
//   items: [],
//   TotalPrice: 0.0,
//   TotalDiscount: 0.0,
//   NetPrice: 0.0,
//   TotalDeduction: 0.0,
//   TotalTax: 0.0,
//   OtherDis: 0.0

// };
// const CartReducer = (state = initialState, action) => {
//   ////console.log(action)
//   switch (action.type) {

//     // case ADD_TO_CART:

//     //   return {
//     //     ...state,
//     //     items: state.items.concat(JSON.parse(JSON.stringify(action.payload)))

//     //   };


//     // case INCREMENT_ITEM:
//     //   {
//     //     var editedState = [...state.items]

//     //     var ItemId = action.ItemId
//     //     var StepId = action.StepperIndex
         
//     //     if (editedState.length != 0 && editedState.find(x => x.Id == ItemId) != null) {
//     //       let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));

//     //       //  console.log('Cart Reducer Index', ItemIndex)
//     //       let SelectedItem = editedState[ItemIndex]

//     //       let StepIndex = SelectedItem.Packs.findIndex((obj => obj.Id == StepId));

//     //       if (SelectedItem.Stock - SelectedItem.SoldQuantity - (SelectedItem.Packs[StepIndex].ConvRatio) >= 0) {

//     //         SelectedItem.Packs[StepIndex].SelectedQuantity += 1

//     //         SelectedItem.SoldQuantity += (SelectedItem.Packs[StepIndex].ConvRatio)
//     //         SelectedItem.RemainStock = SelectedItem.Stock - SelectedItem.SoldQuantity

//     //         SelectedItem.Packs[StepIndex].wsd_percent = (SelectedItem.wsd_percent)
//     //         SelectedItem.Packs[StepIndex].cashd_percent = (SelectedItem.cashd_percent)
//     //         SelectedItem.Packs[StepIndex].promod_percent = (SelectedItem.promod_percent)
//     //         SelectedItem.Packs[StepIndex].otherd_percent = (SelectedItem.otherd_percent)
//     //         SelectedItem.Packs[StepIndex].deductionperc = (SelectedItem.Dicount)
//     //         SelectedItem.Packs[StepIndex].taxperc = (SelectedItem.TaxPercent)



//     //         SelectedItem.Packs[StepIndex].Price = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.itemprice) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)

//     //         SelectedItem.Packs[StepIndex].wsd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.wsd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
//     //         SelectedItem.Packs[StepIndex].cashd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.cashd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
//     //         SelectedItem.Packs[StepIndex].promod = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.promod) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
//     //         SelectedItem.Packs[StepIndex].otherd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.OtherDis) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)


//     //         SelectedItem.Packs[StepIndex].deduction = parseFloat(SelectedItem.Packs[StepIndex].wsd + SelectedItem.Packs[StepIndex].cashd + SelectedItem.Packs[StepIndex].promod + SelectedItem.Packs[StepIndex].otherd).toFixed(2)
//     //         SelectedItem.Packs[StepIndex].salestax = parseFloat((SelectedItem.Packs[StepIndex].Price - SelectedItem.Packs[StepIndex].deduction) * (SelectedItem.Packs[StepIndex].taxperc / 100)).toFixed(2)



//     //         SelectedItem.Packs[StepIndex].Discountedprice = parseFloat(parseFloat(SelectedItem.Packs[StepIndex].Price) - parseFloat(SelectedItem.Packs[StepIndex].deduction))
//     //         SelectedItem.Packs[StepIndex].netprice = parseFloat(SelectedItem.Packs[StepIndex].Discountedprice) + parseFloat(SelectedItem.Packs[StepIndex].salestax)

//     //         //    console.log('Cart Selected', SelectedItem)

//     //         SelectedItem.TotalPrice = 0.0
//     //         SelectedItem.TotalDiscount = 0.0
//     //         SelectedItem.NetPrice = 0.0
//     //         SelectedItem.TotalDeduction = 0.0
//     //         SelectedItem.TotalTax = 0.0
//     //         SelectedItem.Packs.forEach(element => {

//     //           //   console.log('PAck IncremnetPrice', parseFloat(element.Price))

//     //           SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice) + parseFloat(element.Price)
//     //           SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount) + parseFloat(element.Discountedprice)
//     //           SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice) + parseFloat(element.netprice)

//     //           SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction) + parseFloat(element.deduction)
//     //           SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)

//     //           //   console.log('PAck Total', SelectedItem.TotalDeduction)


//     //         });

//     //         SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice).toFixed(2)
//     //         SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount).toFixed(2)
//     //         SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice).toFixed(2)
//     //         SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction).toFixed(2)
//     //         SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax).toFixed(2)

//     //         //        console.log('Total PRice', SelectedItem.TotalPrice)


//     //       }
//     //       //else {
//     //       //     Alert.alert("Item", 'Out of stock')
//     //       // }


//     //       state.items = editedState


//     //     }
//     //   }
//     //   return {
//     //     ...state
//     //   }


//     // case DECREMENT_ITEM:
//     //   {

//     //     var editedState = [...state.items]

//     //     var ItemId = action.ItemId
//     //     var StepId = action.StepperIndex
//     //     //  console.log('Cart reducer Index', editedState)
//     //     if (editedState.length != 0 && editedState.find(x => x.Id == ItemId) != null) {


//     //       let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));
//     //       let SelectedItem = editedState[ItemIndex]

//     //       let StepIndex = SelectedItem.Packs.findIndex((obj => obj.Id == StepId));

//     //       // console.log('Cart reducer Index', ItemIndex)
//     //       var stepperItemCount = SelectedItem.Packs[StepIndex].SelectedQuantity

//     //       if (stepperItemCount > 0) {

//     //         SelectedItem.SoldQuantity -= (SelectedItem.Packs[StepIndex].ConvRatio)

//     //         stepperItemCount = SelectedItem.Packs[StepIndex].SelectedQuantity -= 1

//     //         SelectedItem.RemainStock = (SelectedItem.Stock) - (SelectedItem.SoldQuantity)

//     //         SelectedItem.Packs[StepIndex].wsd_percent = (SelectedItem.wsd_percent)
//     //         SelectedItem.Packs[StepIndex].cashd_percent = (SelectedItem.cashd_percent)
//     //         SelectedItem.Packs[StepIndex].promod_percent = (SelectedItem.promod_percent)
//     //         SelectedItem.Packs[StepIndex].otherd_percent = (SelectedItem.otherd_percent)
//     //         SelectedItem.Packs[StepIndex].deductionperc = (SelectedItem.Dicount)
//     //         SelectedItem.Packs[StepIndex].taxperc = (SelectedItem.TaxPercent)



//     //         SelectedItem.Packs[StepIndex].Price = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.itemprice) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)

//     //         SelectedItem.Packs[StepIndex].wsd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.wsd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
//     //         SelectedItem.Packs[StepIndex].cashd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.cashd) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
//     //         SelectedItem.Packs[StepIndex].promod = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.promod) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)
//     //         SelectedItem.Packs[StepIndex].otherd = parseFloat((SelectedItem.Packs[StepIndex].SelectedQuantity) * (SelectedItem.OtherDis) * (SelectedItem.Packs[StepIndex].ConvRatio) / SelectedItem.ConvertToBaseRatio)


//     //         SelectedItem.Packs[StepIndex].deduction = parseFloat(SelectedItem.Packs[StepIndex].wsd + SelectedItem.Packs[StepIndex].cashd + SelectedItem.Packs[StepIndex].promod + SelectedItem.Packs[StepIndex].otherd).toFixed()
//     //         SelectedItem.Packs[StepIndex].salestax = parseFloat((SelectedItem.Packs[StepIndex].Price - SelectedItem.Packs[StepIndex].deduction) * (SelectedItem.Packs[StepIndex].taxperc / 100)).toFixed()



//     //         SelectedItem.Packs[StepIndex].Discountedprice = parseFloat(parseFloat(SelectedItem.Packs[StepIndex].Price) - parseFloat(SelectedItem.Packs[StepIndex].deduction))
//     //         SelectedItem.Packs[StepIndex].netprice = parseFloat(SelectedItem.Packs[StepIndex].Discountedprice) + parseFloat(SelectedItem.Packs[StepIndex].salestax)

//     //         SelectedItem.TotalPrice = 0.0
//     //         SelectedItem.TotalDiscount = 0.0
//     //         SelectedItem.NetPrice = 0.0
//     //         SelectedItem.TotalDeduction = 0.0
//     //         SelectedItem.TotalTax = 0.0
//     //         SelectedItem.Packs.forEach(element => {

//     //           //   console.log('PAck IncremnetPrice', parseFloat(element.Price))

//     //           SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice) + parseFloat(element.Price)
//     //           SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount) + parseFloat(element.Discountedprice)
//     //           SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice) + parseFloat(element.netprice)

//     //           SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction) + parseFloat(element.deduction)
//     //           SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)

//     //           //    console.log('PAck Total', SelectedItem.TotalPrice)


//     //         });


//     //         TotalPrice = SelectedItem.TotalPrice = parseFloat(SelectedItem.TotalPrice).toFixed(2)
//     //         TotalDiscount = SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount).toFixed(2)
//     //         NetPrice = SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice).toFixed(2)
//     //         TotalDeduction = SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction).toFixed(2)
//     //         TotalTax = SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax).toFixed(2)


//     //         if (SelectedItem.RemainStock == SelectedItem.Stock) {

//     //           state.OtherDis = 0

//     //           SelectedItem.isAddToCart = true
//     //           SelectedItem.isStepperView = false
//     //           SelectedItem.TotalPrice = 0.0
//     //           SelectedItem.TotalDiscount = 0.0
//     //           SelectedItem.NetPrice = 0.0
//     //           SelectedItem.RemainStock = SelectedItem.Stock

//     //           for (let i = 0; i < SelectedItem.Packs.length; i++) {
//     //             SelectedItem.Packs[i].SelectedQuantity = 0;
//     //             SelectedItem.Packs[StepIndex].Price = 0.0
//     //             SelectedItem.Packs[StepIndex].wsd = 0.0
//     //             SelectedItem.Packs[StepIndex].cashd = 0.0
//     //             SelectedItem.Packs[StepIndex].promod = 0.0
//     //             SelectedItem.Packs[StepIndex].otherd = 0.0
//     //             SelectedItem.Packs[StepIndex].deduction = 0.0
//     //             SelectedItem.Packs[StepIndex].salestax = 0.0
//     //             SelectedItem.Packs[StepIndex].wsd_percent = 0.0
//     //             SelectedItem.Packs[StepIndex].cashd_percent = 0.0
//     //             SelectedItem.Packs[StepIndex].promod_percent = 0.0
//     //             SelectedItem.Packs[StepIndex].otherd_percent = 0.0
//     //             SelectedItem.Packs[StepIndex].deductionperc = 0.0
//     //             SelectedItem.Packs[StepIndex].taxperc = 0.0
//     //             SelectedItem.Packs[StepIndex].Discountedprice = 0.0
//     //             SelectedItem.Packs[StepIndex].netprice = 0.0

//     //           }

//     //         }
//     //       }
//     //       // console.log('cart item ', SelectedItem)

//     //       state.items = editedState


//     //     }
//     //   }
//     //   return {
//     //     ...state

//     //   }



//     // case ADD_OTHER_DISCOUNT:
//     //   {

//     //     var editedState = [...state.items]
//     //     var OtherDis = action.discount
//     //     state.OtherDis = action.discount
//     //     var ItemId = action.ItemId

//     //     let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));

//     //     let SelectedItem = editedState[ItemIndex]

//     //     SelectedItem.TotalDiscount = 0.0
//     //     SelectedItem.NetPrice = 0.0
//     //     SelectedItem.TotalDeduction = 0.0
//     //     SelectedItem.TotalTax = 0.0

//     //     SelectedItem.Packs.forEach((element, StepIndex) => {

//     //       element.Price = parseFloat((element.SelectedQuantity) * (SelectedItem.itemprice) * (element.ConvRatio) / SelectedItem.ConvertToBaseRatio)

//     //       element.otherd = parseFloat((OtherDis) * (element.Price) / (SelectedItem.TotalPrice)).toFixed(2)


//     //       element.deduction = parseFloat(parseFloat(element.promod) + parseFloat(element.otherd) + parseFloat(element.wsd) + parseFloat(element.cashd)).toFixed(2)

//     //       console.log('PAck Total', element.deduction)

//     //       element.salestax = parseFloat((element.Price - element.deduction) * (SelectedItem.Packs[StepIndex].taxperc / 100)).toFixed(2)


//     //       element.Discountedprice = parseFloat(parseFloat(element.Price) - parseFloat(element.deduction)).toFixed(2)
//     //       element.netprice = parseFloat(element.Discountedprice) + parseFloat(element.salestax)


//     //       // SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)



//     //       SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount) + parseFloat(element.Discountedprice)
//     //       SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice) + parseFloat(element.netprice)

//     //       SelectedItem.TotalDeduction = parseFloat(SelectedItem.TotalDeduction) + parseFloat(element.deduction)
//     //       SelectedItem.TotalTax = parseFloat(SelectedItem.TotalTax) + parseFloat(element.salestax)

//     //     });

//     //     // SelectedItem.TotalDiscount = parseFloat(SelectedItem.TotalDiscount - OtherDis).toFixed(2)
//     //     // SelectedItem.NetPrice = parseFloat(SelectedItem.NetPrice - OtherDis).toFixed(2)

//     //     state.items = editedState

//     //   }
//     //   return {
//     //     ...state
//     //   }

//     // case REMOVE_FROM_CART:
//     //   {
//     //     var editedState = [...state.items]
//     //     var ItemId = action.ItemId
//     //     state.OtherDis = 0
//     //     let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));
//     //     let SelectedItem = editedState[ItemIndex]

//     //     //  console.log('Edit', SelectedItem)
//     //     // console.log('remove', ItemIndex + "\t" + ItemId)

//     //     if (ItemIndex !== -1) {
//     //       editedState.splice(ItemIndex, 1);
//     //       state.items = editedState
//     //     }

//     //     //   let newArray = editedState.slice()

//     //     //    newArray.splice(ItemIndex, 1)

//     //     //state.items = newArray
//     //   }
//     //   return {
//     //     ...state,
//     //     // items: state.items.filter(item => item !== action.payload),

//     //   };



//     case OTHER_PARTY_SELECTION:  // the backupitem array is the main items to rest the selection  after choosing new party
//       return initialState


//     case ADD_INVOICE: // to rest all the selection after printing the invoice
//       return initialState


//     case SIGNOUT_REQUEST:
//       return initialState


//     default:
//       return state;
//   }
// };

// export default CartReducer;
