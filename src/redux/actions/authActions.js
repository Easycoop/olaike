import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOADING,
} from "../types/authTypes";
import {
  login,
  logout,
  passwordForget,
  passwordResetComplete,
  resetPassword,
  signup,
  verifyOtp,
} from "../../services/authServices";
import { delay } from "../../utils/delay";
import { useDispatcher } from "../../utils/useDispatcher";

// Action Creators
const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const loggingIn = () => ({
  type: LOADING,
});

const logoutAction = () => ({
  type: LOGOUT,
});

// Custom Hook: Use Auth
export function useAuth() {
  const auth = useSelector((state) => state.auth);
  return auth;
}

// Custom Hook: Initialize Auth
export function useInitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      await delay(2000);
      dispatch(logoutAction());
    };

    initAuth();
  }, [dispatch]);
}

// Async Actions
export const doLoginAction = (email, password) => async (dispatch) => {
  dispatch(loggingIn());

  try {
    const response = await login(email, password);
    dispatch(
      loginSuccess({
        user: {
          email,
          name: response.name,
        },
        tokens: {
          accessToken: response.token,
          refreshToken: response.refresh_token,
        },
      })
    );
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || "Login failed"));
    return error;
  }
};

export const doSignUpAction =
  (email, password, firstName, lastName) => async (dispatch) => {
    dispatch(loggingIn());

    try {
      const response = await signup(email, password, firstName, lastName);

      dispatch(
        loginSuccess({
          user: {
            email,
            name: `${firstName} ${lastName}`,
          },
          tokens: {
            accessToken: response.token,
            refreshToken: response.refresh_token,
          },
        })
      );
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message || "Signup failed"));
      return error;
    }
  };

export const doLogoutAction = () => async (dispatch) => {
  dispatch(loggingIn());

  try {
    const response = await logout();
    // await deleteAllTokens();
    dispatch(logoutAction());
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    dispatch(loginFailure(error.message || "Logout failed"));
    return error;
  }
};

export const doVerifyEmailAction =
  (email, request_id, code) => async (dispatch) => {
    dispatch(loggingIn());

    try {
      const response = await verifyOtp(email, request_id, code);

      dispatch(loggingIn());
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message || "Verification failed"));
      return error;
    }
  };

export const doPasswordForgetAction = (email) => async (dispatch) => {
  dispatch(loggingIn());

  try {
    const response = await passwordForget(email);
    dispatch(loggingIn());
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || "Password reset failed"));
    return error;
  }
};

export const doResetPasswordAction = (email) => async (dispatch) => {
  dispatch(loggingIn());

  try {
    const response = await resetPassword(email);

    dispatch(loggingIn());
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || "Password reset failed"));
    return error;
  }
};

export const doPasswordResetCompleteAction =
  (email, request_id, code) => async (dispatch) => {
    dispatch(loggingIn());

    try {
      const response = await passwordResetComplete(email, request_id, code);

      dispatch(loggingIn());
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message || "Password reset failed"));
      return error;
    }
  };

// Custom Hooks for Dispatching Actions
export const useLogin = () => useDispatcher(doLoginAction);
export const useLogout = () => useDispatcher(doLogoutAction);
export const useSignUp = () => useDispatcher(doSignUpAction);
export const useVerifyEmail = () => useDispatcher(doVerifyEmailAction);
export const usePasswordForget = () => useDispatcher(doPasswordForgetAction);
export const useResetPassword = () => useDispatcher(doResetPasswordAction);
export const usePasswordResetComplete = () =>
  useDispatcher(doPasswordResetCompleteAction);
