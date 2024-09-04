export const deleteAllTokens = () => {
  // Implementation to delete tokens from storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
