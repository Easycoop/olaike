import api from "../api/axios";

export const login = async (payload) => {
  try {
    const response = await api.post("/auth/login/", {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Add server response details to the error
      error.message = error.response.data.error || error.response.statusText;
    } else if (error.request) {
      // Add request details to the error
      error.message = " No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = error.message;
    }
    throw error;
  }
};

// Enhanced error handling for logout
export const logout = async () => {
  try {
    const response = await api.delete("/auth/logout");
    return response.data;
  } catch (error) {
    if (error.response) {
      // Add server response details to the error
      error.message = `${
        error.response.data.message || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message = "No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `${error.message}`;
    }
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup/", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Add server response details to the error
      error.message = `${
        error.response.data.error || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message = "No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `${error.message}`;
    }
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/application/user-application/", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Add server response details to the error
      error.message = `${
        error.response.data.error || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message = "No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `${error.message}`;
    }
    throw error;
  }
};

export const verifyOtp = async (email, request_id, code) => {
  console.log({
    email,
    request_id,
    code,
  });
  try {
    const response = await api.post("/auth/verify-email/", {
      email: email,
      request_id: request_id,
      code: code,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Add server response details to the error
      error.message = `Verification failed: ${
        error.response.data.error || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message = "Verification failed: No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `Verification failed: ${error.message}`;
    }
    throw error;
  }
};

export const passwordForget = async (email) => {
  try {
    const response = await api.post("/auth/password-reset/", { email });

    return response.data;
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      // Add server response details to the error
      error.message = `Password reset failed: ${
        error.response.data.error || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message =
        "Password reset failed: No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `Password reset failed: ${error.message}`;
    }
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await api.post("/auth/reset-password/", {
      email,
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      // Add server response details to the error
      error.message = `Password reset failed: ${
        error.response.data.error || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message =
        "Password reset failed: No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `Password reset failed: ${error.message}`;
    }
    throw error;
  }
};

export const passwordResetComplete = async (email, request_id, code) => {
  try {
    const response = await api.post("/auth/complete-password-reset/", {
      email,
      request_id,
      code,
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      // Add server response details to the error
      error.message = `Password reset failed: ${
        error.response.data.error || error.response.statusText
      }`;
    } else if (error.request) {
      // Add request details to the error
      error.message =
        "Password reset failed: No response received from server.";
    } else {
      // Add request setup details to the error
      error.message = `Password reset failed: ${error.message}`;
    }
    throw error;
  }
};
