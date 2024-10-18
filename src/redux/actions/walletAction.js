import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getWallets } from "../../services/walletService";

export const doGetWallets = createAsyncThunk(
  "wallet/doGetWallets",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getWallets(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetWallets = () => useDispatcher(doGetWallets);
