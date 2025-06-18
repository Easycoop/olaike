import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import {
  getLoanApplication,
  saveChanges,
  submitLoan,
  getUserLoans,
} from "../../services/loanService";

export const doSaveChanges = createAsyncThunk(
  "loan/doSaveChanges",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await saveChanges(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doSubmitLoan = createAsyncThunk(
  "loan/doSubmitLoan",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await submitLoan(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error || "Action failed");
    }
  }
);

export const doGetLoanApplication = createAsyncThunk(
  "loan/doGetLoanApplication",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getLoanApplication(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);


export const doGetUserLoans = createAsyncThunk(
  "loan/doGetLoanApplication",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getUserLoans(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);


export const useSaveChanges = () => useDispatcher(doSaveChanges);
export const useSubmitLoan = () => useDispatcher(doSubmitLoan);
export const useGetLoanApplication = () => useDispatcher(doGetLoanApplication);
export const useGetUserLoans = () => useDispatcher(doGetUserLoans);
