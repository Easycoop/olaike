import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getUsers, getDashboardData } from "../../services/userService";

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

export const doGetDashboardData = createAsyncThunk(
  "users/doGetDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDashboardData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);


export const useGetUsers = () => useDispatcher(doGetUsers);
export const useGetDashboardData = () => useDispatcher(doGetDashboardData);
