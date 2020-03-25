import { GenericExecService, GenericExecServicePost, UploadUrl } from "./Url";
import { DateTimeCustom } from "../constants/DateTime";
import * as axios from "axios";
import { SIGNOUT_REQUEST } from "./types";
import { getLocalizedJsonName } from "../constants/ConvertJsonName";



export const UpdateParty = async (token, userHeaderInfo, phone, fax, email, code) => {


    const uuidv4 = require('uuid/v4')
    const uniqueInsuranceId = uuidv4()

    var headData = {
        "userId": userHeaderInfo.userId,
        "tenantId": userHeaderInfo.tenantId,
        "roleId": userHeaderInfo.roleId,
        "orgUnitId": userHeaderInfo.orgUnitId,
        "businessRefId": userHeaderInfo.businessRefId,
        "pageId": 0,
        "actionId": 0,
        "statusId": 0,
        "recordId": 0,
        "sec_StoreCode": userHeaderInfo.sec_StoreCode,
        "sec_SalesPersonCode": userHeaderInfo.sec_SalesPersonCode,
        "language": "string",
        "reqDateTime": DateTimeCustom(),
        "lastServerSync": "",
        "reqGuid": uniqueInsuranceId
    }

    let data = {
        "procedureName": 'Msp_UpdatePartiesInfo',
        "jReq": JSON.stringify(headData),
        "jReqData": JSON.stringify({

            "phone": phone,

            "fax": fax,

            "email": email,

            "code": code

        })
    }
    //console.log("PartyCode", JSON.stringify(data))

    var ret = await fetch(GenericExecService,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },

            body: JSON.stringify(data),

        })
    var obj = await ret.json();

    console.log('Update Party', obj)

    return obj
}


export const UpdatePartyImage = async (token, userID, tenantID, PartyCode, location, image) => {

    var data = new FormData();

    const uuidv4 = require('uuid/v4')
    const uniqueInsuranceId = uuidv4()

    data.append("files", {
        uri: image, // your file path string
        name: "my_photo.jpg",
        type: "image/jpg",
    });





    data.append("recordid", PartyCode)
    data.append("pagecode", "Parties")
    data.append("mastertablename", "[MILKANA].[HCUXXXXXX]")
    data.append("gpsinfo", location.latitude + ',' + location.longitude)
    data.append("gpsdatetime", DateTimeCustom())
    data.append("modulename", "MobileSalesApp")
    data.append("reqguid", uniqueInsuranceId)

    //  console.log(data)

    var t = await fetch(UploadUrl + 'Attachments/UploadMobileAttachments', {
        method: 'POST',
        headers: {
            'Accept': "*/*",
            'Content-Type': "multipart/form-data",
            'Authorization': "Bearer " + token,
            'x-frame-options': "SAMEORIGIN",
            'x-xss-protection': "1; mode=block",
            'x-content-type-options': "nosniff",

        },
        body: data
    })
    //.then(response => {
    //     console.log("image Response", response)
    // }).catch(err => {
    //     console.log('update image', err)
    // })

    console.log("Request uploaded", t)

    var obj = await t.json();

    console.log('Return', obj)


}





export const GetInvoiceNumber = async (PartyCode, InvoiceNumber, token, userHeaderInfo, NetPrice) => {

    const uuidv4 = require('uuid/v4')
    const uniqueInsuranceId = uuidv4()

    var headData = {
        "userId": userHeaderInfo.userId,
        "tenantId": userHeaderInfo.tenantId,
        "roleId": userHeaderInfo.roleId,
        "orgUnitId": userHeaderInfo.orgUnitId,
        "businessRefId": userHeaderInfo.businessRefId,
        "pageId": 0,
        "actionId": 0,
        "statusId": 0,
        "recordId": 0,
        "sec_StoreCode": userHeaderInfo.sec_StoreCode,
        "sec_SalesPersonCode": userHeaderInfo.sec_SalesPersonCode,
        "language": "string",
        "reqDateTime": DateTimeCustom(),
        "lastServerSync": "",
        "reqGuid": uniqueInsuranceId
    }

    let data = {
        "procedureName": 'Msp_InsertNewSalesOrder',
        "jReq": JSON.stringify(headData),
        "jReqData": JSON.stringify({ "PartyCode": PartyCode, "SSONum": InvoiceNumber, "TheNo": parseFloat(NetPrice) })
    }
    // console.log(PartyCode, JSON.stringify(data))

    var ret = await fetch(GenericExecService,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },

            body: JSON.stringify(data),

        })
    var obj = await ret.json();

    console.log('Get Invoice Number', obj)

    if (obj.unAuthorizedRequest == false && obj.success == true) {

        obj2 = JSON.parse(obj.result)

        if (obj2.includes('Status')) {
            alert(getLocalizedJsonName(obj2.Status[0].StatusMessage))

        } else {
            objs = obj2[0]
            return objs
        }

    } else {
        alert(obj.error.message)


    }

}



export const SendInvoice = async (Invoices, token, userHeaderInfo) => {

    const uuidv4 = require('uuid/v4')
    const uniqueInsuranceId = uuidv4()

    var headData = {
        'userId': userHeaderInfo.userId,
        'tenantId': userHeaderInfo.tenantId,
        'roleId': userHeaderInfo.roleId,
        'orgUnitId': userHeaderInfo.orgUnitId,
        'businessRefId': userHeaderInfo.businessRefId,
        'pageId': 0,
        'actionId': 0,
        'statusId': 0,
        'recordId': 0,
        'sec_StoreCode': userHeaderInfo.sec_StoreCode,
        'sec_SalesPersonCode': userHeaderInfo.sec_SalesPersonCode,
        'language': "string",
        'reqDateTime': DateTimeCustom(),
        'lastServerSync': "",
        'reqGuid': uniqueInsuranceId
    }
    //  console.log('PartyCode',Invoices)

    let data = {
        "procedureName": 'Msp_InsertNewSalesOrder',
        "jReq": JSON.stringify(headData),//.replace((")(.*)("),'$2'),
        "jReqData": JSON.stringify(Invoices),//.replace((")(.*)("),'$2')
    }

    //  console.log('PartyCode', JSON.stringify(data))
    var ret = await fetch(GenericExecService,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },

            body: JSON.stringify(data),

        })
    var obj = await ret.json();

    console.log('InvoicesDatabase', obj)

    return obj
}


