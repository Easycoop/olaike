import { combineReducers } from "redux";
import authReducer from "./authSlice.js";

export default combineReducers({
  auth: authReducer,
});
