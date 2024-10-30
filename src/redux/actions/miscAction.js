import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import {
  getFees,
  requestWithdraw,
  sendReferralEmail,
} from "../../services/miscService";

export const doSendReferralEmail = createAsyncThunk(
  "misc/doSendReferralEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await sendReferralEmail(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doGetFees = createAsyncThunk(
  "misc/doGetFees",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getFees(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doRequestWithdraw = createAsyncThunk(
  "misc/doRequestWithdraw",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await requestWithdraw(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useSendReferralEmail = () => useDispatcher(doSendReferralEmail);
export const useGetFees = () => useDispatcher(doGetFees);
export const useRequestWithdraw = () => useDispatcher(doRequestWithdraw);
