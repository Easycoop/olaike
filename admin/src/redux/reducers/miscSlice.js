import { INITIAL_STATE, HEADER_PATH } from "../types/miscTypes";

const initialState = {
  loading: false,
  error: null,
  initialState: true,
  headerPath: "Dashboard",
};

export default function miscReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INITIAL_STATE:
      return { ...state, initialState: false };
    case HEADER_PATH:
      return {
        ...state,
        headerPath: payload,
      };

    default:
      return state;
  }
}
