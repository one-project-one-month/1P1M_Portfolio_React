// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // add reducers here, e.g. auth: authReducer
  },
});
