import { combineReducers } from "redux";
import authReducer from "./authSlice.js";
import miscReducer from "./miscSlice.js";

export default combineReducers({
  auth: authReducer,
  misc: miscReducer,
});
