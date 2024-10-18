import Button from "../../../components/ui/button/Button";
import donation from "../../../assets/images/main/donate.png";
import thankYou from "../../../assets/images/main/thank-you.jpg";
import "./donation.css";
import Modal from "../../../components/ui/modal/Modal";
import { useState } from "react";
import Input from "../../../components/ui/form-elements/input";
import { useSelector } from "react-redux";
import {
  useInitializeTransaction,
  useVerifyTransaction,
} from "../../../redux/actions/transactionAction";
import { ClipLoader } from "react-spinners";
import toastManager from "../../../components/ui/toast/ToasterManager";

function Donation() {
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const initializeTransaction = useInitializeTransaction();
  const verifyTransaction = useVerifyTransaction();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [isOpen, setIsOpen] = useState({
    donate: false,
    done: false,
  });

  const closeModal = () => {
    setIsOpen({
      donate: false,
      done: false,
    });
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "donate") {
      setIsOpen((prev) => ({ ...prev, donate: true }));
    } else if (option === "done") {
      setIsOpen((prev) => ({ ...prev, done: true }));
    } else return;
  };

  const handleDonate = async () => {
    // Initialize transaction from backend
    try {
      setLoading(true);
      const response = await initializeTransaction({
        email: user.email,
        amount: amount,
        description: "donate",
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
              const response = await verifyTransaction(res.reference); // Await the verification

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
    <div className="donation">
      <img src={donation} alt="donation" />
      <p>
        Join us in empowering our community! Your generous donations help
        sustain and expand our cooperative society's efforts to provide
        financial support, educational programs, and community development
        initiatives. With your contribution, we can continue to uplift members
        through low-interest loans, skill-building opportunities, and resources
        that promote self-reliance.
        {/* <br />
        <br /> */}
        Every donation, big or small, makes a difference. Together, we can
        create a stronger, more resilient society where everyone thrives.
        <br />
        <br />
        Donate today and be a part of the change!
      </p>
      <Button
        className="modal__withdraw1__button"
        onClick={() => handleModalClick("donate")}
      >
        Donate now!
      </Button>

      {/* DONATE AMOUNT MODAL */}
      <Modal isOpen={isOpen.donate} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to donate</h3>
          <Input
            type="number"
            placeholder="Enter an ammount"
            name="amount"
            value={amount}
            disabled={loading}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button className="modal__withdraw1__button" onClick={handleDonate}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Donate"}
          </Button>
        </div>
      </Modal>

      {/* THANK YOU MODAL */}
      <Modal isOpen={isOpen.done} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Thank you for your donation</h3>
          <img
            src={thankYou}
            alt="thank you"
            style={{
              objectFit: "contain",
              height: "200px",
            }}
          />

          <Button className="modal__withdraw1__button" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Donation;
