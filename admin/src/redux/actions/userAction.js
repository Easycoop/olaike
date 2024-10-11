import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getUsers } from "../../services/userServices";

export const doGetUsers = createAsyncThunk(
  "users/doGetUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUsers();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetUsers = () => useDispatcher(doGetUsers);
