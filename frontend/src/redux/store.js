import {configureStore} from "@reduxjs/toolkit"
import customerReducer from "./slice/CustomerSlice";
import cartSlice from './slice/CartSlice'
import userSlice from './slice/userSlice'

const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart : cartSlice,
    user : userSlice
  },
  devTools: import.meta.env.NODE_ENV !== "production"
});

export default store;
