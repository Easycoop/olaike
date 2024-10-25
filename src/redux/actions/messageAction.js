import { createAsyncThunk } from "@reduxjs/toolkit";

import { useDispatcher } from "../../utils/useDispatcher";
import {
  getAllMessages,
  getConversations,
  getMessages,
} from "../../services/messageService";

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

export const doGetConversations = createAsyncThunk(
  "message/doGetConversations",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getConversations();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Action failed");
    }
  }
);

export const useGetMessages = () => useDispatcher(doGetMessages);
export const useGetConversations = () => useDispatcher(doGetConversations);
export const useGetAllMessages = () => useDispatcher(doGetAllMessages);
