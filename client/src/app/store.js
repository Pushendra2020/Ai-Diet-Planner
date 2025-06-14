
// import {configureStore} from '@reduxjs/toolkit'
// import authSlice from "./authSlice.js"
// const store =configureStore({
//     reducer:{
//         auth:authSlice,
//     }
// })

// export default store


// By this after refresh state is remain same. It store the state in local storage
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
