import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatcher } from "../../utils/useDispatcher";
import {getAppConfig} from "../../services/configService";

export const doAppConfig = createAsyncThunk(
  "config/doGetAppConfig",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getAppConfig(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);


export const useGetAppConfig = () => useDispatcher(doAppConfig);