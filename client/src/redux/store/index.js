import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userSlice from "../reducerSlices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};


const reducer = combineReducers({
  user: userSlice,
});


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: [logger],
});



export const persistor = persistStore(store);
