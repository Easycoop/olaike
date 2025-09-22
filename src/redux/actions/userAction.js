import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getUsers, getDashboardData, updateUserProfile } from "../../services/userService";
import { debitEntranceFee } from "../../services/walletService";
import {UPDATE_USER } from "../types/authTypes";
import { store } from "../store";

// action creators
export const updateUserAction = (updatedFields) => ({
  type: UPDATE_USER,
  payload: updatedFields,
});

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

export const doUpdateUserProfile =  createAsyncThunk(
  "users/doUpdateUserProfile",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateUserProfile(payload);
      if(response?.data?.user){
        const currentUser = store.getState().auth.user;
        dispatch(updateUserAction({
          user: { ...currentUser, ...response.data.user }
        }));
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doDebitEntranceFee =  createAsyncThunk(
  "users/doDebitEntranceFee",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await debitEntranceFee(payload);
      console.log('entrance fee response');
      console.log(response);
      if (response?.status === "success") {

        const currentUser = store.getState().auth.user;
        const { id, groupId, userId, status } = response.data.memberShipInstance;

        dispatch(updateUserAction({
          user: {
            ...currentUser,
            GroupMembership: { id, groupId, userId, status }
          }
        }));
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetUsers = () => useDispatcher(doGetUsers);
export const useGetDashboardData = () => useDispatcher(doGetDashboardData);
export const useUpdateUserProfile = () => useDispatcher(doUpdateUserProfile);
export const useDebitEntranceFee = () => useDispatcher(doDebitEntranceFee);
