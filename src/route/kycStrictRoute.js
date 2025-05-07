import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const KycStrictRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.kycStatus === 'verified' ? <Outlet /> : <Navigate to="/main/kyc" />;
};

export default KycStrictRoute;
