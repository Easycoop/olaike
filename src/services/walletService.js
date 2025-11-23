import api from "../api/axios";

export const getWallets = async (id) => {
  try {
    const response = await api.get(`/wallet/user-wallets/${id}`);
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

export const generateWalletAccount = async (id) => {

  try {

    const response = await api.get(`/wallet/${id}/generate-payment-wallet`);
    return response.data;

  } catch (error) {
    
    if (error.response) {
      // Add server response details to the error
      error.message = `${
       error.response?.data.message || error.response?.statusText ||  error.response?.data?.data  || error.message
      }`;
    } 
    throw error;
  }
}

export const getUserWallet = async (user_id) => {
  try {
    const response = await api.get(`/wallet/${user_id}/kegow-wallet`);
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
}

export const debitEntranceFee = async (user_id) =>{
  try {
    const response = await api.get(`/wallet/${user_id}/debit-entrance-fee`);
    return response.data;
  } catch (error) {
    console.log('action error')
    console.log(error)
    if (error.response) {
      console.log('error has response')
      // Add server response details to the error
      error.message = `${
        error.response.data?.error?.responseMessage || error.response.data?.message || error.response.statusText
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
}

export const getWalletBalance = async () => {
    try {
      const response = await api.get(`/wallet/balance`);
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
}


export const payWithKegow = async (data) =>{
  try {
    const response = await api.post(`/transaction/pay-with-kegow`, data);
    return response.data;
  } catch (error) {
    console.log('action error')
    console.log(error)
    if (error.response) {
      console.log('error has response')
      // Add server response details to the error
      error.message = `${
        error.response.data?.error?.responseMessage || error.response.data?.message || error.response.statusText
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
}


