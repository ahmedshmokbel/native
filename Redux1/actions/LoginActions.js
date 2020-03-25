import {
    SIGNOUT_REQUEST, LOGIN, CHANGE_IMG, ADD_LOOK_UPS, ADD_PROFILE_PIC
} from "../types";
import { GetAllItems, GetLookUps, GetProfilePic } from "../API";


export const LoginPress = (token, tenant, userHeaderInfo, isLoggedIn, name, tenantProfile,userPermissions) => dispatch => {
    dispatch({
        type: LOGIN,
        token: token,

        isLoggedIn: isLoggedIn,
        tenant: tenant,
        userHeaderInfo: userHeaderInfo,
        Name: name,
        tenantProfile: tenantProfile,
        userType:'sales',
        userPermissions:userPermissions
    });

}

export const LookUpsAction = (token, userHeaderInfo) => async dispatch => {


    const response = await GetLookUps(token, userHeaderInfo);

    //  console.log("look up",response)
    let BpSectors = response.BpSectors
    let BpTypes = response.BpTypes
    let PaymentMethods = response.PaymentMethods
    let ReplyHeader = response.ReplyHeader

    dispatch({ type: ADD_LOOK_UPS, ReplyHeader: ReplyHeader, BpSectors: BpSectors, BpTypes: BpTypes, PaymentMethods: PaymentMethods, });


}




export const GetProfilePicAction = (token) => async dispatch => {


    const response = await GetProfilePic(token);

  //  console.log("Pic up", response.result.profilePicture)


    dispatch({ type: ADD_PROFILE_PIC, ProfilePic: response.result.profilePicture });


}




export const ChangeIMG = (img) => dispatch => {
    dispatch({
        type: CHANGE_IMG,

        img: img,

    }

    );

}


export const SignOut = () => dispatch => {

    dispatch({ type: SIGNOUT_REQUEST });


}