import { useState } from "react";
import Modal from "../../../components/ui/modal/Modal";
import "./withdrawal.css";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/form-elements/input";

function Withdrawal() {
  const [withdrawAmmount, setWithdrawAmmount] = useState("");
  const [isOpen, setIsOpen] = useState({
    withdraw1: false,
    payment: false,
    payment2: false,
    payment3: false,
  });

  const closeModal = () => {
    setIsOpen({
      withdraw1: false,
      payment: false,
      payment2: false,
      payment3: false,
    });
  };

  const handleModalClick = (option) => {
    closeModal();
    if (option === "withdraw1") {
      setIsOpen((prev) => ({ ...prev, withdraw1: true }));
    } else if (option === "payment") {
      setIsOpen((prev) => ({ ...prev, payment: true }));
    } else if (option === "payment2") {
      setIsOpen((prev) => ({ ...prev, payment2: true }));
    } else if (option === "payment3") {
      setIsOpen((prev) => ({ ...prev, payment3: true }));
    } else return;
  };
  return (
    <div>
      <div>withdrawla</div>

      {/* WITHDRAW MODAL 1 */}
      <Modal isOpen={isOpen.withdraw1} onClose={closeModal}>
        <div className="modal__withdraw1">
          <h3>Enter how much you want to withdraw</h3>
          <Input
            type="text"
            placeholder="Enter an ammount"
            name="withdrawAmmount"
            value={withdrawAmmount}
            onChange={(e) => setWithdrawAmmount(e.target.value)}
          />
          <p>wallet balance: N 2,000.000.00</p>
          <Button className="modal__withdraw1__button">
            Select account details
          </Button>
        </div>
      </Modal>

      {/* PAYMENT MODAL 2 */}
      <Modal isOpen={isOpen.payment2} onClose={closeModal}>
        <div className="modal__payment2">
          <div onClick={() => handleModalClick("payment3")}>Main Wallet</div>
          <div onClick={() => handleModalClick("payment3")}>Savings Wallet</div>
          <div onClick={() => handleModalClick("payment3")}>
            Home Savings Wallet
          </div>
          <div onClick={() => handleModalClick("payment3")}>Loan Wallet</div>
          <p>Select the wallet to fund</p>
        </div>
      </Modal>
    </div>
  );
}

export default Withdrawal;
