import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import localStorage from "redux-persist/lib/storage"; // Use localStorage for web
import rootReducer from "./reducers";

// Configuration for Redux Persist
const persistConfig = {
  key: "olaike",
  storage: localStorage, // Use localStorage for web
};

// Create a persisted reducer using the persist configuration and root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure middleware
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }).concat(
    createLogger({
      diff: true,
      predicate: (getState, action) => !action.type.startsWith("persist/"),
    })
  );

// Configure and create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development only
});

// Create a persistor to persist and rehydrate the store
export const persistor = persistStore(store);
