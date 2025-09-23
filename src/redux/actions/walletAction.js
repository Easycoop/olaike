import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getWallets, generateWalletAccount, getWalletBalance } from "../../services/walletService";
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
  "wallet/doGenerateWalletAccount",
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


export const doGetWalletBalance = createAsyncThunk("user/doGetWalletBalance", async (payload, {dispatch, rejectWithValue }) => {
  try {
    const data = await getWalletBalance(payload);
    console.log('waalet balance');
    console.log(data);
    if(data.status === 'success'){
      const currentUser = store.getState().auth.user;
      // currentUser.wallet.balance = data.data.availableBalance
        dispatch(updateUserAction({
          user: { ...currentUser, Wallet: { ...currentUser.Wallet, balance: data.data.availableBalance } }
        }));
    }
    // console.log(data);
    
    return data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.message || "Action failed");
  }
})

export const useGetWallets = () => useDispatcher(doGetWallets);
export const useGenerateWalletAccount = () => useDispatcher(doGenerateWalletAccount);
export const useGetWalletBalance = () => useDispatcher(doGetWalletBalance);
