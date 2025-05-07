import { useEffect, useState } from "react";
import "./signup.css";
import logo from "../../../assets/icons/logo-secondary-color1.png";
import Input from "../../../components/ui/form-elements/input";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../redux/actions/authActions";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ClipLoader } from "react-spinners";
import Select from "../../../components/ui/form-elements/select";
import { useGetSocieties } from "../../../redux/actions/societyAction";
import {
  useInitializeTransactionEntry,
  useVerifyTransactionEntry,
} from "../../../redux/actions/transactionAction";

const genders = [
  { id: "Male", name: "Male" },
  { id: "Female", name: "Female" },
];

function Signup() {
  const getSocieties = useGetSocieties();
  const register = useRegister();
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await register(formData);

      if (response?.status === 200 || response?.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: `Succesful registration`,
          type: "success",
        });
        navigate("/signup-complete");
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

  useEffect(() => {
    handleGetSocieties();
  }, []);

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
    const selectedSociety = societies.find((item) => item.id == formData.group);
    if (selectedSociety) {
      setAmount(selectedSociety.entranceFee);
    } else {
      setAmount(null);
    }
  }, [formData.group]);

  return (
    <div className="signup">
      <div className="signup__start">
        <div className="signup__start__wrap">
          <h3>Sign up</h3>
          <form onSubmit={handleFund}>
            <Input
              important={true}
              required
              className="signup__input"
              type="text"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              important={true}
              required
              className="signup__input"
              type="text"
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <Input
              important={true}
              required
              className="signup__input"
              type="text"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              important={true}
              required
              className="signup__input"
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              important={true}
              required
              className="signup__input"
              type="number"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select
              important={true}
              required
              label="Society"
              name="group"
              className="signup__input"
              options={societies}
              onChange={handleChange}
            />
            <Select
              important={true}
              required
              label="Gender"
              name="gender"
              className="signup__input"
              options={genders}
              onChange={handleChange}
            />
            <Input
              className="signup__input"
              type="number"
              label="Referral code (Optional)"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
            />
            <Input
              important={true}
              required
              className="signup__input"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              important={true}
              required
              className="signup__input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <p className="signup__error">{errorMessage}</p>
            <span className="signup__start__switch">
              <p>
                Already have an account?
                <b className="ml-1" onClick={() => navigate("/")}>
                  Login
                </b>
              </p>
            </span>

            <Button
              type="submit"
              typeOf="success"
              className="signup__create__button"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Proceed to pay"
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="signup__end">
        <img src={logo} alt="logo" />
        <h5>TRANSFORMING LIVES</h5>
      </div>
    </div>
  );
}

export default Signup;
