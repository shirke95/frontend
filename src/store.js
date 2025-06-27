import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// Import your reducers here
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer, 
  // Add other reducers here as needed
});

const initialState = {};
const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  // You can add middleware or devTools options here if needed
});

export default store;
