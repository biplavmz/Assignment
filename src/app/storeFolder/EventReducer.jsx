"use client"; // This is a client component 👈🏽
import { createSlice, nanoid, current } from "@reduxjs/toolkit";
import { eventList } from "../components/Data";
// const initialState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("eventData")) : null
let initialState;

if (typeof window !== "undefined") {
  const localStorageData = localStorage.getItem("eventData");
  initialState = localStorageData ? JSON.parse(localStorageData) : [];
} else {
  initialState = [];
}

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const data = [...state, action.payload];

      let userData = JSON.stringify(data);
      localStorage.setItem("eventData", userData);

      return [...state, action.payload];
    },
  },
});
export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
