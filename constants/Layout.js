import store from "../Redux1/store";
import Translate from "../translation/Translate";
import { I18nManager, Platform } from "react-native";



export const rtlText = () => {
  const state = store.getState();

  let currentLang = state.settings.Lang
  return (
    currentLang === "ar" && {
      textAlign: "right",
      writingDirection: "rtl"
    }
  );
};



export const rtlView = () => {
  const state = store.getState();

  let currentLang = state.settings.Lang
  // console.log('lan',currentLang.toString())
 // console.log('RTLView', I18nManager.isRTL)

  if (I18nManager.isRTL) {

    return {
      back: Platform.OS === "ios" ? "ios-arrow-forward" : "ios-arrow-round-forward", direction: 'rtl', drawerPostion: 'right', textAlign: 'right',
      writingDirection: 'rtl'
    }
  } else {
    return {
      back:Platform.OS === "ios" ? "ios-arrow-back" : "ios-arrow-round-back",
      direction: 'ltr',
      drawerPostion: 'left', textAlign: 'left',
      writingDirection: 'ltr'
    }
  }
  // return lang "ar" ? { flexDirection: "row-reverse" }:{ flexDirection: "row-reverse" };
};




export const rtlView2 = () => {
  const state = store.getState();

  let currentLang = state.settings.Lang

  if (currentLang == 'ar') {

    return { drawerPostion: 'right' }
  } else {
    return { drawerPostion: 'left' }
  }
  // return lang "ar" ? { flexDirection: "row-reverse" }:{ flexDirection: "row-reverse" };
};
