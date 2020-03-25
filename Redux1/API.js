import * as axios from "axios";
import { GenericExecService, LoginURL } from "./Url";
import constantData from "../constants/constantsData";
import { DateDay, DateTimeCustom } from "../constants/DateTime";


export const GetLookUps = async (token, userHeaderInfo) => {
  // console.log('Sec', sec_SalesPersonCode + "Store" + sec_StoreCode)

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
    "procedureName": 'MSP_GetLookup',
    "jReq": JSON.stringify(headData)

  }


  // console.log('SecData', instance)

  var ret = await fetch(GenericExecService,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(data)
    })
  var obj = await ret.json();

  // console.log('Lookups', obj)



  obj2 = JSON.parse(obj.result[0])
  // console.log('Groups', obj2)
  // bpsectors = obj.result[0][0]["BpSectors"];
  // console.log('bpsectors',bpsectors);

  return obj2[0]
}




export const GetProfilePic = async (token) => {


  var ret = await fetch(LoginURL + 'services/app/Profile/GetProfilePicture',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },

    })
  var obj = await ret.json();

  console.log('Pic', obj)




  return obj
}




export const GetParties = async (token, userHeaderInfo) => {

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
    "procedureName": 'MSP_GetParties_FROMSECONDARY',
    "jReq": JSON.stringify(headData),
  }
  // console.log('Pic', data)

  try {

    var ret = await fetch(GenericExecService,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },

        body: JSON.stringify(data)
      })

     // console.log('Party', ret)
    var obj = await ret.json();
    //  console.log('Party', obj)

    return obj
  } catch (error) {
    console.log('Catch', error)

  }
}





export const GetItemsGroups = async (token, userHeaderInfo) => {

  //console.log('buss', businessRefId + "unit" + orgUnitId)
  const uuidv4 = require('uuid/v4')
  const uniqueInsuranceId = uuidv4()

  headData = {
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
    "procedureName": 'Msp_GetItemsStock',

    "jReq": JSON.stringify(headData)

  }
  //console.log('Respons', data)

  var ret = await fetch(GenericExecService,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(data)
    })



  var obj = await ret.json();


  //  console.log('Respons', obj)


  //  obj2 = JSON.parse(obj.result)
  // console.log('qqq', obj2[0])
  //console.log('ItemsGroups', obj2[0][0].Packs)
  //console.log('ItemsGroups', obj2[0].Items[0])
  return obj
}





export const GetOperationsApi = async (token, userHeaderInfo) => {

  console.log('buss')
  const uuidv4 = require('uuid/v4')
  const uniqueInsuranceId = uuidv4()

  headData = {
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
    "procedureName": 'Msp_GetOpenSalesOrders',

    "jReq": JSON.stringify(headData)

  }
  var ret = await fetch(GenericExecService,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(data)
    })



  var obj = await ret.json();


  //  console.log('Orderss', obj)


  //obj2 = JSON.parse(obj.result)
  //  console.log('Orders',obj2)
  //console.log('ItemsGroups', obj2[0][0].Packs)
  //console.log('ItemsGroups', obj2[0].Items[0])
  return obj
}





// export const GetGroups = async (token, userId, tenantId, reqDateTime) => {

//   let data = {
//     "userId": userId,
//     "tenantId": tenantId,
//     "roleId": 0,
//     "orgUnitId": 0,
//     "businessRefId": 2,
//     "pageId": 0,
//     "actionId": 0,
//     "statusId": 0,
//     "recordId": 0,
//     "language": "",
//     "reqDateTime": "2019-10-07T13:15:07.594Z"
//   }

//   return fetch(GenericExecService + 'MSP_GetItemsGroup',
//     {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': "Bearer " + token,
//       },
//       body: JSON.stringify(data)
//     }).then(resp => {
//       //  console.log("responseJson", resp);
//       return resp.data.result;
//     })
//     .then(responseJson => {
//       // console.log(resp.request.responseHeaders["Set-Cookie"]);
//       // console.log("responseJson", responseJson);
//       return responseJson
//     })



// }









export const LogOut = async (token) => {
  var log = await fetch(`http://sagosalesforce:5000/api/TokenAuth/LogOut`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  return log
};