import { CHANGE_LANGUAGE, PRINTER_SETTING,PRINTER_TYPE } from "../types";
import { I18nManager } from "react-native";
import Translate from "../../translation/Translate";

export const ChangeLanguage = (lang, rtl) => dispatch => {


  dispatch({ type: CHANGE_LANGUAGE, payload: lang, View: rtl });


}

export const PrinterType = (Type) => dispatch => {


  dispatch({ type: PRINTER_TYPE, PrintType: Type, });

}



export const PrinterSettings = (Address) => dispatch => {


  dispatch({ type: PRINTER_SETTING, Address: Address, });

}