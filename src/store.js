import { configureStore } from "@reduxjs/toolkit";
import userDetail from './userDetails'
export const store= configureStore({
 reducer:{
    app:userDetail
 }
});
