import { connect } from 'react-redux'
import store from '../Redux1/store';









export const deserialization = (str) => {
    try {

        var de = JSON.parse(str);
    } catch (e) {
        return e;
    }

    return de;
}









IsJsonObj = (str) => {
    try {

        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}


export const getLocalizedJsonName = (langObject) => {
    // {console.log("JSON: ",langObject)}

    const state = store.getState();

    let currentLang = state.settings.Lang//abp.localization.currentLanguage.name;
    // console.log("lang",langObject)
    try {
        if (langObject == undefined || langObject.toString() == '') {
            return "";
        }
        if (langObject && this.IsJsonObj(langObject)) {
            let parsedLangObject = JSON.parse(langObject); // for tagged organization units


            for (let item of parsedLangObject) {
                if (item[currentLang]) {

                  
                    return item[currentLang];
                }
            }
            if (currentLang == "en") {
                for (let item of parsedLangObject) {
                    if (item['ar']) {
                        
                        return item['ar'];
                    }
                }
            }
            else {
                for (let item of parsedLangObject) {
                    if (item['en']) {
                        return item['en'];
                    }
                }
            }
        }
    } catch (e) {
        console.log('catch', e)

        return "--------";
    }
    return "--------";

}






export const getLocalizedJsonInvoice = (langObject) => {


    let currentLang = 'ar'//abp.localization.currentLanguage.name;
    // console.log("lang",langObject)
    try {
        if (langObject == undefined || langObject.toString() == '') {
            return "";
        }
        if (langObject && this.IsJsonObj(langObject)) {
            let parsedLangObject = JSON.parse(langObject); // for tagged organization units


            for (let item of parsedLangObject) {
                if (item[currentLang]) {

                    return item[currentLang];
                }
            }
            if (currentLang == "en") {
                for (let item of parsedLangObject) {
                    if (item['ar']) {
                        return item['ar'];
                    }
                }
            }
            else {
                for (let item of parsedLangObject) {
                    if (item['en']) {
                        return item['en'];
                    }
                }
            }
        }
    } catch (e) {
        console.log('catch', e)

        return "--------";
    }
    return "--------";

}

