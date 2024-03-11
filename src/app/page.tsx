"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Menu from "./components/Menu"

import {persistor} from "./store"
import { Provider } from "react-redux";  // first install provider from redux 
import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";  // install the configure store for configure the store 
import UserReducer from "./storeFolder/UserReducer"
import { PersistGate } from "redux-persist/integration/react";
import userReducer from './storeFolder/UserReducer'; // Import the user reducer from the user slice file
import EventReducer from "./storeFolder/EventReducer";
 // Import the event reducer from the event slice file

const rootReducer = combineReducers({
  user: userReducer,
  event: EventReducer,
});

const store = createStore(rootReducer);


export default function Home() {
  return (
    <main className="">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Menu />
    </PersistGate>

      </Provider>
      
    </main>
  );
}
