// here we are using the slice method
"use client"; // This is a client component 👈🏽

import { createSlice, nanoid, current } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { tableInfo } from "../components/Data";

// const initialState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("usersData")) : [] 
let initialState;

if (typeof window !== 'undefined') {
    const localStorageData = localStorage.getItem("usersData");
    initialState = localStorageData ? JSON.parse(localStorageData) : [];
} else {
    initialState = [];
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      if(action.payload){
        // const newState = [...state, action.payload];
        state.push(action.payload);
        let userData = JSON.stringify(current(state));
        localStorage.setItem("usersData", userData);
        // return newState;
      }
      // return state;
    },
    updateUser: (state, action) => {
      const {
        DONOR,
        PANELS,
        BARCODE,
        SOURCE,
        DATE,
        AMOUNT,
        OBSERVER,
        STATUS,
        ACTION,
      } = action.payload;
      const uu = state.find((user) => user.BARCODE == BARCODE);

      const updatedState = state.map((user) => {
        if (user.BARCODE === BARCODE) {
          user.DONOR = DONOR;
          user.PANELS = PANELS;
          user.SOURCE = SOURCE;
          user.DATE = DATE;
          user.AMOUNT = AMOUNT;
          user.OBSERVER = OBSERVER;
          user.STATUS = STATUS;
        }
        return user;
      });
      localStorage.setItem("usersData", JSON.stringify(updatedState));

      if (uu) {
        uu.DONOR = DONOR;
        uu.PANELS = PANELS;
        uu.SOURCE = SOURCE;
        uu.DATE = DATE;
        uu.AMOUNT = AMOUNT;
        uu.OBSERVER = OBSERVER;
        uu.STATUS = STATUS;
      }
    },

    deleteUser: (state, action) => {
      const { BARCODE } = action.payload;
      const uu = state.find((user) => user.BARCODE == BARCODE);
      if (uu) {
        const newState = state.filter((el) => el.BARCODE !== BARCODE);
        localStorage.setItem("usersData", JSON.stringify(newState));
        return state.filter((el) => el.BARCODE !== BARCODE);
      }
    },
  },
});

const persistConfig = {
  key: "users",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
export const { addUsers, updateUser, deleteUser } = userSlice.actions;

export default persistedReducer;
