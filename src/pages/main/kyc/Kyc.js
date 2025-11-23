import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Button from "../../../components/ui/button/Button";
import { useSelector } from "react-redux";
import {getNin, initiatePhoneVerification, verifyOtp, confirmPhoneVerification} from "../../../services/userService";
import toastManager from "../../../components/ui/toast/ToasterManager";
import {verifyNin} from "../../../services/userService";
import {MdVerifiedUser} from "react-icons/md"
import {useGenerateWalletAccount} from "../../../redux/actions/walletAction";
import {runValidation} from "../../../utils/buchi";
import ValidationError from "../../../components/ui/form-elements/ValidationError";

const KYC = () => {
    const { user } = useSelector((state) => state.auth);
    const generateWalletAccount = useGenerateWalletAccount();
    
    const [phone, setPhone] = useState(user?.phone);
    const [phoneBtnLoading, setPhoneBtnLoading] = useState(false);
    const [otpBtnLoading, setOtpBtnLoading] = useState(false);
    const [ninBtnLoading, setNinBtnLoading] = useState(false);
    const [walletBtnLoading, setWalletBtnLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(user.phoneVerified);
    const [ninVerified, setNinVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [kegowWallet, setKegowWallet] = useState(localStorage.getItem('kegowWallet') &&  localStorage.getItem('kegowWallet') != "undefined" ? JSON.parse(localStorage.getItem('kegowWallet')) : null);
    const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState();

    const [nin, setNin] = useState({
        number: "",
        image: null,
        dob: "",
        status: "",
        rejectionReason: null
    });
    const navigate = useNavigate();

    const handlePhoneVerification = async () => {
        try {
            if(phone[0] == '0' && phone.length != 11){
                toastManager.addToast({
                    message: `phone numbers starting from "0" must be 11 digits`,
                    type: "error",
                });
                return
            }else if(phone.substring(0, 3) == "234" && phone.length != 13){
                toastManager.addToast({
                    message: `phone numbers starting from "234" must be 13 digits`,
                    type: "error",
                })
                return
            }
            setPhoneBtnLoading(true);
            const getOTP = await initiatePhoneVerification(user?.id, phone);
            
            if(getOTP?.status === 'success'){
                setOtpSent(true);
                toastManager.addToast({
                    message: `${getOTP?.message}`,
                    type: "success",
                });
                setPhoneBtnLoading(false);
            }else{
                setPhoneBtnLoading(false);
            }
        } catch (error) {
            setPhoneBtnLoading(false);
            if(error.message){
                toastManager.addToast({
                    message: `${error.response.data.message || error.response.data.error || error.response.statusText}`,
                    type: "error",
                });
            }
        }

    }

    const submitOtp = async () => {
        try {
           
            setOtpBtnLoading(true);
            const validateOtp = await verifyOtp(user?.id, otp);
            if(validateOtp?.status === 'success'){
                setOtpBtnLoading(false);
                setOtpVerified(true);
                toastManager.addToast({
                    message: `${validateOtp?.message}`,
                    type: "success",
                });
                setPhoneVerified(true);
                setOtpVerified(true)
            }else{
                setOtpBtnLoading(false);
                toastManager.addToast({
                    message: `${validateOtp?.message}`,
                    type: "error",
                });
            }
        } catch (error) {
            setOtpBtnLoading(false);
            toastManager.addToast({
                message: `${error?.message}`,
                type: "error",
            });
        }
       
    }
    
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
          // get file size
          const fileSize = file.size / 1024 / 1024; // in MB
          if (fileSize > 1) {
            toastManager.addToast({
              message: "File size must be less than 1MB",
              type: "error",
            });
            return;
          }
          const fileURL = URL.createObjectURL(file); // Create a URL for the selected file
          setImagePreview(fileURL); // Set the image preview state
          setNin({
            ...nin,
            image: file
          })
        }
      };

    const validateNinData = async () => {
        const validationData = [
            {
                input: { value: nin.number, field: "nin", type: "text" },
                rules: {required:true, char_length: 11}
            },
            {
                input: { value: nin.dob, field: "dob", type: "text" },
                rules: { required: true, min_age: 16},
                alias:  "Date of Birth"
            },
            
            // {
            //     input: { value: nin.image, field: "image", type: "file" },
            //     rules: { required: true },
            //     alias:  "Nin Slip"
            // },

        ]
       
        const validate = await runValidation(validationData);
        if(validate?.status === false){
            setValidationErrors(validate.errors);
            return;
        }

        handleNinVerification();
        
    }

    const handleNinVerification = async () => {
        console.log("ijkjk")
        try {   
            setNinBtnLoading(true);
            const formData = new FormData();
            formData.append('nin', nin.number);
            formData.append('image', nin.image);
            formData.append('dob', nin.dob);
            const response = await verifyNin(user.id, formData);
            if(response?.status === 'success'){
                setNinBtnLoading(false);
                // setNinVerified(true)
                toastManager.addToast({
                    message: `${response?.message}`,
                    type: "success",
                });
                checkExistingNin();
            }else{
                if(response?.status === 'failed' && response?.message == "NIN already verified"){
                    setNinVerified(true)
                }
                setNinBtnLoading(false);
                toastManager.addToast({
                    message: `${response?.message}`,
                    type: "error",
                });
            }
            
        } catch (error) {
            setNinBtnLoading(false);
            toastManager.addToast({
                message: `${error?.message}`,
                type: "error",
            });
            if(error?.message == "NIN already verified"){
                setNinVerified(true)
            }else{
                checkExistingNin();
            }
            
        }
      }
    
    const checkExistingNin = async () => {
        try {
            const response = await getNin(user.id);
             console.log("existing nin")
            console.log(response)
            if(response?.status === 'success'){
                
                
                setImagePreview(response?.data?.documentFile);
                setNin({
                    number: response?.data?.documentIdentifier,
                    image: null,
                    dob: response?.data?.dob,
                    status: response?.data?.status,
                    rejectionReason: response?.data?.rejectionReason
                })
                if(response?.data?.status == "accepted"){
                    setNinVerified(true);
            }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const generateAccountNumber = async () => {
        try {
            setWalletBtnLoading(true);
            const response = await generateWalletAccount(user.id);
            console.log("wallet generating response", response);
            if(response?.payload?.status === 'success'){
                setWalletBtnLoading(false);
                toastManager.addToast({
                    message: 'COngratulations! you now have a virtual account',
                    type: "success",
                });
                navigate("/main/dashboard");
            }else{
                setWalletBtnLoading(false);
                toastManager.addToast({
                    message: `${response.payload || response?.message}`,
                    type: "error",
                });
            }
        } catch (error) {
            console.log('wallet generating error', error)
            setWalletBtnLoading(false);
            toastManager.addToast({
                message: `${error?.payload || error.message}`,
                type: "error",
            });
        }
    }

    const checkPhoneVerification = async () =>{
        try {
            const response = await confirmPhoneVerification(user.id);
            if(response?.status === 'success'){
                setPhoneVerified(true);
                
            }else{
                console.log("phone number not verified");
                
            }
        } catch (error) {
            console.log(error?.message);
            
        }
    }

    useEffect(() => {
    checkExistingNin(); 
    checkPhoneVerification(); 
    }, [])
      
    return (
        <div style={{ paddingTop: "20px" }}>
            <div className="loan__segment">
                <div style={{border: "1px solid #ccc", width:"90%", paddingLeft: "20px", paddingTop: "20px", borderRadius: "5px"}}>
                    <div className="d-flex " style={{alignItems: "center", gap: "10px"}}>
                        <div className="loan__form__set" >
                            <label className="loan__label">Phone</label>
                            <input className="loan__input" type="tel" placeholder="Phone Number" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} disabled={user?.phoneVerified}
                        />
                        </div> 
                        {phoneVerified ? 
                        <><MdVerifiedUser  style={{color:"green", fontSize: "40px"}}/> verified</>: 
                        <>
                        <Button
                            type="button"
                            typeOf="primary"
                            onClick={handlePhoneVerification}
                            style={{ height: "50px  "}}
                        >
                            {phoneBtnLoading ? <ClipLoader color="#fff" size={20} /> : "Verify number"}   
                        </Button>
                        <MdVerifiedUser  style={{color:"red", fontSize: "40px"}}/> not verified 
                       </>
                        }
                    </div>

                    {otpSent && !otpVerified &&
                    <div className="d-flex " style={{alignItems: "center", gap: "10px"}}>
                        <div className="loan__form__set" >
                            <label className="loan__label">OTP</label>
                            <input
                                className="loan__input"
                                type="tel"
                                placeholder="Enter the OTP sent to your phone number"
                                name="otp"
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                            />
                        </div> 
                        
                        <Button type="button" typeOf="primary" onClick={submitOtp} style={{ height: "50px  "}}>
                            {otpBtnLoading ? <ClipLoader color="#fff" size={20} /> : "Submit OTP"}   
                        </Button>
                    
                    </div>
                    }
                </div>
                
                <div style={{border: "1px solid #ccc", width:"90%", paddingLeft: "20px", paddingTop: "20px", borderRadius: "5px", marginTop : "20px"}}>
                    <div className="d-flex " style={{alignItems: "center", gap: "10px"}}>
                        <div className="loan__form__set" >
                            <label className="loan__label">NIN</label>
                            <input className="loan__input" placeholder="National Identification Number" name="nin" value={nin.number} disabled={ninVerified} onChange={(e) => setNin({...nin, number: e.target.value})}
                            />
                            <ValidationError validationErrors={validationErrors} style={{marginTop:"-40px"}} field={"nin"} />
                        </div> 

                        <div className="loan__form__set" >
                            <label className="loan__label">Date of Birth</label>
                            <input className="loan__input" type="date" name="dob" value={nin.dob} disabled={ninVerified} onChange={(e)=>setNin({...nin, dob: e.target.value})}/>
                            <ValidationError validationErrors={validationErrors} style={{marginTop:"-40px"}} field={"dob"} />
                        </div> 
                    </div>

                    <div className="d-flex " style={{alignItems: "center", gap: "10px", display:"flex"}} >
                        {
                            !ninVerified && nin?.status !="pending" &&
                            <div className="loan__form__set" >
                                <label className="loan__label">Passport Photo <small className="text-danger">Maximum of 1mb</small> </label>
                                <input className="loan__input" type="file" name="file" accept="image/*" onChange={handleFileChange} />
                                <ValidationError validationErrors={validationErrors} style={{marginTop:"-40px"}} field={"image"} />
                            </div> 
                            
                        }

                        <div className="d-flex" style={{alignItems: "center", gap: "10px", marginTop:"-40px"}} >
                            {imagePreview ? (
                            <img src={imagePreview} alt="NIN slip" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                            ) : (
                            <p>No image selected</p> // Show text if no image is selected
                            )}

                            {ninVerified ? <><MdVerifiedUser  style={{color:"green", fontSize: "40px"}}/> verified</> : nin?.status === "pending" ? <><MdVerifiedUser  style={{color:"gold", fontSize: "40px"}}/> pending</> :<><MdVerifiedUser  style={{color:"red", fontSize: "40px"}}/> not verified </>}
                            {nin.rejectionReason && nin.status === "rejected" && <p className="text-danger">{nin.rejectionReason}</p>}
                        </div>
                        {!ninVerified && 
                            
                            <Button type="button" typeOf="primary" onClick={validateNinData} style={{ height: "50px  "}}>
                                {ninBtnLoading ? <ClipLoader color="#fff" size={20} /> : nin?.status ==="pending" ? "Update  NIN":"Submit  NIN"}   
                            </Button>
                        }
                    </div>
                    

                    
                </div>
                {/* <div className="d-flex " style={{alignItems: "center", gap: "10px"}}>
                    <div className="loan__form__set" >
                        <label className="loan__label">BVN</label>
                        <input
                            className="loan__input"
                            type="tel"
                            placeholder="Bank Verification Number"
                            name="phone"
                            value={""}
                            onChange={()=>{}}
                        />
                    </div> 
                    
                    <Button
                            type="button"
                            typeOf="primary"
                            onClick={() => {}}
                            style={{ height: "50px  "}}
                                
                        >
                            Verify BVN
                    </Button>
                
                </div> */}

                {phoneVerified && ninVerified && !kegowWallet &&
                    <Button type="button" typeOf="success" onClick={generateAccountNumber} style={{ height: "50px", width: "300px", margin: "20px auto"}}>
                        {walletBtnLoading ? <ClipLoader color="#fff" size={20} /> : "Generate Account Number"}   
                    </Button>}
            
            </div>
        </div>
        
    );
}

export default KYC;