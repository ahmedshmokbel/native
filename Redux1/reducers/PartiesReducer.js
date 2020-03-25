import {
    GET_ALL_ITEMS, GET_ALL_ITEMS_SUCCESS, GET_ALL_ITEMS_ERROR, ADD_TO_CART,
    FAVORITE_ITEM, SIGNOUT_REQUEST, GET_MAIN_GROUPS_SUCCESS, GET_PARTIES_ERROR, GET_PARTIES_PENDING, GET_PARTIES_SUCCESS, UPDATE_PARTY_INFO, UPDATE_PARTY_IMAGE
} from '../types';

const initialState = {
    Parties: [],
    spinnerVisible: true,
    hasErrors: false,
    errorMessage: ""
};
const PartiesRedusers = (state = initialState, action) => {
    ////console.log(action)
    switch (action.type) {

        case GET_PARTIES_PENDING:
            return {
                ...state,
                hasErrors: false,
                spinnerVisible: true
            };

        case GET_PARTIES_SUCCESS:
           // console.log("payload",action.Payload)
            return {
                ...state,
                hasErrors: false,
                spinnerVisible: false,
                Parties:action.Payload
            };
        case GET_PARTIES_ERROR:
            return {
                ...state,
                hasErrors: true,
                spinnerVisible: false,

            };


            
            
            case UPDATE_PARTY_IMAGE:
                // console.log("payload",action.Payload)
                {
                    state.Parties = action.Payload
                }
                 return {
                     ...state,
                     hasErrors: false,
                     spinnerVisible: false,
                     Parties:action.Payload
                 };




            case UPDATE_PARTY_INFO:
                // console.log("payload",action.Payload)
                 return {
                     ...state,
                     hasErrors: false,
                     spinnerVisible: false,
                     Parties:action.Payload
                 };

        case SIGNOUT_REQUEST:
            return initialState





        default:
            return state;
    }
};

 

export default (PartiesRedusers);
