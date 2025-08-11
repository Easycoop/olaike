import { useEffect, useState, useContext } from "react";
// import "./signup.css";
// import logo from "../../../assets/icons/logo_text.svg";
import Input from "../../../components/ui/form-elements/input";
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

const genders = [
  { id: "Male", name: "Male" },
  { id: "Female", name: "Female" },
];

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
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    group: "",
    gender: "",
    referralCode: "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await register(formData);

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
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

 

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

      // if()
      
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
          // Payment completed, verify the payment
          const verifyPayment = async () => {
            try {
              const response = await verifyTransaction(res.reference); // Await the verification
              if (
                response?.payload.status === 200 ||
                response?.payload.status === "success"
              ) {
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
          // Call the async function inside the synchronous callback
          verifyPayment();
        },
        onClose: function () {
          toastManager.addToast({
            message: "Payment canceled",
            type: "error",
          });
        },
      });
      handler.openIframe(); // Open the Paystack modal
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

  useEffect(() => {
    console.log(config)
  }, [config]);

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
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 h-[90vh] lg:overflow-hidden overflow-y-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003399] mb-6 text-center">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
            <Input
              required
              important
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              required
              important
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              required
              important
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              required
              important
              type="tel"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select
              required
              important
              label="Society"
              name="group"
              options={societies}
              onChange={handleChange}
            />
            <Select
              required
              important
              label="Gender"
              name="gender"
              options={genders}
              onChange={handleChange}
            />
            <Input
              required
              important
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              required
              important
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
                type="submit"
                className="w-full bg-[#ED6E0A] hover:bg-[#d95c05] text-white py-2 rounded-md transition"
                disabled={loading}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Signup;
