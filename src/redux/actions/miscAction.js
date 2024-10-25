import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getFees, sendReferralEmail } from "../../services/miscService";

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

export const doGetFes = createAsyncThunk(
  "misc/doGetFes",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getFees(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useSendReferralEmail = () => useDispatcher(doSendReferralEmail);
export const useGetFes = () => useDispatcher(doGetFes);
