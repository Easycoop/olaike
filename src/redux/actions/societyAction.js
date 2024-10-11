import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getSocieties } from "../../services/societyService";

export const doGetSocieties = createAsyncThunk(
  "society/doGetSociety",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getSocieties(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetSocieties = () => useDispatcher(doGetSocieties);
