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
  getUnUsedLoanFormTransactions,
  simulateWebHook,
  payThrift
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

export const doGetUnUsedLoanFormTransactions = createAsyncThunk(
  "transactions/doGetUnUsedLoanFormTransactions",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getUnUsedLoanFormTransactions(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doSimulateWebHook = createAsyncThunk(
  "transactions/doSimulateWebHook",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await simulateWebHook(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doPayThrift = createAsyncThunk(
  "transactions/doPayThrift",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await payThrift(payload);
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
export const useGetUnUsedLoanFormTransactions = () =>
  useDispatcher(doGetUnUsedLoanFormTransactions);
export const useSimulateWebHook = () => 
  useDispatcher(doSimulateWebHook);
export const usePayThrift = () => 
  useDispatcher(doPayThrift);

