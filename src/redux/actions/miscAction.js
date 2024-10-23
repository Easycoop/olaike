import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { sendReferralEmail } from "../../services/miscService";

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

export const useSendReferralEmail = () => useDispatcher(doSendReferralEmail);
