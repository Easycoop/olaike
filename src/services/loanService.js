import api from "../api/axios";

export const saveChanges = async (payload) => {
  try {
    const response = await api.patch(`/loan-application/`, payload);
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

export const submitLoan = async (payload) => {
  try {
    const response = await api.post(`/loan-application/`, payload);
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

export const getLoanApplication = async (payload) => {
  try {
    const response = await api.get(`/loan-application/${payload}`);
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
