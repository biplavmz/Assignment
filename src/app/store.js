import { createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import {persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import persistedReducer from "./storeFolder/UserReducer";

const store = configureStore({
    reducer: persistedReducer,
  });


  export const persistor = persistStore(store);
  export default store;




