import '../auth.css';
import OtpInput from '../otp/OtpInput';
import logo from "../../../assets/icons/logo_icon_main.svg";
import { useState, useContext } from 'react';
import Input from '../../../components/ui/form-elements/input';
import {resendOtp} from '../../../services/authServices';
import {useNavigate, Link} from 'react-router-dom';
import toastManager from '../../../components/ui/toast/ToasterManager';
import { runValidation } from '../../../utils/buchi';
import ValidationError from '../../../components/ui/form-elements/ValidationError';
import { useVerifyEmailOtp } from '../../../redux/actions/authActions';
import { ConfigContext } from '../../../context/ConfigProvider';

const ForgotPassword = () => {
  const {config} = useContext(ConfigContext);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [virtualOtp, setVirtualOtp] = useState('...');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  const navigate = useNavigate();

  const verifyEmailOtp = useVerifyEmailOtp();

  const handleOtpVerified = (response) => {
    if (response.success) {
      alert('OTP Verified Successfully!');
    }
  };

  const sendOtp = async () =>{
    try {
      const resent = await resendOtp(email, 'password-reset');
      
      if(resent?.status === true || resent?.status === "success") {
        setStep(2);
      }else{
        toastManager.addToast({
            message: resent?.message,
            type: "error",
        });
      }
    } catch (err) {
      console.log(err);
      
      toastManager.addToast({
          message: "Failed to resend OTP",
          type: "error",
      });
      // alert('');
    }
  }

  const validatePasswordForm = async () => {
    const validate = await runValidation([
      {
        input: { value: password, field: 'password', type: "text" },
        rules: { required: true, min_length: 8, has_special_character: true, must_have_number:true},
      },
      {
        input: { value: confirmPassword, field: 'confirm_password', type: "password" },
        rules: { required: true, must_match:'password' },
      },
    ]);

    console.log(validate);
    if(validate?.status === false) {
      setValidationErrors(validate.errors);
    }else {
      handleUpdatePassword();
    }
  }

  const handleUpdatePassword = async () => {
    try{
      const response = await verifyEmailOtp({email, otp:virtualOtp.join(''), purpose:"password-reset", password});
          console.log(response);
          if(response?.status === true || response?.status === "success") {
            toastManager.addToast({
              message: response?.message,
              type: "success",
          });
            navigate("/");  
          }else{
              
            toastManager.addToast({
                message: response?.response?.data?.message,
                type: "error",
            });
              // setErrorMessage(response?.message);
        }
    }
    catch(err){
      console.log(err);
      toastManager.addToast({
        message: err?.message,
        type: "error",
    });
    }
      
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600" style={{background:"#00208a", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 0", height:"100vh"}}>
      <div className=" rounded-2xl shadow-lg w-full max-w-md text-center" style={{background: "#fff", width:"70%", padding:"40px", borderRadius:"10px"}}>
        {/* Logo */}
        <div className="mb-4">
          {/* Replace with your logo image */}
          <div className="w-16 h-16 mx-auto bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
            <img src={config?.logos?.main_icon} alt="logo" height="120" />
          </div>
        </div>

        {/* Heading */}
        

        {
          step == 1 && (
            <div>
              <h1 className=" font-semibold text-gray-800 mb-4" style={{fontSize:"20px", color:"#0a0a0a", marginBottom:"10px"}}>
                Enter Your Email Address
              </h1>
              <h5 style={{marginBottom:"10px"}} className='text-primary'>We will send you an OTP to reset your password</h5>
              <div style={{width:"100%", margin:"auto", backgroundColor:"#eee", padding:"20px", borderRadius:"10px"}}>
                  <Input
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="Enter your email to reset your password"
                    className="mb-4"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
                
                <button className='verify-btn' onClick={sendOtp}>Submit</button>
                <div> <Link to="/" className='text-primary mt-3'>Back to login</Link></div>
              </div>
              
            </div>
            
          )
        }
        {
          step == 2 && <OtpInput length={4} userEmail={email} actionPurpose={"password-reset"} setStep={setStep} setVirtualOtp={setVirtualOtp} />
        }
        {
          step == 3 &&
          <div style={{width:"80%", margin:"auto", backgroundColor:"#eee", padding:"20px", borderRadius:"10px"}}>
            <div>
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Set a new password"
                  className="mb-4"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{textAlign:"left", marginBottom:"10px", lineHeight:"17px"}}>
                
                  <ValidationError  validationErrors={validationErrors} field={"password"}/>
                </div>

            </div>
            
            
             <Input
              type="password"
              label="Confirm Password"
              name="confirm_password"
              placeholder="Retype password"
              className="mb-4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div style={{textAlign:"left", marginBottom:"10px", lineHeight:"17px"}}>
              <ValidationError validationErrors={validationErrors} field="confirm_password" />
            </div>
            <div>

              <button className='verify-btn' onClick={validatePasswordForm}>Submit</button>
            <br />
              <span onClick={() => setStep(2)} className='text-primary' style={{cursor:"pointer"}}> {"<<<"} Back to OTP </span>
            </div>
          </div>
        }
          
        
        
      </div>
    </div>
  );
}

export default ForgotPassword;
