import {
  INITIALSTATE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOADING,
  LOGOUT,
  LOGIN_UPDATE_SUCCESS,
  UPDATE_ACCESS_TOKEN,
} from "../types/authTypes";

const initialState = {
  isAuthorized: false,
  loading: false,
  error: null,
  user: null,
  initialState: true,
  accessToken: null,
  refreshToken: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INITIALSTATE:
      return { ...state, initialState: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        user: payload.user,
        accessToken: payload.tokens.accessToken,
        refreshToken: payload.tokens.refreshToken,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        error: payload,
        loading: false,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    case LOADING:
      return { ...state, loading: !state.loading };
    case LOGOUT:
      return { ...state, isAuthorized: false, user: null, loading: false };

    case LOGIN_UPDATE_SUCCESS:
      return { ...state, isAuthorized: true, user: payload, loading: false };
    case UPDATE_ACCESS_TOKEN:
      return { ...state, accessToken: payload };

    default:
      return state;
  }
}
