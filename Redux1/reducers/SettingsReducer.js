import {
    CHANGE_LANGUAGE, PRINTER_SETTING
} from '../types';

const initialState = {

    Lang: 'en',
    RTL: false,
    PrinterSize:'3INCH'
};
const SettingsReducer = (state = initialState, action) => {

    switch (action.type) {


        case CHANGE_LANGUAGE:
            //  console.log(action.payload)
            {
                state.Lang = action.payload
                state.RTL = action.View
            }
            return {
                ...state,
                //Lang: action.payload
            };

        case PRINTER_SETTING:

            return {
                ...state,
                PrinterSize: action.PrintType
            }


        // case SIGNOUT_REQUEST:
        //     return initialState





        default:
            return state;
    }
};



export default SettingsReducer;
