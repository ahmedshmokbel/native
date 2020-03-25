// import {
//   GET_ALL_ITEMS, GET_ALL_ITEMS_ERROR, GET_ALL_ITEMS_SUCCESS, ADD_TO_CART, FAVORITE_ITEM, SIGNOUT_REQUEST
//   , INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_FROM_CART, REMOVE_ITEM, GET_MAIN_GROUPS_PENDING, GET_MAIN_GROUPS_SUCCESS, FILTER_BY_GROUP, GET_MAIN_GROUPS_ERROR, VIEW_ALL_ITEMS, FILTER_GROUP, VIEW_ALL_GROUPS
// } from "../types";
// import { GetMainGroups } from "../API";



// export const GetGro = (token, userId, tenantId, reqDate) => async dispatch => {
//   dispatch({ type: GET_MAIN_GROUPS_PENDING });

//   var rett = GetGroups(token, userId, tenantId, reqDate)

//   console.log('rrrr', rett.status)

//   // if (response.ok) { 

//   // dispatch({ type: GET_MAIN_GROUPS_SUCCESS, payload: response });
//   // }

//   //else {
//   //   dispatch({ type: GET_MAIN_GROUPS_ERROR });
//   //   }

// }









// export const GetGroups = (token, userId, tenantId, reqDate) => async dispatch => {
//   dispatch({ type: GET_MAIN_GROUPS_PENDING });
//   const response = await GetMainGroups(token, userId, tenantId, reqDate);

//   MainGroup = []
//   SubGroup = []
//   response.forEach(element => {

//     if (element.LevelNo == 1) {

//       MainGroup.push(element)

//     } else {
//       SubGroup.push(element)
//     }


//   });



//   console.log("ele", MainGroup)
//   dispatch({ type: GET_MAIN_GROUPS_SUCCESS, MainGroup: MainGroup, SubGroup: SubGroup });

//   // if (response.ok) {

//   // }

//   //else {
//   //   dispatch({ type: GET_MAIN_GROUPS_ERROR });
//   //   }

// }



// //  7anfilter bel code hab3t hena el code w fl item reducer ha listen 3ala el type bet3 filterbygroup
// export const FilterByGroup = (item) => dispatch => {

//   ///  console.log('rrrr', Code)
//   dispatch({ type: FILTER_BY_GROUP, payload: item });

// }



// export const ViewAll = (item) => dispatch => {

//   //  console.log('View')
//   dispatch({ type: VIEW_ALL_ITEMS, payload: item });

// }




// export const FilterGroups = (item) => dispatch => {

//   ///  console.log('rrrr', Code)
//   dispatch({ type: FILTER_GROUP, Code: item });

// }



// export const ViewMainGroup = () => dispatch => {

//   //  console.log('View')
//   dispatch({ type: VIEW_ALL_GROUPS });

// }