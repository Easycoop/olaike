import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../auth.css';
import { resendOtp } from '../../../services/authServices';
import { useLocation, useNavigate } from 'react-router-dom';
import toastManager from '../../../components/ui/toast/ToasterManager';
import {useVerifyEmailOtp} from '../../../redux/actions/authActions';

const OtpInput = ({ length = 4, userEmail, actionPurpose, setStep, setVirtualOtp  }) => {
    // state variables
    const [otp, setOtp] = useState(Array(length).fill(''));
    const [timer, setTimer] = useState(10);
    const [resending, setResending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

//   other react hooks
  const inputRefs = useRef([]);
  const location = useLocation();

//   retrieve email and purpose from query string
  const searchParams = new URLSearchParams(location.search);
  const email = userEmail || searchParams.get('email');
  const purpose = actionPurpose || searchParams.get('purpose');
    console.log(purpose);
  
  const navigate = useNavigate();

// custom hooks
const verifyEmailOtp = useVerifyEmailOtp();

  /*useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);*/

  // Timer countdown effect
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Input focus logic
  const focusInput = (index) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index].focus();
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < length - 1) {
        focusInput(index + 1);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('Text').slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasteData[i] || '';
    }
    setOtp(newOtp);
    const nextIndex = pasteData.length >= length ? length - 1 : pasteData.length;
    focusInput(nextIndex);
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== length) {
      alert('Please enter the full OTP');
      return;
    }

    try {
        if(purpose == "password-reset"){
            setStep(3);
            return;
        }
        const response = await verifyEmailOtp({email, otp:enteredOtp, purpose});
        console.log(response);
        if(response?.status === true || response?.status === "success") {
            if(purpose === 'login'){
                toastManager.addToast({
                    message: "Login successful",
                    type: "success",
                });
                navigate("/main/dashboard");   
            }
        }else{
            
            
            toastManager.addToast({
                message: response?.message,
                type: "error",
            });
            // setErrorMessage(response?.message);
        }
    } catch (error) {
      alert('OTP verification failed');
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const resent = await resendOtp(email, purpose);
      setOtp(Array(length).fill(''));
      setTimer(10); // restart timer
      inputRefs.current[0]?.focus();
      if(resent?.status === true || resent?.status === "success") {
        toastManager.addToast({
            message: "OTP resent ",
            type: "success",
        });
      }
    } catch (err) {
      alert('Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    if (typeof setVirtualOtp === 'function') {
        setVirtualOtp(otp);
      }
  }, [otp]);

  return (
    <div className="otp-wrapper">
      <div className="otp-inputs">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className="otp-input"
          />
        ))}
      </div>

      <button className="verify-btn" onClick={handleSubmit}>Verify OTP</button>

      <div className="resend-section">
        {timer > 0 ? (
          <span className="countdown">Resend OTP in {timer}s</span>
        ) : (
          <button className="resend-btn" onClick={handleResend} disabled={resending}>
            {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </div>

        <Link to="/" className='text-primary'>Back to login</Link>
     
    </div>
  );
};

// Simulated services
const fakeOtpVerificationApi = (otp) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (otp === '123456' ? resolve({ success: true }) : reject()), 1000)
  );

// const fakeResendOtpApi = () =>
//   new Promise((resolve) => setTimeout(resolve, 1000));

export default OtpInput;
