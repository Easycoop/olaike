import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getApplications } from "../../services/applicationService";

export const doGetApplications = createAsyncThunk(
  "applications/doGetApplications",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getApplications(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetApplications = () => useDispatcher(doGetApplications);
