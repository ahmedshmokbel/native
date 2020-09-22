import {
    ADD_INVOICE,
    VIEW_ALL_INVOICES,
    SIGNOUT_REQUEST,
    ADD_INVOICE_ITEMS,
    REMOVE_FROM_ITEMS_INVOICE,
    CREATION_DATA,
    OTHER_PARTY_SELECTION,
    GET_INVOICE_NUMBER,
    OTHER_ORDER_SELECTION,
    SET_ORDERS_API,
    ADD_TO_ORDER,
    LOADING_PENDDING_INOICES,
    FINISHED_PENDDING_INOICES
} from '../types';

const initialState = {
    InvoiceItems: [],
    Invoices: [],
    Orders: [],
    maxID: 0,
    CreationDate: '',
    CreationLocation: '',
    InvoiceNumber: 0,
    PriceWords: '',
    spinnerVisible: false,
    OrderSelectedItems: [],
    OrdermainItems: [],
    BackUpOrderitems: [],
    // OrderallItems: [],
    // Orderfiltered: [],
    // OrdersearchItem: [],
    SectorID: 0,
};
const InvoicesReducer = (state = initialState, action) => {

    switch (action.type) {




        case SET_ORDERS_API:
            return {
                ...state,
                Orders: action.Orders
            }


        case CREATION_DATA:
            return {
                ...state,
                CreationDate: action.Date,
                CreationLocation: action.Location,

            }

        case GET_INVOICE_NUMBER:


            return {
                ...state,
                InvoiceNumber: action.InvoiceNo,
                PriceWords: action.PriceWords

            }

        case ADD_INVOICE_ITEMS:
            {
                state.InvoiceItems = action.invoiceItems //state.InvoiceItems.concat(JSON.parse(JSON.stringify(action.invoiceItems)))
            }
            return {
                ...state
            }




        case REMOVE_FROM_ITEMS_INVOICE:
            {
                var editedState = [...state.InvoiceItems]
                var ItemId = action.ItemId

                let ItemIndex = editedState.findIndex((obj => obj.Id == ItemId));
                let SelectedItem = editedState[ItemIndex]

                //  console.log('Edit', SelectedItem)
                // console.log('remove', ItemIndex + "\t" + ItemId)

                if (ItemIndex !== -1) {
                    editedState.splice(ItemIndex, 1);
                    state.InvoiceItems = editedState
                }


            }
            return {
                ...state,

            };


        case ADD_INVOICE:

            return {
                ...state,
                Invoices: state.Invoices.concat(JSON.parse(JSON.stringify(action.payload))),
                InvoiceNumber: 0,
                PriceWords: ''
            };




        case VIEW_ALL_INVOICES:
            // { console.log('ReducerID', state.maxID) }
            return {
                ...state,
                //Lang: action.payload
            };



        // case SIGNOUT_REQUEST:
        //     return initialState


        case OTHER_PARTY_SELECTION:  // the backupitem array is the main items to rest the selection  after choosing new party
            { state.InvoiceNumber = 0 }
            return {
                ...state,
                InvoiceItems: [],

                CreationDate: '',
                CreationLocation: '',
                InvoiceNumber: 0
            }//initialState 






        case ADD_TO_ORDER:
            return {
                ...state,
                hasErrors: false,
 
                OrderSelectedItems: state.OrderSelectedItems.concat(JSON.parse(JSON.stringify(action.ItemsList))),
                // OrderallItems: action.ItemsList,
                BackUpOrderitems: state.OrderSelectedItems.concat(JSON.parse(JSON.stringify(action.ItemsList))),

            }


        case OTHER_ORDER_SELECTION:
            return {
                ...state,
                InvoiceNumber: action.SSONum,
                SectorID: action.SectorID,
                OrderSelectedItems: JSON.parse(JSON.stringify(state.BackUpOrderitems)),
            }






        case LOADING_PENDDING_INOICES:
            {
                console.log("start")

            }
            return {
                ...state,
                spinnerVisible: true
            }


        case FINISHED_PENDDING_INOICES:
            {
                console.log("Finished")
            }
            return {
                ...state,
                spinnerVisible: false
            }



        // case ORDER_GET_ALL_ITEMS:
        //     return {
        //         ...state,
        //         items: action.ItemsList,
        //     }


        case SIGNOUT_REQUEST:
            return initialState
        default:
            return state;
    }
};



export default InvoicesReducer;
