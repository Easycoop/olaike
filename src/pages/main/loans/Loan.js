import Switch from "react-switch";
import image1 from "../../../assets/images/main/profile-image.jpg";
import { useNavigate } from "react-router-dom";
import "./loan.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  useGetLoanApplication,
  useSaveChanges,
  useSubmitLoan,
  useGetUserLoans,
} from "../../../redux/actions/loanAction";
import { ClipLoader } from "react-spinners";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { useDispatch, useSelector } from "react-redux";
import { useGetWallets } from "../../../redux/actions/walletAction";
import { runValidation } from '../../../utils/buchi';
import ValidationError from "../../../components/ui/form-elements/ValidationError";
import { formDateFormat } from "../../../utils/time";
import UserLoans from "./UserLoans";
import { useEffect, useState } from "react";
import { useInitializeTransaction, useVerifyTransaction, useGetUnUsedLoanFormTransactions } from "../../../redux/actions/transactionAction";


const Loan = () => {

  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const getWallets = useGetWallets();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // custom hooks
  const initializeTransaction = useInitializeTransaction();
  const verifyTransaction = useVerifyTransaction();
  const getUnUsedLoanFormTransactions = useGetUnUsedLoanFormTransactions();
  const getLoanApplication = useGetLoanApplication();
  const submitLoan = useSubmitLoan();
  const saveChanges = useSaveChanges();
  const getUserLoans = useGetUserLoans();

  // state variables
  const [errorMessage, setErrorMessage] = useState("");
  const [wallets, setWallets] = useState({});
  const [loading, setLoading] = useState("");
  const [validationErrors, setValidationErrors] = useState();
  const [loans, setLoans] = useState({});
  const [loanFormAmount, setLoanFormAmount] = useState(0);
  const [unUsedLoanForms, setUnUsedLoanForms] = useState([]);

  const [paymentCompleted, setPaymentCompleted] = useState(false); // New state for payment

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    gender: user?.gender,
    dob: null,
    amount: null,
    address: user?.address,
    employmentStatus: null,
    employerName: null,
    jobTitle: null,
    employmentAddress: null,
    nokFirstName: null,
    nokLastName: null,
    nokEmail: null,
    nokPhone: null,
    nokRelationship: null,
    bvn: null,
    nin: null,
    guarantorFirstName: null,
    guarantorLastName: null,
    guarantorEmail: null,
    guarantorPhone: null,
    guarantorOccupation: null,
    guarantorOfficeAddress: null,
    guarantorHomeAddress: null,
    userId: user.id,
  });

  const validateLoanForm = async () => {
    const validationData = [];
    for (const key in formData) {
      validationData.push({
        input: { value: formData[key], field: key, type: "text" },
        rules: { required: true },
      });
    }

    const validate = await runValidation(validationData);

    if (validate?.status === false) {
      setValidationErrors(validate.errors);
    } else {
      handleSubmit()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [select, setSelect] = useState({
    select0: true, // New: Payment tab as the first
    select1: false,
    select2: false,
    select3: false,
    select4: false,
    select5: false,
    select6: false,
    select7: false,
    select8: false,
    select9: false,
  });

  const closeAll = () => {
    setSelect({
      select0: false, // Include payment tab
      select1: false,
      select2: false,
      select3: false,
      select4: false,
      select5: false,
      select6: false,
      select7: false,
      select8: false,
      select9: false,
    });
  };

  const handleSelect = (option) => {
    if (option !== "select0" && !paymentCompleted) {
      toastManager.addToast({
        message: "Please complete the payment first.",
        type: "info",
      });
      return;
    }
    closeAll();
    setSelect((prevState) => ({
      ...prevState,
      [option]: true,
    }));
  };

  const handleNext = (option) => {
    if (!paymentCompleted) {
      toastManager.addToast({
        message: "Please complete the payment first.",
        type: "error",
      });
      return;
    }
    closeAll();
    setSelect((prevState) => ({ ...prevState, [option]: true }));
  };

  function isSixMonthsLater(targetDateStr) {
    const targetDate = new Date(targetDateStr);

    if (isNaN(targetDate)) {
      throw new Error("Invalid date format");
    }

    const today = new Date();

    const sixMonthsLater = new Date(targetDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth());

    return today >= sixMonthsLater;
  }

  const handleSubmit = async () => {
    if (formData.amount > 3 * wallets.wallet.balance) {
      setErrorMessage("Amount should not exceed 3 times your wallet balance");
      toastManager.addToast({
        message: "Loan amount should not exceed 3 times your wallet balance",
        type: "warning",
      });
      return;
    }

    if (!isSixMonthsLater(user.createdAt)) {
      setErrorMessage(
        "User must be registered for at least 6 months to apply for a loan"
      );
      toastManager.addToast({
        message:
          "User must be registered for at least 6 months to apply for a loan",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await submitLoan(formData);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: "Successful loan application",
          type: "success",
        });
        navigate("/main/loan-completed");
      } else {
        setErrorMessage(response.message);
        toastManager.addToast({
          message: response?.payload?.message,
          type: "error",
        });
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await saveChanges(formData);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        toastManager.addToast({
          message: "Changes saved successfully",
          type: "success",
        });
      } else {
        setErrorMessage(response.message);
        toastManager.addToast({
          message: "Could not save changes",
          type: "error",
        });
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLoanApplication = async () => {
    setLoading(true);
    try {
      const response = await getLoanApplication(user.loanApplicationId);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        const application_data = response.payload.data.application;
        delete application_data.verificationDocument;
        delete application_data.transactionId;
        
        setFormData(application_data);
      } else {
        setErrorMessage(response?.message);
      }
    } catch (error) {
      setErrorMessage(error?.response?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetWallets = async () => {
    setLoading(true);
    try {
      const response = await getWallets(user.id);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        setWallets(response.payload.data);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLoans = async () => {
    try {
      const response = await getUserLoans(user.id);
      if (response?.payload.status === "success") {
        setErrorMessage("");
        setLoans(response.payload.data);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // New: Payment handling
  const handlePayment = async () => {
    setLoading(true);
    // Simulate a payment process
    if (loanFormAmount === 0) {
        setErrorMessage("Payment amount not set");
        return;
    }

     try {
        setLoading(true);
        const response = await initializeTransaction({
          email: user.email,
          amount: loanFormAmount,
          description: "loan_application",
        });

        const { reference } = response.payload.data.data;

        // Open Paystack modal to complete payment
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_KEY, // Paystack public key
          email: user.email,
          amount: loanFormAmount * 100,
          currency: "NGN",
          ref: reference, // Reference from backend initialization
          callback: function (res) {
            // Payment completed, verify the payment
            const verifyPayment = async () => {
              try {
                let response = await verifyTransaction(res.reference); // Await the verification

                if (
                  response?.payload.status === 200 ||
                  response?.payload.status === "success"
                ) {
                  toastManager.addToast({
                    message: "Payment Successful",
                    type: "success",
                  });

                  setPaymentCompleted(true);
                  setLoading(false);
                  toastManager.addToast({
                    message: "Payment successful! You can now proceed with your application.",
                    type: "success",
                  });
                  // handleNext("select1");
                } else {
                  toastManager.addToast({
                    message: "Payment failed: Could not verify payment",
                    type: "error",
                  });
                  getUnUsedLoanForms();
                  // fetchUserLoans();
                }
              } catch (error) {
                console.error("Verification error:", error);
                toastManager.addToast({
                  message: "Payment failed: Could not verify payment",
                  type: "error",
                });
                getUnUsedLoanForms();
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
        console.error("Payment initialization failed:", error);
        toastManager.addToast({
          message: "Payment initialization failed",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    
  };

  const getUnUsedLoanForms = async () => {
    const response = await getUnUsedLoanFormTransactions();
    if (response?.payload.status === "success") {
      console.log(response);
      setUnUsedLoanForms(response.payload.data)
      if(response.payload.data.length > 0) {
        setPaymentCompleted(true);
        // setTimeout(() => {
        //   handleNext("select1");
        // }, 2000)
        
        // setSelect((prevState) => ({ ...prevState, select0: true }));
      }
      return response.payload.data;
    }else{
      console.log("Something went wrong");
      console.log(response);
    }

  }

  useEffect(() => {
    handleGetWallets();
    handleGetLoanApplication();
    fetchUserLoans();
    getUnUsedLoanForms();
  }, []);

  useEffect(() => {
    console.log(formDateFormat(formData?.dob));
  }, [formData.dob]);

  useEffect(() => {
    if(loans?.inactive?.length > 0) {
      setLoanFormAmount(4500)
    }else{
      setLoanFormAmount(2500)
    }
  }, [loans]);

  useEffect(()=>{
    if(paymentCompleted){
      
        handleNext("select1");
      
    }
  }, [paymentCompleted]);

  return (
    <>
    {loans?.pending?.length > 0 ?
      <p className="text-danger error">You have a pending loan application application</p>
    :

      loans?.active?.length === 0 ? (
          <div className="loans">
            <section className="account__notifications__section__two">
              <div className="loan__header__wrap">
                <div className="bg-danger">
                  {Object.entries(formData).map(([key, value]) => (
                    <ValidationError key={key} validationErrors={validationErrors} field={key} />
                  ))}
                </div>
                <div className="account__notifications__select__div">
                  <button
                    className={
                      select.select0
                        ? "account__notifications__select selected"
                        : "account__notifications__select"
                    }
                    onClick={() => handleSelect("select0")}
                  >
                    Payment
                  </button>
                  <button
                    className={
                      select.select1
                        ? "account__notifications__select selected"
                        : "account__notifications__select"
                    }
                    onClick={() => handleSelect("select1")}
                    disabled={!paymentCompleted} // Disable if payment not completed
                  >
                    Profile
                  </button>
                  <button
                    className={
                      select.select2
                        ? "account__notifications__select selected"
                        : "account__notifications__select"
                    }
                    onClick={() => handleSelect("select2")}
                    disabled={!paymentCompleted} // Disable if payment not completed
                  >
                    Employment Details
                  </button>
                  <button
                    className={
                      select.select3
                        ? "account__notifications__select selected"
                        : "account__notifications__select"
                    }
                    onClick={() => handleSelect("select3")}
                    disabled={!paymentCompleted} // Disable if payment not completed
                  >
                    Next of Kin
                  </button>
                  <button
                    className={
                      select.select4
                        ? "account__notifications__select selected"
                        : "account__notifications__select"
                    }
                    onClick={() => handleSelect("select4")}
                    disabled={!paymentCompleted} // Disable if payment not completed
                  >
                    Documents
                  </button>
                  <button
                    className={
                      select.select5
                        ? "account__notifications__select selected"
                        : "account__notifications__select"
                    }
                    onClick={() => handleSelect("select5")}
                    disabled={!paymentCompleted} // Disable if payment not completed
                  >
                    Guarantor
                  </button>
                </div>
              </div>
            </section>

            <section className="">
              {select.select0 && (
                <div className="loan__segment payment__page">
                    <div className="payment-root">
                      {paymentCompleted ?
                      <div className="payment-container">
                        <div className="header">
                          <h1>Loan Form Payment </h1>
                          <p>Payment Completed</p>
                        </div>
                        <div className="details">
                          <div className="details-item">
                            <label>Amount:</label>
                            <div className="value">₦{loanFormAmount.toLocaleString()}</div>
                          </div>
                          <div className="details-item">
                            <label>Purpose:</label>
                            <div className="value">Loan Form Submission Fee</div>
                          </div>

                          <button 
                            className="pay-button" 
                            onClick={()=>handleNext("select1")}
                          >
                          Apply for Loan
                          </button>
                        </div>
                      </div>
                      :
                        <div className="payment-container">
                          <div className="header">
                            <h1>Loan Form Payment </h1>
                            <p>Please review the details below</p>
                          </div>

                          <div className="details">
                            <div className="details-item">
                              <label>Amount:</label>
                              <div className="value">₦{loanFormAmount.toLocaleString()}</div>
                            </div>
                            <div className="details-item">
                              <label>Purpose:</label>
                              <div className="value">Loan Form Submission Fee</div>
                            </div>
                          </div>

                          <div className="description">
                            To apply for a loan you are required to make a non-refundable payment of ₦{loanFormAmount.toLocaleString()}. This payment is required by the cooperative society to fund the logistics associated with your loan process
                          </div>

                          <button 
                            className="pay-button" 
                            onClick={handlePayment}
                            disabled={loading || paymentCompleted}
                          >
                            {loading ? (
                              <ClipLoader color="#fff" size={20} />
                            ) : paymentCompleted ? (
                              "Payment Completed"
                            ) : (
                              "Make Payment"
                            )}
                          </button>
                        </div>
                      }
                      
                    </div>
                </div>
              )}

              {select.select1 && paymentCompleted && ( // Conditional rendering based on payment
                <div className="loan__segment">
                  <div className="loan__segment__profile">
                    <img src="/user-avatar.webp" alt="logo" style={{ objectFit: "contain" }} />
                  </div>
                  <span className="loan__segment__wrap">
                    <span className="loan__form__set">
                      <label className="loan__label">FIRST NAME</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData?.firstName}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">LAST NAME</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData?.lastName}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">EMAIL ADDRESS</label>
                      <input
                        className="loan__input"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData?.email}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">PHONE NUMBER</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData?.phone}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">GENDER</label>
                      <select
                        className="loan__select"
                        name="gender"
                        defaultValue={formData?.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">DATE OF BIRTH</label>
                      <input
                        className="loan__input"
                        type="date"
                        name="dob"
                        placeholder="DD/MM/YY"
                        value={formDateFormat(formData?.dob)}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">YOUR ADDRESS</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="address"
                        placeholder="e.g Port Harcourt, Rivers State"
                        value={formData?.address}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">LOAN AMOUNT</label>
                      <input
                        className="loan__input"
                        type="number"
                        name="amount"
                        placeholder="Enter amount you are requesting for"
                        value={formData?.amount}
                        onChange={handleChange}
                      />
                    </span>
                  </span>
                  <div className="loan__segment__foot">
                    <button
                      className="loan__foot__button save"
                      onClick={() => handleSaveChanges()}
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      className="loan__foot__button next"
                      onClick={() => handleNext("select2")}
                    >
                      Next <BsArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {select.select2 && paymentCompleted && (
                <div className="loan__segment">
                  <span className="loan__segment__wrap">
                    <span className="loan__form__set">
                      <label className="loan__label">EMPLOYMENT STATUS</label>
                      <select
                        className="loan__select"
                        name="employmentStatus"
                        value={formData?.employmentStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        <option value="employed">Employed</option>
                        <option value="selfEmployed">Self-employed</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">COMPANY/EMPLOYER'S NAME</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="employerName"
                        placeholder="Enter Employer Name"
                        value={formData?.employerName}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">JOB TITLE</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="jobTitle"
                        placeholder="Enter your job title"
                        value={formData?.jobTitle}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">EMPLOYMENT ADDRESS</label>
                      <input
                        className="loan__input"
                        type="text"
                        name="employmentAddress"
                        placeholder="Enter your address"
                        value={formData?.employmentAddress}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      />
                    </span>
                  </span>
                  <div className="loan__segment__foot">
                    <button
                      className="loan__foot__button save"
                      onClick={() => handleSaveChanges()}
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      className="loan__foot__button back"
                      onClick={() => handleNext("select1")}
                    >
                      <BsArrowLeft /> Previous
                    </button>
                    <button
                      className="loan__foot__button next"
                      onClick={() => handleNext("select3")}
                    >
                      Next <BsArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {select.select3 && paymentCompleted && (
                <div className="">
                  <div className="loan__segment">
                    <span className="loan__segment__wrap">
                      <span className="loan__form__set">
                        <label className="loan__label">FIRST NAME</label>
                        <input
                          className="loan__input"
                          type="text"
                          placeholder=" Name"
                          name="nokFirstName"
                          value={formData?.nokFirstName}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="loan__form__set">
                        <label className="loan__label">LAST NAME</label>
                        <input
                          className="loan__input"
                          type="text"
                          placeholder="Last Name"
                          name="nokLastName"
                          value={formData?.nokLastName}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="loan__form__set">
                        <label className="loan__label">EMAIL ADDRESS</label>
                        <input
                          className="loan__input"
                          type="email"
                          placeholder="Email Address"
                          name="nokEmail"
                          value={formData?.nokEmail}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="loan__form__set">
                        <label className="loan__label">PHONE NUMBER</label>
                        <input
                          className="loan__input"
                          type="number"
                          placeholder="Phone Number"
                          name="nokPhone"
                          value={formData?.nokPhone}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="loan__form__set">
                        <label className="loan__label">
                          RELATIONSHIP WITH NEXT OF KIN
                        </label>
                        <select
                          className="loan__select"
                          name="nokRelationship"
                          defaultValue={formData?.nokRelationship}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Child">Child</option>
                          <option value="Friend">Friend</option>
                        </select>
                      </span>
                    </span>
                    <div className="loan__segment__foot">
                      <button
                        className="loan__foot__button save"
                        onClick={() => handleSaveChanges()}
                        disabled={loading}
                      >
                        {loading ? (
                          <ClipLoader color="#fff" size={20} />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        className="loan__foot__button back"
                        onClick={() => handleNext("select2")}
                      >
                        <BsArrowLeft /> Previous
                      </button>
                      <button
                        className="loan__foot__button next"
                        onClick={() => handleNext("select4")}
                      >
                        Next <BsArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {select.select4 && paymentCompleted && (
                <div className="loan__segment">
                  <span className="loan__form__set">
                    <label className="loan__label">BVN</label>
                    <input
                      className="loan__input"
                      type="text"
                      placeholder="Bank Verification Number"
                      name="bvn"
                      value={formData?.bvn}
                      onChange={handleChange}
                    />
                  </span>
                  <span className="loan__form__set">
                    <label className="loan__label">NIN</label>
                    <input
                      className="loan__input"
                      type="number"
                      placeholder="Bank Verification Number"
                      name="nin"
                      value={formData?.nin}
                      onChange={handleChange}
                    />
                  </span>
                  <div className="loan__segment__foot">
                    <button
                      className="loan__foot__button save"
                      onClick={() => handleSaveChanges()}
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      className="loan__foot__button back"
                      onClick={() => handleNext("select3")}
                    >
                      <BsArrowLeft /> Previous
                    </button>
                    <button
                      className="loan__foot__button next"
                      onClick={() => handleNext("select5")}
                    >
                      Next <BsArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {select.select5 && paymentCompleted && (
                <div className="loan__segment">
                  <span className="loan__segment__wrap">
                    <span className="loan__form__set">
                      <label className="loan__label">GUARANTOR'S FIRST NAME</label>
                      <input
                        className="loan__input"
                        type="text"
                        placeholder="Enter Guarantor's First Name"
                        name="guarantorFirstName"
                        value={formData?.guarantorFirstName}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">GUARANTOR'S LAST NAME</label>
                      <input
                        className="loan__input"
                        type="text"
                        placeholder="Enter Guarantor's Last Name"
                        name="guarantorLastName"
                        value={formData?.guarantorLastName}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">GUARANTOR'S EMAIL</label>
                      <input
                        className="loan__input"
                        type="email"
                        placeholder="Enter Guarantor's Email"
                        name="guarantorEmail"
                        value={formData?.guarantorEmail}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">GUARANTOR'S PHONE</label>
                      <input
                        className="loan__input"
                        type="number"
                        placeholder="Enter Guarantor's Phone Number"
                        name="guarantorPhone"
                        value={formData?.guarantorPhone}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">GUARANTOR'S OCCUPATION</label>
                      <input
                        className="loan__input"
                        type="text"
                        placeholder="Enter Guarantor's Occupation"
                        name="guarantorOccupation"
                        value={formData?.guarantorOccupation}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">
                        GUARANTOR'S OFFICE ADDRESS
                      </label>
                      <input
                        className="loan__input"
                        type="text"
                        placeholder="Enter Office Address"
                        name="guarantorOfficeAddress"
                        value={formData?.guarantorOfficeAddress}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="loan__form__set">
                      <label className="loan__label">GUARANTOR'S HOME ADDRESS</label>
                      <input
                        className="loan__input"
                        type="text"
                        placeholder="Enter Home Address"
                        name="guarantorHomeAddress"
                        value={formData?.guarantorHomeAddress}
                        onChange={handleChange}
                      />
                    </span>
                  </span>
                  <div className="loan__segment__foot">
                    <button
                      className="loan__foot__button save"
                      onClick={() => handleSaveChanges()}
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      className="loan__foot__button back"
                      onClick={() => handleNext("select4")}
                    >
                      <BsArrowLeft /> Previous
                    </button>
                    <button
                      className="loan__foot__button submit"
                      onClick={validateLoanForm}
                    >
                      {loading ? <ClipLoader color="#fff" size={20} /> : "Submit"}
                    </button>
                  </div>
                </div>
              )}
            </section>

            
          </div>

        ) : (
          <UserLoans loans={loans} user={user} fetchUserLoans={fetchUserLoans} />
      )
    }
      
    </>
  );
}
export default Loan;