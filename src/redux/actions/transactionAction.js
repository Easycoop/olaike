import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import {
  getTransactions,
  initializeTransaction,
  initializeTransactionEntry,
  verifyTransaction,
  verifyTransactionEntry,
  verifyTransactionFund,
  verifyTransactionFundLoan,
  verifyTransactionFundSavings,
} from "../../services/transactionServices";

export const doInitializeTransaction = createAsyncThunk(
  "transaction/doInitializeTransaction",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await initializeTransaction(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doInitializeTransactionEntry = createAsyncThunk(
  "transaction/doInitializeTransactionEntry",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await initializeTransactionEntry(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doVerifyTransaction = createAsyncThunk(
  "transaction/doVerifyTransaction",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await verifyTransaction(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doVerifyTransactionFund = createAsyncThunk(
  "transaction/doVerifyTransactionFund",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await verifyTransactionFund(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doVerifyTransactionFundSavings = createAsyncThunk(
  "transaction/doVerifyTransactionFund",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await verifyTransactionFundSavings(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doVerifyTransactionFundLoan = createAsyncThunk(
  "transaction/doVerifyTransactionFund",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await verifyTransactionFundLoan(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doVerifyTransactionEntry = createAsyncThunk(
  "transaction/doVerifyTransactionFEntry",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await verifyTransactionEntry(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doGetTransactions = createAsyncThunk(
  "transactions/doGetTransactions",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getTransactions(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetTransactions = () => useDispatcher(doGetTransactions);
export const useInitializeTransaction = () =>
  useDispatcher(doInitializeTransaction);
export const useInitializeTransactionEntry = () =>
  useDispatcher(doInitializeTransactionEntry);
export const useVerifyTransaction = () => useDispatcher(doVerifyTransaction);
export const useVerifyTransactionFund = () =>
  useDispatcher(doVerifyTransactionFund);
export const useVerifyTransactionFundSavings = () =>
  useDispatcher(doVerifyTransactionFundSavings);
export const useVerifyTransactionFundLoan = () =>
  useDispatcher(doVerifyTransactionFundLoan);
export const useVerifyTransactionEntry = () =>
  useDispatcher(doVerifyTransactionEntry);
