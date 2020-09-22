import { persistStore, persistReducer } from "redux-persist";

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers } from 'redux'
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

import { createOffline } from "@redux-offline/redux-offline";
import { AsyncStorage } from 'react-native';
import LoginReducer from "./reducers/LoginReducer";
import PartiesRedusers from "./reducers/PartiesReducer";
import SettingsReducer from "./reducers/SettingsReducer";
import ItemGroupsReducer from "./reducers/ItemsGroupsReducer";
import InvoicesReducer from "./reducers/InvoicesReducer";

export const persistConfig = {
  key: "persist",
  storage: AsyncStorage
};

export const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
});

const rootReducer = combineReducers({
  login: LoginReducer,

  itemGroups: ItemGroupsReducer,

  parties: PartiesRedusers,
  settings: SettingsReducer,
 invoices: InvoicesReducer

})


const middlewares = [thunk];
const reducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(rootReducer)
);
export default store = createStore(reducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

