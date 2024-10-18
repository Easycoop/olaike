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
} from "../../../redux/actions/transactionAction";
import { ClipLoader } from "react-spinners";
import toastManager from "../../../components/ui/toast/ToasterManager";

function Payment() {
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const initializeTransaction = useInitializeTransaction();
  const verifyTransactionFund = useVerifyTransactionFund();
  const { user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [isOpen, setIsOpen] = useState({
    fund: false,
    done: false,
  });

  const closeModal = () => {
    setIsOpen({
      fund: false,
      done: false,
    });
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "fund") {
      setIsOpen((prev) => ({ ...prev, fund: true }));
    } else if (option === "done") {
      setIsOpen((prev) => ({ ...prev, done: true }));
    } else return;
  };

  const handleFund = async () => {
    if (!amount) {
      setErrorMessage("Please enter amount you want to fund");
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
              const response = await verifyTransactionFund(res.reference); // Await the verification

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
    <div className="payment">
      <img src={payment} alt="payment" />
      {/* <p>Fund your wallet now!</p> */}
      <Button
        className="modal__withdraw1__button"
        onClick={() => handleModalClick("fund")}
      >
        Fund wallet
      </Button>

      {/* FUND AMOUNT MODAL */}
      <Modal isOpen={isOpen.fund} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to fund</h3>
          <Input
            type="number"
            placeholder="Enter an ammount"
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
    </div>
  );
}

export default Payment;
