import {
    ORDER_GET_ALL_ITEMS,
    FAVORITE_ITEM, SIGNOUT_REQUEST,
    ORDER_INCREMENT_ITEM,
    ORDER_DECREMENT_ITEM,
    ORDER_REMOVE_FROM_CART,
    FILTER_BY_GROUP,
    VIEW_ALL_ITEMS,
    ORDER_ADD_TO_CART_PENDDING,
    ADD_TO_ORDER
} from '../types';

 

export const AddToOrdersAction = (items, SSONum) => dispatch => {

    

    dispatch({ type: ADD_TO_ORDER, ItemsList: items, SSONum: SSONum });


}



// export const LoadOrderItemsAction = (items) => dispatch => {


//     dispatch({ type: ORDER_GET_ALL_ITEMS, payload: items });

// }





export const AddToCartPendding = (item, index, location) => dispatch => {

    dispatch({ type: ORDER_ADD_TO_CART_PENDDING, payload: item, index: index, Location: location });

}


export const Favorite = (item, index) => dispatch => {

    dispatch({ type: FAVORITE_ITEM, payload: item, index: index });

}


export const IncrementItem = (ItemID, stepperIndex, item, SelectedQuantity) => dispatch => {


    if (SelectedQuantity == 0 && item[0].SoldQuantity == 0 && item[0].Stock != 0) {

        dispatch({ type: ADD_TO_CART, payload: item, });
    }




    dispatch({ type: ORDER_INCREMENT_ITEM, ItemId: ItemID, StepperIndex: stepperIndex });
}




export const DecrementItem = (ItemID, stepperIndex) => dispatch => {

    dispatch({ type: ORDER_DECREMENT_ITEM, ItemId: ItemID, StepperIndex: stepperIndex });
}



export const RemoveFromCart = (item, ItemId, ) => dispatch => {

    dispatch({ type: ORDER_REMOVE_FROM_CART, payload: item, ItemId: ItemId });


}




// export const DeleteItem = (item, ItemId, ) => dispatch => {

//     dispatch({ type: REMOVE_ITEM, payload: item, ItemId: ItemId });


// }








export const SignOut = () => dispatch => {

    dispatch({ type: SIGNOUT_REQUEST });


}












export const NewPartySelectionAction = () => dispatch => {

    dispatch({ type: OTHER_PARTY_SELECTION });

}








export const SearchItemCode = (items) => dispatch => {

    dispatch({ type: SEARCH_ITEM_CODE, search: items });

}
 











export const AddOtherDiscount = (ItemID, discount) => dispatch => {



    dispatch({ type: ADD_OTHER_DISCOUNT, ItemId: ItemID, discount: discount });
}





// export const RemoveFromCart = (item, ItemId, ) => dispatch => {

//     dispatch({ type: REMOVE_FROM_CART, payload: item, ItemId: ItemId });


// }




// export const DeleteItem = (item, index, ) => dispatch => {

//     dispatch({ type: REMOVE_ITEM, payload: item, index: index });


// }





// //  7anfilter bel code hab3t hena el code w fl item reducer ha listen 3ala el type bet3 filterbygroup
// export const FilterByGroup = (item) => dispatch => {

//     ///  console.log('rrrr', Code)
//     dispatch({ type: FILTER_BY_GROUP, payload: item });

// }



// export const ViewAll = (item) => dispatch => {

//     //  console.log('View')
//     dispatch({ type: VIEW_ALL_ITEMS, payload: item });

// }




// export const FilterGroups = (item) => dispatch => {

//     ///  console.log('rrrr', Code)
//     dispatch({ type: FILTER_GROUP, Code: item });

// }



// export const ViewMainGroup = () => dispatch => {

//     //  console.log('View')
//     dispatch({ type: VIEW_ALL_GROUPS });

// }




 
















