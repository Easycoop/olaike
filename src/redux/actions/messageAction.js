import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import { getAllMessages, getMessages } from "../../services/messageService";

export const doGetMessages = createAsyncThunk(
  "message/doGetMessages",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getMessages(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const doGetAllMessages = createAsyncThunk(
  "message/doGetAllMessages",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllMessages();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetMessages = () => useDispatcher(doGetMessages);
export const useGetAllMessages = () => useDispatcher(doGetAllMessages);
