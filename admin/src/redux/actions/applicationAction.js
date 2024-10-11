import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import {
  getApplications,
  getSingleApplication,
  updateUserApplication,
} from "../../services/applicationService";

export const doGetApplications = createAsyncThunk(
  "applications/doGetApplications",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getApplications();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doGetSingleApplication = createAsyncThunk(
  "applications/doGetSingleApplication",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getSingleApplication(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doUpdateUserApplication = createAsyncThunk(
  "applications/doUpdateUserApplication",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await updateUserApplication(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetApplications = () => useDispatcher(doGetApplications);
export const useGetSingleApplication = () =>
  useDispatcher(doGetSingleApplication);
export const useUpdateUserApplication = () =>
  useDispatcher(doUpdateUserApplication);
