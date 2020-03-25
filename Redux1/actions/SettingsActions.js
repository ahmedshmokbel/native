import { CHANGE_LANGUAGE, PRINTER_SETTING } from "../types";
import { I18nManager } from "react-native";
import Translate from "../../translation/Translate";

export const ChangeLanguage = (lang, rtl) => dispatch => {


  dispatch({ type: CHANGE_LANGUAGE, payload: lang, View: rtl });


}

export const PrinterSettings = (Type) => dispatch => {


  dispatch({ type: PRINTER_SETTING, PrintType: Type, });

}