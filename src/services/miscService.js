import api from "../api/axios";

export const sendReferralEmail = async (payload) => {
  try {
    const response = await api.post(`/misc/send-referral-email`, {
      email: payload.email,
      userId: payload.id,
    });
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
