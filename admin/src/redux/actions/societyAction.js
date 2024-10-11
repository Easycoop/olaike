import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { createSociety } from "../../services/societyService";

export const doCreateSociety = createAsyncThunk(
  "society/doCreateSociety",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createSociety(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useCreateSociety = () => useDispatcher(doCreateSociety);
