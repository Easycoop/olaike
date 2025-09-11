import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getWallets, generateWalletAccount } from "../../services/walletService";
import { updateUserAction } from "./userAction";
import { store } from "../store";

export const doGetWallets = createAsyncThunk(
  "wallet/doGetWallets",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getWallets(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doGenerateWalletAccount =  createAsyncThunk(
  "users/doGenerateWalletAccount",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await generateWalletAccount(payload);
      console.log("wallet response", response);
      
      if(response?.data?.user){
        const currentUser = store.getState().auth.user;
        dispatch(updateUserAction({
          user: { ...currentUser, ...response.data.user }
        }));
      }
      return response;
    } catch (error) {
      console.log("Wallet error", error.response?.data)
      return rejectWithValue(error.response?.data?.message || error.message || "Action failed");
    }
  }
);

export const useGetWallets = () => useDispatcher(doGetWallets);
export const useGenerateWalletAccount = () => useDispatcher(doGenerateWalletAccount);
