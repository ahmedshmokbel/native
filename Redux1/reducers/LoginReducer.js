import { ADD_TO_CART, SIGNOUT_REQUEST, LOGIN, CHANGE_IMG, ADD_LOOK_UPS, ADD_PROFILE_PIC } from '../types';

const initialState = {
    token: '',
    username: '',
  
    userHeaderInfo: {},
    tenantProfile:{},
    ReplyHeader: [],
    BpSectors: [],
    BpTypes: [],
    PaymentMethods: [],
    tenant: {},
    isLoggedIn: false,
    userType:'',
    Image: '../../assets/dreem.jpg',
    userPermissions:[]
};
const LoginReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOGIN:
            //  console.log(action.tenant)
            return {
                ...state,
                username:action.Name,
                isLoggedIn: action.isLoggedIn,
               
                token: action.token,
                tenant: action.tenant,
                userHeaderInfo: action.userHeaderInfo,
                tenantProfile:action.tenantProfile,
                userType:action.userType,
                userPermissions:action.userPermissions,

            };

            case ADD_PROFILE_PIC:
                return{
                    ...state,
                    Image:action.ProfilePic
                }
        case CHANGE_IMG:
            return {
                ...state,
                Image: action.img
            }




        case ADD_LOOK_UPS:


            return {
                ...state,
                ReplyHeader: action.ReplyHeader,
                BpSectors: action.BpSectors,
                BpTypes: action.BpTypes,
                PaymentMethods: action.PaymentMethods
            }



        case SIGNOUT_REQUEST:
            return initialState


        default:
            return state;
    }
};

export default LoginReducer;
