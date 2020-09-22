import { SIGNOUT_REQUEST, CHANGE_LANGUAGE } from "../Redux1/types";
import { Alert, I18nManager } from "react-native";
// import { Updates } from "expo";
import NetInfo from "@react-native-community/netinfo";

export const RolePermission = (Permission, PermissionArray) => {

    CheckHas = PermissionArray.includes(Permission)
    //console.log('prem',CheckHas)

    return CheckHas
    // return lang "ar" ? { flexDirection: "row-reverse" }:{ flexDirection: "row-reverse" };
};




export const ChangeLanguage = (lang, rtl) => dispatch => {


    dispatch({ type: CHANGE_LANGUAGE, payload: lang, View: rtl });

    I18nManager.forceRTL(rtl);
    Translate.setLanguage(lang)
    I18nManager.allowRTL(rtl);
    //   Updates.reload()

}


export const ArabicLang = () => dispatch => {
    dispatch({ type: CHANGE_LANGUAGE, payload: 'ar', View: true });
    I18nManager.forceRTL(true);
    Translate.setLanguage('ar')
    I18nManager.allowRTL(true);
    //  Updates.reload()


}

export const EnglishLang = () => dispatch => {
    dispatch({ type: CHANGE_LANGUAGE, payload: 'en', View: false });
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);

    Translate.setLanguage('en')
    //  Updates.reload()
    //  this.props.navigation.navigate("Auth")

}



export default class constantData {


    static myInstance = null;

    data = {};


    static getInstance() {
        if (constantData.myInstance == null) {
            constantData.myInstance = new constantData();
        }

        return this.myInstance;
    }

    getHeaderReqData() {
        return this.data;
    }

    setHeaderReqData(us) {

        this.data = us
    }




}






export async function fetchWithTimeout(url, options, delay, onTimeout) {
    const timer = new Promise((resolve) => {
        console.log('Party', resolve)
        setTimeout(resolve, delay, {
            timeout: true,
        });
    });
    return Promise.race([
        fetch(url, options),
        timer
    ]).then((response) => {
        if (response.timeout) {
            onTimeout();
        }
        return response;
    })
}


export const fetch = (url, options, timeout = 7000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}










export const CheckConnectivity = () => {
    // For Android devices
    return new Promise(function (resolve, reject) {

        NetInfo.fetch().then(state => {

            // if (state.isConnected == true) {
          //   console.log("Connected???", state);
            // }
            // else {
            //     console.log("OFF???", state.isConnected);
            // }
            resolve(state)

        }).catch(e => {
            alert('Please enable Internet')
        })
    });

}

