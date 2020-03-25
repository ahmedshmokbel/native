import moment from "moment";

export const DateTimeCustom = () => {
    try {

        var de = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
       // console.log('SecData', de)
    } catch (e) {
        return e;
    }

    return de;
}


export const DateDay = () => {
    try {

         var de =  moment(new Date()).format('YYMMDDHHmm')
    } catch (e) {
        return e;
    }

    return de;
}



 