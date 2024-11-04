import { useEffect, useState } from "react";
import Modal from "../../../components/ui/modal/Modal";
import "./withdrawal.css";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/form-elements/input";
import image1 from "../../../assets/images/main/rb_24175.png";
import image2 from "../../../assets/images/main/rb_24185.png";
import image3 from "../../../assets/images/main/rb_2149335660.png";
import request from "../../../assets/images/main/rb_7834.png";
import { useRequestWithdraw } from "../../../redux/actions/miscAction";
import { useSelector } from "react-redux";
import toastManager from "../../../components/ui/toast/ToasterManager";
import { ClipLoader } from "react-spinners";
import { useGetWallets } from "../../../redux/actions/walletAction";

function Withdrawal() {
  const getWallets = useGetWallets();
  const requestWithdraw = useRequestWithdraw();
  const { user } = useSelector((state) => state.auth);
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [reason, setReason] = useState(null);
  const [wallets, setWallets] = useState({});
  const [isOpen, setIsOpen] = useState({
    request: false,
    savings: false,
    loan: false,
  });

  const closeModal = () => {
    setIsOpen({
      request: false,
      savings: false,
      loan: false,
    });
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "request") {
      setIsOpen((prev) => ({ ...prev, request: true }));
    } else if (option === "savings") {
      setIsOpen((prev) => ({ ...prev, savings: true }));
    } else if (option === "loan") {
      setIsOpen((prev) => ({ ...prev, loan: true }));
    } else return;
  };

  const handleRequestWithdraw = async () => {
    if (!withdrawAmount) {
      setErrorMessage("Please enter an amount");
      return;
    }

    if (!reason) {
      setErrorMessage("Please enter a reason for your request");
      return;
    }

    const balance = parseFloat(wallets.wallet.balance);
    const amountToWithdraw = parseFloat(withdrawAmount);

    if (balance < amountToWithdraw) {
      closeModal();
      toastManager.addToast({
        message: "Insufficient balance",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await requestWithdraw({
        userId: user.id,
        amount: withdrawAmount,
        reason: reason,
      });
      if (response?.payload.status === "success") {
        setErrorMessage("");
        closeModal();
        toastManager.addToast({
          message: "Withdrawal request sent successfully",
          type: "success",
        });
      } else {
        closeModal();
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

  useEffect(() => {
    handleGetWallets();
  }, []);

  return (
    <div className="withdraw">
      <section className="withdraw__money__section__two">
        <div
          className="withdraw__money__section__two__block"
          onClick={() => {
            setType("request");
            handleModalClick("request");
          }}
        >
          <div>
            <h5>Request withdrawal</h5>
            <p>Request withdrawal from main wallet</p>
          </div>
          <img src={image3} />
        </div>
        <div className="withdraw__money__section__two__block">
          <div>
            <h5>Savings</h5>
            <p>Withdraw from savings wallet</p>
          </div>
          <img src={image2} />
        </div>
        <div className="withdraw__money__section__two__block">
          <div>
            <h5>Loan</h5>
            <p>Withdraw from loan balance</p>
          </div>
          <img src={image1} />
        </div>
      </section>

      {/* WITHDRAW MODAL 1 */}
      <Modal isOpen={isOpen.request} onClose={closeModal}>
        <div className="modal__withdraw1">
          <img src={request} />
          <h3>How much are you requesting for?</h3>
          <Input
            type="number"
            placeholder="Enter an amount"
            name="withdrawAmount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <h3>Why are you are you requesting withdrawal?</h3>
          <Input
            type="text"
            placeholder="Enter reason of request"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <p className="modal__withdraw1__error">{errorMessage}</p>
          <Button
            className="modal__withdraw1__button"
            onClick={handleRequestWithdraw}
          >
            {loading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              "Request withdraw"
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Withdrawal;
