import { configureStore } from "@reduxjs/toolkit";
import apiDataReducer from "./counterslice.js";

export default configureStore({
  reducer: {
    apiData: apiDataReducer,
  },
});
