import "./payment.css";
import "../../../components/ui/modal/modal-children-styles/modal-withdraw1.css";
import Button from "../../../components/ui/button/Button";
import payment from "../../../assets/images/main/payment.png";
import Modal from "../../../components/ui/modal/Modal";
import { useState } from "react";
import Input from "../../../components/ui/form-elements/input";
import { useSelector } from "react-redux";
import {
  useInitializeTransaction,
  useVerifyTransactionFund,
  useVerifyTransactionFundLoan,
  useVerifyTransactionFundSavings,
} from "../../../redux/actions/transactionAction";
import { ClipLoader } from "react-spinners";
import toastManager from "../../../components/ui/toast/ToasterManager";
import image1 from "../../../assets/images/main/rb_1985.png";
import image2 from "../../../assets/images/main/rb_12830.png";

function Payment() {
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const initializeTransaction = useInitializeTransaction();
  const verifyTransactionFund = useVerifyTransactionFund();
  const verifyTransactionFundSavings = useVerifyTransactionFundSavings();
  const verifyTransactionFundLoan = useVerifyTransactionFundLoan();
  const { user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState({
    fund: false,
    savings: false,
    loan: false,
  });

  const closeModal = () => {
    setIsOpen({
      fund: false,
      savings: false,
      loan: false,
    });
    setErrorMessage("");
    setAmount(null);
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "fund") {
      setIsOpen((prev) => ({ ...prev, fund: true }));
    } else if (option === "savings") {
      setIsOpen((prev) => ({ ...prev, savings: true }));
    } else if (option === "loan") {
      setIsOpen((prev) => ({ ...prev, loan: true }));
    } else return;
  };

  const handleFund = async () => {
    if (!amount) {
      setErrorMessage("Please enter amount you want to fund");
      return;
    }

    if (type == "loan" && amount > user.loanBalance) {
      setErrorMessage("This amount is bigger than the amount you are owing");
      return;
    }
    // Initialize transaction from backend
    try {
      setLoading(true);
      const response = await initializeTransaction({
        email: user.email,
        amount: amount,
        description: "fund wallet",
      });

      const { reference } = response.payload.data.data;

      closeModal();

      // Open Paystack modal to complete payment
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_KEY, // Paystack public key
        email: user.email,
        amount: amount * 100,
        currency: "NGN",
        ref: reference, // Reference from backend initialization
        callback: function (res) {
          // Payment completed, verify the payment
          const verifyPayment = async () => {
            try {
              let response;

              if (type == "fund") {
                response = await verifyTransactionFund(res.reference); // Await the verification
              }
              if (type == "savings") {
                response = await verifyTransactionFundSavings(res.reference); // Await the verification
              }
              if (type == "loan") {
                response = await verifyTransactionFundLoan(res.reference); // Await the verification
              }

              if (
                response?.payload.status === 200 ||
                response?.payload.status === "success"
              ) {
                toastManager.addToast({
                  message: "Payment Successful",
                  type: "success",
                });
                // handleModalClick("done");
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
      console.error("Payment initialization failed:", error);
      toastManager.addToast({
        message: "Payment initialization failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="withdraw">
      <section className="withdraw__money__section__two">
        <div
          className="withdraw__money__section__two__block"
          onClick={() => {
            setType("fund");
            handleModalClick("fund");
          }}
        >
          <div>
            <h5>Wallet</h5>
            <p>Fund your main wallet</p>
          </div>
          <img src={payment} />
        </div>
        <div
          className="withdraw__money__section__two__block"
          onClick={() => {
            setType("savings");
            handleModalClick("savings");
          }}
        >
          <div>
            <h5>Savings</h5>
            <p>Fund savings wallet</p>
          </div>
          <img src={image1} />
        </div>
        <div
          className="withdraw__money__section__two__block"
          onClick={() => {
            if (user.loanBalance == 0) {
              toastManager.addToast({
                message: "You don't have any debt to repay",
                type: "warning",
              });
            } else {
              setType("loan");
              handleModalClick("loan");
            }
          }}
        >
          <div>
            <h5>Repay loan</h5>
            <p>Pay back part or whole of your debt</p>
            <p style={{ color: "crimson" }}>Debt owed: {user.loanBalance}</p>
          </div>
          <img src={image2} />
        </div>
      </section>

      {/* FUND AMOUNT MODAL */}
      <Modal isOpen={isOpen.fund} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to fund</h3>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errorMessage && (
            <h5 className="modal__withdraw1__error">{errorMessage}</h5>
          )}
          <Button className="modal__withdraw1__button" onClick={handleFund}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Fund wallet"}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isOpen.savings} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to save</h3>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errorMessage && (
            <h5 className="modal__withdraw1__error">{errorMessage}</h5>
          )}
          <Button className="modal__withdraw1__button" onClick={handleFund}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Save"}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isOpen.loan} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to repay from loan</h3>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errorMessage && (
            <h5 className="modal__withdraw1__error">{errorMessage}</h5>
          )}
          <Button className="modal__withdraw1__button" onClick={handleFund}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Repay loan"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Payment;
