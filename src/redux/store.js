// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./slice";

const store = configureStore({
  reducer: {
    venues: venueReducer,
  },
});

export default store;
