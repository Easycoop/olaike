// import React from 'react';
import OtpInput from './OtpInput';
import logo from "../../../assets/icons/logo.png";

function OtpScreen() {
  const handleOtpVerified = (response) => {
    if (response.success) {
      alert('OTP Verified Successfully!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600" style={{background:"#00208a", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 0", height:"100vh"}}>
      <div className=" rounded-2xl shadow-lg w-full max-w-md text-center" style={{background: "#fff", width:"70%", padding:"40px", borderRadius:"10px"}}>
        {/* Logo */}
        <div className="mb-4">
          {/* Replace with your logo image */}
          <div className="w-16 h-16 mx-auto bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
            <img src={logo} alt="logo" height="120" />
          </div>
        </div>

        {/* Heading */}
        <h1 className=" font-semibold text-gray-800 mb-6" style={{fontSize:"20px", color:"#0a0a0a", marginBottom:"20px"}}>
          Enter OTP to Verify
        </h1>

        {/* OTP Input */}
        <OtpInput length={4} onVerifyOtp={handleOtpVerified} />
      </div>
    </div>
  );
}

export default OtpScreen;
