import {
    SIGNOUT_REQUEST, LOGIN, CHANGE_IMG, ADD_LOOK_UPS, GET_PARTIES_PENDING, GET_PARTIES_SUCCESS, GET_PARTIES_ERROR, SEARCH_PARTY, UPDATE_PARTY_IMAGE
} from "../types";
import { GetParties } from "../API";
import { UpdateParty, UpdatePartyImage } from "../PostAPI";
import { Alert } from "react-native";
import { getLocalizedJsonName } from "../../constants/ConvertJsonName";
import { Toast } from "native-base";


export const GetPartiesAction = (token, userHeaderInfo, navigate) => async dispatch => {
    dispatch({ type: GET_PARTIES_PENDING });

    await GetParties(token, userHeaderInfo)
        .then((responseJson) => {
            //     console.log(responseJson)
            if (responseJson.unAuthorizedRequest == false) {
                if (responseJson.success == true) {
                    respArr = JSON.parse(responseJson.result)

                    dispatch({ type: GET_PARTIES_SUCCESS, Payload: respArr });

                } else {
                    Alert.alert(responseJson.error.message)

                }

                //   console.log(navigate)

            } else {
                Alert.alert("Login Failed", responseJson.error.message)

               // dispatch({ type: SIGNOUT_REQUEST });
             //   navigate.navigate('login')
            }
        })
        .catch((error) => {
            console.error(error);
        });


}




export const SearchPartyAction = (filteredList) => async dispatch => {
    //   dispatch({ type: GET_PARTIES_PENDING });
    //console.log("IIII", BpSector.Id)
    dispatch({ type: SEARCH_PARTY, FilteredList: filteredList });
}

export const UpdatePartyAction = (token, userHeaderInfo, phone, fax, email, code) => async dispatch => {
    //   dispatch({ type: GET_PARTIES_PENDING });
    //console.log("IIII", BpSector.Id)

    const responseJson = await UpdateParty(token, userHeaderInfo, phone, fax, email, code);

    if (responseJson.unAuthorizedRequest == false) {
        if (responseJson.success == true) {
            respArr = JSON.parse(response.result)

            alert(getLocalizedJsonName(respArr.Status[0].StatusMessage), 'ok')

            //      console.log("ResJSON", respJson)

            //    dispatch({ type: GET_PARTIES_SUCCESS, Payload: respJson });
        } else {
            Alert.alert(responseJson.error.message)

        }

    } else {
        Alert.alert("Login Failed", responseJson.error.message)

       // dispatch({ type: SIGNOUT_REQUEST });
      //  navigate.navigate('login')
    }



}


export const UpdatePartyImageAction = (updated, userID, tenantID, token, dataFromChild, location, data) => async dispatch => {
    // console.log("Sala", updated)

    //
    const response = await UpdatePartyImage(token, userID, tenantID, dataFromChild, location, data);

    //  respArr = JSON.parse(response)
    //      console.log("ResJSON", respJson)

    //  console.log("ResJSON", respJson)

    dispatch({ type: UPDATE_PARTY_IMAGE, Payload: updated });


}

