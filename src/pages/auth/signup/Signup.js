import { useEffect, useState, useContext } from "react";
// import "./signup.css";
// import logo from "../../../assets/icons/logo_text.svg";
import Input from "../../../components/ui/form-elements/input";
import TextArea from "../../../components/ui/form-elements/text-area/TextArea";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useRegister, useSignUp } from "../../../redux/actions/authActions";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ClipLoader } from "react-spinners";
import Select from "../../../components/ui/form-elements/select";
import { useGetSocieties } from "../../../redux/actions/societyAction";
import {
  useInitializeTransactionEntry,
  useVerifyTransactionEntry,
} from "../../../redux/actions/transactionAction";
import { ConfigContext } from "../../../context/ConfigProvider";
import AccountDetailsModal from "../../../components/ui/modal/AccountDetailsModal";
import { genders } from "../../../utils/generic";
import { runValidation } from "../../../utils/buchi";
import logger from "redux-logger";


const activePaymentGateWay = process.env.REACT_APP_ACTIVE_PAYMENT_GATEWAY;

function Signup() {
  const getSocieties = useGetSocieties();
  const register = useSignUp();
  const navigate = useNavigate();
  const { config } = useContext(ConfigContext);
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const initializeTransactionEntry = useInitializeTransactionEntry();
  const verifyTransaction = useVerifyTransactionEntry();
  const [amount, setAmount] = useState(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [societies, setSocieties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState();
  const [accountDetail, setAccountDetail] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankCode: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    group: "",
    gender: "",
    address: "",
  });

  const handleGetSocieties = async () => {
    try {
      const response = await getSocieties(formData);

      if (
        response?.payload.status === 200 ||
        response?.payload.status === "success"
      ) {
        setErrorMessage("");

        setSocieties(response.payload.data.groups);
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    
    setFormData({
      ...formData,
      [name]: name === 'email' ? value.toLowerCase():value,
    });
  };

  const handleSubmit = async () => {
    
    try {
      setLoading(true);
      setValidationErrors();
      const response = await register(formData);
      console.log(response?.errors);
      
      if(response.errors ){
        // console.log();
        setValidationErrors(response.errors)
      }
      if (response?.status === 200 || response?.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: `Succesful registration`,
          type: "success",
        });
        // navigate("/signup-complete");
        navigate("/");
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      // console.log("error", error);
      setErrorMessage(error.response.message);
    } finally {

      setLoading(false);
    }
  };

    const validateRegForm = async () => {
        console.log(formData.phone);
        
      const validationData = [
          {
              input: { value: formData.firstName, field: "firstName", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.lastName, field: "lastName", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.email, field: "email", type: "text" },
              rules: { required: true, email: true },
          },
          {
              input: { value: formData.phone, field: "phone", type: "text" },
              rules: { required: true, char_length:11 },
          },
          {
              input: { value: formData.group, field: "group", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.gender, field: "gender", type: "text" },
              rules: { required: true },
          },
          {
              input: { value: formData.address, field: "address", type: "text" },
              rules: { required: true, min_length: 10 },
          },
          {
              input: { value: formData.password, field: "password", type: "text" },
              rules: { required: true, min_length: 8, has_special_character: true, must_have_number:true },
          },
           
      ];

    
      const validate = await runValidation(validationData);
      // console.log(validate)
  
      if (validate?.status === false) {
        setValidationErrors(validate.errors);
      } else {
        handleSubmit()
      }
    }

 

  const handleFund = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!amount) {
      setErrorMessage("Please enter amount you want to fund");
      return;
    }
    // Initialize transaction from backend
    try {
      setLoading(true);
      const response = await initializeTransactionEntry({
        email: formData.email,
        amount: amount,
        description: "entrance fee",
        firstName: formData.firstName,
        lastName: formData.lastName,
        group: formData.group,
        gender:formData.gender,
      });

      
      
      switch (process.env.REACT_APP_PAYMENT_PROVIDER) {
        case 'kegow':
          if(!response?.payload?.data?.requestSuccessful){
            toastManager.addToast({
              message: response.payload,
              type: "error",
            });
            return
          }
          setIsOpen(true);
          
          // console.log(response?.payload?.data?.responseBody?.accountDetails);
          setAccountDetail({
            accountName: response?.payload?.data?.responseBody?.accountDetails?.beneficiaryAccountName,
            accountNumber: response?.payload?.data?.responseBody?.accountDetails?.beneficiaryAccountNumber,
            bankName: response?.payload?.data?.responseBody?.accountDetails?.bankName,
            bankCode: response?.payload?.data?.responseBody?.accountDetails?.beneficiaryBankCode,
          });          
          break;
        case 'paystack':
          if(!response.payload?.data?.data){
            console.log(response);
            toastManager.addToast({
              message: response.payload,
              type: "error",
            });
            return
          }
          const { reference } = response.payload.data.data;
          // Open Paystack modal to complete payment
          const handler = window.PaystackPop.setup({
            key: PAYSTACK_KEY, // Paystack public key
            email: formData.email,
            amount: amount * 100,
            currency: "NGN",
            ref: reference, // Reference from backend initialization
            callback: function (res) {
              verifyPayment(res.reference);
            },
            onClose: function () {
              toastManager.addToast({
                message: "Payment canceled",
                type: "error",
              });
            },
          });
          handler.openIframe(); // Open the Paystack modal

        default:
          break;
      }
      
      
    } catch (error) {
      console.log(error);
      
      toastManager.addToast({
        message: "Payment initialization failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await verifyTransaction(reference); // Await the verification
      if ( response?.payload.status === 200 || response?.payload.status === "success") {
        toastManager.addToast({
          message: "Payment Successful",
          type: "success",
        });
        handleSubmit();
      } else {
        toastManager.addToast({
          message: "Payment failed: Could not verify payment",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toastManager.addToast({
        message: "Payment failed: Could not verify payment",
        type: "error",
      });
    }
  };

  useEffect(() => {
    handleGetSocieties();
  }, []);

  useEffect(() => {
    const selectedSociety = societies.find((item) => item.id == formData.group);
    if (selectedSociety) {
      setAmount(selectedSociety.entranceFee);
    } else {
      setAmount(null);
    }
  }, [formData.group]);


    return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Section (light background, fixed height) */}
      <div className="w-full md:w-[50%] bg-gray-50 relative overflow-hidden">
        {/* Mobile Top Logo */}
        <div className="md:hidden w-full bg-[#003399] py-4  flex justify-center">
          <img
            src={config?.logos?.text_logo_white}
            alt="Logo"
            className="h-8 object-contain"
          />
        </div>
        <hr className="md:hidden border-t border-white w-2/3 mx-auto mt-2" />
      </div>

      {/* Right Section (blue background, fixed height) */}
      <div className="hidden md:flex w-[50%] h-screen bg-[#003399] items-center justify-center p-10 overflow-hidden">
        <div className="w-[34%] ml-[17%] flex justify-center">
          <img
            src={config?.logos?.text_logo_white}
            alt="Logo"
            className="h-8 object-contain ml-5"
          />
        </div>
        
      </div>

      {/* Floating Signup Card (fixed height with scrollbar) */}
      <div className="w-full md:w-[60%] px-4 md:absolute md:left-[8%] md:top-[5%] z-10 scrollable-card" >
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 h-[90vh] overflow-y-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003399] mb-6 text-center">
            Sign Up
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <Input
              required
              important
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"firstName"}
            />
            <Input
              required
              important
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"lastName"}
            />
            <Input
              required
              important
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"email"}
            />
            <Input
              required
              important
              type="tel"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"phone"}
            />
            <Select
              required
              important
              label="Society"
              name="group"
              options={societies}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"group"}
            />
            <Select
              required
              important
              label="Gender"
              name="gender"
              options={genders}
              value={formData.gender}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"gender"}
            />
            <TextArea
              required
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"address"}
              className={'textArea'}
            />
            <Input
              required
              important
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              validationErrors={validationErrors}
              fieldName={"password"}
            />
           

            {/* Error Message */}
            {errorMessage && (
              <div className="col-span-full">
                <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
              </div>
            )}

            {/* Login Switch */}
            <div className="col-span-full text-sm mb-4 text-center">
              Already have an account?{" "}
              <b
                className="text-[#003399] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login
              </b>
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <Button
                type="button"
                className="w-full bg-[#ED6E0A] hover:bg-[#d95c05] text-white py-2 rounded-md transition"
                disabled={loading}
                onClick={validateRegForm}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AccountDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        amount={amount}
        account={{
          name: accountDetail.accountName,
          number: accountDetail.accountNumber,
          bank: accountDetail.bankName
        }}
      />
    </div>

    
  );

}

export default Signup;
